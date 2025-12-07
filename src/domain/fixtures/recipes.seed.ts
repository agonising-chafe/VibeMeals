// src/domain/fixtures/recipes.seed.ts

import {
  Recipe,
  RecipePreflightRequirement,
  RecipeIngredientRequirement,
} from '../types';

// --- Sheet-Pan Chicken & Veg (from recipe-spec.md) ---

export const sheetPanChickenVeg: Recipe = {
  id: 'r_sheet_pan_chicken_veg',
  name: 'Sheet-Pan Chicken & Veg',
  slug: 'sheet-pan-chicken-veg',
  metadata: {
    timeBand: 'FAST',
    estimatedMinutes: 35,
    equipmentTags: ['SHEET_PAN'],
    leftoverStrategy: 'EXPECTED',
  },
  ingredients: [
    {
      ingredientId: 'ing_chicken_breast',
      displayName: 'Boneless skinless chicken breasts',
      amount: 1.5,
      unit: 'LB',
      criticality: 'CRITICAL',
      kind: 'PROTEIN',
      shoppingCategory: 'MEAT_SEAFOOD',
    },
    {
      ingredientId: 'ing_broccoli_florets',
      displayName: 'Broccoli florets',
      amount: 12,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE',
    },
    {
      ingredientId: 'ing_olive_oil',
      displayName: 'Olive oil',
      amount: 2,
      unit: 'TBSP',
      criticality: 'NON_CRITICAL',
      kind: 'FAT_OIL',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_salt',
      displayName: 'Salt',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_black_pepper',
      displayName: 'Black pepper',
      amount: 0.5,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
  ],
  preflight: [],
  steps: [
    { stepNumber: 1, instruction: 'Preheat oven to 425F.' },
    { stepNumber: 2, instruction: 'Toss chicken and broccoli with oil, salt, pepper.' },
    { stepNumber: 3, instruction: 'Roast until chicken reaches temp.', timerMinutes: 20 },
  ],
  tags: ['kid_friendly', 'sheet_pan', 'mild', 'comfort_food'],
  variantHints: [
    { description: 'Swap chicken breast for thighs if preferred.' },
    {
      description: 'Use carrots or green beans if broccoli is unavailable.',
    },
  ],
};

// --- Slow Cooker Chili (from recipe-spec.md) ---

export const slowCookerChili: Recipe = {
  id: 'r_slow_cooker_chili',
  name: 'Slow Cooker Beef & Bean Chili',
  slug: 'slow-cooker-chili',
  metadata: {
    timeBand: 'PROJECT',
    estimatedMinutes: 30, // hands-on
    equipmentTags: ['SLOW_COOKER'],
    leftoverStrategy: 'COOK_ONCE_EAT_TWICE',
  },
  ingredients: [
    {
      ingredientId: 'ing_ground_beef',
      displayName: 'Ground beef',
      amount: 2,
      unit: 'LB',
      criticality: 'CRITICAL',
      kind: 'PROTEIN',
      shoppingCategory: 'MEAT_SEAFOOD',
    },
    {
      ingredientId: 'ing_canned_tomatoes',
      displayName: 'Canned diced tomatoes',
      amount: 28,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'OTHER',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_kidney_beans',
      displayName: 'Canned kidney beans',
      amount: 30,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'OTHER',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_chili_powder',
      displayName: 'Chili powder',
      amount: 2,
      unit: 'TBSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_salt',
      displayName: 'Salt',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
  ],
  preflight: [
    {
      type: 'SLOW_COOK',
      description: 'Start slow cooker at least 6-8 hours before dinner.',
      hoursBeforeCook: 8,
    },
  ],
  steps: [
    { stepNumber: 1, instruction: 'Brown beef with aromatics.' },
    { stepNumber: 2, instruction: 'Load slow cooker with browned beef and remaining ingredients.' },
    { stepNumber: 3, instruction: 'Cook on low.', timerMinutes: 480 },
  ],
  tags: ['comfort_food', 'soup', 'bowl'],
  variantHints: [
    {
      description: 'Swap ground beef for turkey for a lighter version.',
      safeSubIngredientId: 'ing_ground_turkey',
    },
    {
      description: 'Serve over rice or baked potatoes to stretch servings.',
    },
  ],
};

// --- FAST – Pantry Rescue Pasta ---

export const pantryRescuePasta: Recipe = {
  id: 'r_pantry_rescue_pasta',
  name: 'Pantry Rescue Tomato Pasta',
  slug: 'pantry-rescue-pasta',
  metadata: {
    timeBand: 'FAST',
    estimatedMinutes: 20,
    equipmentTags: ['STOVETOP', 'ONE_POT'],
    leftoverStrategy: 'NONE',
  },
  ingredients: [
    {
      ingredientId: 'ing_dry_spaghetti',
      displayName: 'Dry spaghetti',
      amount: 12,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'CARB',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_canned_tomato_sauce',
      displayName: 'Canned tomato sauce',
      amount: 15,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'OTHER',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_garlic_powder',
      displayName: 'Garlic powder',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_olive_oil',
      displayName: 'Olive oil',
      amount: 1,
      unit: 'TBSP',
      criticality: 'NON_CRITICAL',
      kind: 'FAT_OIL',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_salt',
      displayName: 'Salt',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_parmesan',
      displayName: 'Grated Parmesan (for serving)',
      amount: 0.5,
      unit: 'CUP',
      criticality: 'NON_CRITICAL',
      kind: 'DAIRY',
      shoppingCategory: 'DAIRY_EGGS',
    },
  ],
  preflight: [],
  steps: [
    { stepNumber: 1, instruction: 'Boil salted water; cook spaghetti to al dente.', timerMinutes: 10 },
    { stepNumber: 2, instruction: 'Warm tomato sauce with garlic powder and olive oil.', timerMinutes: 5 },
    { stepNumber: 3, instruction: 'Toss pasta with sauce; season to taste.' },
  ],
  tags: ['fast', 'pasta', 'bowl', 'comfort_food'],
  variantHints: [
    { description: 'Add canned tuna or leftover chicken for extra protein.' },
    { description: 'Use any short pasta if spaghetti is unavailable.' },
  ],
};

// --- NORMAL – Weeknight Beef Tacos ---

export const beefTacoNight: Recipe = {
  id: 'r_weeknight_beef_tacos',
  name: 'Weeknight Beef Tacos',
  slug: 'weeknight-beef-tacos',
  metadata: {
    timeBand: 'NORMAL',
    estimatedMinutes: 35,
    equipmentTags: ['STOVETOP'],
    leftoverStrategy: 'EXPECTED',
  },
  ingredients: [
    {
      ingredientId: 'ing_ground_beef',
      displayName: 'Ground beef',
      amount: 1,
      unit: 'LB',
      criticality: 'CRITICAL',
      kind: 'PROTEIN',
      shoppingCategory: 'MEAT_SEAFOOD',
    },
    {
      ingredientId: 'ing_taco_shells',
      displayName: 'Hard taco shells',
      amount: 12,
      unit: 'UNIT',
      criticality: 'CRITICAL',
      kind: 'CARB',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_taco_seasoning',
      displayName: 'Taco seasoning packet',
      amount: 1,
      unit: 'UNIT',
      criticality: 'CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_shredded_lettuce',
      displayName: 'Shredded lettuce',
      amount: 4,
      unit: 'OZ',
      criticality: 'NON_CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE',
    },
    {
      ingredientId: 'ing_shredded_cheddar',
      displayName: 'Shredded cheddar cheese',
      amount: 1,
      unit: 'CUP',
      criticality: 'NON_CRITICAL',
      kind: 'DAIRY',
      shoppingCategory: 'DAIRY_EGGS',
    },
    {
      ingredientId: 'ing_salsa',
      displayName: 'Salsa',
      amount: 0.5,
      unit: 'CUP',
      criticality: 'NON_CRITICAL',
      kind: 'CONDIMENT',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_sour_cream',
      displayName: 'Sour cream',
      amount: 0.5,
      unit: 'CUP',
      criticality: 'NON_CRITICAL',
      kind: 'DAIRY',
      shoppingCategory: 'DAIRY_EGGS',
    },
  ],
  preflight: [],
  steps: [
    { stepNumber: 1, instruction: 'Brown ground beef; drain if needed.', timerMinutes: 8 },
    { stepNumber: 2, instruction: 'Stir in taco seasoning with splash of water; simmer.', timerMinutes: 5 },
    { stepNumber: 3, instruction: 'Warm taco shells briefly in oven or skillet.' },
    { stepNumber: 4, instruction: 'Assemble tacos with toppings.' },
  ],
  tags: ['kid_friendly', 'taco_format', 'tex_mex'],
  variantHints: [
    {
      description: 'Swap ground beef for ground turkey.',
      safeSubIngredientId: 'ing_ground_turkey',
    },
    {
      description: 'Serve components separately for picky eaters.',
    },
  ],
};

// --- NORMAL – Marinated Chicken Rice Bowls (MARINATE preflight) ---

export const marinatedChickenBowls: Recipe = {
  id: 'r_marinated_chicken_rice_bowls',
  name: 'Marinated Chicken Rice Bowls',
  slug: 'marinated-chicken-rice-bowls',
  metadata: {
    timeBand: 'NORMAL',
    estimatedMinutes: 40,
    equipmentTags: ['STOVETOP'],
    leftoverStrategy: 'EXPECTED',
  },
  ingredients: [
    {
      ingredientId: 'ing_chicken_thighs',
      displayName: 'Boneless skinless chicken thighs',
      amount: 1.25,
      unit: 'LB',
      criticality: 'CRITICAL',
      kind: 'PROTEIN',
      shoppingCategory: 'MEAT_SEAFOOD',
    },
    {
      ingredientId: 'ing_rice',
      displayName: 'White rice (uncooked)',
      amount: 1.5,
      unit: 'CUP',
      criticality: 'CRITICAL',
      kind: 'CARB',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_broccoli_florets',
      displayName: 'Broccoli florets',
      amount: 12,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE',
    },
    {
      ingredientId: 'ing_soy_sauce',
      displayName: 'Soy sauce',
      amount: 0.25,
      unit: 'CUP',
      criticality: 'NON_CRITICAL',
      kind: 'CONDIMENT',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_olive_oil',
      displayName: 'Olive oil',
      amount: 2,
      unit: 'TBSP',
      criticality: 'NON_CRITICAL',
      kind: 'FAT_OIL',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_garlic_powder',
      displayName: 'Garlic powder',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
  ],
  preflight: [
    {
      type: 'MARINATE',
      description: 'Marinate chicken at least 30 minutes before cooking.',
      hoursBeforeCook: 0.5,
    },
  ],
  steps: [
    { stepNumber: 1, instruction: 'Marinate chicken thighs with soy, oil, garlic powder.', timerMinutes: 30 },
    { stepNumber: 2, instruction: 'Cook rice according to package.', timerMinutes: 18 },
    { stepNumber: 3, instruction: 'Sauté marinated chicken until cooked through.', timerMinutes: 10 },
    { stepNumber: 4, instruction: 'Steam or sauté broccoli until tender-crisp.', timerMinutes: 6 },
    { stepNumber: 5, instruction: 'Assemble bowls with rice, chicken, broccoli, sauce.' },
  ],
  tags: ['bowl', 'asian_inspired', 'kid_friendly'],
  variantHints: [
    {
      description: 'Swap chicken thighs for tofu for a vegetarian version.',
      safeSubIngredientId: 'ing_firm_tofu',
    },
    {
      description: 'Use frozen broccoli instead of fresh; cook from frozen.',
    },
  ],
};

// --- Export convenience array ---

export const seedRecipes: Recipe[] = [
  sheetPanChickenVeg,
  slowCookerChili,
  pantryRescuePasta,
  beefTacoNight,
  marinatedChickenBowls,
];
