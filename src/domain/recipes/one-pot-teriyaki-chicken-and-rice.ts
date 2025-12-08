// Spec: recipe-spec.md §2.1, version 4.6.0
// One Pot Teriyaki Chicken and Rice
// Source: https://www.budgetbytes.com/one-pot-teriyaki-chicken-and-rice/
// Imported: 2025-12-08T14:50:29.303Z

import { Recipe } from '../types';

export const onePotTeriyakiChickenAndRice: Recipe = {
  "id": "r_one-pot-teriyaki-chicken-and-rice",
  "name": "One Pot Teriyaki Chicken and Rice",
  "slug": "one-pot-teriyaki-chicken-and-rice",
  "metadata": {
    "timeBand": "NORMAL",
    "estimatedMinutes": 44,
    "equipmentTags": [],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_-skinless-chicken-breast-about-23-lb-281",
      "displayName": ", skinless chicken breast (about 2/3 lb.) ($2.81)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_cooking-oil-004",
      "displayName": "cooking oil ($0.04)",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_garlic-minced-016",
      "displayName": "garlic, minced ($0.16)",
      "amount": 2,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_grated-fresh-ginger-010",
      "displayName": "grated fresh ginger ($0.10)",
      "amount": 1,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_uncooked-jasmine-rice-099",
      "displayName": "uncooked jasmine rice ($0.99)",
      "amount": 1.5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_water-000",
      "displayName": "water ($0.00)",
      "amount": 2.5,
      "unit": "CUP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_-frozen-stir-fry-vegetables-159",
      "displayName": ". frozen stir fry vegetables ($1.59)",
      "amount": 12,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "FROZEN"
    },
    {
      "ingredientId": "ing_soy-sauce-024",
      "displayName": "soy sauce ($0.24)",
      "amount": 0.25,
      "unit": "CUP",
      "criticality": "NON_CRITICAL",
      "kind": "CONDIMENT",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_brown-sugar-008",
      "displayName": "brown sugar ($0.08)",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_toasted-sesame-oil-010",
      "displayName": "toasted sesame oil ($0.10)",
      "amount": 1,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_onions-sliced-015",
      "displayName": "onions, sliced ($0.15)",
      "amount": 2,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Cut the chicken breast into very small pieces, about 1/2 to 3/4-inch in size.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "Add the cooking oil, garlic, and ginger to a large, deep skillet.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "Cook over medium heat for about 1 minute, then add the chicken pieces and continue to sauté just until the outside of the chicken is no longer pink.",
      "timerMinutes": 1,
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 4,
      "instruction": "Do not over cook the chicken here, it will finish cooking with the rice.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "Add the uncooked rice to the skillet and continue to sauté for 1-2 minutes more.",
      "timerMinutes": 2,
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "You should hear the rice popping.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 7,
      "instruction": "Finally, add the water and give everything a brief stir to make sure there is no rice stuck to the bottom of the skillet.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 8,
      "instruction": "Place a lid on the skillet, turn the heat up to medium-high, and allow the water to come to a full boil.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 9,
      "instruction": "Once boiling, turn the heat down to low and let it simmer for 10 minutes.",
      "timerMinutes": 10,
      "timer": true,
      "parallel": false
    },
    {
      "stepNumber": 10,
      "instruction": "While the skillet is simmering over low, prepare the teriyaki sauce.",
      "timer": false,
      "parallel": true
    },
    {
      "stepNumber": 11,
      "instruction": "In a small bowl, stir together the soy sauce, brown sugar, and toasted sesame oil.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 12,
      "instruction": "The brown sugar may not fully dissolve, but that's okay.",
      "timer": false,
      "parallel": false
    }
  ],
  "tags": [
    "asian",
    "healthy",
    "weeknight"
  ]
};
