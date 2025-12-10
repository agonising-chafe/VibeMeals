// Spec: recipe-spec.md §2.1, version 4.6.0
// One-Pot Chicken and Rice  
// Source: Manual creation based on recipe starter pack
// Created: 2024-12-07

import { Recipe } from '../types';

export const onePotChickenRice: Recipe = {
  id: 'r_one-pot-chicken-rice',
  name: 'One-Pot Chicken and Rice',
  slug: 'one-pot-chicken-rice',
  
  metadata: {
    timeBand: 'NORMAL',
    estimatedMinutes: 45,
    equipmentTags: ['DUTCH_OVEN'],
    leftoverStrategy: 'EXPECTED'
  },
  
  ingredients: [
    {
      ingredientId: 'ing_chicken-thighs',
      displayName: 'boneless skinless chicken thighs',
      amount: 1.25,
      unit: 'LB',
      criticality: 'CRITICAL',
      kind: 'PROTEIN',
      shoppingCategory: 'MEAT_SEAFOOD'
    },
    {
      ingredientId: 'ing_white-rice',
      displayName: 'long-grain white rice (uncooked)',
      amount: 1.5,
      unit: 'CUP',
      criticality: 'CRITICAL',
      kind: 'CARB',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_chicken-broth',
      displayName: 'chicken broth',
      amount: 2.5,
      unit: 'CUP',
      criticality: 'CRITICAL',
      kind: 'OTHER',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_onion-yellow',
      displayName: 'yellow onion, diced',
      amount: 1,
      unit: 'UNIT',
      criticality: 'CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE'
    },
    {
      ingredientId: 'ing_garlic-cloves',
      displayName: 'garlic cloves, minced',
      amount: 3,
      unit: 'UNIT',
      criticality: 'NON_CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE'
    },
    {
      ingredientId: 'ing_olive-oil',
      displayName: 'olive oil',
      amount: 2,
      unit: 'TBSP',
      criticality: 'NON_CRITICAL',
      kind: 'FAT_OIL',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_paprika',
      displayName: 'paprika',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_thyme-dried',
      displayName: 'dried thyme',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_salt',
      displayName: 'salt',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_black-pepper',
      displayName: 'black pepper',
      amount: 0.5,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_frozen-peas',
      displayName: 'frozen peas',
      amount: 1,
      unit: 'CUP',
      criticality: 'NON_CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'FROZEN'
    },
    {
      ingredientId: 'ing_parsley-fresh',
      displayName: 'fresh parsley for garnish',
      amount: 0.25,
      unit: 'CUP',
      criticality: 'NON_CRITICAL',
      kind: 'OTHER',
      shoppingCategory: 'PRODUCE'
    }
  ],
  
  preflight: [],
  
  steps: [
    {
      stepNumber: 1,
      instruction: 'Pat chicken thighs dry and season both sides with salt, pepper, paprika, and thyme.'
    },
    {
      stepNumber: 2,
      instruction: 'Heat olive oil in a large Dutch oven or heavy pot over medium-high heat.'
    },
    {
      stepNumber: 3,
      instruction: 'Add chicken thighs and sear for 3-4 minutes per side until golden brown. Remove and set aside.'
    },
    {
      stepNumber: 4,
      instruction: 'In the same pot, add diced onion and cook for 3-4 minutes until softened.'
    },
    {
      stepNumber: 5,
      instruction: 'Add minced garlic and cook for 30 seconds until fragrant.'
    },
    {
      stepNumber: 6,
      instruction: 'Add rice and stir to coat with oil for 1-2 minutes.'
    },
    {
      stepNumber: 7,
      instruction: 'Pour in chicken broth, scraping up any browned bits from the bottom of the pot.'
    },
    {
      stepNumber: 8,
      instruction: 'Return chicken thighs to the pot, nestling them into the rice.'
    },
    {
      stepNumber: 9,
      instruction: 'Bring to a boil, then reduce heat to low, cover, and simmer for 20-25 minutes until rice is tender and chicken reaches 165°F.'
    },
    {
      stepNumber: 10,
      instruction: 'Stir in frozen peas, cover, and let sit for 5 minutes off heat.'
    },
    {
      stepNumber: 11,
      instruction: 'Fluff rice with a fork, garnish with fresh parsley, and serve.'
    }
  ],
  
  tags: ['one_pot', 'comfort_food', 'weeknight', 'family_friendly']
} satisfies Recipe;
