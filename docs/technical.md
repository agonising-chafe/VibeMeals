# VibeMeals Technical Architecture

**Version:** 4.0.1  
**Last Updated:** December 8, 2025

---

## Table of Contents
1. [Technology Stack](#1-technology-stack)
2. [State Management](#2-state-management)
3. [Data Models](#3-data-models)
4. [Key Algorithms](#4-key-algorithms)
5. [API Contracts](#5-api-contracts)
6. [Database Schema](#6-database-schema)
7. [Environment & Keys](#7-environment--keys)

---

## 1) Technology Stack

### Frontend
- **Framework:** Nuxt 3 (Vue 3) - SSR/SPA capabilities, file-based routing, auto-imports
- **State Management:** Pinia - Type-safe, modular stores with devtools
- **Styling:** Tailwind CSS - Utility-first, rapid UI development
- **HTTP Client:** Ofetch (built into Nuxt) - Type-safe fetch wrapper
- **Forms:** VeeValidate + Yup - Declarative validation
- **Testing:** 
  - Vitest - Unit tests
  - Playwright - E2E tests

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Nitro (built into Nuxt) or NestJS for separate API
- **Database:** PostgreSQL 15+ - Relational data with JSON support
- **ORM:** Prisma - Type-safe database access
- **Cache:** Redis - Session storage, rate limiting
- **Queue:** BullMQ - Background jobs (preflight reminders, email)

### Third-Party Services
- **Store Integration:** None enabled in current scope (future: grocer APIs TBD)
- **Recipe Data:** Internal curated database
- **Notifications:** 
  - Push: Firebase Cloud Messaging (FCM)
  - Email: SendGrid or Resend
- **Analytics:** PostHog - Privacy-friendly product analytics

### Infrastructure
- **Hosting:** Vercel or Railway
- **Database:** Supabase or Neon (managed PostgreSQL)
- **CDN:** Cloudflare - Images and static assets
- **Monitoring:** Sentry - Error tracking

---

## 7) Environment & Keys

- `GEMINI_API_KEY` (optional): Enables AI enrichment during recipe import; importer still works without it.
- No external store integrations are active; no shopping-related keys required.

---

## 2) State Management

### 2.1 Store Architecture (Pinia)

**Philosophy:** Modular stores with single responsibilities. No "God Store."

```
stores/
├── usePlanStore.ts       # Plan generation, slots, recipes
├── useShoppingStore.ts   # Shopping list, Quick Review
├── useInventoryStore.ts  # Implicit inventory, staples
├── useCookStore.ts       # Cook Mode state, timers
├── useUserStore.ts       # User preferences, household settings
├── useFeedbackStore.ts   # Weekly Recap, taste profile
└── useNavigationStore.ts # UI state, active week, drawers
```

---

### 2.2 usePlanStore

**Purpose:** Manage the weekly plan, slot state, and recipe selection

```typescript
// stores/usePlanStore.ts
import { defineStore } from 'pinia';

export const usePlanStore = defineStore('plan', {
  state: () => ({
    // Current week being viewed/edited
    activeWeek: '2025-W50', // ISO week format
    
    // All weeks (active + planned)
    weeks: new Map<string, Week>(),
    
    // Undo/redo stacks
    history: [] as HistoryEntry[],
    future: [] as HistoryEntry[],
  }),

  getters: {
    currentWeek(): Week | undefined {
      return this.weeks.get(this.activeWeek);
    },
    
    slots(): Slot[] {
      return this.currentWeek?.slots || [];
    },
    
    canUndo(): boolean {
      return this.history.length > 0;
    },
    
    canRedo(): boolean {
      return this.future.length > 0;
    },
  },

  actions: {
    async generatePlan(options?: GeneratePlanOptions) {
      // Save current state for undo
      this.saveToHistory('generate_plan');
      
      const week = this.currentWeek;
      if (!week) return;
      
      // Preserve locked slots
      const lockedSlots = week.slots.filter(s => s.locked);
      const unlockedSlotIds = week.slots
        .filter(s => !s.locked)
        .map(s => s.id);
      
      // Call API to generate recipes
      const response = await $fetch('/api/plan/generate', {
        method: 'POST',
        body: {
          week: this.activeWeek,
          unlockedSlotIds,
          constraints: {
            servings: useUserStore().householdServings,
            timeBands: options?.timeBands || ['under_20', '30ish'],
            dietFlags: useUserStore().dietFlags,
          },
        },
      });
      
      // Update slots with new recipes
      for (const slotData of response.slots) {
        const slot = week.slots.find(s => s.id === slotData.id);
        if (slot && !slot.locked) {
          slot.recipe = slotData.recipe;
          slot.status = 'planned';
        }
      }
      
      // Reset Quick Review state
      useShoppingStore().resetReview();
    },
    
    async rerollSlot(slotId: string) {
      this.saveToHistory('reroll_slot', { slotId });
      
      const slot = this.findSlot(slotId);
      if (!slot || slot.locked) return;
      
      // Increment attempt counter for deterministic seeding
      slot.attemptCount = (slot.attemptCount || 0) + 1;
      
      const response = await $fetch('/api/plan/reroll', {
        method: 'POST',
        body: {
          slotId,
          attemptCount: slot.attemptCount,
          exclude: this.getRecentRecipes(21), // 21-day repeat guard
        },
      });
      
      slot.recipe = response.recipe;
      slot.status = 'planned';
    },
    
    lockSlot(slotId: string) {
      this.saveToHistory('lock_slot', { slotId });
      const slot = this.findSlot(slotId);
      if (slot) slot.locked = true;
    },
    
    unlockSlot(slotId: string) {
      this.saveToHistory('unlock_slot', { slotId });
      const slot = this.findSlot(slotId);
      if (slot) slot.locked = false;
    },
    
    undo() {
      const entry = this.history.pop();
      if (!entry) return;
      
      this.future.push({
        action: 'undo',
        state: this.getCurrentState(),
      });
      
      this.restoreState(entry.state);
    },
    
    redo() {
      const entry = this.future.pop();
      if (!entry) return;
      
      this.history.push({
        action: 'redo',
        state: this.getCurrentState(),
      });
      
      this.restoreState(entry.state);
    },
    
    saveToHistory(action: string, meta?: any) {
      this.history.push({
        action,
        meta,
        state: this.getCurrentState(),
        timestamp: Date.now(),
      });
      
      // Clear future (can't redo after new action)
      this.future = [];
      
      // Limit history to 50 entries
      if (this.history.length > 50) {
        this.history.shift();
      }
    },
    
    getRecentRecipes(days: number): string[] {
      // Get recipe IDs from last N days for repeat guard
      const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
      const recentRecipes = new Set<string>();
      
      for (const week of this.weeks.values()) {
        for (const slot of week.slots) {
          if (slot.recipe && slot.cookedAt && slot.cookedAt > cutoff) {
            recentRecipes.add(slot.recipe.familyId);
          }
        }
      }
      
      return Array.from(recentRecipes);
    },
  },
});
```

---

### 2.3 useShoppingStore

**Purpose:** Manage shopping list, Quick Review state, and export

```typescript
// stores/useShoppingStore.ts
import { defineStore } from 'pinia';

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    // Quick Review state
    reviewedItems: new Map<string, ReviewResolution>(),
    reviewConfirmed: false,
    
    // Estimated savings from Quick Review
    estimatedSavings: 0,
  }),

  getters: {
    shoppingList(): ShoppingItem[] {
      const planStore = usePlanStore();
      const inventoryStore = useInventoryStore();
      
      const items: ShoppingItem[] = [];
      
      for (const slot of planStore.slots) {
        if (!slot.recipe) continue;
        
        for (const ingredient of slot.recipe.ingredients) {
          const resolution = this.reviewedItems.get(ingredient.id);
          
          // Skip if user confirmed they have it
          if (resolution === 'have' || resolution === 'leftover') {
            continue;
          }
          
          // Skip if it's a staple (unless explicitly overridden)
          if (inventoryStore.isStaple(ingredient.canonicalId) && !resolution) {
            continue;
          }
          
          // Add to list
          items.push({
            id: ingredient.id,
            name: ingredient.displayName,
            quantity: ingredient.quantity * slot.servings,
            unit: ingredient.unit,
            category: ingredient.category,
            forSlot: slot.id,
            estimatedPrice: ingredient.estimatedPrice,
          });
        }
      }
      
      // Deduplicate and group by category
      return this.deduplicateItems(items);
    },
    
    quickReviewItems(): QuickReviewItem[] {
      // Items that could potentially save money if reviewed
      const planStore = usePlanStore();
      const inventoryStore = useInventoryStore();
      
      const items: QuickReviewItem[] = [];
      
      for (const slot of planStore.slots) {
        if (!slot.recipe) continue;
        
        for (const ingredient of slot.recipe.ingredients) {
          const confidence = this.calculateConfidence(ingredient);
          
          // Only surface items with medium or low confidence
          if (confidence < 0.80) {
            items.push({
              ingredientId: ingredient.id,
              name: ingredient.displayName,
              context: `For ${slot.day}'s ${slot.mealType}`,
              confidence,
              suggestion: this.getSuggestion(ingredient, confidence),
              estimatedPrice: ingredient.estimatedPrice,
            });
          }
        }
      }
      
      return items;
    },
    
    canProceedToShop(): boolean {
      // No gates! User can always proceed
      return true;
    },
  },

  actions: {
    async buildShoppingList() {
      // Aggregate ingredients from all slots
      const list = this.shoppingList;
      
      // Calculate savings if Quick Review was used
      this.estimatedSavings = this.calculateSavings();
      
      return list;
    },
    
    resolveItem(ingredientId: string, resolution: ReviewResolution) {
      this.reviewedItems.set(ingredientId, resolution);
      this.reviewConfirmed = false; // Reset confirmation on any change
    },
    
    confirmReview() {
      this.reviewConfirmed = true;
    },
    
    resetReview() {
      this.reviewedItems.clear();
      this.reviewConfirmed = false;
      this.estimatedSavings = 0;
    },
    
    async exportCSV() {
      const list = await this.buildShoppingList();
      
      const response = await $fetch('/api/shopping/export', {
        method: 'POST',
        body: {
          items: list,
          format: 'csv',
        },
      });
      
      // Trigger download
      const blob = new Blob([response.csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vibemeals-shopping-${usePlanStore().activeWeek}.csv`;
      a.click();
      
      return response;
    },
    
    calculateConfidence(ingredient: RecipeIngredient): number {
      const inventoryStore = useInventoryStore();
      
      // Check if we have it in inventory
      const inInventory = inventoryStore.hasIngredient(ingredient.canonicalId);
      if (inInventory) return 0.95;
      
      // Check purchase history
      const purchaseHistory = inventoryStore.getPurchaseHistory(ingredient.canonicalId);
      if (purchaseHistory.length === 0) return 0.50; // Never bought before
      
      const lastPurchase = purchaseHistory[0];
      const daysSinceLastPurchase = (Date.now() - lastPurchase.date) / (1000 * 60 * 60 * 24);
      
      // Estimate confidence based on typical usage pattern
      if (daysSinceLastPurchase < 7) return 0.85;  // Probably still have it
      if (daysSinceLastPurchase < 14) return 0.65; // Maybe still have it
      return 0.50; // Likely need to buy
    },
    
    getSuggestion(ingredient: RecipeIngredient, confidence: number): string {
      if (confidence >= 0.80) {
        return "We think you have this";
      } else if (confidence >= 0.55) {
        return "You bought this recently. Still have it?";
      } else {
        return "We're adding this to your list";
      }
    },
    
    calculateSavings(): number {
      let savings = 0;
      
      for (const [ingredientId, resolution] of this.reviewedItems) {
        if (resolution === 'have' || resolution === 'leftover') {
          // Find ingredient price
          const ingredient = this.findIngredient(ingredientId);
          if (ingredient) {
            savings += ingredient.estimatedPrice || 0;
          }
        }
      }
      
      return savings;
    },
    
    deduplicateItems(items: ShoppingItem[]): ShoppingItem[] {
      const grouped = new Map<string, ShoppingItem>();
      
      for (const item of items) {
        const key = item.name; // Group by name
        
        if (grouped.has(key)) {
          const existing = grouped.get(key)!;
          existing.quantity += item.quantity;
          existing.forSlot += `, ${item.forSlot}`;
        } else {
          grouped.set(key, { ...item });
        }
      }
      
      // Sort by category, then name
      return Array.from(grouped.values()).sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }
        return a.name.localeCompare(b.name);
      });
    },
  },
});
```

---

### 2.4 useInventoryStore

**Purpose:** Track implicit inventory from purchases and cooking

```typescript
// stores/useInventoryStore.ts
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    // Implicit inventory (inferred from behavior)
    inventory: new Map<string, InventoryItem>(),
    
    // Staples (assumed on-hand)
    staples: new Set<string>([
      'olive-oil',
      'salt',
      'black-pepper',
      'flour',
      'sugar',
      'garlic-powder',
      'onion-powder',
      'baking-powder',
      'baking-soda',
      'vinegar',
      'soy-sauce',
    ]),
    
    // Purchase history for learning
    purchaseHistory: [] as PurchaseEvent[],
    
    // Usage history for learning
    usageHistory: [] as UsageEvent[],
  }),

  getters: {
    hasIngredient() {
      return (canonicalId: string): boolean => {
        const item = this.inventory.get(canonicalId);
        return item ? item.quantity > 0 : false;
      };
    },
    
    isStaple() {
      return (canonicalId: string): boolean => {
        return this.staples.has(canonicalId);
      };
    },
    
    getPurchaseHistory() {
      return (canonicalId: string): PurchaseEvent[] => {
        return this.purchaseHistory
          .filter(e => e.canonicalId === canonicalId)
          .sort((a, b) => b.date - a.date);
      };
    },
  },

  actions: {
    markPurchased(items: ShoppingItem[]) {
      for (const item of items) {
        // Add to inventory
        const existing = this.inventory.get(item.canonicalId);
        if (existing) {
          existing.quantity += item.quantity;
          existing.lastUpdated = Date.now();
        } else {
          this.inventory.set(item.canonicalId, {
            canonicalId: item.canonicalId,
            quantity: item.quantity,
            unit: item.unit,
            lastUpdated: Date.now(),
            source: 'purchased',
          });
        }
        
        // Log purchase event
        this.purchaseHistory.push({
          canonicalId: item.canonicalId,
          quantity: item.quantity,
          date: Date.now(),
        });
      }
    },
    
    deductIngredients(recipe: Recipe, servings: number) {
      for (const ingredient of recipe.ingredients) {
        const scaledQty = ingredient.quantity * servings;
        
        const existing = this.inventory.get(ingredient.canonicalId);
        if (existing) {
          existing.quantity = Math.max(0, existing.quantity - scaledQty);
          existing.lastUpdated = Date.now();
        }
        
        // Log usage event
        this.usageHistory.push({
          canonicalId: ingredient.canonicalId,
          quantity: scaledQty,
          date: Date.now(),
          recipeId: recipe.id,
        });
      }
    },
    
    updateStapleStatus(canonicalId: string, isStaple: boolean) {
      if (isStaple) {
        this.staples.add(canonicalId);
      } else {
        this.staples.delete(canonicalId);
      }
    },
    
    learnStaplesFromBehavior() {
      // Promote to staple if confirmed "have it" 3+ weeks in a row
      const recentReviews = this.getRecentQuickReviewDecisions(21);
      
      for (const [canonicalId, decisions] of recentReviews) {
        const consecutiveHaves = decisions.filter(d => d === 'have').length;
        
        if (consecutiveHaves >= 3 && !this.staples.has(canonicalId)) {
          this.updateStapleStatus(canonicalId, true);
        }
      }
      
      // Demote from staple if ever marked "don't have"
      for (const [canonicalId, decisions] of recentReviews) {
        if (decisions.includes('dont_have') && this.staples.has(canonicalId)) {
          this.updateStapleStatus(canonicalId, false);
        }
      }
    },
  },
});
```

---

## 3) Data Models

### 3.1 Core Types (TypeScript)

```typescript
// types/core.ts

export interface Week {
  id: string; // e.g., "2025-W50"
  slots: Slot[];
  status: 'draft' | 'active' | 'completed';
  createdAt: number;
  updatedAt: number;
}

export interface Slot {
  id: string; // e.g., "2025-W50:monday:dinner"
  week: string;
  day: string; // "monday", "tuesday", etc.
  mealType: 'lunch' | 'dinner';
  recipe: Recipe | null;
  locked: boolean;
  servings: number; // overrides household default
  status: 'empty' | 'planned' | 'provisioned' | 'cooked';
  attemptCount: number; // for deterministic rerolls
  cookedAt?: number; // timestamp
}

export interface Recipe {
  id: string;
  name: string;
  familyId: string; // for repeat guard (e.g., "chicken-tacos")
  timeBand: 'under_20' | '30ish' | 'weekend_project';
  estimatedTime: number; // minutes
  vibes: string[]; // ["spicy", "mexican", "quick"]
  ingredients: RecipeIngredient[];
  steps: CookStep[];
  servings: number; // base servings (scales from this)
  imageUrl: string;
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface RecipeIngredient {
  id: string;
  canonicalId: string; // links to canonical ingredient DB
  displayName: string; // "Chicken thighs"
  quantity: number; // per serving
  unit: string; // "lb", "cup", "tbsp"
  category: string; // "Protein", "Produce", etc.
  estimatedPrice?: number;
  optional: boolean;
}

export interface CookStep {
  id: string;
  stepNumber: number;
  instruction: string;
  duration?: number; // seconds
  timer?: boolean;
  parallel?: boolean; // can be done simultaneously with prev step
  ingredients: string[]; // ingredient IDs used in this step
}

export interface ShoppingItem {
  id: string;
  canonicalId: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  forSlot: string; // which recipe(s) need this
  estimatedPrice?: number;
  checked?: boolean; // for in-store use
}

export interface QuickReviewItem {
  ingredientId: string;
  name: string;
  context: string; // "For Tuesday's tacos"
  confidence: number; // 0.0–1.0
  suggestion: string; // human-readable suggestion
  estimatedPrice?: number;
}

export type ReviewResolution = 'have' | 'buy' | 'leftover';

export interface InventoryItem {
  canonicalId: string;
  quantity: number;
  unit: string;
  lastUpdated: number;
  source: 'purchased' | 'manual' | 'inferred';
}

export interface PurchaseEvent {
  canonicalId: string;
  quantity: number;
  date: number;
}

export interface UsageEvent {
  canonicalId: string;
  quantity: number;
  date: number;
  recipeId: string;
}

export interface HistoryEntry {
  action: string;
  meta?: any;
  state: any; // serialized state snapshot
  timestamp: number;
}

export interface GeneratePlanOptions {
  timeBands?: string[];
  dietFlags?: string[];
  excludeRecipes?: string[];
}
```

---

## 4) Key Algorithms

### 4.1 Deterministic Reroll

**Purpose:** Generate recipes that are consistent for the same inputs (no random surprises)

```typescript
// lib/reroll.ts

function deterministicReroll(
  slotId: string,
  attemptCount: number,
  userId: string,
  week: string,
  candidates: Recipe[],
  excludeRecipes: string[], // recipe families to exclude (repeat guard)
): Recipe {
  // Build seed from known inputs
  const seed = `${userId}-${week}-${slotId}-${attemptCount}`;
  
  // Filter out excluded recipes
  const available = candidates.filter(
    r => !excludeRecipes.includes(r.familyId)
  );
  
  if (available.length === 0) {
    throw new Error('No recipes available after filtering');
  }
  
  // Pick deterministically using seeded RNG
  return pickDeterministic(available, seed);
}

function pickDeterministic<T>(array: T[], seed: string): T {
  // Simple seeded RNG (use a proper library in production)
  const hash = hashString(seed);
  const index = hash % array.length;
  return array[index];
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
```

---

### 4.2 Confidence Scoring

**Purpose:** Estimate likelihood that user has an ingredient on hand

```typescript
// lib/confidence.ts

function calculateIngredientConfidence(
  ingredient: RecipeIngredient,
  inventory: Map<string, InventoryItem>,
  purchaseHistory: PurchaseEvent[],
  staples: Set<string>,
): number {
  // Staples are always high confidence
  if (staples.has(ingredient.canonicalId)) {
    return 0.95;
  }
  
  // Check current inventory
  const inventoryItem = inventory.get(ingredient.canonicalId);
  if (inventoryItem && inventoryItem.quantity >= ingredient.quantity) {
    return 0.90; // High: we tracked they have it
  }
  
  // Check purchase history
  const recentPurchases = purchaseHistory
    .filter(p => p.canonicalId === ingredient.canonicalId)
    .filter(p => {
      const daysSince = (Date.now() - p.date) / (1000 * 60 * 60 * 24);
      return daysSince < 30; // Last 30 days
    });
  
  if (recentPurchases.length === 0) {
    return 0.50; // Medium-Low: never bought before
  }
  
  // Calculate based on recency
  const lastPurchase = recentPurchases[0];
  const daysSince = (Date.now() - lastPurchase.date) / (1000 * 60 * 60 * 24);
  
  if (daysSince < 7) return 0.85;  // High: bought recently
  if (daysSince < 14) return 0.70; // Medium-High: might still have
  if (daysSince < 21) return 0.60; // Medium: probably used up
  return 0.50; // Medium-Low: likely need to buy
}

function calculateRecipeConfidence(
  recipe: Recipe,
  inventory: Map<string, InventoryItem>,
  purchaseHistory: PurchaseEvent[],
  staples: Set<string>,
): number {
  const scores = recipe.ingredients.map(ing =>
    calculateIngredientConfidence(ing, inventory, purchaseHistory, staples)
  );
  
  // Average confidence across all ingredients
  const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  return avg;
}
```

---

### 4.3 Shopping List Builder

**Purpose:** Aggregate ingredients from plan, deduplicate, apply resolutions

```typescript
// lib/shoppingList.ts

function buildShoppingList(
  slots: Slot[],
  reviewResolutions: Map<string, ReviewResolution>,
  inventory: Map<string, InventoryItem>,
  staples: Set<string>,
): ShoppingItem[] {
  const items: ShoppingItem[] = [];
  
  for (const slot of slots) {
    if (!slot.recipe) continue;
    
    for (const ingredient of slot.recipe.ingredients) {
      // Check resolution from Quick Review
      const resolution = reviewResolutions.get(ingredient.id);
      if (resolution === 'have' || resolution === 'leftover') {
        continue; // User confirmed they have it
      }
      
      // Check staples
      if (staples.has(ingredient.canonicalId) && !resolution) {
        continue; // Assumed on-hand
      }
      
      // Check inventory
      const inventoryItem = inventory.get(ingredient.canonicalId);
      if (inventoryItem && inventoryItem.quantity >= ingredient.quantity * slot.servings) {
        continue; // We know they have it
      }
      
      // Add to list
      items.push({
        id: `${slot.id}-${ingredient.id}`,
        canonicalId: ingredient.canonicalId,
        name: ingredient.displayName,
        quantity: ingredient.quantity * slot.servings,
        unit: ingredient.unit,
        category: ingredient.category,
        forSlot: `${slot.day}'s ${slot.mealType}`,
        estimatedPrice: ingredient.estimatedPrice,
      });
    }
  }
  
  // Deduplicate by canonical ID
  return deduplicateItems(items);
}

