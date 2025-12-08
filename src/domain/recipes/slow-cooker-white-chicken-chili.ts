// Spec: recipe-spec.md §2.1, version 4.6.0
// Slow Cooker White Chicken Chili
// Source: https://www.budgetbytes.com/slow-cooker-white-chicken-chili/
// Imported: 2025-12-08T01:59:33.371Z

import { Recipe } from '../types';

export const slowCookerWhiteChickenChili: Recipe = {
  "id": "r_slow-cooker-white-chicken-chili",
  "name": "Slow Cooker White Chicken Chili",
  "slug": "slow-cooker-white-chicken-chili",
  "metadata": {
    "timeBand": "PROJECT",
    "estimatedMinutes": 319,
    "equipmentTags": [
      "SLOW_COOKER"
    ],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_cannellini-beans",
      "displayName": "cannellini beans",
      "amount": 30,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_cayenne-pepper",
      "displayName": "cayenne pepper",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_chicken-breast",
      "displayName": "chicken breast",
      "amount": 0.75,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_chicken-broth",
      "displayName": "chicken broth",
      "amount": 2,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_garlic",
      "displayName": "garlic",
      "amount": 2,
      "unit": "UNIT",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_ground-cumin",
      "displayName": "ground cumin",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_jack-cheese",
      "displayName": "jack cheese",
      "amount": 4,
      "unit": "OZ",
      "criticality": "CRITICAL",
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
      "ingredientId": "ing_oregano",
      "displayName": "oregano",
      "amount": 1,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_pepper",
      "displayName": "pepper",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_pinto-beans",
      "displayName": "pinto beans",
      "amount": 15,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_salsa-verde",
      "displayName": "salsa verde",
      "amount": 16,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "CONDIMENT",
      "shoppingCategory": "OTHER"
    }
  ],
  "preflight": [
    {
      "type": "SLOW_COOK",
      "description": "Prepare in morning for slow cooker (4+ hours cook time)",
      "hoursBeforeCook": 4
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Dice the onion and mince the garlic. Slice the jalapeńo lengthwise, scrape out the seeds with a spoon, then dice."
    },
    {
      "stepNumber": 2,
      "instruction": "Place the onion, garlic, jalapeño, and chicken breast in the bottom of a slow cooker."
    },
    {
      "stepNumber": 3,
      "instruction": "Drain and rinse the cannellini beans and pinto beans, then add them to the slow cooker, along with the salsa, cumin, oregano, cayenne, and freshly ground black pepper."
    },
    {
      "stepNumber": 4,
      "instruction": "Pour two cups of chicken broth over the contents in the cooker and then give everything a brief stir."
    },
    {
      "stepNumber": 5,
      "instruction": "Place the lid on the slow cooker and cook on high for four hours.After four hours, the chicken should be tender and easily shreddable (if not, replace the lid and cook for one more hour). Carefully remove the chicken breast from the slow cooker and use two forks to shred the meat. Return the meat to the slow cooker. Stir the chili, slightly mashing the beans with the back of the spoon as you stir."
    },
    {
      "stepNumber": 6,
      "instruction": "Serve the chili hot topped with shredded Monterrey Jack cheese. Other optional toppings include fresh cilantro, diced avocado, freshly squeeze lime, or tortilla chips."
    }
  ],
  "tags": [
    "american",
    "gluten_free",
    "slow_cooker",
    "make_ahead",
    "budget_friendly"
  ]
};
