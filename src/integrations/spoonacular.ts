import {
  Recipe,
  RecipeIngredientRequirement,
  RecipePreflightRequirement,
  RecipeTag,
  EquipmentTag,
  IngredientCriticality,
  TimeBand,
  Allergen,
  IngredientKind,
  ShoppingCategory,
  PreflightRequirementType,
} from '../domain/types';
import { allergenOverrides } from '../domain/allergen-overrides';

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
const ALLOWED_INGREDIENT_KINDS: IngredientKind[] = [
  'PROTEIN',
  'CARB',
  'VEG',
  'FRUIT',
  'DAIRY',
  'FAT_OIL',
  'SPICE',
  'CONDIMENT',
  'OTHER',
];
const ALLOWED_QUANTITY_KINDS = new Set(['FIXED', 'APPROXIMATE', 'TO_TASTE']);
const ALLOWED_PREFLIGHT_TYPES: PreflightRequirementType[] = [
  'THAW',
  'MARINATE',
  'SLOW_COOK',
  'LONG_PREP',
];

function toTimeBand(minutes: number): TimeBand {
  if (minutes <= TIMEBAND_THRESHOLDS.FAST) return 'FAST';
  if (minutes <= TIMEBAND_THRESHOLDS.NORMAL) return 'NORMAL';
  return 'PROJECT';
}

