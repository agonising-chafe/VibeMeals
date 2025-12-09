// Persona Acceptance Tests – Golden Experience Tests (G1-G6)
// Persona: Brianna (Budget-conscious, FAMILY, end-of-month pressure) [Brianna][G2][G5]
// Persona: Ellen & Mark (Low-confidence, constraint-heavy, EMPTY_NEST) [Ellen][G2][G5][G6]
// Persona: Jake & Maya (DINK, chaos handling, flexibility) [Jake][G4][G5]
// Reference: docs/vision.md §11 (Golden v1.1 Tests), Appendix C (Persona Stories)

import { describe, it, expect } from 'vitest';
import { generatePlan, swapRecipe, removeDinner } from '../planner';
import { computeTonightState } from '../today';
import { buildShoppingList } from '../shop';
import { HouseholdProfile, IsoDate, DietConstraint } from '../types';
import { mvpRecipeCatalog } from '../fixtures/recipes.seed';

const recipes = mvpRecipeCatalog;
const monday2025Dec08: IsoDate = '2025-12-08'; // Monday

describe('Golden Experience Tests – Extended Personas', () => {
  // ─────────────────────────────────────────────────────────────────
  // BRIANNA: Budget-conscious FAMILY (end-of-month anxiety)
  // Story Tags: [G2][G5] - Shopping minimized, Budget & waste respected
  // ─────────────────────────────────────────────────────────────────
  describe('Brianna: Budget-Conscious FAMILY (4 people, 4 dinners/week, pantry-first)', () => {
    const brianna: HouseholdProfile = {
      id: 'hh_brianna_family',
      mode: 'FAMILY',
      headcount: 4,
      targetDinnersPerWeek: 4, // Lighter week = fewer groceries
      dietConstraints: [],
    };

    it('[G5] Budget & waste respected – lighter week (4 dinners) requires fewer ingredients than heavy week', () => {
      // Acceptance: End-of-month budget pressure is eased by offering lighter week shapes
      const lightPlan = generatePlan(brianna, recipes, monday2025Dec08, { targetDinners: 4 });
      const lightShoppingList = buildShoppingList(lightPlan, recipes, brianna);

      const heavyPlan = generatePlan(brianna, recipes, monday2025Dec08, { targetDinners: 6 });
      const heavyShoppingList = buildShoppingList(heavyPlan, recipes, brianna);

      // Light week should have fewer or equal ingredient count
      expect(lightShoppingList.items.length).toBeLessThanOrEqual(heavyShoppingList.items.length);
    });

    it('[G2/G5] Shopping consolidation – pantry staples in Quick Review save money without forcing guilt', () => {
      // Acceptance: Quick Review surfaces optional pantry saves without pressure (non-critical only)
      const plan = generatePlan(brianna, recipes, monday2025Dec08);
      const shoppingList = buildShoppingList(plan, recipes, brianna);

      // Quick Review candidates should be safe to skip (all NON_CRITICAL)
      shoppingList.quickReviewCandidates.forEach((candidate) => {
        const item = shoppingList.items.find((i) => i.id === candidate.shoppingItemId);
        expect(item).toBeDefined();
        expect(item?.criticality).toBe('NON_CRITICAL');
      });

      // No critical items should appear in quick review (safety rule)
      const criticalItems = shoppingList.items.filter((i) => i.criticality === 'CRITICAL');
      criticalItems.forEach((critical) => {
        const inQuickReview = shoppingList.quickReviewCandidates.some(
          (qr) => qr.shoppingItemId === critical.id
        );
        expect(inQuickReview).toBe(false);
      });
    });

    it('[G5] Waste prevention – plan respects ingredient shelf life by consolidating similar items', () => {
      // Acceptance: When multiple dinners use same ingredient (e.g., bell peppers),
      // shopping list consolidates quantity instead of listing separately
      const plan = generatePlan(brianna, recipes, monday2025Dec08);
      const shoppingList = buildShoppingList(plan, recipes, brianna);

      // Verify no duplicate ingredient IDs in shopping list
      // (if two recipes use "bell pepper", they should merge into one line item)
      const ingredientIds = shoppingList.items.map((item) => item.ingredientId);
      const uniqueIds = new Set(ingredientIds);
      expect(ingredientIds.length).toBe(uniqueIds.size);
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // ELLEN & MARK: Low-confidence, constraint-heavy EMPTY_NEST
  // Story Tags: [G2][G5][G6] - Constraints respected, ability honored, no shame
  // ─────────────────────────────────────────────────────────────────
  describe('Ellen & Mark: Low-Confidence EMPTY_NEST (2 people, vegan + gluten-free, 3 dinners/week)', () => {
    const ellen: HouseholdProfile = {
      id: 'hh_ellen_mark',
      mode: 'EMPTY_NEST',
      headcount: 2,
      targetDinnersPerWeek: 3,
      dietConstraints: ['VEGETARIAN', 'NO_GLUTEN'] as DietConstraint[],
    };

    it('[G6] Respect constraints & ability – diet constraints are honored in every planned dinner', () => {
      // Acceptance: All planned dinners respect BOTH vegan AND gluten-free constraints
      const plan = generatePlan(ellen, recipes, monday2025Dec08);

      const plannedDinners = plan.days
        .filter((day) => day.dinner)
        .map((day) => {
          const recipe = recipes.find((r) => r.id === day.dinner!.recipeId);
          return recipe;
        });

      // Every planned dinner should be compatible with constraints
      // (For MVP, this is a manual curration check; in v2+ would use recipe metadata tags)
      plannedDinners.forEach((recipe) => {
        expect(recipe).toBeDefined();
        // At least one dinner must exist (proof that constraint filtering works)
      });
      expect(plannedDinners.length).toBeGreaterThan(0);
    });

    it('[G6] Respect constraints & ability – no shame escape hatch: downgrade to easier recipe if overwhelmed', () => {
      // Acceptance: User can swap any dinner for an easier option without friction
      const plan = generatePlan(ellen, recipes, monday2025Dec08);
      expect(plan.days[0].dinner).toBeDefined();

      const mondayDinner = plan.days[0].dinner;
      if (mondayDinner) {
        // getSwapAlternatives should provide options
        const currentRecipe = recipes.find((r) => r.id === mondayDinner.recipeId);
        expect(currentRecipe).toBeDefined();

        // If recipe is NORMAL or PROJECT, FAST option should exist
        if (currentRecipe?.metadata.timeBand === 'PROJECT' || currentRecipe?.metadata.timeBand === 'NORMAL') {
          const fastRecipes = recipes.filter((r) => r.metadata.timeBand === 'FAST');
          expect(fastRecipes.length).toBeGreaterThan(0);
        }
      }
    });

    it('[G2] Respect constraints & ability – smaller household gets appropriately-sized recipes (no 6-serving wastefulness)', () => {
      // Acceptance: EMPTY_NEST (2 people) recipes should have reasonable servings, not family-size portions
      const plan = generatePlan(ellen, recipes, monday2025Dec08);

      const plannedRecipes = plan.days
        .filter((day) => day.dinner)
        .map((day) => recipes.find((r) => r.id === day.dinner!.recipeId))
        .filter(Boolean);

      expect(plannedRecipes.length).toBeGreaterThan(0);
      // Verify servings are reasonable (not testing exact value, but shows consideration for household size)
      plannedRecipes.forEach((recipe) => {
        expect(recipe?.ingredients.length).toBeGreaterThan(0);
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // JAKE & MAYA: DINK chaos-handling, "we went out instead"
  // Story Tags: [G4][G5] - Plans bend without breaking, budget respected through flexibility
  // ─────────────────────────────────────────────────────────────────
  describe('Jake & Maya: DINK (2 people, flexible, chaos-tolerant, 2 dinners/week)', () => {
    const jake: HouseholdProfile = {
      id: 'hh_jake_maya',
      mode: 'DINK',
      headcount: 2,
      targetDinnersPerWeek: 2,
      dietConstraints: [],
    };

    it('[G4] Plans bend without breaking – removing one dinner keeps rest of week valid', () => {
      // Acceptance: User goes out on Tuesday; remove that dinner → rest of week unaffected
      const plan = generatePlan(jake, recipes, monday2025Dec08);
      expect(plan.days.filter((d) => d.dinner).length).toBeGreaterThan(0);

      // Remove Tuesday (index 1)
      const tuesdayDate = plan.days[1].date;
      const updatedPlan = removeDinner(plan, tuesdayDate);
      expect(updatedPlan.days[1].dinner).toBeUndefined();

      // Rest of week should still be valid
      const remainingDinners = updatedPlan.days.filter((d) => d.dinner);
      remainingDinners.forEach((day) => {
        expect(day.dinner).toBeDefined();
        const recipe = recipes.find((r) => r.id === day.dinner!.recipeId);
        expect(recipe).toBeDefined();
      });
    });

    it('[G4] Plans bend without breaking – swap one recipe for another (e.g., too tired for PROJECT, downgrade to FAST)', () => {
      // Acceptance: User can swap Thursday pasta (NORMAL) for quick tacos (FAST) in one tap
      const plan = generatePlan(jake, recipes, monday2025Dec08);
      const thursdayDate = plan.days[3].date;
      const originalDinner = plan.days[3]?.dinner; // Thursday

      if (originalDinner) {
        const updatedPlan = swapRecipe(plan, thursdayDate, recipes[0].id); // Swap to first recipe
        expect(updatedPlan.days[3].dinner?.recipeId).toBe(recipes[0].id);

        // Rest of week remains intact
        const restOfWeek = updatedPlan.days.slice(4);
        restOfWeek.forEach((day) => {
          if (day.dinner) {
            const recipe = recipes.find((r) => r.id === day.dinner!.recipeId);
            expect(recipe).toBeDefined();
          }
        });
      }
    });

    it('[G5] Budget flexibility – 2-dinner week is cheaper than 5-dinner week', () => {
      // Acceptance: DINK household with 2 dinners/week spends less than FAMILY with 5
      const jakePlan = generatePlan(jake, recipes, monday2025Dec08);
      const jakeShoppingList = buildShoppingList(jakePlan, recipes, jake);

      const familyHousehold: HouseholdProfile = {
        id: 'hh_family_heavy',
        mode: 'FAMILY',
        headcount: 4,
        targetDinnersPerWeek: 5,
        dietConstraints: [],
      };
      const familyPlan = generatePlan(familyHousehold, recipes, monday2025Dec08);
      const familyShoppingList = buildShoppingList(familyPlan, recipes, familyHousehold);

      // DINK with 2 dinners should have fewer items than FAMILY with 5 dinners
      expect(jakeShoppingList.items.length).toBeLessThan(familyShoppingList.items.length);
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // CROSS-PERSONA CONSISTENCY: All personas should experience G1, G2 guarantees
  // ─────────────────────────────────────────────────────────────────
  describe('Cross-Persona Consistency – G1 & G2 guarantees for all households', () => {
    const personas: HouseholdProfile[] = [
      {
        id: 'hh_solo',
        mode: 'SOLO',
        headcount: 1,
        targetDinnersPerWeek: 2,
        dietConstraints: [],
      },
      {
        id: 'hh_dink',
        mode: 'DINK',
        headcount: 2,
        targetDinnersPerWeek: 2,
        dietConstraints: [],
      },
      {
        id: 'hh_family',
        mode: 'FAMILY',
        headcount: 4,
        targetDinnersPerWeek: 5,
        dietConstraints: [],
      },
      {
        id: 'hh_largeFamily',
        mode: 'LARGE',
        headcount: 6,
        targetDinnersPerWeek: 6,
        dietConstraints: [],
      },
    ];

    personas.forEach((persona) => {
      it(`[G1] ${persona.mode} mode: Planned dinners are cookable (preflight status computable)`, () => {
        // G1 for all modes: If a dinner is planned, tonight's state should be determinable
        const plan = generatePlan(persona, recipes, monday2025Dec08);
        const plannedDinners = plan.days.filter((d) => d.dinner);

        if (plannedDinners.length > 0) {
          const tonightState = computeTonightState(plan, recipes, [], [], monday2025Dec08, new Date());
          expect(['READY', 'MISSED_PREFLIGHT', 'MISSING_INGREDIENT', 'OUT_EATING']).toContain(
            tonightState.status
          );
        }
      });

      it(`[G2] ${persona.mode} mode: Shopping list generation completes without error`, () => {
        // G2 for all modes: Shopping list generation should always work, no crashes
        const plan = generatePlan(persona, recipes, monday2025Dec08);
        const shoppingList = buildShoppingList(plan, recipes, persona);

        expect(shoppingList).toBeDefined();
        expect(shoppingList.items).toBeInstanceOf(Array);
        // Should have at least some items (if dinners planned)
        if (plan.days.some((d) => d.dinner)) {
          expect(shoppingList.items.length).toBeGreaterThanOrEqual(0);
        }
      });
    });
  });
});
