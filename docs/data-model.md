# VibeMeals v1 Data Model

> **Status:** v1.2.0 - Reference schema for implementation  
> **Last Updated:** December 8, 2025 — VALIDATION COMPLETE ✅  
> **Purpose:** Shared TypeScript data model covering Plan → Shop → Today → Cook flows

This document defines the core data structures referenced by all tickets (P1-P9, T1-T9, S1-S9, C1-C4). These are **interface definitions only** - not implementation code, but contracts that prevent architecture drift during parallel development.

---

## 0. Core Primitives & Enums

These give us consistent IDs + enums across Planner/Today/Shop.

```typescript
// Core opaque IDs
export type PlanId = string;
export type HouseholdId = string;
export type RecipeId = string;
export type ShoppingItemId = string;

// YYYY-MM-DD
export type IsoDate = string;

// Day-of-week (for UI)
export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

// Time bands from Vision §8
export type TimeBand = 'FAST' | 'NORMAL' | 'PROJECT';

// From Vision §8 + Shop S7: critical vs non-critical ingredients
export type IngredientCriticality = 'CRITICAL' | 'NON_CRITICAL';

// Ingredient kind helps with grouping & logic
export type IngredientKind =
  | 'PROTEIN'
  | 'CARB'
  | 'VEG'
  | 'DAIRY'
  | 'FAT_OIL'
  | 'SPICE'
  | 'CONDIMENT'
  | 'OTHER';

// Basic constraints (v1 can be simple)
export type DietConstraint =
  | 'NO_PORK'
  | 'NO_BEEF'
  | 'NO_SHELLFISH'
  | 'NO_GLUTEN'
  | 'NO_DAIRY'
  | 'VEGETARIAN'
  | 'VEGAN'
  | 'KETO'
  | 'CARNIVORE';

// For Shop grouping (Shop S3)
export type ShoppingCategory =
  | 'PRODUCE'
  | 'MEAT_SEAFOOD'
  | 'DAIRY_EGGS'
  | 'PANTRY_DRY'
  | 'FROZEN'
  | 'OTHER';

// For preflight + Today/Tonight (Today T2)
export type PreflightRequirementType = 'THAW' | 'MARINATE' | 'SLOW_COOK' | 'LONG_PREP';

export type PreflightStatus =
  | 'NONE_REQUIRED'
  | 'ALL_GOOD'
  | 'MISSED'
  | 'UNKNOWN';

// For Today's high-level status (Today T1, T2)
export type TonightStatus =
  | 'NO_PLAN'
  | 'READY'
  | 'MISSED_PREFLIGHT'
  | 'MISSING_INGREDIENT'
  | 'OUT_EATING'
  | 'EASIER_OPTION_SELECTED';
``` text

---

## 1. Household & Week Shape

### HouseholdProfile
Represents a user's household configuration, including unique ID, lifestyle mode, headcount, target dinner frequency, dietary constraints, and time band preferences. Used by Planner (P2, P6) to personalize meal planning and frequency controls.

### HouseholdMode
Core lifestyle categories for week shapes and planning defaults. Five modes: SOLO, FAMILY, DINK, EMPTY_NEST, LARGE.

From Vision §5.2 (Household Modes & Week Shapes).

```typescript
export type HouseholdMode = 'SOLO' | 'FAMILY' | 'DINK' | 'EMPTY_NEST' | 'LARGE';

export interface HouseholdProfile {
  id: HouseholdId;
  mode: HouseholdMode;
  headcount: number;
  targetDinnersPerWeek: number;
  dietConstraints: DietConstraint[];
  timeBandPreference?: {
    preferredFastCount?: number;
    preferredNormalCount?: number;
    preferredProjectCount?: number;
  };
}
```

---

## 2. Recipes & Ingredients (Catalog Side)

### RecipeIngredientRequirement

Describes a single ingredient needed for a recipe, including canonical ID, display name, amount, unit, criticality level (CRITICAL or NON_CRITICAL), ingredient kind (PROTEIN, VEG, etc.), and shopping category. Used by Planner (P2), Shop (S2, S3, S7), and Today (T2) for meal planning and ingredient grouping.

Enough info for:

- Planner (time band, difficulty, leftovers)
- Shop (ingredient breakdown, critical vs non-critical, categories)
- Today (preflight metadata)