function inferTimeMetadata(spoon: SpoonacularRecipe) {
  const rawMinutes = spoon.readyInMinutes || 0;
  const estimatedMinutes = Math.round(rawMinutes * 1.25);
  const timeBand = toTimeBand(estimatedMinutes);
  return { estimatedMinutes, timeBand };
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

function detectAllergens(ing: SpoonacularIngredient): Allergen[] | undefined {
  const text = (ing.name || ing.originalString || '').toLowerCase();
  const found = new Set<Allergen>();

  if (text.includes('peanut')) {
    found.add('PEANUT');
  }

  if (
    /almond|walnut|pecan|cashew|hazelnut|pistachio|macadamia|pine nut|brazil nut/.test(text) ||
    /\bnuts?\b/.test(text)
  ) {
    found.add('TREE_NUT');
  }

  if (/shrimp|prawn|lobster|crab|scallop|mussel|oyster|clam/.test(text)) {
    found.add('SHELLFISH');
  }

  if (/salmon|tuna|cod|halibut|tilapia|trout|snapper|anchovy|sardine/.test(text)) {
    found.add('FISH');
  }

  if (/egg\b|egg yolk|egg white/.test(text)) {
    found.add('EGG');
  }

  if (/milk|cheese|cream|butter|yogurt|ghee|casein|whey/.test(text)) {
    found.add('DAIRY');
  }

  if (/wheat|semolina|farina|spelt|durum/.test(text)) {
    found.add('WHEAT');
  }

  if (/soy\b|soybean|tofu|edamame|soya/.test(text)) {
    found.add('SOY');
  }

  if (/sesame/.test(text)) {
    found.add('SESAME');
  }

  return found.size > 0 ? Array.from(found) : undefined;
}

function canonicalizeIngredientKind(raw: unknown): IngredientKind {
  const value = String(raw ?? '').trim().toUpperCase();
  if ((ALLOWED_INGREDIENT_KINDS as string[]).includes(value)) {
    return value as IngredientKind;
  }
  if (value === 'NUT') return 'OTHER';
  if (value === 'SAUCE' || value === 'PANTRY') return 'OTHER';
  if (value === 'FAT' || value === 'FAT/OIL' || value === 'OIL') return 'FAT_OIL';
  return 'OTHER';
}

function canonicalizeQuantityKind(
  raw: unknown,
): 'FIXED' | 'APPROXIMATE' | 'TO_TASTE' {
  if (!raw) return 'FIXED';
  const value = String(raw).trim().toUpperCase();
  return ALLOWED_QUANTITY_KINDS.has(value) ? (value as any) : 'FIXED';
}

function canonicalizePreflightType(raw: unknown): PreflightRequirementType {
  if (!raw) return 'LONG_PREP';
  const value = String(raw).trim().toUpperCase();
  if ((ALLOWED_PREFLIGHT_TYPES as string[]).includes(value)) {
    return value as PreflightRequirementType;
  }
  if (value === 'CHILL' || value === 'SOAK' || value === 'FREEZE') return 'LONG_PREP';
  return 'LONG_PREP';
}

function canonicalizeShoppingCategory(raw: unknown): ShoppingCategory {
  const value = String(raw ?? '').trim().toUpperCase();
  switch (value) {
    case 'PRODUCE':
    case 'MEAT_SEAFOOD':
    case 'DAIRY_EGGS':
    case 'PANTRY_DRY':
    case 'FROZEN':
    case 'OTHER':
      return value as ShoppingCategory;
    // Noisy values from upstream; collapse to pantry
    case 'SPICE':
    case 'SAUCE':
    case 'BAKING':
    case 'PANTRY':
      return 'PANTRY_DRY';
    default:
      return 'PANTRY_DRY';
  }
}

function applyAllergenOverridesFromName(
  name: string,
  detected: Allergen[] | undefined,
): Allergen[] | undefined {
  const result = new Set<Allergen>(detected ?? []);
  const lower = name.toLowerCase();
  for (const [needle, extras] of Object.entries(allergenOverrides)) {
    if (lower.includes(needle)) {
      extras.forEach(a => result.add(a));
    }
  }
  return result.size > 0 ? Array.from(result) : undefined;
}

function inferCriticality(ing: SpoonacularIngredient, _all: SpoonacularIngredient[]): IngredientCriticality {
  const name = (ing.name || ing.originalString || '').toLowerCase();

  if (/(cilantro|parsley|scallion|green onion|chive|sesame seed|lime wedge|lemon wedge|lime juice|lemon juice|sour cream|yogurt sauce|shredded cheese|grated parmesan|parmesan cheese|chili flakes|red pepper flakes)/.test(name)) {
    return 'NON_CRITICAL';
  }

  if (/(paprika|oregano|thyme|basil|cumin|chili powder|garlic powder|onion powder|italian seasoning|dried herbs|seasoning blend)/.test(name)) {
    return 'NON_CRITICAL';
  }

  if (/(chicken|beef|pork|turkey|lamb|sausage|bacon|ham|shrimp|prawn|fish|salmon|tuna|cod|tilapia|tofu|tempeh|seitan|ground meat)/.test(name)) {
    return 'CRITICAL';
  }

  if (/(pasta|spaghetti|noodle|macaroni|penne|rigatoni|rice|quinoa|farro|couscous|tortilla|bread|baguette|pizza crust|gnocchi|lasagna noodle)/.test(name)) {
    return 'CRITICAL';
  }

  if (/(broccoli|cauliflower|zucchini|eggplant|bell pepper|green pepper|red pepper|green bean|asparagus|brussels sprout|brussel sprout|spinach|kale|cabbage)/.test(name)) {
    return 'CRITICAL';
  }

  if (/(tomato sauce|marinara|crushed tomatoes|tomato puree|tomato paste|broth|stock|chicken broth|beef broth|vegetable broth)/.test(name)) {
    return 'CRITICAL';
  }

  return 'CRITICAL';
}

function detectPreflightFromRecipe(spoon: SpoonacularRecipe): RecipePreflightRequirement[] {
  const out: RecipePreflightRequirement[] = [];
  const totalMinutes = spoon.readyInMinutes || 0;
  const ingredients = spoon.extendedIngredients || [];
  const text = `${spoon.instructions || ''} ${spoon.summary || ''}`.toLowerCase();

  // --- THAW: only for clearly frozen proteins (per docs: frozen chicken/beef/fish)
  const hasFrozenProtein = ingredients.some((ing: any) => {
    const line = (ing.originalString || ing.name || '').toLowerCase();
    const isFrozen = /frozen|flash-frozen/.test(line) || /frozen/.test((ing.aisle || '').toLowerCase());
    if (!isFrozen) return false;
    const kind = heuristicallyMapKind(ing);
    if (kind === 'PROTEIN') return true;
    return /(chicken|beef|pork|turkey|fish|salmon|cod|tilapia|shrimp|prawn)/.test(line);
  });
  if (hasFrozenProtein) {
    out.push({
      type: 'THAW',
      description: 'Thaw frozen protein in the fridge overnight',
      hoursBeforeCook: 12, // spec: THAW (12+ hours)
    });
  }

  // --- MARINATE: only when >= ~1 hour (quick 15-min marinades => NO_PREFLIGHT)
  const mentionsMarinate = /marinat|marinade|marinate/.test(text);
  if (mentionsMarinate) {
    let hours: number | undefined;

    if (/overnight/.test(text)) {
      hours = 8;
    } else {
      const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(hour|hr|hours|hrs)/);
      const minuteMatch = text.match(/(\d+(?:\.\d+)?)\s*(minute|min|minutes|mins)/);
      if (hourMatch) {
        hours = parseFloat(hourMatch[1]);
      } else if (minuteMatch) {
        const mins = parseFloat(minuteMatch[1]);
        if (!Number.isNaN(mins) && mins >= 60) {
          hours = mins / 60;
        }
      }
    }

    if (hours === undefined) {
      // No explicit duration: assume a real marinade window, not a 10–15 min quick soak
      hours = 2;
    }

    if (hours >= 1) {
      out.push({
        type: 'MARINATE',
        description: 'Marinate protein before cooking (heuristic detection)',
        hoursBeforeCook: Math.min(Math.max(hours, 2), 12),
      });
    }
  }

  // Detect slow-cooker recipes up front to avoid double-tagging as LONG_PREP
  const isSlowCookerRecipe = /slow cooker|crock pot|crockpot|slow-cook|slow cook/.test(text);

  // --- LONG_PREP: 2–4 hours non-active (e.g., dough rising, chilling), not slow cooker
  const looksLikeLongPrep =
    /rise|proof|chill|rest/.test(text) && /overnight|(\d+)\s*(hour|hr|hours|hrs)/.test(text);

  if (!isSlowCookerRecipe && (looksLikeLongPrep || totalMinutes >= 120)) {
    let hours: number | undefined;

    if (/overnight/.test(text)) {
      hours = 8;
    } else {
      const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(hour|hr|hours|hrs)/);
      if (hourMatch) {
        hours = parseFloat(hourMatch[1]);
      }
    }

    const boundedHours = hours && hours > 0 ? hours : 3;
    out.push({
      type: 'LONG_PREP',
      description: 'Allow extra time for long prep or resting steps',
      hoursBeforeCook: Math.min(Math.max(boundedHours, 2), 4),
    });
  }

  // --- SLOW_COOK: slow cooker / crockpot meals (4–8 hours)
  if (isSlowCookerRecipe) {
    let hours: number | undefined;
    const slowMatch = text.match(/(\d+(?:\.\d+)?)\s*(hour|hr|hours|hrs)/);
    if (slowMatch) {
      hours = parseFloat(slowMatch[1]);
    } else if (totalMinutes >= 240) {
      hours = totalMinutes / 60;
    }

    const boundedHours = hours && hours > 0 ? hours : 8;
    out.push({
      type: 'SLOW_COOK',
      description: 'Start slow cooker hours before dinner',
      hoursBeforeCook: Math.min(Math.max(boundedHours, 4), 8),
    });
  }

  return out;
}

