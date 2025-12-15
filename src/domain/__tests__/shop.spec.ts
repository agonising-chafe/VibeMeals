// Golden/acceptance tests for the Shop/ingredient flows
// Spec: docs/spec-shop.md
// Golden Tests: G2, G5, G7 (see vision.md)
// Last synced: December 15, 2025

import { describe, it, expect } from 'vitest';
import { buildShoppingList } from '../shop';
import { type Plan, type PlannedDinner, type Recipe } from '../types';
import { mvpRecipeCatalog } from '../fixtures/recipes.seed';

// Helper: Find a recipe with multiple ingredients
const multiIngRecipe: Recipe | undefined = mvpRecipeCatalog.find((r: Recipe) => r.ingredients && r.ingredients.length > 2);

describe('Shop domain (Golden Tests)', () => {
  it('G2: All required ingredients are present after shopping', () => {
    if (!multiIngRecipe) throw new Error('No suitable recipe in fixtures');
    const dinner: PlannedDinner = {
      recipeId: multiIngRecipe.id,
      servings: 4,
      locked: false,
      outEating: false,
      preflightStatus: 'ALL_GOOD',
      accompaniments: [],
    };
    const plan: Plan = {
      id: 'plan-shop-1',
      householdId: 'house1',
      weekStartDate: '2025-12-15',
      status: 'PLANNED',
      days: [
        {
          date: '2025-12-15',
          dayOfWeek: 'Mon',
          dinner,
        },
      ],
      summary: {
        totalDinners: 1,
        fastCount: 0,
        normalCount: 1,
        projectCount: 0,
        thawDays: 0,
        marinateDays: 0,
      },
    };
    const shoppingList = buildShoppingList(plan, mvpRecipeCatalog);
    expect(shoppingList.items.length).toBe(multiIngRecipe.ingredients.length);
  });
});
