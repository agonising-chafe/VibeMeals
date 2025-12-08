// Spec: spec-planner.md v1.0.0, vision.md v4.6.0 Golden Tests G1, G2, G4, G5, G6
// src/domain/__tests__/planner.spec.ts
import { describe, it, expect } from 'vitest';
import { generatePlan, swapRecipe, toggleLock, removeDinner, regeneratePlan, getSwapAlternatives, } from '../planner';
import { mvpRecipeCatalog } from '../fixtures/recipes.seed';
// Test fixtures
const testHousehold = {
    id: 'hh_test_family',
    mode: 'FAMILY',
    headcount: 4,
    targetDinnersPerWeek: 5,
    dietConstraints: [],
};
const testDate = '2025-01-13'; // A Monday
describe('Planner - generatePlan', () => {
    it('should generate a plan with correct week structure (7 days, Mon-Sun)', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        expect(plan.days).toHaveLength(7);
        expect(plan.days[0].dayOfWeek).toBe('Mon');
        expect(plan.days[6].dayOfWeek).toBe('Sun');
        expect(plan.weekStartDate).toBe(testDate);
    });
    it('should generate a plan with default dinner count for FAMILY mode (5 dinners)', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const plannedDinners = plan.days.filter(day => day.dinner).length;
        expect(plannedDinners).toBe(5);
    });
    it('should respect custom target dinner count', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate, { targetDinners: 3 });
        const plannedDinners = plan.days.filter(day => day.dinner).length;
        expect(plannedDinners).toBe(3);
    });
    it('should generate a plan in DRAFT status', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        expect(plan.status).toBe('DRAFT');
    });
    it('should assign household ID to plan', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        expect(plan.householdId).toBe(testHousehold.id);
    });
    it('should not assign locked status to new dinners', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const lockedDinners = plan.days.filter(day => day.dinner?.locked);
        expect(lockedDinners).toHaveLength(0);
    });
    it('should avoid recent recipes when provided', () => {
        const recentRecipeIds = [mvpRecipeCatalog[0].id, mvpRecipeCatalog[1].id];
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate, { recentRecipeIds });
        const usedRecipeIds = plan.days
            .filter(day => day.dinner)
            .map(day => day.dinner.recipeId);
        recentRecipeIds.forEach(recentId => {
            expect(usedRecipeIds).not.toContain(recentId);
        });
    });
    it('should distribute recipes across time bands appropriately', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const recipeIds = plan.days
            .filter(day => day.dinner)
            .map(day => day.dinner.recipeId);
        const usedRecipes = mvpRecipeCatalog.filter(r => recipeIds.includes(r.id));
        const fastCount = usedRecipes.filter(r => r.metadata.timeBand === 'FAST').length;
        const normalCount = usedRecipes.filter(r => r.metadata.timeBand === 'NORMAL').length;
        // FAMILY mode default: 3 FAST, 2 NORMAL
        expect(fastCount).toBeGreaterThan(0);
        expect(normalCount).toBeGreaterThan(0);
    });
});
describe('Planner - swapRecipe', () => {
    it('should swap a recipe in a specific day slot', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToSwap = plan.days.find(d => d.dinner);
        const originalRecipeId = dayToSwap.dinner.recipeId;
        const alternativeRecipe = mvpRecipeCatalog.find(r => r.id !== originalRecipeId);
        const updatedPlan = swapRecipe(plan, dayToSwap.date, alternativeRecipe.id);
        const swappedDay = updatedPlan.days.find(d => d.date === dayToSwap.date);
        expect(swappedDay.dinner.recipeId).toBe(alternativeRecipe.id);
        expect(swappedDay.dinner.recipeId).not.toBe(originalRecipeId);
    });
    it('should not swap a locked dinner', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToLock = plan.days.find(d => d.dinner);
        const lockedPlan = toggleLock(plan, dayToLock.date, true);
        const originalRecipeId = lockedPlan.days.find(d => d.date === dayToLock.date).dinner.recipeId;
        const alternativeRecipe = mvpRecipeCatalog.find(r => r.id !== originalRecipeId);
        const attemptedSwap = swapRecipe(lockedPlan, dayToLock.date, alternativeRecipe.id);
        const resultDay = attemptedSwap.days.find(d => d.date === dayToLock.date);
        expect(resultDay.dinner.recipeId).toBe(originalRecipeId);
    });
    it('should preserve other days when swapping', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToSwap = plan.days.find(d => d.dinner);
        const otherDays = plan.days.filter(d => d.date !== dayToSwap.date);
        const alternativeRecipe = mvpRecipeCatalog.find(r => r.id !== dayToSwap.dinner.recipeId);
        const updatedPlan = swapRecipe(plan, dayToSwap.date, alternativeRecipe.id);
        otherDays.forEach(originalDay => {
            const updatedDay = updatedPlan.days.find(d => d.date === originalDay.date);
            expect(updatedDay).toEqual(originalDay);
        });
    });
});
describe('Planner - toggleLock', () => {
    it('should lock a dinner slot', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToLock = plan.days.find(d => d.dinner);
        const updatedPlan = toggleLock(plan, dayToLock.date, true);
        const lockedDay = updatedPlan.days.find(d => d.date === dayToLock.date);
        expect(lockedDay.dinner.locked).toBe(true);
    });
    it('should unlock a dinner slot', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToLock = plan.days.find(d => d.dinner);
        const lockedPlan = toggleLock(plan, dayToLock.date, true);
        const unlockedPlan = toggleLock(lockedPlan, dayToLock.date, false);
        const unlockedDay = unlockedPlan.days.find(d => d.date === dayToLock.date);
        expect(unlockedDay.dinner.locked).toBe(false);
    });
});
describe('Planner - removeDinner', () => {
    it('should remove a dinner from a day', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToRemove = plan.days.find(d => d.dinner);
        const updatedPlan = removeDinner(plan, dayToRemove.date);
        const removedDay = updatedPlan.days.find(d => d.date === dayToRemove.date);
        expect(removedDay.dinner).toBeUndefined();
    });
    it('should not remove a locked dinner', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToLock = plan.days.find(d => d.dinner);
        const lockedPlan = toggleLock(plan, dayToLock.date, true);
        const attemptedRemoval = removeDinner(lockedPlan, dayToLock.date);
        const resultDay = attemptedRemoval.days.find(d => d.date === dayToLock.date);
        expect(resultDay.dinner).toBeDefined();
        expect(resultDay.dinner.locked).toBe(true);
    });
    it('should reduce planned dinner count after removal', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const originalDinnerCount = plan.days.filter(d => d.dinner).length;
        const dayToRemove = plan.days.find(d => d.dinner);
        const updatedPlan = removeDinner(plan, dayToRemove.date);
        const newDinnerCount = updatedPlan.days.filter(d => d.dinner).length;
        expect(newDinnerCount).toBe(originalDinnerCount - 1);
    });
});
describe('Planner - regeneratePlan', () => {
    it('should regenerate unlocked dinners only', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        // Lock first two dinners
        const daysWithDinners = plan.days.filter(d => d.dinner);
        let lockedPlan = toggleLock(plan, daysWithDinners[0].date, true);
        lockedPlan = toggleLock(lockedPlan, daysWithDinners[1].date, true);
        const lockedRecipeIds = [
            daysWithDinners[0].dinner.recipeId,
            daysWithDinners[1].dinner.recipeId,
        ];
        const regenerated = regeneratePlan(lockedPlan, mvpRecipeCatalog, testHousehold);
        // Locked recipes should remain
        const regeneratedDay0 = regenerated.days.find(d => d.date === daysWithDinners[0].date);
        const regeneratedDay1 = regenerated.days.find(d => d.date === daysWithDinners[1].date);
        expect(regeneratedDay0.dinner.recipeId).toBe(lockedRecipeIds[0]);
        expect(regeneratedDay1.dinner.recipeId).toBe(lockedRecipeIds[1]);
        expect(regeneratedDay0.dinner.locked).toBe(true);
        expect(regeneratedDay1.dinner.locked).toBe(true);
    });
    it('should maintain plan structure after regeneration', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const regenerated = regeneratePlan(plan, mvpRecipeCatalog, testHousehold);
        expect(regenerated.days).toHaveLength(7);
        expect(regenerated.weekStartDate).toBe(plan.weekStartDate);
        expect(regenerated.householdId).toBe(plan.householdId);
    });
    it('should avoid locked and recent recipes when regenerating', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToLock = plan.days.find(d => d.dinner);
        const lockedPlan = toggleLock(plan, dayToLock.date, true);
        const recentRecipeIds = [mvpRecipeCatalog[0].id, mvpRecipeCatalog[1].id];
        const regenerated = regeneratePlan(lockedPlan, mvpRecipeCatalog, testHousehold, { recentRecipeIds });
        const usedRecipeIds = regenerated.days
            .filter(d => d.dinner && !d.dinner.locked)
            .map(d => d.dinner.recipeId);
        recentRecipeIds.forEach(recentId => {
            expect(usedRecipeIds).not.toContain(recentId);
        });
    });
});
describe('Planner - getSwapAlternatives', () => {
    it('should return alternative recipes for swapping', () => {
        const currentRecipe = mvpRecipeCatalog[0];
        const alternatives = getSwapAlternatives(currentRecipe, mvpRecipeCatalog, testHousehold);
        expect(alternatives.length).toBeGreaterThan(0);
        expect(alternatives.length).toBeLessThanOrEqual(4);
    });
    it('should not include the current recipe in alternatives', () => {
        const currentRecipe = mvpRecipeCatalog[0];
        const alternatives = getSwapAlternatives(currentRecipe, mvpRecipeCatalog, testHousehold);
        const currentRecipeInAlternatives = alternatives.some(r => r.id === currentRecipe.id);
        expect(currentRecipeInAlternatives).toBe(false);
    });
    it('should prefer recipes of same or easier time band', () => {
        const normalRecipe = mvpRecipeCatalog.find(r => r.metadata.timeBand === 'NORMAL');
        const alternatives = getSwapAlternatives(normalRecipe, mvpRecipeCatalog, testHousehold);
        alternatives.forEach(alt => {
            const timeBandOrder = { FAST: 0, NORMAL: 1, PROJECT: 2 };
            expect(timeBandOrder[alt.metadata.timeBand]).toBeLessThanOrEqual(timeBandOrder[normalRecipe.metadata.timeBand]);
        });
    });
});
describe('Planner - Golden Test G2: Planning is a 5-10 min check-in', () => {
    it('should generate a complete plan in a single function call (no wizard)', () => {
        // This test validates that generatePlan() is a one-step operation
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        expect(plan.days).toHaveLength(7);
        expect(plan.status).toBe('DRAFT');
        expect(plan.days.filter(d => d.dinner).length).toBeGreaterThan(0);
    });
});
describe('Planner - Golden Test G4: Plans bend, they don\'t break', () => {
    it('should support lighter weeks (fewer dinners)', () => {
        const lightPlan = generatePlan(testHousehold, mvpRecipeCatalog, testDate, { targetDinners: 2 });
        const plannedDinners = lightPlan.days.filter(d => d.dinner).length;
        expect(plannedDinners).toBe(2);
        expect(lightPlan.days).toHaveLength(7); // Still 7 days, just fewer dinners
    });
    it('should allow removing dinners mid-week', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const originalCount = plan.days.filter(d => d.dinner).length;
        const dayToRemove = plan.days.find(d => d.dinner);
        const flexedPlan = removeDinner(plan, dayToRemove.date);
        const newCount = flexedPlan.days.filter(d => d.dinner).length;
        expect(newCount).toBe(originalCount - 1);
    });
});
describe('Planner - Golden Test G6: Respect constraints & ability', () => {
    it('should respect locked slots during regeneration', () => {
        const plan = generatePlan(testHousehold, mvpRecipeCatalog, testDate);
        const dayToLock = plan.days.find(d => d.dinner);
        const lockedRecipeId = dayToLock.dinner.recipeId;
        const lockedPlan = toggleLock(plan, dayToLock.date, true);
        const regenerated = regeneratePlan(lockedPlan, mvpRecipeCatalog, testHousehold);
        const lockedDay = regenerated.days.find(d => d.date === dayToLock.date);
        expect(lockedDay.dinner.recipeId).toBe(lockedRecipeId);
        expect(lockedDay.dinner.locked).toBe(true);
    });
});
