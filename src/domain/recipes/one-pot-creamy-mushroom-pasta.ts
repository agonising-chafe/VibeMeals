// Spec: recipe-spec.md §2.1, version 4.6.0
// One Pot Creamy Mushroom Pasta
// Source: https://www.budgetbytes.com/one-pot-creamy-mushroom-pasta/
// Imported: 2025-12-08T14:49:45.391Z

import { Recipe } from '../types';

export const onePotCreamyMushroomPasta: Recipe = {
  "id": "r_one-pot-creamy-mushroom-pasta",
  "name": "One Pot Creamy Mushroom Pasta",
  "slug": "one-pot-creamy-mushroom-pasta",
  "metadata": {
    "timeBand": "NORMAL",
    "estimatedMinutes": 38,
    "equipmentTags": [],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_garlic-016",
      "displayName": "garlic ($0.16)",
      "amount": 4,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_-baby-bella-mushrooms-237",
      "displayName": ". baby bella mushrooms ($2.37)",
      "amount": 8,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_butter-020",
      "displayName": "butter ($0.20)",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_salt-001",
      "displayName": "salt ($0.01)",
      "amount": 0.125,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_freshly-cracked-pepper-002",
      "displayName": "freshly cracked pepper ($0.02)",
      "amount": 0.125,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_-fettuccine-059",
      "displayName": ". fettuccine* ($0.59)",
      "amount": 8,
      "unit": "OZ",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_vegetable-broth-020",
      "displayName": "vegetable broth ($0.20)",
      "amount": 2.5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_heavy-cream-098",
      "displayName": "heavy cream** ($0.98)",
      "amount": 0.3333333333333333,
      "unit": "CUP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_grated-parmesan-044",
      "displayName": "grated Parmesan ($0.44)",
      "amount": 0.25,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Mince the garlic and slice the mushrooms.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "Add the butter and garlic to a deep skillet and sauté over medium heat for one minute.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "Add the sliced mushrooms, salt, and pepper, and continue to sauté until the mushrooms have softened, all of their moisture has evaporated from the skillet, and the edges are beginning to brown.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 4,
      "instruction": "Add the fettuccine to the skillet along with the vegetable broth and stir to combine.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "It&#39;s okay if the broth doesn&#39;t fully submerge the pasta.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "Place a lid on the skillet, turn the heat up to medium-high, and allow the broth to come up to a boil.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 7,
      "instruction": "When it reaches a boil, give the pasta a quick stir, replace the lid, then turn the heat down to medium-low.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 8,
      "instruction": "Continue to let the pasta simmer in the broth for about 10 minutes, stirring occasionally (always replacing the lid), or until the pasta is tender.",
      "timerMinutes": 10,
      "timer": true,
      "parallel": true
    },
    {
      "stepNumber": 9,
      "instruction": "There should be a little saucy liquid left in the bottom of the skillet.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 10,
      "instruction": "Add the heavy cream to the skillet and stir to combine.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 11,
      "instruction": "Turn the heat off then add the Parmesan and continue to stir the pasta until the Parmesan is melted.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 12,
      "instruction": "Give the pasta a taste and add salt or pepper if needed.",
      "timer": false,
      "parallel": false
    }
  ],
  "tags": [
    "kid_friendly",
    "healthy",
    "weeknight"
  ]
};
