// Spec: spec-planner.md v1.0.0, vision.md v4.6.0 §5.2, §7
// src/domain/planner.ts

import {
  Plan,
  PlanId,
  PlanDay,
  PlannedDinner,
  HouseholdProfile,
  Recipe,
  RecipeTag,
  IsoDate,
  DayOfWeek,
  TimeBand,
  RecipeRejection,
  RecipeRejectionReason,
  Allergen,
} from './types';
import { detectPreflightStatus } from './preflight';

// ============================================================================
// Week Shape Defaults (from vision.md §5.2)
// ============================================================================

const WEEK_SHAPE_DEFAULTS: Record<HouseholdProfile['mode'], { dinners: number; timeBandMix: Record<TimeBand, number> }> = {
  FAMILY: {
    dinners: 5,
    timeBandMix: { FAST: 3, NORMAL: 2, PROJECT: 0 },
  },
  SOLO: {
    dinners: 3,
    timeBandMix: { FAST: 2, NORMAL: 1, PROJECT: 0 },
  },
  DINK: {
    dinners: 4,
    timeBandMix: { FAST: 2, NORMAL: 2, PROJECT: 0 },
  },
  EMPTY_NEST: {
    dinners: 3,
    timeBandMix: { FAST: 1, NORMAL: 1, PROJECT: 1 },
  },
  LARGE: {
    dinners: 4,
    timeBandMix: { FAST: 2, NORMAL: 1, PROJECT: 1 },
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

function generatePlanId(): PlanId {
  return `plan_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function getWeekDays(startDate: IsoDate): { date: IsoDate; dayOfWeek: DayOfWeek }[] {
  const days: { date: IsoDate; dayOfWeek: DayOfWeek }[] = [];
  const dayNames: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const start = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    days.push({
      date: current.toISOString().split('T')[0] as IsoDate,
      dayOfWeek: dayNames[i],
    });
  }
  
  return days;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function filterRecipesByConstraints(
  recipes: Recipe[],
  household: HouseholdProfile,
  recentRecipeIds: Set<string> = new Set(),
  rejections?: RecipeRejection[], // v1.3.1: Optional tracking of rejections
): Recipe[] {
  return recipes.filter(recipe => {
    const addRejection = (reason: RecipeRejectionReason, details?: string) => {
      if (rejections) {
        const rejection: RecipeRejection = { recipeId: recipe.id, reason };
        if (details !== undefined) {
          rejection.details = details;
        }
        rejections.push(rejection);
      }
      return false;
    };

    // Skip recently used recipes (repeat guard)
    if (recentRecipeIds.has(recipe.id)) {
      return addRejection('RECENTLY_USED', 'Used in previous 3 dinners');
    }
    
    // v1.3.1: Check equipment constraints
    if (household.availableEquipment && household.availableEquipment.length > 0 && recipe.metadata.equipmentTags) {
      const missingEquipment = recipe.metadata.equipmentTags.filter(
        tag => !household.availableEquipment!.includes(tag)
      );
      if (missingEquipment.length > 0) {
        return addRejection('EQUIPMENT_NOT_AVAILABLE', `Missing: ${missingEquipment.join(', ')}`);
      }
    }
    
    // Apply dietary constraints
    for (const constraint of household.dietConstraints) {
      switch (constraint) {
        case 'NO_PORK':
          // Check ingredients for pork-related items
          if (recipe.ingredients.some(ing => 
            /pork|bacon|ham|sausage/i.test(ing.displayName)
          )) return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains pork (${constraint})`);
          break;
        
        case 'NO_BEEF':
          // Check ingredients for beef-related items
          if (recipe.ingredients.some(ing => 
            /beef|steak|ground beef|chuck/i.test(ing.displayName)
          )) return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains beef (${constraint})`);
          break;
        
        case 'NO_SHELLFISH':
          {
            // Prefer explicit allergen tagging; fall back to name heuristics for legacy data
            const hasShellfishAllergen =
              recipe.recipeAllergens?.includes('SHELLFISH') ||
              recipe.ingredients.some(ing => ing.allergens?.includes('SHELLFISH'));
            const nameSuggestsShellfish = recipe.ingredients.some(ing =>
              /shrimp|crab|lobster|clam|mussel|oyster|scallop/i.test(ing.displayName)
            );
            if (hasShellfishAllergen || nameSuggestsShellfish) {
              return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains shellfish (${constraint})`);
            }
          }
          break;
        
        case 'NO_PEANUT':
          {
            const hasPeanutAllergen =
              recipe.recipeAllergens?.includes('PEANUT') ||
              recipe.ingredients.some(ing => ing.allergens?.includes('PEANUT'));
            const nameSuggestsPeanut = recipe.ingredients.some(ing =>
              /peanut|peanut butter/i.test(ing.displayName)
            );
            if (hasPeanutAllergen || nameSuggestsPeanut) {
              return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains peanut (${constraint})`);
            }
          }
          break;
        
        case 'NO_GLUTEN':
          // Treat tags as hints only; ingredients are ground truth
          {
            const hasGlutenAllergen =
              recipe.recipeAllergens?.includes('WHEAT') ||
              recipe.ingredients.some(ing => ing.allergens?.includes('WHEAT'));
            const hasGlutenIngredient = recipe.ingredients.some(ing =>
              /flour|pasta|bread|soy sauce|wheat|barley|rye/i.test(ing.displayName)
            );
            if (hasGlutenAllergen || hasGlutenIngredient) {
              return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains gluten (${constraint})`);
            }
          }
          break;
        
        case 'NO_DAIRY':
          // Treat tags as hints only; ingredients are ground truth
          {
            const hasDairyAllergen =
              recipe.recipeAllergens?.includes('DAIRY') ||
              recipe.ingredients.some(ing => ing.allergens?.includes('DAIRY'));
            const hasDairyIngredient = recipe.ingredients.some(ing =>
              ing.kind === 'DAIRY' || /milk|cheese|cream|butter|yogurt/i.test(ing.displayName)
            );
            if (hasDairyAllergen || hasDairyIngredient) {
              return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains dairy (${constraint})`);
            }
          }
          break;
        
        case 'VEGETARIAN':
          // No meat/seafood ingredients
          if (recipe.ingredients.some(ing => 
            ing.kind === 'PROTEIN' && 
            /chicken|beef|pork|fish|shrimp|meat|turkey|lamb/i.test(ing.displayName)
          )) {
            return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains meat (${constraint})`);
          }
          break;
        
        case 'VEGAN':
          // No animal products at all
          if (recipe.ingredients.some(ing => 
            ing.kind === 'PROTEIN' && /chicken|beef|pork|fish|shrimp|meat|turkey|lamb/i.test(ing.displayName) ||
            ing.kind === 'DAIRY' ||
            /egg|honey|milk|cheese|cream|butter|yogurt/i.test(ing.displayName)
          )) {
            return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains animal products (${constraint})`);
          }
          break;
        
        case 'KETO':
          // Low-carb: avoid high-carb ingredients (rice, pasta, bread, potatoes, sugar)
          // Focus on protein and low-carb vegetables
          const hasHighCarbIngredient = recipe.ingredients.some(ing =>
            ing.kind === 'CARB' ||
            /rice|pasta|bread|potato|tortilla|noodle|flour|sugar|honey|corn|beans|lentils/i.test(ing.displayName)
          );
          if (hasHighCarbIngredient) {
            return addRejection('DIET_CONSTRAINT_VIOLATED', `Too many carbs (${constraint})`);
          }
          break;
        
        case 'CARNIVORE':
          // Meat-only: primarily protein with minimal plant ingredients
          // Allow eggs, dairy (animal products), salt, and basic fats
          // Exclude vegetables, grains, legumes
          const hasPlantIngredient = recipe.ingredients.some(ing =>
            ing.kind === 'VEG' ||
            ing.kind === 'CARB' ||
            /vegetable|lettuce|tomato|onion|garlic|pepper|broccoli|carrot|fruit|beans|lentils|rice|pasta|bread/i.test(ing.displayName)
          );
          if (hasPlantIngredient) {
            return addRejection('DIET_CONSTRAINT_VIOLATED', `Contains plant ingredients (${constraint})`);
          }
          break;
      }
    }
    
    return true;
  });
}

function selectRecipesByTimeBand(
  recipes: Recipe[],
  timeBandMix: Record<TimeBand, number>,
): Recipe[] {
  const selected: Recipe[] = [];
  const recipesByBand: Record<TimeBand, Recipe[]> = {
    FAST: recipes.filter(r => r.metadata.timeBand === 'FAST'),
    NORMAL: recipes.filter(r => r.metadata.timeBand === 'NORMAL'),
    PROJECT: recipes.filter(r => r.metadata.timeBand === 'PROJECT'),
  };
  
  // Shuffle each band for variety
  Object.keys(recipesByBand).forEach(band => {
    recipesByBand[band as TimeBand] = shuffleArray(recipesByBand[band as TimeBand]);
  });
  
  // Select recipes according to time band mix
  for (const [band, count] of Object.entries(timeBandMix)) {
    const available = recipesByBand[band as TimeBand];
    selected.push(...available.slice(0, count));
  }
  
  return selected;
}

function distributeRecipesToDays(
  recipes: Recipe[],
  weekDays: { date: IsoDate; dayOfWeek: DayOfWeek }[],
  targetDinners: number,
  servings: number = 4,
): PlanDay[] {
  const shuffledRecipes = shuffleArray(recipes);
  const days: PlanDay[] = [];
  
  // Prefer weeknight (Mon-Thu) for FAST recipes, weekend for PROJECT
  const weeknights = weekDays.slice(0, 4); // Mon-Thu
  const weekends = weekDays.slice(5, 7); // Sat-Sun
  
  const fastRecipes = shuffledRecipes.filter(r => r.metadata.timeBand === 'FAST');
  const normalRecipes = shuffledRecipes.filter(r => r.metadata.timeBand === 'NORMAL');
  const projectRecipes = shuffledRecipes.filter(r => r.metadata.timeBand === 'PROJECT');
  
  let assignedCount = 0;
  
  // Helper to create dinner with preflight detection
  // Uses the passed servings parameter (plan-time override)
  const createDinner = (recipe: Recipe, date: IsoDate): PlannedDinner => ({
    recipeId: recipe.id,
    servings,
    locked: false,
    outEating: false,
    preflightStatus: detectPreflightStatus(recipe, date),
  });
  
  // Assign PROJECT recipes to weekend first
  for (const day of weekends) {
    if (assignedCount >= targetDinners) break;
    if (projectRecipes.length > 0) {
      const recipe = projectRecipes.shift()!;
      days.push({
        date: day.date,
        dayOfWeek: day.dayOfWeek,
        dinner: createDinner(recipe, day.date),
      });
      assignedCount++;
    }
  }
  
  // Assign FAST recipes to weeknights
  for (const day of weeknights) {
    if (assignedCount >= targetDinners) break;
    if (fastRecipes.length > 0) {
      const recipe = fastRecipes.shift()!;
      days.push({
        date: day.date,
        dayOfWeek: day.dayOfWeek,
        dinner: createDinner(recipe, day.date),
      });
      assignedCount++;
    }
  }
  
  // Fill remaining with NORMAL and any remaining recipes
  const remainingDays = weekDays.filter(d => !days.find(pd => pd.date === d.date));
  const remainingRecipes = [...normalRecipes, ...fastRecipes, ...projectRecipes];
  
  for (const day of remainingDays) {
    if (assignedCount >= targetDinners) {
      // Empty day (leftovers/out)
      days.push({
        date: day.date,
        dayOfWeek: day.dayOfWeek,
      });
    } else if (remainingRecipes.length > 0) {
      const recipe = remainingRecipes.shift()!;
      days.push({
        date: day.date,
        dayOfWeek: day.dayOfWeek,
        dinner: createDinner(recipe, day.date),
      });
      assignedCount++;
    } else {
      days.push({
        date: day.date,
        dayOfWeek: day.dayOfWeek,
      });
    }
  }
  
  // Sort by date
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

// ============================================================================
// Main Planner Functions
// ============================================================================

/**
 * Generate a new weekly meal plan
 * Spec: spec-planner.md §4.1 (First-Time Weekly Planning)
 * 
 * @param household - Household profile with mode, headcount, preferences
 * @param recipes - Available recipe catalog
 * @param startDate - Monday of the week to plan (ISO date YYYY-MM-DD)
 * @param options - Optional customization (dinners count, recent recipes to avoid)
 * @returns A new Plan with dinners distributed across the week
 */
export function generatePlan(
  household: HouseholdProfile,
  recipes: Recipe[],
  startDate: IsoDate,
  options: {
    targetDinners?: number;
    recentRecipeIds?: string[];
    weekServings?: number;
  } = {},
): Plan {
  // Get week shape defaults for household mode
  const defaults = WEEK_SHAPE_DEFAULTS[household.mode];
  // Priority for target dinners: 1) explicit options.targetDinners; 2) household.targetDinnersPerWeek; 3) defaults by household mode.
  // This ensures household preferences are honored unless a caller specifically overrides via options.
  const targetDinners = options.targetDinners ?? household.targetDinnersPerWeek ?? defaults.dinners;
  const recentRecipeIds = new Set(options.recentRecipeIds ?? []);
  
  // Filter recipes by constraints and recent use
  const eligibleRecipes = filterRecipesByConstraints(recipes, household, recentRecipeIds);
  
  // Select recipes according to time band mix
  const selectedRecipes = selectRecipesByTimeBand(eligibleRecipes, defaults.timeBandMix);
  
  // If we don't have enough recipes, fill with any eligible recipes
  if (selectedRecipes.length < targetDinners) {
    const remaining = eligibleRecipes.filter(r => !selectedRecipes.includes(r));
    selectedRecipes.push(...shuffleArray(remaining).slice(0, targetDinners - selectedRecipes.length));
  }
  
  // Generate week structure
  const weekDays = getWeekDays(startDate);
  
  // Distribute recipes to days
  // Pass weekServings through to set servings in PlannedDinner
  const servings = options.weekServings ?? household.headcount;
  const days = distributeRecipesToDays(selectedRecipes.slice(0, targetDinners), weekDays, targetDinners, servings);  

  // Build summary counts and allergen/tag rollups
  const recipeMap = new Map<string, Recipe>();
  recipes.forEach(r => recipeMap.set(r.id, r));
  let fastCount = 0;
  let normalCount = 0;
  let projectCount = 0;
  let thawDays = 0;
  let marinateDays = 0;
  const allergensPresent = new Set<Allergen>();
  const dietaryTags = new Set<RecipeTag>();

  days.forEach(day => {
    if (!day.dinner) return;
    const r = recipeMap.get(day.dinner.recipeId);
    if (!r) return;
    switch (r.metadata.timeBand) {
      case 'FAST':
        fastCount += 1;
        break;
      case 'NORMAL':
        normalCount += 1;
        break;
      case 'PROJECT':
        projectCount += 1;
        break;
    }
    if (r.preflight?.some(p => (p.type || '').toUpperCase() === 'THAW')) thawDays += 1;
    if (r.preflight?.some(p => (p.type || '').toUpperCase() === 'MARINATE')) marinateDays += 1;
    r.recipeAllergens?.forEach(a => allergensPresent.add(a));
    r.tags?.forEach(t => dietaryTags.add(t));
  });

  return {
    id: generatePlanId(),
    householdId: household.id,
    weekStartDate: startDate,
    status: 'DRAFT' as const,
    servingsThisWeek: servings,
    days,
    summary: {
      totalDinners: days.filter(d => d.dinner).length,
      fastCount,
      normalCount,
      projectCount,
      thawDays,
      marinateDays,
      allergensPresent: Array.from(allergensPresent),
      dietaryTags: Array.from(dietaryTags),
    },
  };
}

/**
 * Swap a recipe in a specific day slot
 * Spec: spec-planner.md §4.2 (Editing an Existing Week - Swap)
 * 
 * @param plan - Current plan
 * @param date - Date of the day to swap
 * @param newRecipeId - ID of the new recipe to assign
 * @param recipes - Optional recipe catalog for preflight recalculation
 * @returns Updated plan with swapped recipe
 */
export function swapRecipe(
  plan: Plan,
  date: IsoDate,
  newRecipeId: string,
  recipes?: Recipe[],
): Plan {
  const updatedDays = plan.days.map(day => {
    if (day.date !== date) return day;
    
    // Don't swap if locked
    if (day.dinner?.locked) {
      console.warn(`Cannot swap locked dinner on ${date}`);
      return day;
    }

    const existingDinner = day.dinner;

    // If there was no dinner, create a new one (fallback servings = 4)
    if (!existingDinner) {
      const baseDinner: PlannedDinner = {
        recipeId: newRecipeId,
        servings: 4,
        locked: false,
        outEating: false,
        preflightStatus: 'NONE_REQUIRED',
      };

      if (!recipes) {
        return {
          ...day,
          dinner: baseDinner,
        };
      }

      const recipe = recipes.find(r => r.id === newRecipeId);
      const preflightStatus = recipe
        ? detectPreflightStatus(recipe, day.date)
        : baseDinner.preflightStatus;

      return {
        ...day,
        dinner: {
          ...baseDinner,
          preflightStatus,
        },
      };
    }

    // Existing dinner: preserve servings/lock/outEating, recompute preflight when possible
    if (!recipes) {
      return {
        ...day,
        dinner: {
          ...existingDinner,
          recipeId: newRecipeId,
        },
      };
    }

    const recipe = recipes.find(r => r.id === newRecipeId);
    const preflightStatus = recipe
      ? detectPreflightStatus(recipe, day.date)
      : existingDinner.preflightStatus;

    return {
      ...day,
      dinner: {
        ...existingDinner,
        recipeId: newRecipeId,
        preflightStatus,
      },
    };
  });
  
  return { ...plan, days: updatedDays };
}

/**
 * Lock or unlock a dinner slot
 * Spec: spec-planner.md §5 (Design Guardrails - Locks are sacred)
 * 
 * @param plan - Current plan
 * @param date - Date of the day to lock/unlock
 * @param locked - True to lock, false to unlock
 * @returns Updated plan with lock state changed
 */
export function toggleLock(
  plan: Plan,
  date: IsoDate,
  locked: boolean,
): Plan {
  const updatedDays = plan.days.map(day => {
    if (day.date !== date || !day.dinner) return day;
    
    return {
      ...day,
      dinner: { ...day.dinner, locked },
    };
  });
  
  return { ...plan, days: updatedDays };
}

/**
 * Remove a dinner from a specific day
 * Spec: spec-planner.md §4.2 (Editing an Existing Week - Delete)
 * 
 * @param plan - Current plan
 * @param date - Date of the day to clear
 * @returns Updated plan with dinner removed
 */
export function removeDinner(
  plan: Plan,
  date: IsoDate,
): Plan {
  const updatedDays = plan.days.map(day => {
    if (day.date !== date) return day;
    
    // Don't remove if locked
    if (day.dinner?.locked) {
      console.warn(`Cannot remove locked dinner on ${date}`);
      return day;
    }
    
    return { date: day.date, dayOfWeek: day.dayOfWeek };
  });
  
  return { ...plan, days: updatedDays };
}

/**
 * Regenerate unlocked portions of a plan
 * Spec: spec-planner.md §4.2 (Plan Stability)
 * 
 * @param plan - Current plan
 * @param recipes - Available recipe catalog
 * @param household - Household profile
 * @param options - Regeneration options
 * @returns Updated plan with unlocked slots regenerated
 */
export function regeneratePlan(
  plan: Plan,
  recipes: Recipe[],
  household: HouseholdProfile,
  options: {
    respectShopped?: boolean; // If true, show warning and be more conservative
    recentRecipeIds?: string[];
  } = {},
): Plan {
  const { respectShopped: _respectShopped = false, recentRecipeIds = [] } = options;
  
  // Collect locked recipe IDs and recent IDs
  const lockedRecipeIds = plan.days
    .filter(day => day.dinner?.locked)
    .map(day => day.dinner!.recipeId);
  
  const allRecentIds = new Set([...recentRecipeIds, ...lockedRecipeIds]);
  
  // Count how many unlocked dinner slots we need to fill
  const unlockedDays = plan.days.filter(day => !day.dinner || !day.dinner.locked);
  const targetDinners = unlockedDays.filter(day => day.dinner).length;
  
  if (targetDinners === 0) {
    // Nothing to regenerate
    return plan;
  }
  
  // Filter recipes
  const eligibleRecipes = filterRecipesByConstraints(recipes, household, allRecentIds);
  
  // Get week shape defaults for time band mix
  const defaults = WEEK_SHAPE_DEFAULTS[household.mode];
  const selectedRecipes = selectRecipesByTimeBand(eligibleRecipes, defaults.timeBandMix);
  
  // Assign to unlocked days
  let recipeIndex = 0;
  const updatedDays = plan.days.map(day => {
    // Keep locked dinners as-is
    if (day.dinner?.locked) return day;
    
    // Keep empty days empty
    if (!day.dinner) return day;
    
    // Replace unlocked dinner with new recipe
    if (recipeIndex < selectedRecipes.length) {
      const recipe = selectedRecipes[recipeIndex++];
      return {
        ...day,
        dinner: {
          recipeId: recipe.id,
          servings: day.dinner.servings,
          locked: false,
          outEating: false,
          preflightStatus: detectPreflightStatus(recipe, day.date),
        },
      };
    }
    
    return day;
  });
  
  return { ...plan, days: updatedDays };
}

/**
 * Get suitable recipe alternatives for swapping
 * Spec: spec-planner.md §4.2 (Swap - small set of 2-4 alternatives)
 * 
 * @param currentRecipe - The recipe currently in the slot
 * @param recipes - Available recipe catalog
 * @param household - Household profile
 * @param limit - Max number of alternatives to return (default 4)
 * @returns Array of alternative recipes
 */
export function getSwapAlternatives(
  currentRecipe: Recipe,
  recipes: Recipe[],
  household: HouseholdProfile,
  limit: number = 4,
): Recipe[] {
  // Filter to same or easier time band
  const sameOrEasier = recipes.filter(r => {
    if (r.id === currentRecipe.id) return false;
    
    const timeBandOrder: Record<TimeBand, number> = { FAST: 0, NORMAL: 1, PROJECT: 2 };
    return timeBandOrder[r.metadata.timeBand] <= timeBandOrder[currentRecipe.metadata.timeBand];
  });
  
  // Apply constraints
  const eligible = filterRecipesByConstraints(sameOrEasier, household);
  
  // Prefer recipes with similar tags
  const withScores = eligible.map(recipe => {
    let score = 0;
    
    // Same time band gets bonus
    if (recipe.metadata.timeBand === currentRecipe.metadata.timeBand) score += 3;
    
    // Shared tags get bonus
    const currentTags = new Set(currentRecipe.tags || []);
    const recipeTags = recipe.tags || [];
    recipeTags.forEach(tag => {
      if (currentTags.has(tag)) score += 1;
    });
    
    return { recipe, score };
  });
  
  // Sort by score and return top N
  return shuffleArray(withScores)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.recipe);
}
