#!/usr/bin/env node
/**
 * scripts/atk-normalize-enriched.ts
 *
 * Normalization pass for AI-enriched ATK cookbook artifacts.
 *
 * - Reads src/dev/imported/atk-book-enriched/*.json
 * - Normalizes:
 *   - tags -> constrained to RecipeTag union (with a few safe synonym mappings)
 *   - equipmentTags -> constrained to EquipmentTag union (with safe mappings)
 *   - leftoverStrategy -> collapsed to NONE | EXPECTED | COOK_ONCE_EAT_TWICE
 *
 * This script does NOT change ingredient amounts/units or step text.
 */

import fs from 'fs';
import path from 'path';

import type {
  Recipe,
  RecipeMetadata,
  RecipeTag,
  EquipmentTag,
  RecipeIngredientRequirement,
  Allergen,
  IngredientKind,
  ShoppingCategory,
  PreflightRequirementType,
} from '../src/domain/types';
import { allergenOverrides } from '../src/domain/allergen-overrides';

interface AtkEnrichedArtifact {
  mapped: Recipe;
  raw: {
    source: 'atk_book';
    bookPath: string;
    start: number;
    end: number;
    yieldLine: string;
  };
  fit: boolean;
  fitReason?: string;
}

const ENRICHED_DIR = path.resolve(
  process.cwd(),
  'src',
  'dev',
  'imported',
  'atk-book-enriched',
);

// RecipeTag union (keep in sync with src/domain/types.ts)
const ALLOWED_TAGS: RecipeTag[] = [
  'vegetarian',
  'vegan',
  'gluten_free',
  'dairy_free',
  'one_pot',
  'sheet_pan',
  'slow_cooker',
  'meal_prep',
  'make_ahead',
  'budget_friendly',
  'kid_friendly',
  'family_friendly',
  'crowd_favorite',
  'comfort_food',
  'italian',
  'mexican',
  'asian',
  'american',
  'southern',
  'pantry_staple',
  'weeknight',
  'under_30_minutes',
  'atk_source',
];

const ALLOWED_TAG_SET = new Set<string>(ALLOWED_TAGS);

// Safe synonym / alias mapping -> RecipeTag
const TAG_SYNONYMS: Record<string, RecipeTag> = {
  // exact enum names, possibly with case variants
  vegetarian: 'vegetarian',
  vegan: 'vegan',
  gluten_free: 'gluten_free',
  'gluten-free': 'gluten_free',
  dairy_free: 'dairy_free',
  'dairy-free': 'dairy_free',
  one_pot: 'one_pot',
  'one-pot': 'one_pot',
  'one_pot_meal': 'one_pot',
  sheet_pan: 'sheet_pan',
  'sheet-pan': 'sheet_pan',
  slow_cooker: 'slow_cooker',
  'slow-cooker': 'slow_cooker',
  meal_prep: 'meal_prep',
  'meal-prep': 'meal_prep',
  make_ahead: 'make_ahead',
  'make-ahead': 'make_ahead',
  budget_friendly: 'budget_friendly',
  'budget-friendly': 'budget_friendly',
  kid_friendly: 'kid_friendly',
  'kid-friendly': 'kid_friendly',
  family_friendly: 'family_friendly',
  'family-friendly': 'family_friendly',
  crowd_favorite: 'crowd_favorite',
  'crowd-favorite': 'crowd_favorite',
  comfort_food: 'comfort_food',
  'comfort-food': 'comfort_food',
  italian: 'italian',
  mexican: 'mexican',
  asian: 'asian',
  american: 'american',
  southern: 'southern',
  pantry_staple: 'pantry_staple',
  'pantry-staple': 'pantry_staple',
  weeknight: 'weeknight',
  week_night: 'weeknight',
  'week-night': 'weeknight',
  under_30_minutes: 'under_30_minutes',
  'under-30-minutes': 'under_30_minutes',
  'under_30_min': 'under_30_minutes',
  atk_source: 'atk_source',
  // looser semantic aliases
  quick: 'under_30_minutes',
  fast: 'under_30_minutes',
  'quick_easy': 'under_30_minutes',
  'quick-easy': 'under_30_minutes',
  project: 'comfort_food', // project meals often overlap with comfort; safe-ish default
};