```typescript
export interface RecipeIngredientRequirement {
  ingredientId: string;            // canonical ingredient
  displayName: string;             // "Yellow onion", "Boneless chicken breast"
  amount: number;                  // normalized unit quantity (e.g., 1.0)
  unit: 'UNIT' | 'GRAM' | 'KG' | 'OZ' | 'LB' | 'CUP' | 'TBSP' | 'TSP' | 'ML';
  criticality: IngredientCriticality; // CRITICAL | NON_CRITICAL (Shop S7)
  kind: IngredientKind;
  shoppingCategory: ShoppingCategory; // for Shop S3 grouping
}

export interface RecipePreflightRequirement {
  type: PreflightRequirementType;
  // e.g. "start marinade at least 4h before cooking" or "thaw overnight"
  description: string;
  // How far in advance in hours the action should happen (for Today/Tomorrow preview)
  hoursBeforeCook?: number;
}

export interface RecipeMetadata {
  timeBand: TimeBand;
  estimatedMinutes: number;
  // e.g. "ONE_PAN", "SLOW_COOKER", etc if you want later
  equipmentTags?: string[];
  // leftovers intent: NONE | EXPECTED_LEFTOVERS | COOK_ONCE_EAT_TWICE
  leftoverStrategy?: 'NONE' | 'EXPECTED' | 'COOK_ONCE_EAT_TWICE';
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;     // Max 2-3 sentences, beginner-friendly
  duration?: number;       // Minutes for this step (for timers in Cooking Mode)
  timerMinutes?: number;   // Duration for timer (3+ minutes)
  timer?: boolean;         // Should show [Set Timer] button (default: false)
  parallel?: boolean;      // "Meanwhile" or "while X cooks" (default: false)
}

export interface Recipe {
  id: RecipeId;
  name: string;
  slug: string;
  metadata: RecipeMetadata;
  scalable?: boolean;
  ingredients: RecipeIngredientRequirement[];
  preflight: RecipePreflightRequirement[];
  steps: RecipeStep[];
  tags?: string[];
  variantHints?: { description: string; safeSubIngredientId?: string }[];
}
```

**Referenced by:**

---

## 3. Plan, PlanDay, PlannedDinner

A Plan is "this week for this household."

```typescript
export interface PlannedDinner {
  recipeId: RecipeId;
  // Derived from household.headcount but can be overridden
  servings: number;
  locked: boolean; // Planner P4 (Lock/Unlock)
  // Whether tonight is marked as "out" by the user (Today T6)
  outEating: boolean;
  // Today/Plan can compute this from Recipe.preflight + date (Today T2)
  preflightStatus: PreflightStatus;
  // For easier option / swap history if you care (Today T5, T7)
  originalRecipeId?: RecipeId; // if swapped from another
}

export interface PlanDay {
  date: IsoDate;
  dayOfWeek: DayOfWeek;
  dinner?: PlannedDinner;
}

export type PlanStatus = 'DRAFT' | 'PLANNED' | 'SHOPPED';

export interface Plan {
  id: PlanId;
  householdId: HouseholdId;
  weekStartDate: IsoDate;
  status: PlanStatus;
  servingsThisWeek?: number;
  isShoppingDone?: boolean;
  days: PlanDay[];
  summary: {
    totalDinners: number;
    fastCount: number;
    normalCount: number;
    projectCount: number;
    thawDays: number;
    marinateDays: number;
  };
}
```

**Referenced by:**

- Planner P1 (Grid Skeleton - renders `Plan.days[]`)
- Planner P2 (Generate Plan - creates/updates `Plan`)
- Planner P3 (Swap/Reroll - mutates `PlannedDinner.recipeId`)
- Planner P4 (Lock/Unlock - mutates `PlannedDinner.locked`)
- Planner P5 (Preflight Indicators - reads `summary.thawDays`, `summary.marinateDays`)
- Planner P7 (Plan Stability - reads/updates `Plan.status`)
- Planner P8 (Move/Delete - mutates `Plan.days[]`)
- Shop S2 (Ingredient Expansion - reads `Plan.days[]` to extract recipes)
- Shop S6 (Done Shopping - sets `Plan.status = 'SHOPPED'`)
- Today T1 (View Skeleton - reads `Plan` to show tonight)
- Today T2 (Preflight State Engine - reads `PlannedDinner.preflightStatus`)

---

## 4. Shopping List & Quick Review

Normalized shopping items built from recipes.

```typescript
export interface ShoppingItemSourceUsage {
  recipeId: RecipeId;
  recipeName: string;
  amountPortion?: number; // fraction of total amount for display (optional)
}

export interface ShoppingItem {
  id: ShoppingItemId;
  planId: PlanId;
  ingredientId: string; // canonical
  displayName: string; // "Yellow onion"
  shoppingCategory: ShoppingCategory;
  totalAmount: number;
  unit: RecipeIngredientRequirement['unit'];
  usedIn: ShoppingItemSourceUsage[];
  checked: boolean;
  manualOverrideAmount?: number;
  notes?: string;
  criticality: IngredientCriticality;
}

export interface QuickReviewCandidate {
  shoppingItemId: ShoppingItemId;
  reason: 'PANTRY_STAPLE' | 'BULK_STAPLE';
  decision: 'NEED_IT' | 'HAVE_IT' | 'NOT_SURE';
}

export interface ShoppingList {
  planId: PlanId;
  items: ShoppingItem[];
  quickReviewCandidates: QuickReviewCandidate[];
}
```

