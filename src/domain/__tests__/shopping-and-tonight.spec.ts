// src/domain/__tests__/shopping-and-tonight.spec.ts

import { describe, it, expect } from 'vitest';

import {
  mvpRecipeCatalog,
} from '../fixtures/recipes.seed';

import {
  Plan,
  PlanDay,
  PlannedDinner,
  HouseholdId,
  HouseholdProfile,
  PlanId,
  IsoDate,
  TonightStatus,
  IngredientCriticality,
  IngredientKind,
} from '../types';

import { buildShoppingList } from '../shop';
import { computeTonightState } from '../today';

// Test Recipe Mapping - using actual recipes from catalog
const seedRecipes = mvpRecipeCatalog;

// Map actual recipes to test-friendly names based on their characteristics
const sheetPanChickenVeg = seedRecipes.find(r => r.id === 'r_oven-baked-chicken-drumsticks')!; // PROJECT, sheet pan
const marinatedChickenBowls = seedRecipes.find(r => r.id === 'r_simple-chicken-fajitas')!; // FAST, has preflight potential
const pantryRescuePasta = seedRecipes.find(r => r.id === 'r_one-pot-creamy-mushroom-pasta')!; // FAST, pantry-friendly
const beefTacoNight = seedRecipes.find(r => r.id === 'r_beef-stroganoff')!; // NORMAL, beef protein
const slowCookerChili = seedRecipes.find(r => r.id === 'r_slow-cooker-white-chicken-chili')!; // PROJECT, slow cooker

// Helpers to avoid noise in each test
const HOUSEHOLD_ID: HouseholdId = 'hh_test';
const PLAN_ID: PlanId = 'plan_test_week';
const WEEK_START: IsoDate = '2025-01-06'; // Monday

const HOUSEHOLD: HouseholdProfile = {
  id: HOUSEHOLD_ID,
  mode: 'FAMILY',
  headcount: 4,
  targetDinnersPerWeek: 5,
  dietConstraints: [],
};

function makeEmptyWeek(): PlanDay[] {
  const days: PlanDay[] = [];
  const dayNames: PlanDay['dayOfWeek'][] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(WEEK_START);
    date.setDate(date.getDate() + i);
    const iso = date.toISOString().slice(0, 10) as IsoDate;

    days.push({
      date: iso,
      dayOfWeek: dayNames[i],
    });
  }

  return days;
}

function makePlannedDinner(recipeId: string): PlannedDinner {
  return {
    recipeId,
    servings: 4,
    locked: false,
    outEating: false,
    preflightStatus: 'NONE_REQUIRED',
  };
}

function makePlanWithDinners(dinnersByDate: Record<IsoDate, string>): Plan {
  const days = makeEmptyWeek();

  for (const day of days) {
    const recipeId = dinnersByDate[day.date];
    if (recipeId) {
      day.dinner = makePlannedDinner(recipeId);
    }
  }

  return {
    id: PLAN_ID,
    householdId: HOUSEHOLD_ID,
    weekStartDate: WEEK_START,
    status: 'PLANNED',
    days,
    summary: {
      totalDinners: 0,
      fastCount: 0,
      normalCount: 0,
      projectCount: 0,
      thawDays: 0,
      marinateDays: 0,
    },
  };
}

// Convenience to find a recipe object by id in seedRecipes
function getRecipeById(id: string) {
  const found = seedRecipes.find(r => r.id === id);
  if (!found) throw new Error(`Recipe not found in seedRecipes: ${id}`);
  return found;
}

