// Shared domain types (aligned with docs/data-model.md)
//
// CRITICAL: This file must stay in perfect sync with docs/data-model.md v1.4.1
// Any change to types here requires updating the spec, and vice versa.
// Last sync: December 11, 2025 — Allergen tagging + optional ingredients + preflight duration
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
export type Allergen =
  | 'TREE_NUT'
  | 'PEANUT'
  | 'SHELLFISH'
  | 'FISH'
  | 'EGG'
  | 'DAIRY'
  | 'WHEAT'
  | 'SOY'
  | 'SESAME';
export type IngredientKind =
  | 'PROTEIN'
  | 'CARB'
  | 'VEG'
  | 'FRUIT'
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
export type PreflightRequirementType =
  | 'THAW'
  | 'MARINATE'
  | 'SLOW_COOK'
  | 'LONG_PREP';
export type PreflightStatus = 'NONE_REQUIRED' | 'ALL_GOOD' | 'MISSED' | 'UNKNOWN';

export type MealComponentKind = 'SIDE' | 'SAUCE' | 'APPETIZER' | 'DESSERT';
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
  | 'NO_PEANUT'
  | 'NO_GLUTEN'
  | 'NO_DAIRY'
  | 'VEGETARIAN'
  | 'VEGAN'
  | 'KETO'
  | 'CARNIVORE';

export type RecipeRejectionReason =
  | 'RECENTLY_USED'
  | 'DIET_CONSTRAINT_VIOLATED'
  | 'EQUIPMENT_NOT_AVAILABLE'
  | 'INGREDIENT_MISSING'
  | 'OTHER';

/**
 * Diagnostic metadata for rejected recipes
 * Use for logging, analytics, and debugging why recipes don't appear in plans
 */
export interface RecipeRejection {
  recipeId: RecipeId;
  reason: RecipeRejectionReason;
  details?: string; // e.g., "Missing GRILL", "Contains beef (NO_BEEF constraint)"
}

export type RecipeTag =
  | 'vegetarian'
  | 'vegan'
  | 'gluten_free'
  | 'dairy_free'
  | 'one_pot'
  | 'sheet_pan'
  | 'slow_cooker'
  | 'meal_prep'
  | 'make_ahead'
  | 'budget_friendly'
  | 'kid_friendly'
  | 'family_friendly'
  | 'crowd_favorite'
  | 'comfort_food'
  | 'italian'
  | 'mexican'
  | 'asian'
  | 'american'
  | 'southern'
  | 'pantry_staple'
  | 'weeknight'
  | 'under_30_minutes'
  | 'atk_source'; // provenance tag for ATK book imports

export type EquipmentTag =
  | 'LARGE_POT'
  | 'LARGE_SKILLET'
  | 'DUTCH_OVEN'
  | 'SHEET_PAN'
  | 'BAKING_DISH'
  | 'OVEN'
  | 'GRILL'
  | 'GRIDDLE'
  | 'SLOW_COOKER'
  | 'INSTANT_POT'
  | 'RICE_COOKER'
  | 'FOOD_PROCESSOR'
  | 'BLENDER'
  | 'WAFFLE_MAKER'
  | 'SMOKER';

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
  availableEquipment?: EquipmentTag[]; // v1.3.1: Optional equipment constraints (e.g., no grill)
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
  // Optional: how precise this amount is
  // - undefined/FIXED: explicit measured quantity
  // - APPROXIMATE: rough guidance ("about 1 cup", "1-2 tbsp")
  // - TO_TASTE: true "to taste" amounts (salt, hot sauce, etc.)
  // - DIVIDED: amount is divided across steps (metadata only; treated as FIXED)
  // - CRITICAL: legacy value from imports; treated as FIXED for now
  quantityKind?: 'FIXED' | 'APPROXIMATE' | 'TO_TASTE' | 'DIVIDED' | 'CRITICAL';
  // Optional: logical component grouping within a recipe
  // e.g. "SAUCE", "GARNISH", "SALAD", "TOPPING" for UI grouping
  component?: string;
  // Optional flag for human-facing "optional ingredient" messaging.
  optional?: boolean;
  // Optional shopping notes / clarifications ("use low-sodium if possible")
  shoppingNotes?: string;
  // Optional allergen tags for safety-critical filtering (e.g., TREE_NUT, PEANUT)
  allergens?: Allergen[];
  // Optional package metadata for container-aware shopping (e.g., "2 (15 oz) cans")
  // amount/unit remain the total quantity; packages/packageSize describe the per-package size.
  packageSize?: {
    amount: number;
    unit: 'OZ' | 'ML' | 'GRAM' | 'UNIT';
  };
  packages?: number;
}

export interface RecipePreflightRequirement {
  // Primary classification used by preflight logic; may be missing on older or
  // AI-enriched artifacts, in which case the domain logic treats the requirement
  // as a generic LONG_PREP reminder.
  type?: PreflightRequirementType;
  // e.g. "start marinade at least 4h before cooking" or "thaw overnight"
  description?: string;
  // How far in advance in hours the action should happen (for Today/Tomorrow preview)
  hoursBeforeCook?: number;
  // Legacy/extended fields from older enrichment passes. These are tolerated
  // for compatibility but not required by core logic.
  hoursBefore?: number;
  durationMinutes?: number;
  task?: string;
  label?: string;
  name?: string;
  optional?: boolean;
  // Allow forward-compatible metadata fields without breaking type checking.
  [key: string]: unknown;
}

export interface RecipeMetadata {
  timeBand: TimeBand;
  estimatedMinutes: number;
  equipmentTags?: EquipmentTag[];
  leftoverStrategy?: 'NONE' | 'EXPECTED' | 'COOK_ONCE_EAT_TWICE';
  // Canonical servings this recipe was authored for
  baseServings?: number;
  // Human-readable yield line for UI ("SERVES 4 to 6", "MAKES 2 cups")
  yieldText?: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;     // Max 2-3 sentences, beginner-friendly
  duration?: number;       // Minutes for this step (for timers in Cooking Mode)
  timerMinutes?: number;   // Duration for timer (3+ minutes)
  timer?: boolean;         // Should show [Set Timer] button in Cooking Mode (default: false)
  parallel?: boolean;      // "Meanwhile" or "while X cooks" (for UI hints) (default: false)
  // Optional: logical component grouping, mirroring ingredients.component
  component?: string;
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
  tags?: RecipeTag[];
  variantHints?: { description: string; safeSubIngredientId?: string }[];
  // Derived: union of ingredient allergens (populated by normalization/import)
  recipeAllergens?: Allergen[];
  // Optional short tip for Cooking Mode ("Let the crust rest 5 min before slicing")
  cookNotes?: string;
}

export interface PlannedDinner {
  recipeId: RecipeId;
  servings: number;
  locked: boolean;
  outEating: boolean;
  preflightStatus: PreflightStatus;
  originalRecipeId?: RecipeId;
  // Optional add-ons selected by the user (book-authored accompaniments, sides, sauces, etc.)
  accompaniments?: { kind: MealComponentKind; recipeId: RecipeId }[];
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
  // Once true, regenerate flows should warn and respect locked slots (Vision 7)
  isShoppingDone?: boolean;
  days: PlanDay[];
  summary: {
    totalDinners: number;
    fastCount: number;
    normalCount: number;
    projectCount: number;
    thawDays: number;
    marinateDays: number;
    allergensPresent?: Allergen[];
    dietaryTags?: RecipeTag[];
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
  packageSize?: RecipeIngredientRequirement['packageSize'];
  packages?: number;
  allergens?: Allergen[];
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
