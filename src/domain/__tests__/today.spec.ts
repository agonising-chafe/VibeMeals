import { describe, it, expect } from 'vitest';
import { computeTonightState } from '../today';
import { type Plan, type PlannedDinner, type Recipe } from '../types';
import { mvpRecipeCatalog } from '../fixtures/recipes.seed';

// Helper: Find a FAST recipe with no preflight for G1
const fastRecipe: Recipe | undefined = mvpRecipeCatalog.find((r: Recipe) => r.metadata.timeBand === 'FAST' && (!r.preflight || r.preflight.length === 0));
// Helper: Find a recipe with a preflight requirement for G4
const preflightRecipe: Recipe | undefined = mvpRecipeCatalog.find((r: Recipe) => r.preflight && r.preflight.length > 0);

describe('Today domain (Golden Tests)', () => {
  it('G1: Tonight is actually cookable', () => {
    if (!fastRecipe) throw new Error('No suitable FAST recipe in fixtures');
    const dinner: PlannedDinner = {
      recipeId: fastRecipe.id,
      servings: 4,
      locked: false,
      outEating: false,
      preflightStatus: 'ALL_GOOD',
      accompaniments: [],
    };
    const plan: Plan = {
      id: 'plan1',
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
        fastCount: 1,
        normalCount: 0,
        projectCount: 0,
        thawDays: 0,
        marinateDays: 0,
      },
    };
    // Provide empty shop and substitutions as required by the function signature
    const tonight = computeTonightState(plan, mvpRecipeCatalog, [], [], '2025-12-15', undefined);
    expect(tonight.status).toBe('READY');
    expect(typeof tonight.primaryMessage).toBe('string');
  });

  it('G4: Plans bend, not break (missed preflight)', () => {
    if (!preflightRecipe) throw new Error('No recipe with preflight in fixtures');
    const dinner: PlannedDinner = {
      recipeId: preflightRecipe.id,
      servings: 4,
      locked: false,
      outEating: false,
      preflightStatus: 'MISSED',
      accompaniments: [],
    };
    const plan: Plan = {
      id: 'plan2',
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
        normalCount: 0,
        projectCount: 1,
        thawDays: 0,
        marinateDays: 0,
      },
    };
    const tonight = computeTonightState(plan, mvpRecipeCatalog, [], [], '2025-12-15', undefined);
    expect(tonight.status === 'MISSED_PREFLIGHT' || tonight.status === 'MISSING_INGREDIENT').toBe(true);
    expect(typeof tonight.primaryMessage).toBe('string');
  });
});
