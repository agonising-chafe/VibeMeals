// src/domain/shop.ts

import {
  Plan,
  Recipe,
  ShoppingList,
  ShoppingItem,
  QuickReviewCandidate,
  ShoppingItemId,
  IngredientCriticality,
  HouseholdProfile,
} from './types';

type IngredientAccumulator = {
  ingredientId: string;
  displayName: string;
  shoppingCategory: ShoppingItem['shoppingCategory'];
  totalAmount: number;
  unit: ShoppingItem['unit'];
  usedIn: { recipeId: string; recipeName: string }[];
  criticality: IngredientCriticality;
};

let shoppingItemCounter = 0;
function nextShoppingItemId(): ShoppingItemId {
  shoppingItemCounter += 1;
  return `si_${shoppingItemCounter}` as ShoppingItemId;
}

/**
 * Build a consolidated ShoppingList from a Plan + Recipe catalog.
 * - Includes all ingredients from all planned dinners.
 * - Aggregates by ingredientId.
 * - Marks item CRITICAL if any recipe marks it CRITICAL.
 * - Generates Quick Review candidates only for NON_CRITICAL staple-like items.
 */
export function buildShoppingList(
  plan: Plan,
  recipes: Recipe[],
  household?: HouseholdProfile,
): ShoppingList {
  const recipeById = new Map<string, Recipe>();
  for (const r of recipes) recipeById.set(r.id, r);

  const acc = new Map<string, IngredientAccumulator>();

  for (const day of plan.days) {
    if (!day.dinner || day.dinner.outEating) continue;
    const { recipeId, servings } = day.dinner;
    const recipe = recipeById.get(recipeId);
    if (!recipe) continue;

    const servingsMultiplier = servings && servings > 0 ? servings / 4 : 1;

    for (const ing of recipe.ingredients) {
      // 🔍 Guard: catch bad ingredients early
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

      const key = ing.ingredientId;
      const existing = acc.get(key);
      const amountForPlan = ing.amount * servingsMultiplier;

      if (!existing) {
        acc.set(key, {
          ingredientId: ing.ingredientId,
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
      }
    }
  }

  const items: ShoppingItem[] = [];
  for (const accItem of acc.values()) {
    const id = nextShoppingItemId();
    items.push({
      id,
      planId: plan.id,
      ingredientId: accItem.ingredientId,
      displayName: accItem.displayName,
      shoppingCategory: accItem.shoppingCategory,
      totalAmount: accItem.totalAmount,
      unit: accItem.unit,
      usedIn: accItem.usedIn.map(u => ({
        recipeId: u.recipeId,
        recipeName: u.recipeName,
        amountPortion: undefined,
      })),
      checked: false,
      criticality: accItem.criticality,
    });
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
