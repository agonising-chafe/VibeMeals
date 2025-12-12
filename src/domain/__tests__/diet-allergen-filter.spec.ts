import { describe, it, expect } from 'vitest';
import { generatePlan } from '../planner';
import { HouseholdProfile, IsoDate, Recipe } from '../types';

const testDate: IsoDate = '2025-01-13' as IsoDate;

function buildRecipe(partial: Partial<Recipe>): Recipe {
  return {
    id: 'r_missing',
    name: 'Missing',
    slug: 'missing',
    metadata: { timeBand: 'FAST', estimatedMinutes: 10 },
    ingredients: [],
    preflight: [],
    steps: [],
    ...partial,
  } as Recipe;
}

describe('Planner diet constraints – allergen-tag aware filtering', () => {
  it('filters shellfish when allergen tags are present (even without shellfish keywords)', () => {
    const unsafeShellfish = buildRecipe({
      id: 'unsafe_shellfish',
      name: 'Seafood Medley',
      slug: 'seafood-medley',
      metadata: { timeBand: 'FAST', estimatedMinutes: 20 },
      ingredients: [
        {
          ingredientId: 'shellfish-protein',
          displayName: 'seafood medley',
          amount: 1,
          unit: 'LB',
          criticality: 'CRITICAL',
          kind: 'PROTEIN',
          shoppingCategory: 'MEAT_SEAFOOD',
          allergens: ['SHELLFISH'],
        },
      ],
      preflight: [],
      steps: [],
      recipeAllergens: ['SHELLFISH'],
    });

    const safeAlt = buildRecipe({
      id: 'safe_alt',
      name: 'Roasted Veg Bowl',
      slug: 'roasted-veg-bowl',
      metadata: { timeBand: 'FAST', estimatedMinutes: 20 },
      ingredients: [
        {
          ingredientId: 'veg',
          displayName: 'roasted vegetables',
          amount: 1,
          unit: 'LB',
          criticality: 'CRITICAL',
          kind: 'VEG',
          shoppingCategory: 'PRODUCE',
        },
      ],
    });

    const household: HouseholdProfile = {
      id: 'hh_shellfish_free',
      mode: 'FAMILY',
      headcount: 2,
      targetDinnersPerWeek: 1,
      dietConstraints: ['NO_SHELLFISH'],
    };

    const plan = generatePlan(household, [unsafeShellfish, safeAlt], testDate, { targetDinners: 1 });
    const plannedDinner = plan.days.find(d => d.dinner)?.dinner;

    expect(plannedDinner?.recipeId).toBe('safe_alt');
  });

  it('filters gluten when allergen tags are present (even without gluten keywords)', () => {
    const unsafeGluten = buildRecipe({
      id: 'unsafe_gluten',
      name: 'Heirloom Loaf',
      slug: 'heirloom-loaf',
      metadata: { timeBand: 'FAST', estimatedMinutes: 15 },
      ingredients: [
        {
          ingredientId: 'heritage-loaf',
          displayName: 'heritage loaf',
          amount: 1,
          unit: 'UNIT',
          criticality: 'CRITICAL',
          kind: 'CARB',
          shoppingCategory: 'PANTRY_DRY',
          allergens: ['WHEAT'],
        },
      ],
      preflight: [],
      steps: [],
      recipeAllergens: ['WHEAT'],
    });

    const safeSoup = buildRecipe({
      id: 'safe_soup',
      name: 'Tomato Soup',
      slug: 'tomato-soup',
      metadata: { timeBand: 'FAST', estimatedMinutes: 15 },
      ingredients: [
        {
          ingredientId: 'tomatoes',
          displayName: 'tomatoes',
          amount: 2,
          unit: 'CUP',
          criticality: 'CRITICAL',
          kind: 'VEG',
          shoppingCategory: 'PRODUCE',
        },
      ],
    });

    const household: HouseholdProfile = {
      id: 'hh_gluten_free',
      mode: 'FAMILY',
      headcount: 2,
      targetDinnersPerWeek: 1,
      dietConstraints: ['NO_GLUTEN'],
    };

    const plan = generatePlan(household, [unsafeGluten, safeSoup], testDate, { targetDinners: 1 });
    const plannedDinner = plan.days.find(d => d.dinner)?.dinner;

    expect(plannedDinner?.recipeId).toBe('safe_soup');
  });
});
