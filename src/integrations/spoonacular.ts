import { Recipe, RecipeIngredientRequirement, RecipePreflightRequirement, RecipeTag, EquipmentTag } from '../domain/types';

// Minimal Spoonacular client + mapping helpers.
// Designed to be non-destructive: returns mapped Recipe objects for manual review.

type SpoonacularIngredient = any;
type SpoonacularRecipe = any;

/**
 * MappedRecipe includes provenance metadata for dev/testing.
 * This is kept in dev artifacts only; canonical .ts files strip provenance.
 */
export interface MappedRecipe extends Recipe {
  provenance?: { provider: string; id: string };
  servings?: number;
  sourceUrl?: string;
}

const TIMEBAND_THRESHOLDS = { FAST: 30, NORMAL: 60 };

function toTimeBand(minutes: number) {
  if (minutes <= TIMEBAND_THRESHOLDS.FAST) return 'FAST';
  if (minutes <= TIMEBAND_THRESHOLDS.NORMAL) return 'NORMAL';
  return 'PROJECT';
}

export async function fetchRecipeById(id: number, apiKey: string): Promise<SpoonacularRecipe> {
  if (!apiKey) throw new Error('SPOONACULAR_API_KEY is required');
  const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Spoonacular error: ${res.status} ${await res.text()}`);
  return res.json();
}

function heuristicallyMapKind(ing: SpoonacularIngredient): RecipeIngredientRequirement['kind'] {
  const name = (ing.name || ing.originalString || '').toLowerCase();
  // Produce detection (leafy/herb/vegetable/fruit common cases)
  // Map to the domain's `IngredientKind` values (use 'VEG' for produce)
  if (/garlic|onion|shallot|ginger|herbs?|basil|parsley|cilantro|mint|scallion|leek|chive/.test(name)) return 'VEG';
  if (/tomato|pepper|cucumber|lettuce|spinach|kale|broccoli|carrot|celery|mushroom|avocado|potato|eggplant|zucchini/.test(name)) return 'VEG';
  if (/bean|lentil|chickpea|pea/.test(name)) return 'VEG';

  if (/chicken|beef|pork|salmon|tuna|shrimp|bacon|sausage|lamb|turkey|steak/.test(name)) return 'PROTEIN';
  if (/milk|cheese|butter|yogurt|cream|buttermilk|parmesan/.test(name)) return 'DAIRY';
  if (/rice|pasta|noodle|potato|bread|flour|corn|tortilla/.test(name)) return 'CARB';
  if (/oil|lard|olive oil|sesame oil/.test(name)) return 'FAT_OIL';
  if (/salt|pepper|thyme|oregano|cumin|paprika|garlic powder/.test(name)) return 'SPICE';
  if (/soy sauce|vinegar|mayonnaise|ketchup|mustard/.test(name)) return 'CONDIMENT';
  return 'OTHER';
}

function heuristicallyMapShoppingCategory(ing: SpoonacularIngredient): RecipeIngredientRequirement['shoppingCategory'] {
  const name = (ing.name || ing.originalString || '').toLowerCase();
  if (/chicken|beef|pork|salmon|tuna|shrimp|bacon|sausage|lamb|turkey/.test(name)) return 'MEAT_SEAFOOD';
  if (/milk|cheese|butter|yogurt|cream/.test(name)) return 'DAIRY_EGGS';
  if (/frozen/.test(ing.aisle || '')) return 'FROZEN';
  if (/vegetable|carrot|onion|garlic|lettuce|tomato|potato|pepper|mushroom/.test(name)) return 'PRODUCE';
  return 'PANTRY_DRY';
}

function detectPreflightFromRecipe(spoon: SpoonacularRecipe): RecipePreflightRequirement[] {
  const out: RecipePreflightRequirement[] = [];
  const minutes = spoon.readyInMinutes || 0;
  // THAW: if any ingredient name contains "frozen" or looks like frozen fish/chicken
  const hasFrozen = (spoon.extendedIngredients || []).some((ing: any) => /frozen|ice|flash-frozen/.test(ing.originalString?.toLowerCase() || ''));
  if (hasFrozen) out.push({ type: 'THAW', description: 'Thaw frozen ingredients in fridge overnight', hoursBeforeCook: 8 });

  // MARINATE: simple heuristic: instructions or summary contains 'marin' or 'marinate'
  if (/marinat|marinade|marinate/i.test(spoon.instructions || spoon.summary || '')) {
    out.push({ type: 'MARINATE', description: 'Marinate protein for best flavor (heuristic detection)', hoursBeforeCook: 2 });
  }

  // LONG_PREP: if readyInMinutes is large or instructions mention braise/roast for long
  if (minutes >= 120 || /braise|braising|roast.*hour|hours|overnight/.test(spoon.instructions || '')) {
    out.push({ type: 'LONG_PREP', description: 'Long hands-on or braising time expected', hoursBeforeCook: 3 });
  }

  // SLOW_COOK: detect slow cooker or crockpot keywords
  if (/slow cooker|crock pot|slow-cook|slow cook/i.test(spoon.instructions || '')) {
    out.push({ type: 'SLOW_COOK', description: 'Prepare for slow cooker use', hoursBeforeCook: 4 });
  }

  return out;
}

export function mapSpoonacularToRecipeInternal(spoon: SpoonacularRecipe): MappedRecipe {
  const timeBand = toTimeBand(spoon.readyInMinutes || 0) as any;
  const ingredients: RecipeIngredientRequirement[] = (spoon.extendedIngredients || []).map((ing: any) => ({
    displayName: ing.originalString || ing.name || '',
    qty: ing.amount || 1,
    unit: (ing.unit || '').toLowerCase(),
    criticality: 'CRITICAL',
    kind: heuristicallyMapKind(ing) as any,
    shoppingCategory: heuristicallyMapShoppingCategory(ing) as any,
  }));

  const preflight: RecipePreflightRequirement[] = [];

  const steps = (spoon.analyzedInstructions && spoon.analyzedInstructions[0] && spoon.analyzedInstructions[0].steps)
    ? spoon.analyzedInstructions[0].steps.map((s: any, i: number) => ({ stepNumber: i + 1, instruction: s.step || s.step || s.description || '' }))
    : [];

  // --- Tag extraction (heuristic)
  const tags = new Set<string>();
  if (spoon.vegetarian || !ingredients.some(i => i.kind === 'PROTEIN')) tags.add('vegetarian');
  if (spoon.vegan) tags.add('vegan');
  if (spoon.glutenFree) tags.add('gluten_free');
  if (spoon.dairyFree) tags.add('dairy_free');
  if (spoon.veryPopular) tags.add('crowd_favorite');
  if ((spoon.readyInMinutes || 0) <= 30) tags.add('weeknight');
  if (ingredients.length <= 8) tags.add('pantry_staple');
  if (/italian|mediterranean|pasta|aglio/i.test(spoon.title || '')) tags.add('italian');
  if (Array.isArray(spoon.cuisines)) spoon.cuisines.forEach((c: string) => tags.add((c || '').toLowerCase()));
  if (Array.isArray(spoon.dishTypes) && (spoon.dishTypes.includes('lunch') || spoon.dishTypes.includes('main course'))) tags.add('meal_prep');

  // --- Equipment detection
  const equipmentTags = new Set<string>();
  const lowerInstructions = (spoon.instructions || '').toLowerCase();
  if (/pot|boil|pasta|cook.*noodle/.test(lowerInstructions)) equipmentTags.add('LARGE_POT');
  if (/skillet|pan|saute|sauté/.test(lowerInstructions)) equipmentTags.add('LARGE_SKILLET');
  if (/slow cooker|crock/.test(lowerInstructions)) equipmentTags.add('SLOW_COOKER');
  if (/sheet pan|baking sheet|oven/.test(lowerInstructions)) equipmentTags.add('SHEET_PAN');

  // --- Name cleanup
  let betterName = (spoon.title || spoon.name || 'Imported Recipe').trim();
  betterName = betterName
    .replace(/^Pasta with Garlic and Oil$/i, 'Spaghetti Aglio e Olio')
    .replace(/^Garlic Butter Pasta$/i, 'Spaghetti Aglio e Olio')
    .replace(/One[- ]?Pot/gi, 'One-Pot')
    .replace(/One[- ]?Pan/gi, 'One-Pan');

  const recipe: MappedRecipe = {
    id: `spoon_${spoon.id}`,
    name: betterName,
    slug: betterName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    metadata: {
      timeBand,
      estimatedMinutes: spoon.readyInMinutes || 0,
      equipmentTags: Array.from(equipmentTags) as EquipmentTag[],
      leftoverStrategy: 'NONE'
    },
    scalable: true,
    ingredients,
    preflight,
    steps,
    tags: Array.from(tags) as RecipeTag[],
    servings: spoon.servings || 4,
    sourceUrl: spoon.sourceUrl || spoon.spoonacularSourceUrl || '',
    provenance: { provider: 'spoonacular', id: String(spoon.id) }
  };

  return recipe;
}

/**
 * Public export: mapSpoonacularToRecipe for integration
 */
export function mapSpoonacularToRecipe(spoon: SpoonacularRecipe): MappedRecipe {
  const mapped = mapSpoonacularToRecipeInternal(spoon);
  mapped.preflight = detectPreflightFromRecipe(spoon);
  return mapped;
}
