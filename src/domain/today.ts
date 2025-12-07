// src/domain/today.ts

import {
  Plan,
  Recipe,
  MissingItem,
  Substitution,
  IsoDate,
  TonightState,
  TonightStatus,
  TonightPlanContext,
  TonightIssues,
  TonightActions,
  TomorrowPreview,
  PreflightStatus,
  IngredientCriticality,
  DayOfWeek,
} from './types';

function resolveDay(plan: Plan, date: IsoDate) {
  return plan.days.find(d => d.date === date);
}

function resolveRecipe(recipes: Recipe[], recipeId?: string): Recipe | undefined {
  if (!recipeId) return undefined;
  return recipes.find(r => r.id === recipeId);
}

function computeTomorrowPreview(
  plan: Plan,
  recipes: Recipe[],
  today: IsoDate,
): TomorrowPreview | undefined {
  const todayIdx = plan.days.findIndex(d => d.date === today);
  if (todayIdx === -1 || todayIdx >= plan.days.length - 1) return undefined;

  const tomorrow = plan.days[todayIdx + 1];
  if (!tomorrow) return undefined;

  const preview: TomorrowPreview = {
    date: tomorrow.date,
    dayOfWeek: tomorrow.dayOfWeek,
    dinnerPlanned: Boolean(tomorrow.dinner),
  };

  if (tomorrow.dinner) {
    const recipe = resolveRecipe(recipes, tomorrow.dinner.recipeId);
    preview.recipeName = recipe?.name;
    preview.timeBand = recipe?.metadata.timeBand;

    if (recipe && recipe.preflight && recipe.preflight.length > 0) {
      preview.keyPreflightNote = recipe.preflight[0]?.description;
    }
  }

  return preview;
}

function missingByCriticality(
  recipe: Recipe,
  missingItems: MissingItem[],
): {
  core: { ingredientId: string; displayName: string }[];
  nonCore: { ingredientId: string; displayName: string }[];
} {
  const criticalityById = new Map<string, IngredientCriticality>();
  const nameById = new Map<string, string>();

  for (const ing of recipe.ingredients) {
    criticalityById.set(ing.ingredientId, ing.criticality);
    nameById.set(ing.ingredientId, ing.displayName);
  }

  const core: { ingredientId: string; displayName: string }[] = [];
  const nonCore: { ingredientId: string; displayName: string }[] = [];

  for (const m of missingItems) {
    const ingId = m.ingredientId;
    const crit = criticalityById.get(ingId) ?? 'NON_CRITICAL';
    const displayName = m.ingredientName ?? nameById.get(ingId) ?? 'Missing item';
    if (crit === 'CRITICAL') {
      core.push({ ingredientId: ingId, displayName });
    } else {
      nonCore.push({ ingredientId: ingId, displayName });
    }
  }

  return { core, nonCore };
}

/**
 * Compute TonightState from plan + recipes + missing items + substitutions.
 * Preflight detection is assumed to have set PlannedDinner.preflightStatus upstream.
 */
export function computeTonightState(
  plan: Plan,
  recipes: Recipe[],
  missingItems: MissingItem[],
  substitutions: Substitution[],
  today: IsoDate,
  currentTime?: Date,
): TonightState {
  const day = resolveDay(plan, today);

  if (!day) {
    const fallbackDayOfWeek: DayOfWeek = 'Mon';
    return {
      planId: plan.id,
      householdId: plan.householdId,
      status: 'NO_PLAN',
      primaryMessage: 'No plan found for tonight.',
      context: {
        date: today,
        dayOfWeek: fallbackDayOfWeek,
        dinner: undefined,
        recipe: undefined,
      },
      issues: {
        preflightStatus: 'NONE_REQUIRED',
        missingCoreIngredients: [],
        missingNonCriticalIngredients: [],
      },
      actions: {
        canStartCooking: false,
        canUseEasierOption: true,
        canMarkOutEating: true,
        canChangeDinner: true,
      },
      tomorrowPreview: computeTomorrowPreview(plan, recipes, today),
    };
  }

  const dinner = day.dinner;
  const recipe = dinner ? resolveRecipe(recipes, dinner.recipeId) : undefined;

  const context: TonightPlanContext = {
    date: day.date,
    dayOfWeek: day.dayOfWeek,
    dinner,
    recipe,
  };

  const issues: TonightIssues = {
    preflightStatus: dinner?.preflightStatus ?? 'NONE_REQUIRED',
    missingCoreIngredients: [],
    missingNonCriticalIngredients: [],
  };

  const baseActions: TonightActions = {
    canStartCooking: false,
    canUseEasierOption: true,
    canMarkOutEating: true,
    canChangeDinner: true,
  };

  if (!dinner || !recipe) {
    return {
      planId: plan.id,
      householdId: plan.householdId,
      status: 'NO_PLAN',
      primaryMessage: 'No dinner is planned for tonight yet.',
      context,
      issues,
      actions: { ...baseActions, canStartCooking: false },
      tomorrowPreview: computeTomorrowPreview(plan, recipes, today),
    };
  }

  const todaysMissing = missingItems.filter(
    m => m.planId === plan.id && m.affectsTonight,
  );

  const { core, nonCore } = missingByCriticality(recipe, todaysMissing);
  issues.missingCoreIngredients = core;
  issues.missingNonCriticalIngredients = nonCore;

  const preflightStatus: PreflightStatus = dinner.preflightStatus ?? 'NONE_REQUIRED';

  let status: TonightStatus = 'READY';
  let primaryMessage = "You're all set for tonight.";
  let secondaryMessage: string | undefined;
  const actions: TonightActions = { ...baseActions, canStartCooking: true };

  if (core.length > 0) {
    status = 'MISSING_INGREDIENT';
    primaryMessage = "It looks like we're missing a key ingredient for tonight.";
    secondaryMessage = 'Swap, move, or pick a backup recipe.';
    actions.canStartCooking = false;
  } else if (preflightStatus === 'MISSED') {
    status = 'MISSED_PREFLIGHT';
    primaryMessage = 'It looks like we missed the marinate/prep for tonight.';
    secondaryMessage = 'Swap, move, or pick a backup recipe.';
    actions.canStartCooking = false;
  } else if (preflightStatus === 'ALL_GOOD' || preflightStatus === 'NONE_REQUIRED') {
    status = 'READY';
    primaryMessage = "You're all set for tonight.";
    actions.canStartCooking = true;
  } else {
    status = 'READY';
    primaryMessage = "Tonight's dinner is planned; adjust if needed.";
    actions.canStartCooking = true;
  }

  return {
    planId: plan.id,
    householdId: plan.householdId,
    status,
    primaryMessage,
    secondaryMessage,
    context,
    issues: { ...issues, preflightStatus },
    actions,
    tomorrowPreview: computeTomorrowPreview(plan, recipes, today),
  };
}