**Referenced by:**

- Shop S1 (Shop UI Layout - renders `ShoppingList`)
- Shop S2 (Ingredient Expansion - creates `ShoppingItem[]`)
- Shop S3 (Item Grouping - assigns `shoppingCategory`)
- Shop S4 (Quick Review - creates `QuickReviewCandidate[]`, filters by `criticality`)
- Shop S5 (Export - formats `ShoppingItem[]`)
- Shop S8 (Missing Items - reads `ShoppingItem.criticality`)

---

## 5. Missing Items & Substitutions

Post-shop annotations consumed by Today.

```typescript
export type MissingReason = 'OUT_OF_STOCK' | 'SUBBED' | 'USER_MARKED';

export interface MissingItem {
  id: string;
  planId: PlanId;
  shoppingItemId: ShoppingItemId;
  ingredientId: string;
  ingredientName: string;
  reason: MissingReason;
  affectsTonight: boolean;
  affectsFuture: boolean;
  note?: string;
}

export interface Substitution {
  shoppingItemId: ShoppingItemId;
  planId: PlanId;
  substituteName: string;
  substituteIngredientId?: string;
  note?: string;
}
``` text

**Referenced by:**

- Shop S8 (Missing Items Flow - creates `MissingItem[]`, `Substitution[]`)
- Today T4 (Missed Preflight/Missing Items - reads `MissingItem[]`)

---

## 6. TonightState (for Today)

Single object that Today binds to for rendering.

```typescript
export interface TonightPlanContext {
  date: IsoDate;
  dayOfWeek: DayOfWeek;
  dinner?: PlannedDinner;
  recipe?: Recipe;
}

export interface TonightIssues {
  preflightStatus: PreflightStatus;
  missingCoreIngredients: { ingredientId: string; displayName: string }[];
  missingNonCriticalIngredients: { ingredientId: string; displayName: string }[];
}

export interface TonightActions {
  canStartCooking: boolean;
  canUseEasierOption: boolean;
  canMarkOutEating: boolean;
  canChangeDinner: boolean;
}

export interface TomorrowPreview {
  date: IsoDate;
  dayOfWeek: DayOfWeek;
  dinnerPlanned: boolean;
  recipeName?: string;
  timeBand?: TimeBand;
  keyPreflightNote?: string;
}

export interface TonightState {
  planId: PlanId;
  householdId: HouseholdId;
  status: TonightStatus;
  primaryMessage: string;
  secondaryMessage?: string;
  context: TonightPlanContext;
  issues: TonightIssues;
  actions: TonightActions;
  tomorrowPreview?: TomorrowPreview;
}
``` text

**Examples:**

**READY:**

- `status: 'READY'`
- `issues.preflightStatus = 'ALL_GOOD'`
- `issues.missingCoreIngredients = []`
- `actions.canStartCooking = true`

**MISSED_PREFLIGHT:**

- `status: 'MISSED_PREFLIGHT'`
- `issues.preflightStatus = 'MISSED'`
- `primaryMessage: "Looks like we didn't get the chicken thawed in time."`
- `actions.canUseEasierOption = true`
- `actions.canChangeDinner = true`

**MISSING_INGREDIENT:**

- `status: 'MISSING_INGREDIENT'`
- `issues.missingCoreIngredients` non-empty (from `MissingItem` + `criticality`)
- Options: swap tonight / move dinner / safe fallback

**OUT_EATING:**

- `status: 'OUT_EATING'`
- `primaryMessage: "You're marked as eating out tonight."`
- `actions.canStartCooking = false`

**Referenced by:**

- Today T1 (View Skeleton - renders based on `TonightState`)
- Today T2 (Preflight State Engine - computes `TonightState`)
- Today T3 (Start Cooking - checks `actions.canStartCooking`)
- Today T4 (Missed Preflight - triggered by `status: 'MISSED_PREFLIGHT'`)
- Today T5 (Too Much → Easier - uses `actions.canUseEasierOption`)
- Today T6 (Eating Out - sets `status: 'OUT_EATING'`)

---

## 7. How It All Ties Together

### **Planner:**

- Reads `HouseholdProfile`, `Recipe` catalog
- Writes `Plan` (with `PlanDay[]`, `PlannedDinner`)
- Updates `Plan.status` from `DRAFT` → `PLANNED` → `SHOPPED` when Shop export happens