// EquipmentTag union (keep in sync with src/domain/types.ts)
const ALLOWED_EQUIPMENT: EquipmentTag[] = [
  'LARGE_POT',
  'LARGE_SKILLET',
  'DUTCH_OVEN',
  'SHEET_PAN',
  'BAKING_DISH',
  'OVEN',
  'GRILL',
  'GRIDDLE',
  'SLOW_COOKER',
  'INSTANT_POT',
  'RICE_COOKER',
  'FOOD_PROCESSOR',
  'BLENDER',
  'WAFFLE_MAKER',
  'SMOKER',
];

const ALLOWED_EQUIP_SET = new Set<string>(ALLOWED_EQUIPMENT);

const EQUIP_SYNONYMS: Record<string, EquipmentTag> = {
  oven: 'OVEN',
  broiler: 'OVEN',
  grill: 'GRILL',
  smoker: 'SMOKER',
  dutch_oven: 'DUTCH_OVEN',
  'dutch-oven': 'DUTCH_OVEN',
  large_pot_or_dutch_oven: 'DUTCH_OVEN',
  large_pot: 'LARGE_POT',
  pot: 'LARGE_POT',
  large_pot_or_dutch_oven_or_slow_cooker: 'LARGE_POT',
  skillet: 'LARGE_SKILLET',
  large_skillet: 'LARGE_SKILLET',
  'skillet_large': 'LARGE_SKILLET',
  cast_iron_skillet: 'LARGE_SKILLET',
  nonstick_skillet_10inch: 'LARGE_SKILLET',
  sheet_pan: 'SHEET_PAN',
  baking_sheet: 'SHEET_PAN',
  baking_sheet_rimmed: 'SHEET_PAN',
  baking_dish: 'BAKING_DISH',
  baking_dish_8x8: 'BAKING_DISH',
  baking_dish_9x13: 'BAKING_DISH',
  equipment_baking_dish_large: 'BAKING_DISH',
  slow_cooker: 'SLOW_COOKER',
  'slow-cooker': 'SLOW_COOKER',
  instant_pot: 'INSTANT_POT',
  rice_cooker: 'RICE_COOKER',
  food_processor: 'FOOD_PROCESSOR',
  food_processor_or_blender: 'FOOD_PROCESSOR',
  blender: 'BLENDER',
  waffle_maker: 'WAFFLE_MAKER',
};

type LeftoverEnum = RecipeMetadata['leftoverStrategy'];

const NUT_WORDS = [
  'almond',
  'walnut',
  'pecan',
  'cashew',
  'hazelnut',
  'pistachio',
  'macadamia',
  'pine nut',
  'brazil nut',
  'nut ',
  'nut,',
  'nut.',
  'nut)',
  'praline',
];

const SHELLFISH_WORDS = [
  'shrimp',
  'prawn',
  'lobster',
  'crab',
  'scallop',
  'mussel',
  'oyster',
  'clams',
];

const FISH_WORDS = [
  'salmon',
  'tuna',
  'cod',
  'halibut',
  'tilapia',
  'trout',
  'snapper',
  'anchovy',
  'sardine',
];

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

function detectAllergens(ing: RecipeIngredientRequirement): Allergen[] | undefined {
  const text = `${ing.displayName} ${ing.ingredientId}`.toLowerCase();
  const found = new Set<Allergen>();

  if (text.includes('peanut')) {
    found.add('PEANUT');
  }

  if (NUT_WORDS.some(w => text.includes(w))) {
    found.add('TREE_NUT');
  }

  if (SHELLFISH_WORDS.some(w => text.includes(w))) {
    found.add('SHELLFISH');
  }

  if (FISH_WORDS.some(w => text.includes(w))) {
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
    // Common noisy categories from enrichment; collapse to pantry
    case 'SPICE':
    case 'SAUCE':
    case 'BAKING':
    case 'PANTRY':
      return 'PANTRY_DRY';
    default:
      return 'PANTRY_DRY';
  }
}

