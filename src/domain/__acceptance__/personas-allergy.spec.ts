import { describe, it, expect } from 'vitest';
import { generatePlan } from '../planner';
import { buildShoppingList } from '../shop';
import { HouseholdProfile, IsoDate, Recipe } from '../types';
import { mvpRecipeCatalog } from '../fixtures/recipes.seed';

const recipes = mvpRecipeCatalog;
const monday: IsoDate = '2025-12-08' as IsoDate;

function assertNoAllergen(recipesPlanned: Recipe[], allergen: 'PEANUT' | 'WHEAT') {
  for (const r of recipesPlanned) {
    const has = r.recipeAllergens?.includes(allergen) ||
      r.ingredients.some(ing =>
        ing.allergens?.includes(allergen) ||
        (allergen === 'PEANUT' && /peanut/i.test(ing.displayName)) ||
        (allergen === 'WHEAT' && /wheat|flour|semolina|rye|barley/i.test(ing.displayName))
      );
    expect(has).toBe(false);
  }
}

describe('Persona Acceptance - Allergy Guardrails', () => {
  it('Peanut-free family should get a peanut-free plan and shopping list', () => {
    const household: HouseholdProfile = {
      id: 'hh_peanut_free_family',
      mode: 'FAMILY',
      headcount: 4,
      targetDinnersPerWeek: 5,
      dietConstraints: ['NO_PEANUT'],
    };

    const plan = generatePlan(household, recipes, monday);
    const plannedRecipeIds = plan.days
      .filter(d => d.dinner)
      .map(d => d.dinner!.recipeId);
    const plannedRecipes = plannedRecipeIds
      .map(id => recipes.find(r => r.id === id))
      .filter((r): r is Recipe => Boolean(r));

    expect(plannedRecipes.length).toBeGreaterThan(0);
    assertNoAllergen(plannedRecipes, 'PEANUT');

    const shoppingList = buildShoppingList(plan, recipes, household);
    shoppingList.items.forEach(item => {
      const hasPeanut =
        item.allergens?.includes('PEANUT') ||
        /peanut/i.test(item.displayName);
      expect(hasPeanut).toBe(false);
    });
  });

  it('Gluten-free cook should avoid wheat in plan and shopping list', () => {
    const household: HouseholdProfile = {
      id: 'hh_gluten_free',
      mode: 'SOLO',
      headcount: 1,
      targetDinnersPerWeek: 3,
      dietConstraints: ['NO_GLUTEN'],
    };

    const plan = generatePlan(household, recipes, monday);
    const plannedRecipeIds = plan.days
      .filter(d => d.dinner)
      .map(d => d.dinner!.recipeId);
    const plannedRecipes = plannedRecipeIds
      .map(id => recipes.find(r => r.id === id))
      .filter((r): r is Recipe => Boolean(r));

    expect(plannedRecipes.length).toBeGreaterThan(0);
    assertNoAllergen(plannedRecipes, 'WHEAT');

    const shoppingList = buildShoppingList(plan, recipes, household);
    shoppingList.items.forEach(item => {
      const hasWheat =
        item.allergens?.includes('WHEAT') ||
        /wheat|flour|semolina|rye|barley/i.test(item.displayName);
      expect(hasWheat).toBe(false);
    });
  });
});