### **Shop:**

- Reads `Plan` + `Recipe.ingredients`
- Builds `ShoppingList` (`ShoppingItem[]`, `QuickReviewCandidate[]`)
- User actions create/update:
  - `ShoppingItem.checked` / `manualOverrideAmount`
  - `MissingItem[]`
  - `Substitution[]`

### **Today:**

- Reads `Plan`, `Recipe[]`, `MissingItem[]`, `Substitution[]`
- Computes `TonightState` via:
  - Preflight requirement vs current time → `PreflightStatus`
  - Missing items + `IngredientCriticality` → `TonightIssues`
  - Dinners marked `outEating` → `TonightStatus = 'OUT_EATING'`
- UI binds directly to `TonightState`

### **Cooking:**

- Reads `Recipe.steps[]`
- Renders step-by-step UI
- Handles timers via `step.timerMinutes`

---

## 8. Implementation Notes

### **For Sprint 1 (Data Layer):**

- Implement `Recipe`, `RecipeIngredientRequirement`, `RecipePreflightRequirement` first
- Mock recipe catalog with 5–10 hardcoded recipes
- Implement `Plan`, `PlanDay`, `PlannedDinner` for Planner P1, P2
- Implement `ShoppingItem` builder for Shop S2

### **For Sprint 2 (Enrichment):**

- Implement `QuickReviewCandidate` filtering logic (Shop S4)
- Implement `TonightState` computation (Today T2)
- Wire `MissingItem` annotations (Shop S8)

### **Storage Considerations:**

- `Recipe` catalog: Static JSON or DB table (read-only in v1)
- `Plan`: DB table with JSON column for `days[]` or normalized PlanDay table
- `ShoppingList`: Computed on-demand from `Plan` + `Recipe` (no storage in v1)
- `MissingItem`, `Substitution`: DB tables linked to `ShoppingItem.id`
- `TonightState`: Computed on-demand (no storage)

### **Validation Rules:**

- `Plan.days.length` must always equal 7
- `PlannedDinner.servings` must be > 0
- `ShoppingItem.totalAmount` must be > 0
- `RecipeIngredientRequirement.criticality` required for all ingredients (Shop S7)
- `Recipe.metadata.timeBand` required for all recipes (Vision §8)

---

## 9. Invariants & "Never Do This" Rules

**System Invariants (Must Always Be True):**

1. **`Plan.days` is always length 7** (Mon–Sun), even if some `dinner` slots are undefined.
   - **Why:** UI depends on consistent 7-day grid. Empty days just have `dinner: undefined`.
   - **Enforced by:** Planner P1, P2

1. **`Plan.status = 'SHOPPED'` must not change silently.**
   - **Why:** Plan Stability contract (Vision §7.X). Once shopped, changes require explicit user action.
   - **Enforced by:** Shop S6, Planner P7

1. **Every `ShoppingItem` is tied to exactly one `planId`.**
   - **Why:** Shopping lists don't span multiple weeks. New week = new shopping list.
   - **Enforced by:** Shop S2

1. **`MissingItem` and `Substitution` always reference an existing `ShoppingItemId`.**
   - **Why:** Can't mark something missing if it wasn't on the list.
   - **Enforced by:** Shop S8

1. **`TonightState` is derived, never persisted as source of truth.**
   - **Why:** `TonightState` is computed from `Plan` + `Recipe` + `MissingItem[]` + current time. Storing it would create sync issues.
   - **Enforced by:** Today T2

1. **`PlannedDinner.locked = true` prevents automatic swap/regeneration.**
   - **Why:** User explicitly locked this dinner (Planner P4). System respects that.
   - **Enforced by:** Planner P2, P3, P4

1. **`IngredientCriticality` must be set for all ingredients used in Quick Review or missing-item logic.**
   - **Why:** Safety – can't accidentally suggest removing chicken in Quick Review.
   - **Enforced by:** Shop S7, S4, S8

**"Never Do This" Rules:**

- ❌ Never auto-remove critical ingredients in Quick Review (Shop S4)
- ❌ Never silently regenerate a plan after `status = 'SHOPPED'` (Planner P7)
- ❌ Never treat a missing critical ingredient as "all good" (Today T2, T4)
- ❌ Never assume preflight was done without explicit confirmation (Today T2)
- ❌ Never modify `Recipe` data based on user edits (recipes are immutable catalog)
- ❌ Never persist `TonightState` – always compute on-demand
- ❌ Never show escape hatches (swap/easier option) without offering concrete alternatives

---

## 10. Ownership & Layer Boundaries

**Who Owns What:**

