// Shared domain types (aligned with docs/data-model.md)
//
// CRITICAL: This file must stay in perfect sync with docs/data-model.md v1.2.0
// Any change to types here requires updating the spec, and vice versa.
// Last sync: December 8, 2025 — VALIDATION COMPLETE ✅
//
// See .github/copilot-instructions.md for the sync workflow.

export type PlanId = string;
export type HouseholdId = string;
export type RecipeId = string;
export type ShoppingItemId = string;
export type IsoDate = string; // YYYY-MM-DD

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type TimeBand = 'FAST' | 'NORMAL' | 'PROJECT';
export type IngredientCriticality = 'CRITICAL' | 'NON_CRITICAL';
export type IngredientKind =
  | 'PROTEIN'
  | 'CARB'
  | 'VEG'
  | 'DAIRY'
  | 'FAT_OIL'
  | 'SPICE'
  | 'CONDIMENT'
  | 'OTHER';
export type ShoppingCategory =
  | 'PRODUCE'
  | 'MEAT_SEAFOOD'
  | 'DAIRY_EGGS'
  | 'PANTRY_DRY'
  | 'FROZEN'
  | 'OTHER';
export type PreflightRequirementType = 'THAW' | 'MARINATE' | 'SLOW_COOK' | 'LONG_PREP';
export type PreflightStatus = 'NONE_REQUIRED' | 'ALL_GOOD' | 'MISSED' | 'UNKNOWN';
export type TonightStatus =
  | 'NO_PLAN'
  | 'READY'
  | 'MISSED_PREFLIGHT'
  | 'MISSING_INGREDIENT'
  | 'OUT_EATING'
  | 'EASIER_OPTION_SELECTED';

export type DietConstraint =
  | 'NO_PORK'
  | 'NO_BEEF'
  | 'NO_SHELLFISH'
  | 'NO_GLUTEN'
  | 'NO_DAIRY'
  | 'VEGETARIAN'
  | 'VEGAN';

/**
 * Household Mode – Core lifestyle categories for week shapes & planning
 *
 * - SOLO: Single person, 2-4 dinners/week, minimizes waste
 * - FAMILY: Household with kids (3-7+ people), 4-7 dinners/week
 * - DINK: Dual-Income, No Kids (2 adults), 3-5 dinners/week, flexible social calendar
 * - EMPTY_NEST: Older couple or mature household (2+ adults), 3-4 dinners/week, comfort rotation
 * - LARGE: Multi-generational or extended household (5-8+ people), 3-5 dinners/week, portion scaling
 *
 * Vision: §5.2 (Household Modes & Default Week Shapes)
 * Each mode has different week shape defaults (see planner.ts WEEK_SHAPE_DEFAULTS)
 */
export type HouseholdMode =
  | 'SOLO'       // Single person
  | 'FAMILY'     // Household with kids
  | 'DINK'       // Dual-income, no kids (2 adults, social & flexible)
  | 'EMPTY_NEST' // Mature couple, comfort rotation
  | 'LARGE';     // Multi-generational or extended household

export interface HouseholdProfile {
  id: HouseholdId;
  mode: HouseholdMode;
  headcount: number;
  targetDinnersPerWeek: number;
  dietConstraints: DietConstraint[];
  timeBandPreference?: {
    preferredFastCount?: number;
    preferredNormalCount?: number;
    preferredProjectCount?: number;
  };
}

export interface RecipeIngredientRequirement {
  ingredientId: string;
  displayName: string;
  amount: number;
  unit: 'UNIT' | 'GRAM' | 'KG' | 'OZ' | 'LB' | 'CUP' | 'TBSP' | 'TSP' | 'ML';
  criticality: IngredientCriticality;
  kind: IngredientKind;
  shoppingCategory: ShoppingCategory;
}

export interface RecipePreflightRequirement {
  type: PreflightRequirementType;
  description: string;
  hoursBeforeCook?: number;
}

export interface RecipeMetadata {
  timeBand: TimeBand;
  estimatedMinutes: number;
  equipmentTags?: string[];
  leftoverStrategy?: 'NONE' | 'EXPECTED' | 'COOK_ONCE_EAT_TWICE';
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;     // Max 2-3 sentences, beginner-friendly
  duration?: number;       // Minutes for this step (for timers in Cooking Mode)
  timerMinutes?: number;   // Duration for timer (3+ minutes)
  timer?: boolean;         // Should show [Set Timer] button in Cooking Mode (default: false)
  parallel?: boolean;      // "Meanwhile" or "while X cooks" (for UI hints) (default: false)
}

