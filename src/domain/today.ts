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
    if (recipe?.name) preview.recipeName = recipe.name;
    if (recipe?.metadata.timeBand) preview.timeBand = recipe.metadata.timeBand;

    if (recipe && recipe.preflight && recipe.preflight.length > 0) {
      const note = recipe.preflight[0]?.description;
      if (typeof note === 'string' && note.length > 0) {
        preview.keyPreflightNote = note;
      }
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
  _substitutions: Substitution[],
  today: IsoDate,
  _currentTime?: Date,
): TonightState {
  const day = resolveDay(plan, today);

  if (!day) {
    const fallbackDayOfWeek: DayOfWeek = 'Mon';
    const asContext: TonightPlanContext = {
      date: today,
      dayOfWeek: fallbackDayOfWeek,
    };
    const stateBase: Omit<TonightState, 'tomorrowPreview' | 'secondaryMessage'> = {
      planId: plan.id,
      householdId: plan.householdId,
      status: 'NO_PLAN',
      primaryMessage: 'No plan found for tonight.',
      context: asContext,
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
    };
    const preview = computeTomorrowPreview(plan, recipes, today);
    return preview ? { ...stateBase, tomorrowPreview: preview } : stateBase;
  }

  const dinner = day.dinner;
  const recipe = dinner ? resolveRecipe(recipes, dinner.recipeId) : undefined;

  const context: TonightPlanContext = {
    date: day.date,
    dayOfWeek: day.dayOfWeek,
  };
  if (dinner) context.dinner = dinner;
  if (recipe) context.recipe = recipe;

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
    const stateBase: Omit<TonightState, 'tomorrowPreview' | 'secondaryMessage'> = {
      planId: plan.id,
      householdId: plan.householdId,
      status: 'NO_PLAN',
      primaryMessage: 'No dinner is planned for tonight yet.',
      context,
      issues,
      actions: { ...baseActions, canStartCooking: false },
    };
    const preview = computeTomorrowPreview(plan, recipes, today);
    return preview ? { ...stateBase, tomorrowPreview: preview } : stateBase;
  }

  const todaysMissing = missingItems.filter(
    m => m.planId === plan.id && m.affectsTonight,
  );

  const { core, nonCore } = missingByCriticality(recipe, todaysMissing);
  issues.missingCoreIngredients = core;
  issues.missingNonCriticalIngredients = nonCore;

  const preflightStatus: PreflightStatus = dinner.preflightStatus ?? 'NONE_REQUIRED';

  // If the recipe declares preflight requirements but the dinner status is NONE_REQUIRED/UNKNOWN,
  // treat as MISSED to avoid false READY (Vision G1 safety).
  const hasPreflightRequirements = recipe?.preflight && recipe.preflight.length > 0;
  const effectivePreflightStatus: PreflightStatus = hasPreflightRequirements
    ? preflightStatus === 'NONE_REQUIRED' || preflightStatus === 'UNKNOWN'
      ? 'MISSED'
      : preflightStatus
    : preflightStatus;

  let status: TonightStatus = 'READY';
  let primaryMessage = "You're all set for tonight.";
  let secondaryMessage: string | undefined;
  const actions: TonightActions = { ...baseActions, canStartCooking: true };

  if (core.length > 0) {
    status = 'MISSING_INGREDIENT';
    primaryMessage = "It looks like we're missing a key ingredient for tonight.";
    secondaryMessage = 'Swap, move, or pick a backup recipe.';
    actions.canStartCooking = false;
  } else if (effectivePreflightStatus === 'MISSED') {
    status = 'MISSED_PREFLIGHT';
    primaryMessage = 'It looks like we missed the marinate/prep for tonight.';
    secondaryMessage = 'Swap, move, or pick a backup recipe.';
    actions.canStartCooking = false;
  } else if (effectivePreflightStatus === 'ALL_GOOD' || effectivePreflightStatus === 'NONE_REQUIRED') {
    status = 'READY';
    primaryMessage = "You're all set for tonight.";
    actions.canStartCooking = true;
  } else {
    status = 'READY';
    primaryMessage = "Tonight's dinner is planned; adjust if needed.";
    actions.canStartCooking = true;
  }

  const stateBase: Omit<TonightState, 'secondaryMessage' | 'tomorrowPreview'> = {
    planId: plan.id,
    householdId: plan.householdId,
    status,
    primaryMessage,
    context,
    issues: { ...issues, preflightStatus },
    actions,
  };
  if (secondaryMessage) {
    // Use a type assertion to avoid accidental mutation in place
    (stateBase as any).secondaryMessage = secondaryMessage;
  }
  const preview = computeTomorrowPreview(plan, recipes, today);
  return preview ? { ...stateBase, tomorrowPreview: preview } : stateBase;
}