```text
┌───────────────────────────────────────────────────┐
│ CATALOG (Read-Only)                              │
│ Owns: Recipe, RecipeIngredientRequirement,       │
│       RecipePreflightRequirement,                 │
│       RecipeMetadata, ingredient taxonomy         │
│ Mutated by: Manual curation / recipe team        │
│ Consumed by: Planner, Shop, Today, Cooking       │
└───────────────────────────────────────────────────┘
         ↓
┌───────────────────────────────────────────────────┐
│ PLANNER (Source of Truth for Plan)              │
│ Owns: Plan, PlanDay, PlannedDinner, Plan.status │
│ Mutated by: P1–P9 (Generate, Swap, Lock, etc.)   │
│ Consumed by: Shop, Today                         │
└───────────────────────────────────────────────────┘
         ↓
┌───────────────────────────────────────────────────┐
│ SHOP (Source of Truth for Shopping State)       │
│ Owns: ShoppingList, ShoppingItem,                │
│       QuickReviewCandidate, MissingItem,         │
│       Substitution                               │
│ Mutated by: S1–S9 (Expansion, Quick Review,      │
│             Missing Items, Export)                │
│ Consumed by: Today (MissingItem[])               │
└───────────────────────────────────────────────────┘
         ↓
┌───────────────────────────────────────────────────┐
│ TODAY (Derived State Only, No Persistence)      │
│ Owns: TonightState (computed on-demand)          │
│ Reads: Plan, Recipe, MissingItem[], Substitution │
│ Computes: Preflight status, missing core         │
│           ingredients, available actions         │
│ Mutated by: NEVER – always recomputed (T2)       │
└───────────────────────────────────────────────────┘
         ↓
┌───────────────────────────────────────────────────┐
│ COOKING (Pure Consumer)                          │
│ Owns: Nothing – reads Recipe.steps[]             │
│ Reads: Recipe, TonightState                      │
│ Mutated by: NEVER – cooking doesn't change data  │
└───────────────────────────────────────────────────┘
``` text

**Key Boundary Rules:**

- ❌ **Planner never directly writes to ShoppingItem** – Shop derives list from Plan
- ❌ **Today never writes to Plan** – Today triggers Planner actions (via swap/move flows)
- ❌ **Shop never regenerates Plan** – Shop only reads Plan and writes MissingItem/Substitution
- ❌ **Cooking never writes anywhere** – purely a read-only consumer
- ✅ **Shop can trigger Planner updates** – via "Done Shopping" setting `Plan.status = 'SHOPPED'` (S6)
- ✅ **Today can trigger Planner updates** – via swap/move flows (T4, T5, T6, T7 call Planner P3)

---

## 11. Sample Instances

### Example 1: Minimal Plan (2 Dinners)

```typescript
const examplePlan: Plan = {
  id: 'plan_2025w50',
  householdId: 'hh_family_jones',
  weekStartDate: '2025-12-08', // Monday
  status: 'PLANNED',
  days: [
    {
      date: '2025-12-08',
      dayOfWeek: 'Mon',
      dinner: {
        recipeId: 'recipe_tacos',
        servings: 4,
        locked: false,
        outEating: false,
        preflightStatus: 'NONE_REQUIRED',
      },
    },
    {
      date: '2025-12-09',
      dayOfWeek: 'Tue',
      dinner: undefined, // no dinner planned
    },
    {
      date: '2025-12-10',
      dayOfWeek: 'Wed',
      dinner: {
        recipeId: 'recipe_chicken_sheet_pan',
        servings: 4,
        locked: false,
        outEating: false,
        preflightStatus: 'ALL_GOOD', // thawed yesterday
      },
    },
    {
      date: '2025-12-11',
      dayOfWeek: 'Thu',
      dinner: undefined,
    },
    {
      date: '2025-12-12',
      dayOfWeek: 'Fri',
      dinner: undefined,
    },
    {
      date: '2025-12-13',
      dayOfWeek: 'Sat',
      dinner: undefined,
    },
    {
      date: '2025-12-14',
      dayOfWeek: 'Sun',
      dinner: undefined,
    },
  ],
  summary: {
    totalDinners: 2,
    fastCount: 1,
    normalCount: 1,
    projectCount: 0,
    thawDays: 1,
    marinateDays: 0,
  },
};
``` text

### Example 2: ShoppingList (Derived from Plan)

