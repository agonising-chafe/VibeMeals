// Spec: spec-planner.md v1.0.0, vision.md v4.6.0 §5.2, §7
// src/domain/planner.ts
// ============================================================================
// Week Shape Defaults (from vision.md §5.2)
// ============================================================================
const WEEK_SHAPE_DEFAULTS = {
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
function generatePlanId() {
    return `plan_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
function getWeekDays(startDate) {
    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const start = new Date(startDate);
    for (let i = 0; i < 7; i++) {
        const current = new Date(start);
        current.setDate(start.getDate() + i);
        days.push({
            date: current.toISOString().split('T')[0],
            dayOfWeek: dayNames[i],
        });
    }
    return days;
}
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
function filterRecipesByConstraints(recipes, household, recentRecipeIds = new Set()) {
    return recipes.filter(recipe => {
        // Skip recently used recipes (repeat guard)
        if (recentRecipeIds.has(recipe.id))
            return false;
        // TODO: Add constraint filtering when constraints are defined in HouseholdProfile
        // e.g., dietary restrictions, equipment availability, etc.
        return true;
    });
}
function selectRecipesByTimeBand(recipes, timeBandMix) {
    const selected = [];
    const recipesByBand = {
        FAST: recipes.filter(r => r.metadata.timeBand === 'FAST'),
        NORMAL: recipes.filter(r => r.metadata.timeBand === 'NORMAL'),
        PROJECT: recipes.filter(r => r.metadata.timeBand === 'PROJECT'),
    };
    // Shuffle each band for variety
    Object.keys(recipesByBand).forEach(band => {
        recipesByBand[band] = shuffleArray(recipesByBand[band]);
    });
    // Select recipes according to time band mix
    for (const [band, count] of Object.entries(timeBandMix)) {
        const available = recipesByBand[band];
        selected.push(...available.slice(0, count));
    }
    return selected;
}
function distributeRecipesToDays(recipes, weekDays, targetDinners) {
    const shuffledRecipes = shuffleArray(recipes);
    const days = [];
    // Prefer weeknight (Mon-Thu) for FAST recipes, weekend for PROJECT
    const weeknights = weekDays.slice(0, 4); // Mon-Thu
    const weekends = weekDays.slice(5, 7); // Sat-Sun
    const friday = weekDays[4]; // Fri (flex)
    const fastRecipes = shuffledRecipes.filter(r => r.metadata.timeBand === 'FAST');
    const normalRecipes = shuffledRecipes.filter(r => r.metadata.timeBand === 'NORMAL');
    const projectRecipes = shuffledRecipes.filter(r => r.metadata.timeBand === 'PROJECT');
    let recipeIndex = 0;
    let assignedCount = 0;
    // Assign PROJECT recipes to weekend first
    for (const day of weekends) {
        if (assignedCount >= targetDinners)
            break;
        if (projectRecipes.length > 0) {
            const recipe = projectRecipes.shift();
            days.push({
                date: day.date,
                dayOfWeek: day.dayOfWeek,
                dinner: {
                    recipeId: recipe.id,
                    servings: 4, // Default servings
                    locked: false,
                    outEating: false,
                    preflightStatus: 'NONE_REQUIRED',
                },
            });
            assignedCount++;
        }
    }
    // Assign FAST recipes to weeknights
    for (const day of weeknights) {
        if (assignedCount >= targetDinners)
            break;
        if (fastRecipes.length > 0) {
            const recipe = fastRecipes.shift();
            days.push({
                date: day.date,
                dayOfWeek: day.dayOfWeek,
                dinner: {
                    recipeId: recipe.id,
                    servings: 4,
                    locked: false,
                    outEating: false,
                    preflightStatus: 'NONE_REQUIRED',
                },
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
        }
        else if (remainingRecipes.length > 0) {
            const recipe = remainingRecipes.shift();
            days.push({
                date: day.date,
                dayOfWeek: day.dayOfWeek,
                dinner: {
                    recipeId: recipe.id,
                    servings: 4,
                    locked: false,
                    outEating: false,
                    preflightStatus: 'NONE_REQUIRED',
                },
            });
            assignedCount++;
        }
        else {
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
export function generatePlan(household, recipes, startDate, options = {}) {
    // Get week shape defaults for household mode
    const defaults = WEEK_SHAPE_DEFAULTS[household.mode];
    const targetDinners = options.targetDinners ?? defaults.dinners;
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
    const days = distributeRecipesToDays(selectedRecipes.slice(0, targetDinners), weekDays, targetDinners);
    return {
        id: generatePlanId(),
        householdId: household.id,
        weekStartDate: startDate,
        status: 'DRAFT',
        days,
        summary: {
            totalDinners: days.filter(d => d.dinner).length,
            fastCount: 0, // Will be computed from actual recipes
            normalCount: 0,
            projectCount: 0,
            thawDays: 0,
            marinateDays: 0,
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
 * @returns Updated plan with swapped recipe
 */
export function swapRecipe(plan, date, newRecipeId) {
    const updatedDays = plan.days.map(day => {
        if (day.date !== date)
            return day;
        // Don't swap if locked
        if (day.dinner?.locked) {
            console.warn(`Cannot swap locked dinner on ${date}`);
            return day;
        }
        return {
            ...day,
            dinner: day.dinner
                ? { ...day.dinner, recipeId: newRecipeId }
                : { recipeId: newRecipeId, servings: 4, locked: false, outEating: false, preflightStatus: 'NONE_REQUIRED' },
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
export function toggleLock(plan, date, locked) {
    const updatedDays = plan.days.map(day => {
        if (day.date !== date || !day.dinner)
            return day;
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
export function removeDinner(plan, date) {
    const updatedDays = plan.days.map(day => {
        if (day.date !== date)
            return day;
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
export function regeneratePlan(plan, recipes, household, options = {}) {
    const { respectShopped = false, recentRecipeIds = [] } = options;
    // Collect locked recipe IDs and recent IDs
    const lockedRecipeIds = plan.days
        .filter(day => day.dinner?.locked)
        .map(day => day.dinner.recipeId);
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
        if (day.dinner?.locked)
            return day;
        // Keep empty days empty
        if (!day.dinner)
            return day;
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
                    preflightStatus: 'NONE_REQUIRED',
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
export function getSwapAlternatives(currentRecipe, recipes, household, limit = 4) {
    // Filter to same or easier time band
    const sameOrEasier = recipes.filter(r => {
        if (r.id === currentRecipe.id)
            return false;
        const timeBandOrder = { FAST: 0, NORMAL: 1, PROJECT: 2 };
        return timeBandOrder[r.metadata.timeBand] <= timeBandOrder[currentRecipe.metadata.timeBand];
    });
    // Apply constraints
    const eligible = filterRecipesByConstraints(sameOrEasier, household);
    // Prefer recipes with similar tags
    const withScores = eligible.map(recipe => {
        let score = 0;
        // Same time band gets bonus
        if (recipe.metadata.timeBand === currentRecipe.metadata.timeBand)
            score += 3;
        // Shared tags get bonus
        const currentTags = new Set(currentRecipe.tags || []);
        const recipeTags = recipe.tags || [];
        recipeTags.forEach(tag => {
            if (currentTags.has(tag))
                score += 1;
        });
        return { recipe, score };
    });
    // Sort by score and return top N
    return shuffleArray(withScores)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.recipe);
}