function deduplicateItems(items: ShoppingItem[]): ShoppingItem[] {
  const grouped = new Map<string, ShoppingItem>();
  
  for (const item of items) {
    const key = item.canonicalId;
    
    if (grouped.has(key)) {
      const existing = grouped.get(key)!;
      existing.quantity += item.quantity;
      existing.forSlot += `, ${item.forSlot}`;
    } else {
      grouped.set(key, { ...item });
    }
  }
  
  // Normalize pack sizes (round up to store pack sizes)
  for (const item of grouped.values()) {
    item.quantity = normalizePackSize(item.quantity, item.unit, item.canonicalId);
  }
  
  // Sort by category, then name
  return Array.from(grouped.values()).sort((a, b) => {
    const categoryOrder = getCategoryOrder();
    const catA = categoryOrder.indexOf(a.category);
    const catB = categoryOrder.indexOf(b.category);
    
    if (catA !== catB) return catA - catB;
    return a.name.localeCompare(b.name);
  });
}

function normalizePackSize(quantity: number, unit: string, canonicalId: string): number {
  // Look up typical pack sizes from catalog
  const packSizes = getPackSizes(canonicalId, unit);
  if (!packSizes.length) return Math.ceil(quantity);
  
  // Find smallest pack size that covers needed quantity
  for (const size of packSizes.sort((a, b) => a - b)) {
    if (size >= quantity) return size;
  }
  
  // Need multiple packs
  const largestPack = packSizes[packSizes.length - 1];
  const packsNeeded = Math.ceil(quantity / largestPack);
  return packsNeeded * largestPack;
}
```

---

### 4.4 Leftover Tracking & Reuse

**Purpose:** Track residual ingredients and suggest recipes that use them

```typescript
// lib/leftovers.ts