```typescript
const exampleShoppingList: ShoppingList = {
  planId: 'plan_2025w50',
  items: [
    {
      id: 'si_001',
      planId: 'plan_2025w50',
      ingredientId: 'ing_chicken_breast',
      displayName: 'Boneless chicken breast',
      shoppingCategory: 'MEAT_SEAFOOD',
      totalAmount: 1.5,
      unit: 'LB',
      usedIn: [
        {
          recipeId: 'recipe_chicken_sheet_pan',
          recipeName: 'Sheet-Pan Chicken & Veg',
          amountPortion: 1.5,
        },
      ],
      checked: false,
      criticality: 'CRITICAL',
    },
    {
      id: 'si_002',
      planId: 'plan_2025w50',
      ingredientId: 'ing_onion_yellow',
      displayName: 'Yellow onion',
      shoppingCategory: 'PRODUCE',
      totalAmount: 2,
      unit: 'UNIT',
      usedIn: [
        {
          recipeId: 'recipe_tacos',
          recipeName: 'Tacos',
          amountPortion: 1,
        },
        {
          recipeId: 'recipe_chicken_sheet_pan',
          recipeName: 'Sheet-Pan Chicken & Veg',
          amountPortion: 1,
        },
      ],
      checked: false,
      criticality: 'CRITICAL',
    },
    {
      id: 'si_003',
      planId: 'plan_2025w50',
      ingredientId: 'ing_olive_oil',
      displayName: 'Olive oil',
      shoppingCategory: 'PANTRY_DRY',
      totalAmount: 2,
      unit: 'TBSP',
      usedIn: [
        {
          recipeId: 'recipe_chicken_sheet_pan',
          recipeName: 'Sheet-Pan Chicken & Veg',
        },
      ],
      checked: false,
      criticality: 'NON_CRITICAL', // pantry staple
    },
  ],
  quickReviewCandidates: [
    {
      shoppingItemId: 'si_003',
      reason: 'PANTRY_STAPLE',
      decision: 'NEED_IT', // default
    },
  ],
};
``` text

### Example 3: TonightState (READY)

```typescript
const tonightReady: TonightState = {
  planId: 'plan_2025w50',
  householdId: 'hh_family_jones',
  status: 'READY',
  primaryMessage: "You're all set for tonight.",
  context: {
    date: '2025-12-08',
    dayOfWeek: 'Mon',
    dinner: {
      recipeId: 'recipe_tacos',
      servings: 4,
      locked: false,
      outEating: false,
      preflightStatus: 'NONE_REQUIRED',
    },
    recipe: {
      id: 'recipe_tacos',
      name: 'Tacos',
      slug: 'tacos',
      metadata: {
        timeBand: 'FAST',
        estimatedMinutes: 25,
      },
      ingredients: [/* ... */],
      preflight: [],
      steps: [/* ... */],
    },
  },
  issues: {
    preflightStatus: 'NONE_REQUIRED',
    missingCoreIngredients: [],
    missingNonCriticalIngredients: [],
  },
  actions: {
    canStartCooking: true,
    canUseEasierOption: true,
    canMarkOutEating: true,
    canChangeDinner: true,
  },
};
``` text

### Example 4: TonightState (MISSED_PREFLIGHT)

```typescript
const tonightMissedPreflight: TonightState = {
  planId: 'plan_2025w50',
  householdId: 'hh_family_jones',
  status: 'MISSED_PREFLIGHT',
  primaryMessage: "It looks like we didn't get the chicken thawed in time.",
  secondaryMessage: "No worries — here are a few options.",
  context: {
    date: '2025-12-10',
    dayOfWeek: 'Wed',
    dinner: {
      recipeId: 'recipe_chicken_sheet_pan',
      servings: 4,
      locked: false,
      outEating: false,
      preflightStatus: 'MISSED',
    },
    recipe: {
      id: 'recipe_chicken_sheet_pan',
      name: 'Sheet-Pan Chicken & Veg',
      slug: 'sheet-pan-chicken-veg',
      metadata: {
        timeBand: 'NORMAL',
        estimatedMinutes: 40,
      },
      ingredients: [/* ... */],
      preflight: [
        {
          type: 'THAW',
          description: 'Thaw chicken overnight in fridge',
          hoursBeforeCook: 12,
        },
      ],
      steps: [/* ... */],
    },
  },
  issues: {
    preflightStatus: 'MISSED',
    missingCoreIngredients: [],
    missingNonCriticalIngredients: [],
  },
  actions: {
    canStartCooking: false,
    canUseEasierOption: true,
    canMarkOutEating: true,
    canChangeDinner: true,
  },
};
``` text

### Example 5: TonightState (MISSING_INGREDIENT)

