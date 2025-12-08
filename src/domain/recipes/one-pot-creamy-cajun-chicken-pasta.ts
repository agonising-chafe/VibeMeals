// Spec: recipe-spec.md §2.1, version 4.6.0
// One Pot Creamy Cajun Chicken Pasta
// Source: https://www.budgetbytes.com/one-pot-creamy-cajun-chicken-pasta/
// Imported: 2025-12-08T14:50:25.320Z

import { Recipe } from '../types';

export const onePotCreamyCajunChickenPasta: Recipe = {
  "id": "r_one-pot-creamy-cajun-chicken-pasta",
  "name": "One Pot Creamy Cajun Chicken Pasta",
  "slug": "one-pot-creamy-cajun-chicken-pasta",
  "metadata": {
    "timeBand": "NORMAL",
    "estimatedMinutes": 38,
    "equipmentTags": [],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_smoked-paprika-020",
      "displayName": "smoked paprika",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_oregano-010",
      "displayName": "oregano",
      "amount": 1,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_thyme-010",
      "displayName": "thyme",
      "amount": 1,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_garlic-powder-005",
      "displayName": "garlic powder",
      "amount": 0.5,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_onion-powder-005",
      "displayName": "onion powder",
      "amount": 0.5,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_cayenne-pepper-003",
      "displayName": "cayenne pepper",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_black-pepper-002",
      "displayName": "black pepper",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_salt-002",
      "displayName": "salt",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_olive-oil-016",
      "displayName": "olive oil",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_butter-013",
      "displayName": "butter",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_-boneless-skinless-chicken-breast-547",
      "displayName": "boneless, skinless chicken breast",
      "amount": 1,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_onion-diced-032",
      "displayName": "onion, diced",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_-penne-pasta-uncooked-075",
      "displayName": "penne pasta (uncooked)",
      "amount": 0.5,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_-fire-roasted-diced-tomatoes-100",
      "displayName": "fire roasted diced tomatoes",
      "amount": 15,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_chicken-broth-026",
      "displayName": "chicken broth",
      "amount": 2,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_-cream-cheese-050",
      "displayName": "cream cheese",
      "amount": 2,
      "unit": "OZ",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_onions-sliced-025",
      "displayName": "onions, sliced",
      "amount": 3,
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
      "instruction": "Combine the ingredients for the Cajun seasoning in a small bowl.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "Cut the chicken into 1/2 to 3/4-inch cubes.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "Place the cubed chicken in a bowl, pour the Cajun seasoning over top, and stir to coat the chicken in spices.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 4,
      "instruction": "Add the olive oil and butter to a large deep skillet.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "Heat the oil and butter over medium-high until the skillet is very hot and the butter is melted and foamy.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "Add the seasoned chicken to the skillet and cook for a couple minutes on each side, or just until the outside gets some color.",
      "timer": false,
      "parallel": true
    },
    {
      "stepNumber": 7,
      "instruction": "The chicken does not need to be cooked through at this point.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 8,
      "instruction": "Add the diced yellow onion to the skillet and continue to sauté for about 2 minutes more, or just until the onion begins to soften.",
      "timerMinutes": 2,
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 9,
      "instruction": "Allow the moisture from the onion to dissolve any browned bits from the bottom of the skillet.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 10,
      "instruction": "Next, add the pasta, fire roasted diced tomatoes (with the juices), and chicken broth to the skillet.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 11,
      "instruction": "Stir just until everything is evenly combined, then place a lid on top and allow the broth to come up to a boil.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 12,
      "instruction": "Once boiling, turn the heat down to medium-low and let the pasta simmer for about ten minutes, stirring every couple of minutes, until the pasta is tender and the liquid is thick and saucy.",
      "timer": false,
      "parallel": true
    }
  ],
  "tags": [
    "weeknight"
  ]
};