export function mapSpoonacularToRecipeInternal(spoon: SpoonacularRecipe): MappedRecipe {
  const { estimatedMinutes, timeBand } = inferTimeMetadata(spoon);
  const ingredients: RecipeIngredientRequirement[] = (spoon.extendedIngredients || []).map((ing: any) => ({
    displayName: ing.originalString || ing.name || '',
    qty: ing.amount || 1,
    unit: (ing.unit || '').toLowerCase(),
    criticality: inferCriticality(ing, spoon.extendedIngredients || []),
    kind: canonicalizeIngredientKind(heuristicallyMapKind(ing)),
    shoppingCategory: canonicalizeShoppingCategory(heuristicallyMapShoppingCategory(ing)),
    quantityKind: canonicalizeQuantityKind((ing as any).quantityKind),
    allergens: applyAllergenOverridesFromName(
      ing.name || ing.originalString || '',
      detectAllergens(ing),
    ),
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
      estimatedMinutes,
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

  recipe.preflight = recipe.preflight.map((p) => ({
    ...p,
    type: canonicalizePreflightType(p.type),
  }));

  // Populate recipe-level allergens from ingredients
  const recipeAllergens = new Set<Allergen>();
  ingredients.forEach(ing => ing.allergens?.forEach(a => recipeAllergens.add(a)));
  if (recipeAllergens.size > 0) {
    recipe.recipeAllergens = Array.from(recipeAllergens);
  }

  return recipe;
}

/**
 * Public export: mapSpoonacularToRecipe for integration
 */
export function mapSpoonacularToRecipe(spoon: SpoonacularRecipe): MappedRecipe {
  const mapped = mapSpoonacularToRecipeInternal(spoon);
  mapped.preflight = detectPreflightFromRecipe(spoon).map((p) => ({
    ...p,
    type: canonicalizePreflightType(p.type),
  }));
  return mapped;
}
