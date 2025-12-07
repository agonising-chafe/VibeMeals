// src/dev/preview-week.ts
// Simple dev harness to inspect ShoppingList and TonightState using seed data.

import {
  Plan,
  PlanDay,
  PlannedDinner,
  IsoDate,
  HouseholdId,
  PlanId,
  TonightState,
  MissingItem,
  Substitution,
} from '../domain/types';

import {
  sheetPanChickenVeg,
  slowCookerChili,
  pantryRescuePasta,
  beefTacoNight,
  marinatedChickenBowls,
  seedRecipes,
} from '../domain/fixtures/recipes.seed';
import { buildShoppingList } from '../domain/shop';
import { computeTonightState } from '../domain/today';

const HOUSEHOLD_ID: HouseholdId = 'hh_demo';
const PLAN_ID: PlanId = 'plan_demo_week';
const WEEK_START: IsoDate = '2025-01-06'; // Monday

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
      dinner: undefined,
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

function buildDemoPlan(): Plan {
  const days = makeEmptyWeek();

  const map: Record<string, string> = {
    '2025-01-06': sheetPanChickenVeg.id, // Mon – Fast
    '2025-01-07': slowCookerChili.id, // Tue – Project
    '2025-01-08': pantryRescuePasta.id, // Wed – backup
    '2025-01-09': beefTacoNight.id, // Thu – family
    '2025-01-10': marinatedChickenBowls.id, // Fri – preflight
  };

  for (const day of days) {
    const recipeId = map[day.date];
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
      totalDinners: 5,
      fastCount: 2,
      normalCount: 2,
      projectCount: 1,
      thawDays: 0,
      marinateDays: 1,
    },
  };
}

function printShoppingList() {
  const plan = buildDemoPlan();
  const shoppingList = buildShoppingList(plan, seedRecipes);

  console.log('=== DEMO SHOPPING LIST ===');
  console.log(`Plan: ${plan.id} – ${plan.weekStartDate}`);
  console.log(`Items: ${shoppingList.items.length}`);
  console.log('');

  for (const item of shoppingList.items) {
    const critical = item.criticality === 'CRITICAL' ? '(!)' : '   ';
    const usedIn = item.usedIn.map(u => u.recipeName).join(', ');
    console.log(
      `${critical} ${item.displayName} – ${item.totalAmount} ${item.unit} [${item.shoppingCategory}]`,
    );
    console.log(`    Used in: ${usedIn}`);
  }

  console.log('\nQuick Review candidates:');
  for (const qr of shoppingList.quickReviewCandidates) {
    const item = shoppingList.items.find(i => i.id === qr.shoppingItemId);
    if (!item) continue;
    console.log(`- ${item.displayName} (${item.shoppingCategory}) [reason: ${qr.reason}]`);
  }
}

function printTonightState(date: IsoDate, missingItems: MissingItem[] = []) {
  const plan = buildDemoPlan();

  const tonight: TonightState = computeTonightState(
    plan,
    seedRecipes,
    missingItems,
    [] as Substitution[],
    date,
    new Date(),
  );

  console.log(`\n=== TONIGHT STATE – ${date} ===`);
  console.log(`Status: ${tonight.status}`);
  console.log(`Message: ${tonight.primaryMessage}`);
  if (tonight.secondaryMessage) console.log(`Details: ${tonight.secondaryMessage}`);

  if (tonight.context.recipe) {
    console.log(`Recipe: ${tonight.context.recipe.name}`);
  } else {
    console.log('Recipe: (none planned)');
  }

  if (tonight.issues.missingCoreIngredients.length > 0) {
    console.log('Missing core ingredients:');
    for (const m of tonight.issues.missingCoreIngredients) {
      console.log(`- ${m.displayName} (${m.ingredientId})`);
    }
  }

  if (tonight.issues.missingNonCriticalIngredients.length > 0) {
    console.log('Missing non-critical ingredients:');
    for (const m of tonight.issues.missingNonCriticalIngredients) {
      console.log(`- ${m.displayName} (${m.ingredientId})`);
    }
  }

  console.log('Actions:');
  console.log(`- canStartCooking: ${tonight.actions.canStartCooking}`);
  console.log(`- canUseEasierOption: ${tonight.actions.canUseEasierOption}`);
  console.log(`- canMarkOutEating: ${tonight.actions.canMarkOutEating}`);
  console.log(`- canChangeDinner: ${tonight.actions.canChangeDinner}`);

  if (tonight.tomorrowPreview) {
    const t = tonight.tomorrowPreview;
    console.log(
      `Tomorrow: ${t.date} – ${t.recipeName ?? 'nothing planned'} ` +
        `${t.keyPreflightNote ? `(preflight: ${t.keyPreflightNote})` : ''}`,
    );
  }
}

function main() {
  printShoppingList();

  // Case 1: READY (sheet pan on Monday, no missing / no preflight)
  printTonightState('2025-01-06');

  // Case 2: MISSED_PREFLIGHT (simulate by marking Fri preflight as missed)
  const planForPreflight = buildDemoPlan();
  const friday = planForPreflight.days.find(d => d.date === '2025-01-10');
  if (friday && friday.dinner) {
    friday.dinner.preflightStatus = 'MISSED';
  }
  const preflightState: TonightState = computeTonightState(
    planForPreflight,
    seedRecipes,
    [],
    [],
    '2025-01-10',
    new Date(),
  );
  console.log('\n=== TONIGHT STATE – 2025-01-10 (preflight missed) ===');
  console.log(`Status: ${preflightState.status}`);
  console.log(`Message: ${preflightState.primaryMessage}`);

  // Case 3: MISSING_INGREDIENT (mark chicken as missing for Monday)
  const sheetPanRecipe = sheetPanChickenVeg;
  const criticalChicken = sheetPanRecipe.ingredients.find(ing => ing.criticality === 'CRITICAL');
  const fakeMissing: MissingItem[] = [];
  if (criticalChicken) {
    fakeMissing.push({
      id: 'miss_1',
      planId: PLAN_ID,
      shoppingItemId: 'si_fake',
      ingredientId: criticalChicken.ingredientId,
      ingredientName: criticalChicken.displayName,
      reason: 'OUT_OF_STOCK',
      affectsTonight: true,
      affectsFuture: false,
      note: 'Store was out',
    });
  }

  printTonightState('2025-01-06', fakeMissing);
}

main();