function canonicalizePreflightType(raw: unknown): PreflightRequirementType {
  if (!raw) return 'LONG_PREP';
  const value = String(raw).trim().toUpperCase();
  if ((ALLOWED_PREFLIGHT_TYPES as string[]).includes(value)) {
    return value as PreflightRequirementType;
  }

  // Map extra enrichment signals to the closest canonical value
  if (value === 'CHILL' || value === 'SOAK' || value === 'FREEZE') {
    return 'LONG_PREP';
  }

  return 'LONG_PREP';
}

function applyAllergenOverrides(
  ing: RecipeIngredientRequirement,
  detected: Allergen[] | undefined,
): Allergen[] | undefined {
  const result = new Set<Allergen>(detected ?? []);
  const keys = [
    (ing.ingredientId ?? '').toLowerCase(),
    (ing.displayName ?? '').toLowerCase(),
  ];
  for (const key of keys) {
    if (!key) continue;
    for (const [needle, extras] of Object.entries(allergenOverrides)) {
      if (key.includes(needle)) {
        extras.forEach(a => result.add(a));
      }
    }
  }
  return result.size > 0 ? Array.from(result) : undefined;
}

function normalizeTags(tags: (string | RecipeTag)[] | undefined): RecipeTag[] {
  const result = new Set<RecipeTag>();

  if (!Array.isArray(tags) || tags.length === 0) {
    // Always preserve provenance tag even if AI omitted tags
    result.add('atk_source');
    return Array.from(result);
  }

  for (const raw of tags) {
    if (!raw) continue;
    const lowered = String(raw).trim().toLowerCase();

    // Direct allow
    if (ALLOWED_TAG_SET.has(lowered)) {
      result.add(lowered as RecipeTag);
      continue;
    }

    // Synonym mapping
    const mapped = TAG_SYNONYMS[lowered];
    if (mapped) {
      result.add(mapped);
    }
  }

  // Always preserve provenance tag
  result.add('atk_source');

  return Array.from(result);
}

function normalizeEquipment(
  equipmentTags: EquipmentTag[] | undefined,
): EquipmentTag[] {
  const result = new Set<EquipmentTag>();

  if (!Array.isArray(equipmentTags) || equipmentTags.length === 0) {
    return [];
  }

  for (const raw of equipmentTags) {
    if (!raw) continue;
    const key = String(raw).trim();

    // Already canonical?
    if (ALLOWED_EQUIP_SET.has(key)) {
      result.add(key as EquipmentTag);
      continue;
    }

    const lower = key.toLowerCase().replace(/\s+/g, '_');
    const mapped = EQUIP_SYNONYMS[lower];
    if (mapped) {
      result.add(mapped);
    }
  }

  return Array.from(result);
}

function normalizeLeftovers(value: RecipeMetadata['leftoverStrategy']): LeftoverEnum | undefined {
  if (!value) return undefined;

  // Already one of the canonical enum values
  if (value === 'NONE' || value === 'EXPECTED' || value === 'COOK_ONCE_EAT_TWICE') {
    return value;
  }

  // Some AI responses used arrays; treat any structured plan as EXPECTED leftovers.
  if (Array.isArray(value)) {
    return 'EXPECTED';
  }

  const text = String(value).toLowerCase();

  // Explicit "no leftovers" / best eaten fresh
  if (
    text.includes('serve immediately') ||
    text.includes('eat fresh') ||
    text.includes('best eaten fresh') ||
    text.includes('does not store well') ||
    text === 'eaf_fresh' ||
    text === 'eat_fresh' ||
    text === 'serve_immediately_not_ideal_leftover'
  ) {
    return 'NONE';
  }

  // Clear cook-once-eat-twice / freezer batch semantics
  if (
    text.includes('cook once') ||
    text.includes('eat twice') ||
    text.includes('freezes well') ||
    text.includes('freeze') ||
    text.includes('make ahead and freeze')
  ) {
    return 'COOK_ONCE_EAT_TWICE';
  }

  // Fallback: assume expected leftovers are fine
  return 'EXPECTED';
}