describe('Shop domain – buildShoppingList', () => {
  it('includes all CRITICAL ingredients from planned dinners', () => {
    // Plan: Monday = sheet pan, Tuesday = pantry pasta
    const plan = makePlanWithDinners({
      '2025-01-06': sheetPanChickenVeg.id,
      '2025-01-07': pantryRescuePasta.id,
    });

    const shoppingList = buildShoppingList(plan, seedRecipes, HOUSEHOLD);

    // Collect critical ingredients from those two recipes
    const recipes = [
      getRecipeById(sheetPanChickenVeg.id),
      getRecipeById(pantryRescuePasta.id),
    ];

    const criticalIds = new Set(
      recipes.flatMap(r =>
        r.ingredients
          .filter(ing => ing.criticality === 'CRITICAL')
          .map(ing => ing.ingredientId),
      ),
    );

    // Assert that each critical ingredient appears as a ShoppingItem
    for (const ingredientId of criticalIds) {
      const match = shoppingList.items.find(
        item => item.ingredientId === ingredientId,
      );
      expect(
        match,
        `Expected ShoppingList to include critical ingredientId=${ingredientId}`,
      ).toBeDefined();
    }
  });

  it('only offers NON_CRITICAL items as Quick Review candidates', () => {
    const plan = makePlanWithDinners({
      '2025-01-06': beefTacoNight.id,
      '2025-01-07': pantryRescuePasta.id,
    });

    const shoppingList = buildShoppingList(plan, seedRecipes, HOUSEHOLD);

    // Build a map of ingredientId -> criticality from all recipes
    const ingredientCriticality = new Map<string, IngredientCriticality>();
    for (const recipe of seedRecipes) {
      for (const ing of recipe.ingredients) {
        ingredientCriticality.set(ing.ingredientId, ing.criticality);
      }
    }

    // For each quick review candidate, assert its ingredient is NON_CRITICAL
    for (const candidate of shoppingList.quickReviewCandidates) {
      const item = shoppingList.items.find(i => i.id === candidate.shoppingItemId);
      expect(item).toBeDefined();

      const crit = ingredientCriticality.get(item!.ingredientId);
      expect(
        crit,
        `Quick Review should only show NON_CRITICAL ingredients, but found ${item!.ingredientId} with criticality=${crit}`,
      ).toBe('NON_CRITICAL');
    }
  });
});

