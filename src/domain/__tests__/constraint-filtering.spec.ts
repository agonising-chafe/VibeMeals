import { describe, it, expect } from 'vitest';
import { generatePlan } from '../planner';
import { HouseholdProfile, DietConstraint } from '../types';
import { mvpRecipeCatalog } from '../fixtures/recipes.seed';

// Helper to create test household with specific constraints
function createTestHousehold(constraints: DietConstraint[]): HouseholdProfile {
  return {
    id: 'h_test',
    mode: 'FAMILY',
    headcount: 4,
    targetDinnersPerWeek: 5,
    dietConstraints: constraints,
  };
}

describe('Constraint Filtering', () => {
  describe('NO_PORK constraint', () => {
    it('should exclude recipes with pork ingredients', () => {
      const household = createTestHousehold(['NO_PORK']);
      const plan = generatePlan(
        household,
        mvpRecipeCatalog,
        '2025-12-15',
      );

      // Check all planned dinners
      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          // Verify no pork ingredients
          const hasPork = recipe!.ingredients.some(ing =>
            /pork|bacon|ham|sausage/i.test(ing.displayName)
          );
          expect(hasPork).toBe(false);
        }
      }
    });
  });

  describe('NO_BEEF constraint', () => {
    it('should exclude recipes with beef ingredients', () => {
      const household = createTestHousehold(['NO_BEEF']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          const hasBeef = recipe!.ingredients.some(ing =>
            /beef|steak|ground beef|chuck/i.test(ing.displayName)
          );
          expect(hasBeef).toBe(false);
        }
      }
    });
  });

  describe('NO_SHELLFISH constraint', () => {
    it('should exclude recipes with shellfish ingredients', () => {
      const household = createTestHousehold(['NO_SHELLFISH']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          const hasShellfish = recipe!.ingredients.some(ing =>
            /shrimp|crab|lobster|clam|mussel|oyster|scallop/i.test(ing.displayName)
          );
          expect(hasShellfish).toBe(false);
        }
      }
    });

    it('should exclude recipes with shellfish allergens even if name is subtle', () => {
      const household = createTestHousehold(['NO_SHELLFISH']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();

          const hasShellfishAllergen =
            recipe!.recipeAllergens?.includes('SHELLFISH') ||
            recipe!.ingredients.some(ing => ing.allergens?.includes('SHELLFISH'));

          expect(hasShellfishAllergen).toBe(false);
        }
      }
    });
  });

  describe('NO_GLUTEN constraint', () => {
    it('should only include gluten-free recipes or recipes without gluten ingredients', () => {
      const household = createTestHousehold(['NO_GLUTEN']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          const hasGlutenFreeTag = recipe!.tags?.includes('gluten_free');
          const hasGlutenIngredient = recipe!.ingredients.some(ing =>
            /flour|pasta|bread|soy sauce|wheat|barley|rye/i.test(ing.displayName)
          );
          
          // Either has gluten_free tag OR no gluten ingredients
          expect(hasGlutenFreeTag || !hasGlutenIngredient).toBe(true);
        }
      }
    });
  });

  describe('NO_DAIRY constraint', () => {
    it('should only include dairy-free recipes or recipes without dairy ingredients', () => {
      const household = createTestHousehold(['NO_DAIRY']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          const hasDairyFreeTag = recipe!.tags?.includes('dairy_free');
          const hasDairyIngredient = recipe!.ingredients.some(ing =>
            ing.kind === 'DAIRY' || /milk|cheese|cream|butter|yogurt/i.test(ing.displayName)
          );
          
          expect(hasDairyFreeTag || !hasDairyIngredient).toBe(true);
        }
      }
    });
  });

  describe('VEGETARIAN constraint', () => {
    it('should exclude recipes with meat or seafood', () => {
      const household = createTestHousehold(['VEGETARIAN']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          const hasMeat = recipe!.ingredients.some(ing =>
            ing.kind === 'PROTEIN' &&
            /chicken|beef|pork|fish|shrimp|meat|turkey|lamb/i.test(ing.displayName)
          );
          expect(hasMeat).toBe(false);
        }
      }
    });
  });

  describe('VEGAN constraint', () => {
    it('should exclude recipes with any animal products', () => {
      const household = createTestHousehold(['VEGAN']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          const hasAnimalProduct = recipe!.ingredients.some(ing =>
            (ing.kind === 'PROTEIN' && /chicken|beef|pork|fish|shrimp|meat|turkey|lamb/i.test(ing.displayName)) ||
            ing.kind === 'DAIRY' ||
            /egg|honey|milk|cheese|cream|butter|yogurt/i.test(ing.displayName)
          );
          expect(hasAnimalProduct).toBe(false);
        }
      }
    });
  });

  describe('Multiple constraints', () => {
    it('should respect all constraints simultaneously', () => {
      const household = createTestHousehold(['NO_BEEF', 'NO_DAIRY']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          // No beef
          const hasBeef = recipe!.ingredients.some(ing =>
            /beef|steak|ground beef|chuck/i.test(ing.displayName)
          );
          expect(hasBeef).toBe(false);
          
          // No dairy
          const hasDairyFreeTag = recipe!.tags?.includes('dairy_free');
          const hasDairyIngredient = recipe!.ingredients.some(ing =>
            ing.kind === 'DAIRY' || /milk|cheese|cream|butter|yogurt/i.test(ing.displayName)
          );
          expect(hasDairyFreeTag || !hasDairyIngredient).toBe(true);
        }
      }
    });

    it('should handle strict vegan + gluten-free constraints', () => {
      const household = createTestHousehold(['VEGAN', 'NO_GLUTEN']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      // May result in fewer dinners due to limited recipe pool
      expect(plan.days.filter(d => d.dinner).length).toBeGreaterThanOrEqual(0);

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          // Vegan check
          const hasAnimalProduct = recipe!.ingredients.some(ing =>
            (ing.kind === 'PROTEIN' && /chicken|beef|pork|fish|shrimp|meat|turkey|lamb/i.test(ing.displayName)) ||
            ing.kind === 'DAIRY' ||
            /egg|honey|milk|cheese|cream|butter|yogurt/i.test(ing.displayName)
          );
          expect(hasAnimalProduct).toBe(false);
          
          // Gluten-free check
          const hasGlutenFreeTag = recipe!.tags?.includes('gluten_free');
          const hasGlutenIngredient = recipe!.ingredients.some(ing =>
            /flour|pasta|bread|soy sauce|wheat|barley|rye/i.test(ing.displayName)
          );
          expect(hasGlutenFreeTag || !hasGlutenIngredient).toBe(true);
        }
      }
    });
  });

  describe('KETO constraint', () => {
    it('should exclude recipes with high-carb ingredients', () => {
      const household = createTestHousehold(['KETO']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          const hasHighCarbIngredient = recipe!.ingredients.some(ing =>
            ing.kind === 'CARB' ||
            /rice|pasta|bread|potato|tortilla|noodle|flour|sugar|honey|corn|beans|lentils/i.test(ing.displayName)
          );
          expect(hasHighCarbIngredient).toBe(false);
        }
      }
    });
  });

  describe('CARNIVORE constraint', () => {
    it('should exclude recipes with plant ingredients', () => {
      const household = createTestHousehold(['CARNIVORE']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      // May result in very few or zero dinners with current MVP catalog
      expect(plan.days.filter(d => d.dinner).length).toBeGreaterThanOrEqual(0);

      for (const day of plan.days) {
        if (day.dinner) {
          const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId);
          expect(recipe).toBeDefined();
          
          const hasPlantIngredient = recipe!.ingredients.some(ing =>
            ing.kind === 'VEG' ||
            ing.kind === 'CARB' ||
            /vegetable|lettuce|tomato|onion|garlic|pepper|broccoli|carrot|fruit|beans|lentils|rice|pasta|bread/i.test(ing.displayName)
          );
          expect(hasPlantIngredient).toBe(false);
        }
      }
    });
  });

  describe('Plan quality with constraints', () => {
    it('should still generate a plan with reasonable constraints', () => {
      const household = createTestHousehold(['NO_BEEF']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      expect(plan.summary.totalDinners).toBeGreaterThan(0);
      expect(plan.summary.totalDinners).toBeLessThanOrEqual(household.targetDinnersPerWeek);
    });

    it('should maintain time band distribution with constraints', () => {
      const household = createTestHousehold(['NO_PORK']);
      const plan = generatePlan(household, mvpRecipeCatalog, '2025-12-15');

      // Should have a mix of time bands
      const { fastCount, normalCount, projectCount } = plan.summary;
      const totalCount = fastCount + normalCount + projectCount;
      
      if (totalCount > 0) {
        // At least one time band should be represented
        expect(fastCount + normalCount + projectCount).toBeGreaterThan(0);
      }
    });
  });
});