```typescript
const tonightMissingIngredient: TonightState = {
  planId: 'plan_2025w50',
  householdId: 'hh_family_jones',
  status: 'MISSING_INGREDIENT',
  primaryMessage: "Looks like we don't have chicken for tonight.",
  secondaryMessage: "Let's find a backup recipe.",
  context: {
    date: '2025-12-10',
    dayOfWeek: 'Wed',
    dinner: {
      recipeId: 'recipe_chicken_sheet_pan',
      servings: 4,
      locked: false,
      outEating: false,
      preflightStatus: 'ALL_GOOD',
    },
    recipe: {
      id: 'recipe_chicken_sheet_pan',
      name: 'Sheet-Pan Chicken & Veg',
      slug: 'sheet-pan-chicken-veg',
      metadata: {
        timeBand: 'NORMAL',
        estimatedMinutes: 40,
      },
      ingredients: [/* ... */],
      preflight: [],
      steps: [/* ... */],
    },
  },
  issues: {
    preflightStatus: 'ALL_GOOD',
    missingCoreIngredients: [
      {
        ingredientId: 'ing_chicken_breast',
        displayName: 'Boneless chicken breast',
      },
    ],
    missingNonCriticalIngredients: [],
  },
  actions: {
    canStartCooking: false,
    canUseEasierOption: true,
    canMarkOutEating: true,
    canChangeDinner: true,
  },
};
``` text

---

## 12. Domain Helpers API (Contracts for Implementation)

These function signatures define the **domain service layer** between UI and data model. Implementation is deferred, but tickets reference these contracts.

### **Planner Domain Helpers**

```typescript
/**

* Generate a new weekly plan for a household.

* Referenced by: Planner P2
 */
function buildPlan(
  household: HouseholdProfile,
  weekStart: IsoDate,
  recipes: Recipe[]
): Plan;

/**

* Regenerate dinners in a plan while respecting locked dinners.

* Referenced by: Planner P2, P4
 */
function regeneratePlan(
  existingPlan: Plan,
  recipes: Recipe[],
  household: HouseholdProfile
): Plan;

/**

* Swap a specific dinner with a new recipe.

* Referenced by: Planner P3, Today T4, T5, T7
 */
function swapDinner(
  plan: Plan,
  date: IsoDate,
  newRecipeId: RecipeId,
  recipes: Recipe[]
): Plan;

/**

* Lock or unlock a dinner to prevent/allow automatic regeneration.

* Referenced by: Planner P4
 */
function toggleDinnerLock(
  plan: Plan,
  date: IsoDate,
  locked: boolean
): Plan;

/**

* Move a dinner from one day to another.

* Referenced by: Planner P8, Today T4, T6
 */
function moveDinner(
  plan: Plan,
  fromDate: IsoDate,
  toDate: IsoDate
): Plan;

/**

* Delete a dinner from the plan.

* Referenced by: Planner P8, Today T6
 */
function deleteDinner(
  plan: Plan,
  date: IsoDate
): Plan;
``` text

### **Shop Domain Helpers**

```typescript
/**

* Build shopping list from plan + recipes.

* Referenced by: Shop S2, S3
 */
function buildShoppingList(
  plan: Plan,
  recipes: Recipe[],
  household: HouseholdProfile
): ShoppingList;

/**

* Generate Quick Review candidates (pantry staples only).

* Referenced by: Shop S4
 */
function generateQuickReviewCandidates(
  shoppingList: ShoppingList
): QuickReviewCandidate[];

/**

* Mark items as missing post-shopping.

* Referenced by: Shop S8
 */
function markItemMissing(
  shoppingItemId: ShoppingItemId,
  reason: MissingReason,
  note?: string
): MissingItem;

/**

* Mark items as substituted post-shopping.

* Referenced by: Shop S8
 */
function markItemSubstituted(
  shoppingItemId: ShoppingItemId,
  substituteName: string,
  note?: string
): Substitution;
``` text

### **Today Domain Helpers**

```typescript
/**

* Compute Tonight's full state from all data sources.

* Referenced by: Today T1, T2
 */
function computeTonightState(
  plan: Plan,
  recipes: Recipe[],
  missingItems: MissingItem[],
  substitutions: Substitution[],
  today: IsoDate,
  currentTime: Date
): TonightState;

/**

* Check preflight status for a specific dinner.

* Referenced by: Today T2, Planner P5
 */
function checkPreflightStatus(
  dinner: PlannedDinner,
  recipe: Recipe,
  targetDate: IsoDate,
  currentTime: Date
): PreflightStatus;

/**

* Get recipes that can replace tonight's dinner (for missed preflight or missing ingredient).

* Referenced by: Today T4, T5, T7
 */
function getEasierAlternatives(
  targetTimeBand: TimeBand,
  excludedIngredients: string[], // missing or problematic ingredients
  recipes: Recipe[],
  household: HouseholdProfile
): Recipe[];
``` text

### **Cooking Domain Helpers**

```typescript
/**

* Get recipe with steps for cooking.

* Referenced by: Cooking C1
 */
function getRecipeForCooking(
  recipeId: RecipeId,
  recipes: Recipe[]
): Recipe | null;
``` text