export interface Recipe {
  id: RecipeId;
  name: string;
  slug: string;
  metadata: RecipeMetadata;
  scalable?: boolean; // Defaults to true; set false for non-scalable dishes
  ingredients: RecipeIngredientRequirement[];
  preflight: RecipePreflightRequirement[];
  steps: RecipeStep[];
  tags?: string[];
  variantHints?: { description: string; safeSubIngredientId?: string }[];
}

export interface PlannedDinner {
  recipeId: RecipeId;
  servings: number;
  locked: boolean;
  outEating: boolean;
  preflightStatus: PreflightStatus;
  originalRecipeId?: RecipeId;
}

export interface PlanDay {
  date: IsoDate;
  dayOfWeek: DayOfWeek;
  dinner?: PlannedDinner;
}

export type PlanStatus = 'DRAFT' | 'PLANNED' | 'SHOPPED';

export interface Plan {
  id: PlanId;
  householdId: HouseholdId;
  weekStartDate: IsoDate;
  status: PlanStatus;
   // Optional per-week override for servings; defaults to household.headcount
  servingsThisWeek?: number;
  // Indicates whether the main shop has been completed for this plan
  // Once true, regenerate flows should warn and respect locked slots (Vision §7)
  isShoppingDone?: boolean;
  days: PlanDay[];
  summary: {
    totalDinners: number;
    fastCount: number;
    normalCount: number;
    projectCount: number;
    thawDays: number;
    marinateDays: number;
  };
}

export interface ShoppingItemSourceUsage {
  recipeId: RecipeId;
  recipeName: string;
  amountPortion?: number;
}

export interface ShoppingItem {
  id: ShoppingItemId;
  planId: PlanId;
  ingredientId: string;
  displayName: string;
  shoppingCategory: ShoppingCategory;
  totalAmount: number;
  unit: RecipeIngredientRequirement['unit'];
  usedIn: ShoppingItemSourceUsage[];
  checked: boolean;
  manualOverrideAmount?: number;
  notes?: string;
  criticality: IngredientCriticality;
}

export interface QuickReviewCandidate {
  shoppingItemId: ShoppingItemId;
  reason: 'PANTRY_STAPLE' | 'BULK_STAPLE';
  decision: 'NEED_IT' | 'HAVE_IT' | 'NOT_SURE';
}

export interface ShoppingList {
  planId: PlanId;
  items: ShoppingItem[];
  quickReviewCandidates: QuickReviewCandidate[];
}

export type MissingReason = 'OUT_OF_STOCK' | 'SUBBED' | 'USER_MARKED';

export interface MissingItem {
  id: string;
  planId: PlanId;
  shoppingItemId: ShoppingItemId;
  ingredientId: string;
  ingredientName: string;
  reason: MissingReason;
  affectsTonight: boolean;
  affectsFuture: boolean;
  note?: string;
}

export interface Substitution {
  shoppingItemId: ShoppingItemId;
  planId: PlanId;
  substituteName: string;
  substituteIngredientId?: string;
  note?: string;
}

export interface TonightPlanContext {
  date: IsoDate;
  dayOfWeek: DayOfWeek;
  dinner?: PlannedDinner;
  recipe?: Recipe;
}

export interface TonightIssues {
  preflightStatus: PreflightStatus;
  missingCoreIngredients: { ingredientId: string; displayName: string }[];
  missingNonCriticalIngredients: { ingredientId: string; displayName: string }[];
}

export interface TonightActions {
  canStartCooking: boolean;
  canUseEasierOption: boolean;
  canMarkOutEating: boolean;
  canChangeDinner: boolean;
}

export interface TomorrowPreview {
  date: IsoDate;
  dayOfWeek: DayOfWeek;
  dinnerPlanned: boolean;
  recipeName?: string;
  timeBand?: TimeBand;
  keyPreflightNote?: string;
}

export interface TonightState {
  planId: PlanId;
  householdId: HouseholdId;
  status: TonightStatus;
  primaryMessage: string;
  secondaryMessage?: string;
  context: TonightPlanContext;
  issues: TonightIssues;
  actions: TonightActions;
  tomorrowPreview?: TomorrowPreview;
}