function normalizeRecipe(recipe: Recipe): Recipe {
  const next: Recipe = { ...recipe };

  // Normalize ingredient criticality to the allowed enum
  if (Array.isArray(next.ingredients)) {
    next.ingredients = next.ingredients.map((ing) => {
      const clean: RecipeIngredientRequirement = { ...ing };
      if (clean.criticality !== 'CRITICAL' && clean.criticality !== 'NON_CRITICAL') {
      clean.criticality = 'NON_CRITICAL';
      }
      clean.kind = canonicalizeIngredientKind(clean.kind);
      clean.quantityKind = canonicalizeQuantityKind(clean.quantityKind);
      clean.shoppingCategory = canonicalizeShoppingCategory(clean.shoppingCategory);
      const allergens = detectAllergens(clean);
      const withOverrides = applyAllergenOverrides(clean, allergens);
      if (withOverrides) clean.allergens = withOverrides;
      return clean;
    });
  }

  const normalizedLeftover = normalizeLeftovers(next.metadata.leftoverStrategy);
  const normalizedEquip = normalizeEquipment(next.metadata.equipmentTags);

  next.metadata = {
    ...next.metadata,
    ...(normalizedLeftover !== undefined ? { leftoverStrategy: normalizedLeftover } : {}),
    equipmentTags: normalizedEquip,
  };

  next.tags = normalizeTags(next.tags);

  if (Array.isArray(next.preflight)) {
    next.preflight = next.preflight.map((p) => ({
      ...p,
      type: canonicalizePreflightType(p.type),
    }));
  }

  // Populate recipe-level allergen summary
  if (Array.isArray(next.ingredients)) {
    const recipeAllergens = new Set<Allergen>();
    next.ingredients.forEach(ing => {
      ing.allergens?.forEach(a => recipeAllergens.add(a));
    });
    if (recipeAllergens.size > 0) {
      next.recipeAllergens = Array.from(recipeAllergens);
    }
  }

  return next;
}

function main() {
  if (!fs.existsSync(ENRICHED_DIR)) {
    console.error(`Enriched ATK directory not found: ${ENRICHED_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(ENRICHED_DIR)
    .filter((f) => f.endsWith('.json') && f !== '_summary.json');

  if (files.length === 0) {
    console.log('No enriched ATK artifacts found to normalize.');
    return;
  }

  console.log(`Normalizing ${files.length} enriched ATK artifacts...`);

  let changedCount = 0;

  for (const file of files) {
    const fullPath = path.join(ENRICHED_DIR, file);
    let artifact: AtkEnrichedArtifact;

    try {
      artifact = JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as AtkEnrichedArtifact;
    } catch (err) {
      console.error(`Failed to read/parse ${fullPath}:`, err instanceof Error ? err.message : String(err));
      continue;
    }

    const before = JSON.stringify(artifact.mapped);
    const normalized = normalizeRecipe(artifact.mapped);
    artifact.mapped = normalized;
    const after = JSON.stringify(artifact.mapped);

    if (before !== after) {
      fs.writeFileSync(fullPath, JSON.stringify(artifact, null, 2), 'utf-8');
      changedCount += 1;
      console.log(`✓ Normalized ${file}`);
    }
  }

  console.log(`\nDone. Normalized ${changedCount} artifacts in ${ENRICHED_DIR}.`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
