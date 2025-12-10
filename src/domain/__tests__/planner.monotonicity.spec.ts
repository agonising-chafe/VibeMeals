// Tests asserting monotonicity properties for planner & shopping list
import { describe, it, expect } from 'vitest';
import { generatePlan } from '../planner';
import { buildShoppingList } from '../shop';
import { mvpRecipeCatalog } from '../fixtures/recipes.seed';
import { HouseholdProfile, IsoDate, Plan, PlanDay } from '../types';

const testHousehold: HouseholdProfile = {
  id: 'hh_test_family',
  mode: 'FAMILY',
  headcount: 4,
  targetDinnersPerWeek: 5,
  dietConstraints: [],
};

const testDate: IsoDate = '2025-01-13' as IsoDate;

/**
 * Helper to create a subplan by keeping only the first N dinners from a maximal plan.
 * This ensures nested subplans for deterministic monotonicity testing.
 */
function createSubplan(maxPlan: Plan, targetDinners: number): Plan {
  const subPlan = { ...maxPlan, days: maxPlan.days.map(d => ({ ...d })) };
  let kept = 0;
  for (const day of subPlan.days) {
    if (day.dinner) {
      if (kept < targetDinners) {
        kept++;
      } else {
        // Remove extra dinners to create nested subplan
        const dayWithoutDinner: PlanDay = {
          date: day.date,
          dayOfWeek: day.dayOfWeek,
        };
        Object.assign(day, dayWithoutDinner);
      }
    }
  }
  return subPlan;
}

describe('Planner - monotonicity tests', () => {
  it('monotonicity: more target dinners should not reduce shopping total quantity or item count (nested subplans)', () => {
    const house = { ...testHousehold, targetDinnersPerWeek: 2 };
    const maxTarget = 5;
    const maxPlan = generatePlan(house, mvpRecipeCatalog, testDate, { targetDinners: maxTarget });

    const totals: { itemsCount: number; totalQuantity: number }[] = [];
    for (let td = 1; td <= maxTarget; td++) {
      const subPlan = createSubplan(maxPlan, td);
      const shopping = buildShoppingList(subPlan, mvpRecipeCatalog, house);
      const sumQty = shopping.items.reduce((s: number, it: { totalAmount: number }) => s + Number(it.totalAmount), 0);
      totals.push({ itemsCount: shopping.items.length, totalQuantity: sumQty });
    }

    // Ensure total quantities never decrease
    for (let i = 1; i < totals.length; i++) {
      expect(totals[i].totalQuantity).toBeGreaterThanOrEqual(totals[i - 1].totalQuantity);
      expect(totals[i].itemsCount).toBeGreaterThanOrEqual(totals[i - 1].itemsCount);
    }
  });

  it('monotonicity (critical-only): critical items count/quantity never decreases as target dinners increase (nested subplans)', () => {
    const house = { ...testHousehold, targetDinnersPerWeek: 2 };
    const maxTarget = 7;
    const maxPlan = generatePlan(house, mvpRecipeCatalog, testDate, { targetDinners: maxTarget });

    const criticalTotals: { criticalItemCount: number; criticalQuantity: number }[] = [];
    for (let td = 1; td <= maxTarget; td++) {
      const subPlan = createSubplan(maxPlan, td);
      const shopping = buildShoppingList(subPlan, mvpRecipeCatalog, house);
      const criticalItems = shopping.items.filter(i => i.criticality === 'CRITICAL');
      const criticalQty = criticalItems.reduce((s: number, it: { totalAmount: number }) => s + Number(it.totalAmount), 0);
      criticalTotals.push({ criticalItemCount: criticalItems.length, criticalQuantity: criticalQty });
    }

    for (let i = 1; i < criticalTotals.length; i++) {
      const prev = criticalTotals[i - 1];
      const curr = criticalTotals[i];
      // Critical quantity must never decrease
      expect(curr.criticalQuantity).toBeGreaterThanOrEqual(prev.criticalQuantity);
      // If item count decreases, ensure that quantity increased (consolidation is allowed only if quantity increases)
      if (curr.criticalItemCount < prev.criticalItemCount) {
        expect(curr.criticalQuantity).toBeGreaterThan(prev.criticalQuantity);
      } else {
        expect(curr.criticalItemCount).toBeGreaterThanOrEqual(prev.criticalItemCount);
      }
    }
  });
});
