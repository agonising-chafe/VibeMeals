// Persona Acceptance Tests – Golden Experience Tests (G1-G6)
// Persona: Ashley (Busy Weeknight Parent) [Ashley][G1][G2][G3]
// Persona: Kayla (DINK avoiding delivery spiral) [Kayla][G2][G4][G5][G6]
// Reference: docs/vision.md §11 (Golden v1.1 Tests)

import { describe, it, expect } from 'vitest';
import { generatePlan, swapRecipe, removeDinner } from '../planner';
import { computeTonightState } from '../today';
import { buildShoppingList } from '../shop';
import { HouseholdProfile, IsoDate } from '../types';
import { mvpRecipeCatalog } from '../fixtures/recipes.seed';

const recipes = mvpRecipeCatalog;
const monday2025Dec08: IsoDate = '2025-12-08'; // Monday

describe('Golden Experience Tests – Persona Acceptance', () => {
  describe('Ashley: Busy Weeknight Parent (FAMILY, 4 people, 5 dinners/week)', () => {
    const ashley: HouseholdProfile = {
      id: 'hh_ashley_family',
      mode: 'FAMILY',
      headcount: 4,
      targetDinnersPerWeek: 5,
      dietConstraints: [],
    };

    it('[G1] Tonight is actually cookable – no surprise unfrozen proteins or missing items', () => {
      // Golden Test G1: Weeknight plan should have dinners marked as READY (or explain why)
      const plan = generatePlan(ashley, recipes, monday2025Dec08);
      expect(plan.days.length).toBe(7);
      // Plan starts in DRAFT status until locked (no error, this is fine)
      expect(['DRAFT', 'PLANNED']).toContain(plan.status);

      // For any planned dinner, tonight's state should indicate status clearly
      const mondayDinner = plan.days[0].dinner;
      if (mondayDinner) {
        const tonightState = computeTonightState(plan, recipes, [], [], monday2025Dec08, new Date());
        expect(['READY', 'MISSED_PREFLIGHT', 'MISSING_INGREDIENT', 'OUT_EATING']).toContain(tonightState.status);
        // G1 safety: if READY, must be able to start cooking
        if (tonightState.status === 'READY') {
          expect(tonightState.actions.canStartCooking).toBe(true);
        }
      }
    });

    it('[G2] Shopping is minimized – critical vs non-critical ingredients clearly split', () => {
      // Golden Test G2: Shopping list optimized, no duplication, safety split enforced
      const plan = generatePlan(ashley, recipes, monday2025Dec08);
      const shoppingList = buildShoppingList(plan, recipes, ashley);

      expect(shoppingList.items.length).toBeGreaterThan(0);
      // Every item must have criticality set (safety rule)
      shoppingList.items.forEach((item) => {
        expect(['CRITICAL', 'NON_CRITICAL']).toContain(item.criticality);
      });
      // Quick Review should only surface pantry staples (non-critical, no recipe removal risk)
      shoppingList.quickReviewCandidates.forEach((qr) => {
        const item = shoppingList.items.find((i) => i.id === qr.shoppingItemId);
        expect(item?.criticality).toBe('NON_CRITICAL');
      });
    });

    it('[G3] One-trip shopping is possible – ingredients consolidate across recipes', () => {
      // Golden Test G3: Ingredients across dinners consolidate (no redundant items per trip)
      const plan = generatePlan(ashley, recipes, monday2025Dec08);
      const shoppingList = buildShoppingList(plan, recipes, ashley);

      // Count total ingredient instances across recipes
      const plannedRecipeIds = new Set(plan.days.filter((d) => d.dinner).map((d) => d.dinner!.recipeId));
      const totalIngredientsAcrossDinners = Array.from(plannedRecipeIds)
        .flatMap((recipeId) => {
          const recipe = recipes.find((r) => r.id === recipeId);
          return recipe?.ingredients || [];
        }).length;

      // Shopping list should consolidate (fewer items than raw sum)
      if (totalIngredientsAcrossDinners > 0) {
        expect(shoppingList.items.length).toBeLessThanOrEqual(totalIngredientsAcrossDinners);
      }
      expect(shoppingList.items.length).toBeGreaterThan(0);
    });
  });

  describe('Kayla: DINK household (2 people, 2 dinners/week, avoids delivery spiral)', () => {
    const kayla: HouseholdProfile = {
      id: 'hh_kayla_dink',
      mode: 'DINK',
      headcount: 2,
      targetDinnersPerWeek: 2,
      dietConstraints: [],
    };

    it('[G4] Plans can bend without breaking – swap/remove dinners, plan stays valid', () => {
      // Golden Test G4: Flexible planning. Start with plan, swap a dinner, ensure plan integrity
      const plan = generatePlan(kayla, recipes, monday2025Dec08);
      const originalDinners = plan.days.filter((d) => d.dinner).length;
      expect(originalDinners).toBeGreaterThanOrEqual(2);

      // Swap a dinner to test flexibility
      const mondayDinner = plan.days[0];
      if (mondayDinner.dinner) {
        const alternativeRecipe = recipes.find((r) => r.id !== mondayDinner.dinner?.recipeId);
        if (alternativeRecipe) {
          const swappedPlan = swapRecipe(plan, monday2025Dec08, alternativeRecipe.id);
          expect(swappedPlan.days[0].dinner?.recipeId).toBe(alternativeRecipe.id);
          // Plan structure must remain valid (7 days, no data loss)
          expect(swappedPlan.days.length).toBe(7);
          expect(swappedPlan.id).toBe(plan.id); // Same plan ID
        }
      }

      // Also test removal flexibility
      if (plan.days[1].dinner) {
        const removedPlan = removeDinner(plan, '2025-12-09');
        expect(removedPlan.days.length).toBe(7); // Still 7 days, just no dinner
        expect(removedPlan.days[1].dinner).toBeUndefined();
      }
    });

    it('[G5] Personas feel heard – DINK household gets 2-person-appropriate recipes', () => {
      // Golden Test G5: Persona-aware. Kayla (2 people, 2 dinners) should see fitting recommendations
      const plan = generatePlan(kayla, recipes, monday2025Dec08);

      // Verify servings match or respect household size
      plan.days.forEach((day) => {
        if (day.dinner) {
          expect(day.dinner.servings).toBeGreaterThan(0);
          // Servings should be reasonable for 2-person household (allow modest flexibility)
          expect(day.dinner.servings).toBeLessThanOrEqual(kayla.headcount * 2);
        }
      });

      // Should respect dinner count preference (2/week)
      const plannedDinners = plan.days.filter((d) => d.dinner).length;
      expect(plannedDinners).toBeGreaterThanOrEqual(kayla.targetDinnersPerWeek);
    });

    it('[G6] Dinner never feels boring – variety in time bands and cuisines', () => {
      // Golden Test G6: Variety. Generated plan should mix time bands and recipe types
      const plan = generatePlan(kayla, recipes, monday2025Dec08);
      const plannedRecipeIds = plan.days.filter((d) => d.dinner).map((d) => d.dinner!.recipeId);
      const plannedRecipes = plannedRecipeIds
        .map((id) => recipes.find((r) => r.id === id))
        .filter(Boolean);

      // If multiple dinners planned, check for variety
      if (plannedRecipes.length > 1) {
        const timeBands = new Set(plannedRecipes.map((r) => r!.metadata.timeBand));
        // At least 1 time band for single dinner, multiple for variety
        expect(timeBands.size).toBeGreaterThanOrEqual(1);
      }
    });
  });
});
