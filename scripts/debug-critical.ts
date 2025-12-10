import { generatePlan } from '../src/domain/planner';
import { buildShoppingList } from '../src/domain/shop';
import { mvpRecipeCatalog } from '../src/domain/fixtures/recipes.seed';
import { HouseholdProfile, IsoDate } from '../src/domain/types';

const house: HouseholdProfile = { 
  id: 'hh', 
  mode: 'FAMILY', 
  headcount: 4, 
  targetDinnersPerWeek: 2, 
  dietConstraints: [] 
};

(async () => {
  for (const td of [1, 2, 3, 4, 5, 6, 7]) {
    const p = generatePlan(house, mvpRecipeCatalog, '2025-01-13' as IsoDate, { targetDinners: td });
    const s = buildShoppingList(p, mvpRecipeCatalog, house);
    const criticalItems = s.items.filter(i => i.criticality === 'CRITICAL');
    const criticalQty = criticalItems.reduce((sum, i) => sum + Number(i.totalAmount), 0);
    console.log(td, 'items:', s.items.length, 'criticalItems:', criticalItems.length, 'criticalQty:', criticalQty);
    console.log('recipes:', p.days.filter(d => d.dinner).map(d => d.dinner!.recipeId).join(', '));
  }
})();