### **Helper Implementation Notes**

- All helpers are **pure functions** (no side effects)
- All helpers return **new objects** (no mutations)
- Planner helpers always return a new `Plan` (never mutate in-place)
- Shop helpers always return new `ShoppingList` or annotation objects
- Today helpers always return computed `TonightState` (never store it)
- UI layer calls these helpers, then persists results as needed

**Example Usage Pattern:**

```typescript
// Planner P2: Generate Plan
const newPlan = buildPlan(household, '2025-12-08', recipesCatalog);
await savePlan(newPlan); // persistence layer

// Shop S2: Build Shopping List
const shoppingList = buildShoppingList(currentPlan, recipesCatalog, household);
renderShoppingList(shoppingList); // UI layer (no persistence for v1)

// Today T2: Compute Tonight State
const tonightState = computeTonightState(
  currentPlan,
  recipesCatalog,
  missingItems,
  substitutions,
  '2025-12-08',
  new Date()
);
renderTodayView(tonightState); // UI layer
``` text

---

## 13. Complete Type Index

All types defined in this data model, cross-referenced to specs and tickets.

| Type | Defined in | Spec Reference | Tickets |
| --- | --- | --- | --- |
| `PlanId`, `HouseholdId`, `RecipeId`, `ShoppingItemId`, `IsoDate` | §0 | Core Primitives | All |
| `DayOfWeek`, `TimeBand`, `IngredientCriticality`, `IngredientKind`, `ShoppingCategory`, `PreflightRequirementType`, `PreflightStatus`, `TonightStatus`, `DietConstraint` | §0 | Core Enums | All |
| `HouseholdMode` | §1 | Vision §5.2 | P1, P2, P6 |
| `HouseholdProfile` | §1 | Vision §5.2 | P2, P6 |
| `RecipeIngredientRequirement` | §2 | Shop S3, S7 | P2, S2, S3, S7 |
| `RecipePreflightRequirement` | §2 | Today T2 | T2, C1, C2 |
| `RecipeMetadata` | §2 | Vision §8 | P2, C1, C2 |
| `RecipeStep` | §2 | Cooking C1 | C1, C2, C3, C4 |
| `Recipe` | §2 | Vision §8 + Spec-Cooking | P2, S2, S3, S7, T2, C1, C2 |
| `PlannedDinner` | §3 | Planner P3, P4 | P3, P4, T2, T6 |
| `PlanDay` | §3 | Planner P1 | P1, P2, P3, P4, P8 |
| `PlanStatus` | §3 | Planner P7 | P7, S6 |
| `Plan` | §3 | Planner P1, P7 | P1, P2, P3, P4, P5, P7, P8, S2, S6, T1, T2 |
| `ShoppingItemSourceUsage` | §4 | Shop S2 | S2, S3 |
| `ShoppingItem` | §4 | Shop S1–S8 | S1, S2, S3, S4, S5, S8 |
| `QuickReviewCandidate` | §4 | Shop S4 | S4, S5 |
| `ShoppingList` | §4 | Shop S1 | S1, S2, S3, S4, S5 |
| `MissingReason` | §5 | Shop S8 | S8, T4 |
| `MissingItem` | §5 | Shop S8 | S8, T4 |
| `Substitution` | §5 | Shop S8 | S8, T4 |
| `TonightPlanContext` | §6 | Today T1 | T1, T2 |
| `TonightIssues` | §6 | Today T2, T4 | T2, T4 |
| `TonightActions` | §6 | Today T3, T5, T6 | T3, T5, T6 |
| `TomorrowPreview` | §6 | Today T8 | T8 |
| `TonightState` | §6 | Today T1, T2 | T1, T2, T3, T4, T5, T6, T8 |

---

## 14. Cross-Reference to Tickets

| Data Structure | Tickets That Use It |
| --- | --- |
| `HouseholdProfile` | P2, P6 |
| `Recipe` | P2, S2, S3, S7, T2, C1, C2 |
| `Plan` | P1, P2, P3, P4, P5, P7, P8, S2, S6, T1, T2 |
| `PlannedDinner` | P3, P4, T2, T6 |
| `ShoppingItem` | S1, S2, S3, S4, S5, S8 |
| `QuickReviewCandidate` | S4 |
| `MissingItem` | S8, T4 |
| `TonightState` | T1, T2, T3, T4, T5, T6, T8 |

---

## Version History

- **v1.1.0** (2025-12-07): Added hardening - Invariants, Ownership diagram, Sample instances, Domain helpers API
- **v1.0.0** (2025-12-07): Initial data model for v1 implementation. Covers all 31 tickets (P1-P9, T1-T9, S1-S9, C1-C4).
