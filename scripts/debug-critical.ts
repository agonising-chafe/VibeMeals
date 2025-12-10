import { generatePlan } from '../src/domain/planner';
import { buildShoppingList } from '../src/domain/shop';
import { mvpRecipeCatalog } from '../src/domain/fixtures/recipes.seed';

const house = { id: 'hh', mode: 'FAMILY' as any, headcount: 4, targetDinnersPerWeek: 2, dietConstraints: [] as any };

(async () => {
  for (const td of [1, 2, 3, 4, 5, 6, 7]) {
    const p = generatePlan(house as any, mvpRecipeCatalog, '2025-01-13' as any, { targetDinners: td });
    const s = buildShoppingList(p, mvpRecipeCatalog, house as any);
    const criticalItems = s.items.filter(i => i.criticality === 'CRITICAL');
    const criticalQty = criticalItems.reduce((sum, i) => sum + Number(i.totalAmount), 0);
    console.log(td, 'items:', s.items.length, 'criticalItems:', criticalItems.length, 'criticalQty:', criticalQty);
    console.log('recipes:', p.days.filter(d => d.dinner).map(d => d.dinner!.recipeId).join(', '));
  }
})();
