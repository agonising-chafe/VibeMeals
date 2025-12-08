// Spec: recipe-spec.md §2.1, version 4.6.0
// Easy Baked Ziti
// Source: https://www.budgetbytes.com/baked-ziti/
// Imported: 2025-12-08T14:50:17.550Z

import { Recipe } from '../types';

export const easyBakedZiti: Recipe = {
  "id": "r_easy-baked-ziti",
  "name": "Easy Baked Ziti",
  "slug": "easy-baked-ziti",
  "metadata": {
    "timeBand": "PROJECT",
    "estimatedMinutes": 82,
    "equipmentTags": [
      "DUTCH_OVEN"
    ],
    "leftoverStrategy": "EXPECTED"
  },
  "ingredients": [
    {
      "ingredientId": "ing_-ground-italian-sausage-sweet-mild-or-hot-499",
      "displayName": ". ground Italian sausage (sweet, mild, or hot) ($4.99)",
      "amount": 1,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_onion-027",
      "displayName": "onion ($0.27)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_-tomato-paste-050",
      "displayName": ". tomato paste ($0.50)",
      "amount": 3,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_-can-crushed-tomatoes-189",
      "displayName": ". can crushed tomatoes ($1.89)",
      "amount": 1,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_italian-seasoning-blend-030",
      "displayName": "Italian seasoning blend ($0.30)",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_water-000",
      "displayName": "water ($0.00)",
      "amount": 0.5,
      "unit": "CUP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_-ziti-167",
      "displayName": ". ziti ($1.67)",
      "amount": 1,
      "unit": "LB",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_salt-for-pasta-water-005",
      "displayName": "salt (for pasta water) ($0.05)",
      "amount": 0.5,
      "unit": "TBSP",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_-ricotta-339",
      "displayName": ". ricotta ($3.39)",
      "amount": 15,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_italian-cheese-blend-124",
      "displayName": "Italian cheese blend* ($1.24)",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_freshly-cracked-black-pepper-005",
      "displayName": "freshly cracked black pepper ($0.05)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_shredded-mozzarella-229",
      "displayName": "shredded mozzarella ($2.29)",
      "amount": 2,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_chopped-parsley-optional-for-garnish-020",
      "displayName": "chopped parsley (optional, for garnish) ($0.20)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Brown the sausage in a large skillet or pot over medium heat, until it&#x27;s brown and crispy on the edges (pork sausage contains a lot of fat, so I didn&#x27;t add any extra to the skillet).",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "While the sausage is browning, finely dice the onion.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "Add the onion to the skillet once the sausage has browned, and continue to sauté over medium heat until the onion is soft and translucent.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 4,
      "instruction": "Add the tomato paste, crushed tomatoes, Italian seasoning, and ½ cup water to the skillet with the sausage and stir to combine.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "Place a lid on the skillet and allow it to come up to a simmer.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "Once simmering, turn the heat down and allow it to continue to simmer while you cook the ziti.",
      "timer": false,
      "parallel": true
    },
    {
      "stepNumber": 7,
      "instruction": "Stir the sauce occasionally as it simmers.",
      "timer": false,
      "parallel": true
    },
    {
      "stepNumber": 8,
      "instruction": "After getting the sauce started, begin the ziti.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 9,
      "instruction": "Bring a large pot of water with ½ Tbsp salt to a boil over high heat.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 10,
      "instruction": "Once boiling, add the ziti, and let it continue to boil until tender (about 7-8 minutes).",
      "timerMinutes": 8,
      "timer": true,
      "parallel": false
    },
    {
      "stepNumber": 11,
      "instruction": "Drain the pasta in a colander.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 12,
      "instruction": "Shake the colander a bit to shake excess water out of the pasta.",
      "timer": false,
      "parallel": false
    }
  ],
  "tags": [
    "italian",
    "comfort_food",
    "healthy"
  ]
};