function trackLeftovers(
  recipe: Recipe,
  servings: number,
  shoppingList: ShoppingItem[],
): Leftover[] {
  const leftovers: Leftover[] = [];
  
  for (const ingredient of recipe.ingredients) {
    const needed = ingredient.quantity * servings;
    
    // Find what was purchased
    const purchased = shoppingList.find(
      item => item.canonicalId === ingredient.canonicalId
    );
    
    if (purchased && purchased.quantity > needed) {
      const leftover = purchased.quantity - needed;
      
      leftovers.push({
        canonicalId: ingredient.canonicalId,
        name: ingredient.displayName,
        quantity: leftover,
        unit: ingredient.unit,
        fromRecipe: recipe.id,
        estimatedExpiry: estimateExpiry(ingredient.canonicalId),
      });
    }
  }
  
  return leftovers;
}

function suggestLeftoverRecipes(
  leftovers: Leftover[],
  allRecipes: Recipe[],
): Recipe[] {
  const suggestions: Recipe[] = [];
  
  for (const recipe of allRecipes) {
    let leftoverMatchCount = 0;
    
    for (const ingredient of recipe.ingredients) {
      const leftover = leftovers.find(l => l.canonicalId === ingredient.canonicalId);
      if (leftover && leftover.quantity >= ingredient.quantity) {
        leftoverMatchCount++;
      }
    }
    
    // Suggest recipes that use 2+ leftover ingredients
    if (leftoverMatchCount >= 2) {
      suggestions.push(recipe);
    }
  }
  
  return suggestions;
}

