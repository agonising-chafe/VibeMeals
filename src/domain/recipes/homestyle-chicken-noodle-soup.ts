// Spec: recipe-spec.md §2.1, version 4.6.0
// Homestyle Chicken Noodle Soup
// Source: https://damndelicious.net/2020/01/25/homestyle-chicken-noodle-soup/
// Imported: 2025-12-08T01:26:54.287Z

import { Recipe } from '../types';

export const homestyleChickenNoodleSoup: Recipe = {
  "id": "r_homestyle-chicken-noodle-soup",
  "name": "Homestyle Chicken Noodle Soup",
  "slug": "homestyle-chicken-noodle-soup",
  "metadata": {
    "timeBand": "PROJECT",
    "estimatedMinutes": 88,
    "equipmentTags": [
      "DUTCH_OVEN"
    ],
    "leftoverStrategy": "EXPECTED"
  },
  "ingredients": [
    {
      "ingredientId": "ing_butter",
      "displayName": "butter",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_onion",
      "displayName": "onion",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_carrots",
      "displayName": "carrots",
      "amount": 2,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_celery",
      "displayName": "celery",
      "amount": 2,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_garlic",
      "displayName": "garlic",
      "amount": 3,
      "unit": "UNIT",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_chicken-stock",
      "displayName": "chicken stock",
      "amount": 8,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_bay-leaves",
      "displayName": "bay leaves",
      "amount": 2,
      "unit": "UNIT",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_kosher-salt-pepper",
      "displayName": "kosher salt pepper",
      "amount": 8,
      "unit": "UNIT",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_chicken-breasts",
      "displayName": "chicken breasts",
      "amount": 2.5,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_wide-egg-noodles",
      "displayName": "wide egg noodles",
      "amount": 2.5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_parsley-leaves",
      "displayName": "parsley leaves",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_dill",
      "displayName": "dill",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_lemon-juice",
      "displayName": "lemon juice",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PRODUCE"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Melt butter in a large stockpot or Dutch oven over medium heat."
    },
    {
      "stepNumber": 2,
      "instruction": "Add onion, carrots and celery. Cook, stirring occasionally, until tender, about 3-4 minutes. Stir in garlic until fragrant, about 1 minute."
    },
    {
      "stepNumber": 3,
      "instruction": "Whisk in chicken stock and bay leaves; season with salt and pepper, to taste."
    },
    {
      "stepNumber": 4,
      "instruction": "Add chicken and bring to boil; reduce heat and simmer, covered, until the chicken is cooked through, about 30-40 minutes."
    },
    {
      "stepNumber": 5,
      "instruction": "Remove chicken and let cool before dicing into bite-size pieces, discarding bones."
    },
    {
      "stepNumber": 6,
      "instruction": "Stir in chicken and pasta and cook until tender, about 6-7 minutes."
    },
    {
      "stepNumber": 7,
      "instruction": "Remove from heat; stir in parsley, dill and lemon juice; season with salt and pepper, to taste."
    },
    {
      "stepNumber": 8,
      "instruction": "Serve immediately."
    }
  ],
  "tags": []
};
