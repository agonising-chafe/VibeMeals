// src/dev/preview-planner.ts
// Spec: spec-planner.md v1.0.0
// Interactive preview of planner domain logic

import { generatePlan, swapRecipe, toggleLock, regeneratePlan, getSwapAlternatives } from '../domain/planner.js';
import { mvpRecipeCatalog } from '../domain/fixtures/recipes.seed.js';
import { HouseholdProfile, IsoDate } from '../domain/types.js';

console.log('🍽️  VibeMeals Planner Preview\n');
console.log('Spec: spec-planner.md v1.0.0');
console.log('Golden Tests: G1, G2, G4, G5, G6 from vision.md v4.6.0\n');

// Test household
const household: HouseholdProfile = {
  id: 'hh_preview_family',
  mode: 'FAMILY',
  headcount: 4,
  targetDinnersPerWeek: 5,
  dietConstraints: [],
};

const today = new Date();
const monday = new Date(today);
monday.setDate(today.getDate() - today.getDay() + 1); // Next Monday
const weekStart = monday.toISOString().slice(0, 10) as IsoDate;

console.log('📋 SCENARIO 1: Generate Initial Plan\n');
console.log(`Household: ${household.mode} mode, ${household.headcount} people`);
console.log(`Week of: ${weekStart}\n`);

const plan = generatePlan(household, mvpRecipeCatalog, weekStart);

console.log('Generated Plan:');
plan.days.forEach(day => {
  if (day.dinner) {
    const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId)!;
    const locked = day.dinner.locked ? '🔒' : '  ';
    console.log(`  ${locked} ${day.dayOfWeek} (${day.date}): ${recipe.name} [${recipe.metadata.timeBand}, ${recipe.metadata.estimatedMinutes}min]`);
  } else {
    console.log(`     ${day.dayOfWeek} (${day.date}): No dinner planned`);
  }
});

console.log('\n📋 SCENARIO 2: Lock a Dinner\n');
const dayToLock = plan.days.find(d => d.dinner)!;
const lockedPlan = toggleLock(plan, dayToLock.date, true);
const lockedRecipe = mvpRecipeCatalog.find(r => r.id === dayToLock.dinner!.recipeId)!;
console.log(`Locked: ${dayToLock.dayOfWeek} - ${lockedRecipe.name}`);

console.log('\n📋 SCENARIO 3: Regenerate (Respecting Lock)\n');
const regenerated = regeneratePlan(lockedPlan, mvpRecipeCatalog, household);

console.log('Regenerated Plan:');
regenerated.days.forEach(day => {
  if (day.dinner) {
    const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId)!;
    const locked = day.dinner.locked ? '🔒' : '  ';
    const changed = plan.days.find(d => d.date === day.date)?.dinner?.recipeId !== day.dinner.recipeId ? '(changed)' : '';
    console.log(`  ${locked} ${day.dayOfWeek} (${day.date}): ${recipe.name} [${recipe.metadata.timeBand}] ${changed}`);
  } else {
    console.log(`     ${day.dayOfWeek} (${day.date}): No dinner planned`);
  }
});

console.log('\n📋 SCENARIO 4: Swap Alternatives\n');
const dayToSwap = regenerated.days.find(d => d.dinner && !d.dinner.locked)!;
const currentRecipe = mvpRecipeCatalog.find(r => r.id === dayToSwap.dinner!.recipeId)!;
const alternatives = getSwapAlternatives(currentRecipe, mvpRecipeCatalog, household);

console.log(`Current: ${currentRecipe.name} [${currentRecipe.metadata.timeBand}, ${currentRecipe.metadata.estimatedMinutes}min]`);
console.log('Alternatives:');
alternatives.slice(0, 4).forEach((alt, i) => {
  console.log(`  ${i + 1}. ${alt.name} [${alt.metadata.timeBand}, ${alt.metadata.estimatedMinutes}min]`);
});

if (alternatives.length > 0) {
  const swappedPlan = swapRecipe(regenerated, dayToSwap.date, alternatives[0].id);
  console.log(`\nSwapped to: ${alternatives[0].name}`);
}

console.log('\n📋 SCENARIO 5: Lighter Week (3 dinners)\n');
const lightPlan = generatePlan(household, mvpRecipeCatalog, weekStart, { targetDinners: 3 });

console.log('Light Plan (3 dinners):');
lightPlan.days.forEach(day => {
  if (day.dinner) {
    const recipe = mvpRecipeCatalog.find(r => r.id === day.dinner!.recipeId)!;
    console.log(`  ✓ ${day.dayOfWeek} (${day.date}): ${recipe.name}`);
  } else {
    console.log(`    ${day.dayOfWeek} (${day.date}): —`);
  }
});

console.log('\n✅ Planner Preview Complete\n');
console.log('Golden Tests Demonstrated:');
console.log('  G2: Planning is 5-10 min check-in (one-step generation)');
console.log('  G4: Plans bend (lighter week, swap, lock/unlock)');
console.log('  G6: Respect constraints (locked dinners preserved)\n');
