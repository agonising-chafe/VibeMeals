import {
  Plan,
  Recipe,
  ShoppingList,
  ShoppingItem,
  ShoppingItemSourceUsage,
  QuickReviewCandidate,
  ShoppingItemId,
  IngredientCriticality,
  HouseholdProfile,
  Allergen,
} from './types';

type IngredientAccumulator = {
  ingredientId: string;
  displayName: string;
  shoppingCategory: ShoppingItem['shoppingCategory'];
  totalAmount: number;
  unit: ShoppingItem['unit'];
  usedIn: { recipeId: string; recipeName: string }[];
  criticality: IngredientCriticality;
  packages?: number | undefined;
  packageSize?: { amount: number; unit: 'OZ' | 'ML' | 'GRAM' | 'UNIT' } | undefined;
  allergens?: Set<Allergen> | undefined;
};

let shoppingItemCounter = 0;
function nextShoppingItemId(): ShoppingItemId {
  shoppingItemCounter += 1;
  return `si_${shoppingItemCounter}` as ShoppingItemId;
}

/**
 * Build a consolidated ShoppingList from a Plan + Recipe catalog.
 * - Includes all ingredients from all planned dinners (and any attached accompaniments).
 * - Aggregates by ingredientId.
 * - Marks item CRITICAL if any recipe marks it CRITICAL.
 * - Generates Quick Review candidates only for NON_CRITICAL staple-like items.
 */
export function buildShoppingList(
  plan: Plan,
  recipes: Recipe[],
  _household?: HouseholdProfile,
): ShoppingList {
  const recipeById = new Map<string, Recipe>();
  for (const r of recipes) recipeById.set(r.id, r);

  // Use a composite key: normalized displayName + unit
  const acc = new Map<string, IngredientAccumulator>();
  // Helper to normalize display names (case-insensitive, trimmed)
  function normDisplayName(name: string) {
    return name.trim().toLowerCase();
  }

  for (const day of plan.days) {
    if (!day.dinner || day.dinner.outEating) continue;
    const { recipeId, servings, accompaniments } = day.dinner;
    const dinnerRecipeIds = [
      recipeId,
      ...(accompaniments ? accompaniments.map(a => a.recipeId) : []),
    ];

    const servingsMultiplier = servings && servings > 0 ? servings / 4 : 1;

    for (const dinnerRecipeId of dinnerRecipeIds) {
      const recipe = recipeById.get(dinnerRecipeId);
      if (!recipe) continue;

      for (const ing of recipe.ingredients) {
        // Guard: catch bad ingredients early
        if (
          ing.amount === undefined ||
          ing.amount === null ||
          Number.isNaN(ing.amount as number)
        ) {
          throw new Error(
            `Ingredient amount is invalid for ingredientId=${ing.ingredientId} in recipe=${recipe.id}`,
          );
        }
        if (!ing.displayName) {
          throw new Error(
            `Ingredient displayName is missing for ingredientId=${ing.ingredientId} in recipe=${recipe.id}`,
          );
        }

        // Composite key: normalized displayName + unit
        const compositeKey = normDisplayName(ing.displayName) + '|' + (ing.unit || '');
        let existing = acc.get(compositeKey);
        const amountForPlan = ing.amount * servingsMultiplier;
        const packagesForPlan =
          ing.packages !== undefined ? ing.packages * servingsMultiplier : undefined;

        if (!existing) {
          acc.set(compositeKey, {
            ingredientId: ing.ingredientId, // Track the first seen ID
            displayName: ing.displayName,
            shoppingCategory: ing.shoppingCategory,
            totalAmount: amountForPlan,
            unit: ing.unit,
            usedIn: [
              {
                recipeId: recipe.id,
                recipeName: recipe.name,
              },
            ],
            criticality: ing.criticality,
            packages: packagesForPlan,
            packageSize: ing.packageSize,
            allergens: ing.allergens ? new Set(ing.allergens) : undefined,
          });
        } else {
          existing.totalAmount += amountForPlan;
          existing.usedIn.push({
            recipeId: recipe.id,
            recipeName: recipe.name,
          });
          if (ing.criticality === 'CRITICAL') {
            existing.criticality = 'CRITICAL';
          }
          // Aggregate packages only if package size matches
          if (
            packagesForPlan !== undefined &&
            ing.packageSize &&
            (!existing.packageSize ||
              (existing.packageSize.amount === ing.packageSize.amount &&
                existing.packageSize.unit === ing.packageSize.unit))
          ) {
            existing.packages = (existing.packages ?? 0) + packagesForPlan;
            existing.packageSize = ing.packageSize;
          }
          if (ing.allergens && ing.allergens.length > 0) {
            if (!existing.allergens) existing.allergens = new Set<Allergen>();
            ing.allergens.forEach(a => existing.allergens!.add(a));
          }
        }
      }
    }
  }

  const items: ShoppingItem[] = [];
  for (const accItem of acc.values()) {
    const id = nextShoppingItemId();
    const item: ShoppingItem = {
      id,
      planId: plan.id,
      ingredientId: accItem.ingredientId,
      displayName: accItem.displayName,
      shoppingCategory: accItem.shoppingCategory,
      totalAmount: accItem.totalAmount,
      unit: accItem.unit,
      usedIn: accItem.usedIn.map(u => {
        const usage: ShoppingItemSourceUsage = {
          recipeId: u.recipeId,
          recipeName: u.recipeName,
        };
        return usage;
      }),
      checked: false,
      criticality: accItem.criticality,
    };
    if (accItem.packages !== undefined) item.packages = accItem.packages;
    if (accItem.packageSize) item.packageSize = accItem.packageSize;
    if (accItem.allergens) item.allergens = Array.from(accItem.allergens);
    items.push(item);
  }

  const quickReviewCandidates: QuickReviewCandidate[] = [];
  for (const item of items) {
    if (item.criticality === 'CRITICAL') continue;

    const stapleCategory =
      item.shoppingCategory === 'PANTRY_DRY' ||
      item.shoppingCategory === 'DAIRY_EGGS' ||
      item.shoppingCategory === 'FROZEN';

    if (!stapleCategory) continue;

    quickReviewCandidates.push({
      shoppingItemId: item.id,
      reason: 'PANTRY_STAPLE',
      decision: 'NEED_IT',
    });
  }

  return {
    planId: plan.id,
    items,
    quickReviewCandidates,
  };
}