function estimateExpiry(canonicalId: string): number {
  // Lookup shelf life from ingredient database
  const shelfLife = getShelfLife(canonicalId); // days
  return Date.now() + (shelfLife * 24 * 60 * 60 * 1000);
}
```

---

## 5) API Contracts

### 5.1 POST /api/plan/generate

**Purpose:** Generate a week of recipes based on constraints

**Request:**
```json
{
  "week": "2025-W50",
  "unlockedSlotIds": [
    "2025-W50:monday:dinner",
    "2025-W50:tuesday:dinner"
  ],
  "constraints": {
    "servings": 4,
    "timeBands": ["under_20", "30ish"],
    "dietFlags": ["pescatarian"],
    "excludeRecipes": ["beef-stew", "chicken-parm"]
  }
}
```

**Response:**
```json
{
  "slots": [
    {
      "id": "2025-W50:monday:dinner",
      "recipe": {
        "id": "rec-123",
        "name": "Spicy Chicken Tacos",
        "familyId": "chicken-tacos",
        "timeBand": "under_20",
        "estimatedTime": 18,
        "vibes": ["spicy", "mexican", "quick"],
        "imageUrl": "https://cdn.vibemeals.com/recipes/chicken-tacos.jpg",
        "ingredients": [
          {
            "id": "ing-1",
            "canonicalId": "chicken-thighs",
            "displayName": "Chicken thighs",
            "quantity": 0.375,
            "unit": "lb",
            "category": "Protein",
            "estimatedPrice": 2.25
          }
        ],
        "steps": [
          {
            "id": "step-1",
            "stepNumber": 1,
            "instruction": "Heat oil in a large skillet over medium-high heat.",
            "duration": 120,
            "timer": true
          }
        ]
      }
    }
  ]
}
```

---

### 5.2 POST /api/plan/reroll

**Purpose:** Reroll a single slot with a new recipe

**Request:**
```json
{
  "slotId": "2025-W50:monday:dinner",
  "attemptCount": 2,
  "exclude": ["chicken-tacos", "beef-stew"]
}
```

**Response:**
```json
{
  "recipe": {
    "id": "rec-456",
    "name": "Teriyaki Salmon Bowl",
    "familyId": "teriyaki-salmon",
    "timeBand": "under_20",
    "estimatedTime": 22,
    "vibes": ["asian", "healthy", "quick"],
    "imageUrl": "https://cdn.vibemeals.com/recipes/teriyaki-salmon.jpg",
    "ingredients": [...]
  }
}
```

---

### 5.3 POST /api/shopping/export

**Purpose:** Export shopping list to CSV or text (no active store integrations)

**Request:**
```json
{
  "items": [
    {
      "canonicalId": "chicken-thighs",
      "name": "Chicken thighs",
      "quantity": 1.5,
      "unit": "lb",
      "category": "Protein"
    }
  ],
  "format": "csv" // or "text"
}
```

**Response (CSV):**
```json
{
  "csv": "Category,Item,Quantity,Unit\nProtein,Chicken thighs,1.5,lb\n..."
}
```

**Response (Text):**
```json
{
  "text": "Protein: Chicken thighs (1.5 lb)\nProduce: Onions (2)\n..."
}
```

---

### 5.4 POST /api/feedback/submit

**Purpose:** Submit Weekly Recap feedback

**Request:**
```json
{
  "week": "2025-W50",
  "feedback": [
    {
      "recipeId": "rec-123",
      "thumbs": "up",
      "favorite": true,
      "tags": ["KidFriendly", "Quick"]
    },
    {
      "recipeId": "rec-456",
      "thumbs": "down",
      "tags": ["TooSpicy"]
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "tasteProfileUpdated": true
}
```

---

## 6) Database Schema

### 6.1 PostgreSQL Schema (Prisma)

```prisma
// schema.prisma

model User {
  id                String   @id @default(cuid())
  email             String   @unique
  name              String?
  householdServings Int      @default(4)
  dietFlags         String[] // ["pescatarian", "low-fodmap"]
  staples           String[] // canonical IDs
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  weeks             Week[]
  inventory         InventoryItem[]
  purchaseHistory   PurchaseEvent[]
  usageHistory      UsageEvent[]
  feedback          Feedback[]
}

model Week {
  id        String   @id // "2025-W50"
  userId    String
  status    String   // "draft" | "active" | "completed"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user      User     @relation(fields: [userId], references: [id])
  slots     Slot[]
}

model Slot {
  id           String   @id // "2025-W50:monday:dinner"
  weekId       String
  day          String
  mealType     String   // "lunch" | "dinner"
  recipeId     String?
  locked       Boolean  @default(false)
  servings     Int
  status       String   // "empty" | "planned" | "provisioned" | "cooked"
  attemptCount Int      @default(0)
  cookedAt     DateTime?
  
  week         Week     @relation(fields: [weekId], references: [id])
  recipe       Recipe?  @relation(fields: [recipeId], references: [id])
}

model Recipe {
  id            String   @id @default(cuid())
  name          String
  familyId      String   // for repeat guard
  timeBand      String
  estimatedTime Int      // minutes
  vibes         String[]
  imageUrl      String
  servings      Int      @default(4)
  createdAt     DateTime @default(now())
  
  ingredients   RecipeIngredient[]
  steps         CookStep[]
  slots         Slot[]
}

model RecipeIngredient {
  id             String  @id @default(cuid())
  recipeId       String
  canonicalId    String
  displayName    String
  quantity       Float
  unit           String
  category       String
  estimatedPrice Float?
  optional       Boolean @default(false)
  
  recipe         Recipe  @relation(fields: [recipeId], references: [id])
}

model CookStep {
  id          String  @id @default(cuid())
  recipeId    String
  stepNumber  Int
  instruction String
  duration    Int?    // seconds
  timer       Boolean @default(false)
  parallel    Boolean @default(false)
  ingredients String[] // ingredient IDs
  
  recipe      Recipe  @relation(fields: [recipeId], references: [id])
}

model InventoryItem {
  id          String   @id @default(cuid())
  userId      String
  canonicalId String
  quantity    Float
  unit        String
  lastUpdated DateTime @default(now())
  source      String   // "purchased" | "manual" | "inferred"
  
  user        User     @relation(fields: [userId], references: [id])
  
  @@unique([userId, canonicalId])
}

model PurchaseEvent {
  id          String   @id @default(cuid())
  userId      String
  canonicalId String
  quantity    Float
  date        DateTime @default(now())
  
  user        User     @relation(fields: [userId], references: [id])
}

model UsageEvent {
  id          String   @id @default(cuid())
  userId      String
  canonicalId String
  quantity    Float
  date        DateTime @default(now())
  recipeId    String
  
  user        User     @relation(fields: [userId], references: [id])
}

model Feedback {
  id        String   @id @default(cuid())
  userId    String
  recipeId  String
  week      String
  thumbs    String?  // "up" | "down"
  favorite  Boolean  @default(false)
  tags      String[]
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}
```

---

*[Back to Index](index.md)*