describe('Today domain – computeTonightState', () => {
  it('returns READY when tonight has a planned dinner, all good preflight, and no missing items', () => {
    // Plan: Monday = sheet pan, with preflightStatus "ALL_GOOD"
    const plan = makePlanWithDinners({
      '2025-01-06': sheetPanChickenVeg.id,
    });

    const monday = plan.days.find(d => d.date === '2025-01-06');
    if (!monday || !monday.dinner) {
      throw new Error('Expected Monday dinner to exist');
    }
    monday.dinner.preflightStatus = 'ALL_GOOD';

    const tonightState = computeTonightState(
      plan,
      seedRecipes,
      [], // missingItems
      [], // substitutions
      '2025-01-06',
      new Date('2025-01-06T17:00:00Z'),
    );

    expect(tonightState.status).toBe<'READY'>('READY');
    expect(tonightState.actions.canStartCooking).toBe(true);
    expect(tonightState.context.dinner?.recipeId).toBe(sheetPanChickenVeg.id);
  });

  it('returns MISSED_PREFLIGHT when tonight has unmet preflight (e.g., marinade not done)', () => {
    // Plan: Monday = marinated bowls, but preflightStatus is MISSED
    const plan = makePlanWithDinners({
      '2025-01-06': marinatedChickenBowls.id,
    });

    const monday = plan.days.find(d => d.date === '2025-01-06');
    if (!monday || !monday.dinner) {
      throw new Error('Expected Monday dinner to exist');
    }
    monday.dinner.preflightStatus = 'MISSED';

    const tonightState = computeTonightState(
      plan,
      seedRecipes,
      [], // missingItems
      [], // substitutions
      '2025-01-06',
      new Date('2025-01-06T17:00:00Z'),
    );

    expect(tonightState.status).toBe<TonightStatus>('MISSED_PREFLIGHT');
    expect(tonightState.actions.canStartCooking).toBe(false);
    expect(tonightState.primaryMessage.toLowerCase()).toContain('marinate');
  });

  it('treats missing preflight as MISSED when recipe declares requirements but status is NONE_REQUIRED', () => {
    const preflightRecipeId = 'r_test_preflight';

    const preflightRecipe = {
      id: preflightRecipeId,
      name: 'Overnight Marinated Chicken',
      slug: 'overnight-marinated-chicken',
      metadata: { timeBand: 'NORMAL' as const, estimatedMinutes: 45 },
      ingredients: [
        {
          ingredientId: 'ing_chicken',
          displayName: 'Chicken thighs',
          amount: 1,
          unit: 'LB' as const,
          criticality: 'CRITICAL' as IngredientCriticality,
          kind: 'PROTEIN' as IngredientKind,
          shoppingCategory: 'MEAT_SEAFOOD' as const,
        },
      ],
      preflight: [
        {
          type: 'MARINATE' as const,
          description: 'Marinate at least 4 hours before cooking',
          hoursBeforeCook: 4,
        },
      ],
      steps: [
        { stepNumber: 1, instruction: 'Mix marinade.' },
        { stepNumber: 2, instruction: 'Cook chicken.' },
      ],
    };

    const plan = makePlanWithDinners({
      '2025-01-06': preflightRecipeId,
    });

    const tonightState = computeTonightState(
      plan,
      [...seedRecipes, preflightRecipe],
      [],
      [],
      '2025-01-06',
      new Date('2025-01-06T17:00:00Z'),
    );

    expect(tonightState.status).toBe<TonightStatus>('MISSED_PREFLIGHT');
    expect(tonightState.actions.canStartCooking).toBe(false);
  });

  it('returns MISSING_INGREDIENT when a core ingredient is missing for tonight', () => {
    // Plan: Monday = sheet pan
    const plan = makePlanWithDinners({
      '2025-01-06': sheetPanChickenVeg.id,
    });
    const shoppingList = buildShoppingList(plan, seedRecipes, HOUSEHOLD);

    // Find a critical ingredient for sheet pan chicken (e.g., chicken breast)
    const sheetPan = getRecipeById(sheetPanChickenVeg.id);
    const criticalIng = sheetPan.ingredients.find(ing => ing.criticality === 'CRITICAL');
    if (!criticalIng) throw new Error('Expected a critical ingredient');

    const item = shoppingList.items.find(i => i.ingredientId === criticalIng.ingredientId);
    if (!item) {
      throw new Error(`Expected ShoppingList to have item for ${criticalIng.ingredientId}`);
    }

    // Mark that item as missing and affecting tonight
    const missingItems = [
      {
        id: 'missing_1',
        shoppingItemId: item.id,
        planId: shoppingList.planId,
        reason: 'OUT_OF_STOCK' as const,
        note: 'Store was out',
        ingredientId: criticalIng.ingredientId,
        ingredientName: criticalIng.displayName,
        affectsTonight: true,
        affectsFuture: false,
      },
    ];

    const tonightState = computeTonightState(
      plan,
      seedRecipes,
      missingItems,
      [],
      '2025-01-06',
      new Date('2025-01-06T17:00:00Z'),
    );

    expect(tonightState.status).toBe<TonightStatus>('MISSING_INGREDIENT');
    expect(
      tonightState.issues.missingCoreIngredients.some(
        i => i.ingredientId === criticalIng.ingredientId,
      ),
    ).toBe(true);
    expect(tonightState.actions.canStartCooking).toBe(false);
  });

  it('allows cooking when only NON_CRITICAL ingredients are missing', () => {
    const plan = makePlanWithDinners({
      '2025-01-06': pantryRescuePasta.id,
    });
    const shoppingList = buildShoppingList(plan, seedRecipes, HOUSEHOLD);

    const recipe = getRecipeById(pantryRescuePasta.id);
    const nonCritical = recipe.ingredients.find(ing => ing.criticality === 'NON_CRITICAL');
    if (!nonCritical) throw new Error('Expected a non-critical ingredient');

    const item = shoppingList.items.find(i => i.ingredientId === nonCritical.ingredientId);
    if (!item) throw new Error('Expected ShoppingList item for non-critical ingredient');

    const missingItems = [
      {
        id: 'missing_nc',
        shoppingItemId: item.id,
        planId: shoppingList.planId,
        reason: 'USER_MARKED' as const,
        note: 'Forgot to buy but optional',
        ingredientId: nonCritical.ingredientId,
        ingredientName: nonCritical.displayName,
        affectsTonight: true,
        affectsFuture: false,
      },
    ];

    const tonightState = computeTonightState(
      plan,
      seedRecipes,
      missingItems,
      [],
      '2025-01-06',
      new Date('2025-01-06T17:00:00Z'),
    );

    expect(tonightState.status).toBe<TonightStatus>('READY');
    expect(tonightState.actions.canStartCooking).toBe(true);
    expect(
      tonightState.issues.missingNonCriticalIngredients.some(
        i => i.ingredientId === nonCritical.ingredientId,
      ),
    ).toBe(true);
    expect(tonightState.issues.missingCoreIngredients).toHaveLength(0);
  });
});

describe('Shop domain – quick review safety', () => {
  it('never surfaces PROTEIN ingredients in Quick Review', () => {
    const plan = makePlanWithDinners({
      '2025-01-06': marinatedChickenBowls.id,
      '2025-01-07': slowCookerChili.id,
    });

    const shoppingList = buildShoppingList(plan, seedRecipes, HOUSEHOLD);

    const ingredientKind = new Map<string, IngredientKind>();
    for (const recipe of seedRecipes) {
      for (const ing of recipe.ingredients) {
        ingredientKind.set(ing.ingredientId, ing.kind as IngredientKind);
      }
    }

    for (const candidate of shoppingList.quickReviewCandidates) {
      const item = shoppingList.items.find(i => i.id === candidate.shoppingItemId);
      expect(item).toBeDefined();
      const kind = ingredientKind.get(item!.ingredientId);
      expect(
        kind,
        `Quick Review must not include PROTEIN ingredients (found ${item!.ingredientId})`,
      ).not.toBe('PROTEIN');
    }
  });
});
