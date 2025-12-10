// Spec: recipe-spec.md §2.1, version 4.6.0
// Lasagna Soup
// Source: https://www.budgetbytes.com/lasagna-soup/
// Imported: 2025-12-08T14:50:53.118Z

import { Recipe } from '../types';

export const lasagnaSoup: Recipe = {
  "id": "r_lasagna-soup",
  "name": "Lasagna Soup",
  "slug": "lasagna-soup",
  "metadata": {
    "timeBand": "NORMAL",
    "estimatedMinutes": 50,
    "equipmentTags": [
      "DUTCH_OVEN"
    ],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_cooking-oil-004",
      "displayName": "cooking oil",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_-italian-sausage-469",
      "displayName": "Italian sausage*",
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
      "ingredientId": "ing_bell-pepper-diced-150",
      "displayName": "bell pepper, diced",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_garlic-minced-032",
      "displayName": "garlic, minced",
      "amount": 4,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_tomato-paste-030",
      "displayName": "tomato paste",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_can-crushed-tomatoes-150",
      "displayName": "crushed tomatoes (28 oz can)",
      "amount": 1,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_can-diced-tomatoes-150",
      "displayName": "diced tomatoes (15 oz can)",
      "amount": 1,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_italian-seasoning-020",
      "displayName": "Italian seasoning",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_salt-005",
      "displayName": "salt",
      "amount": 0.75,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_freshly-cracked-black-pepper-002",
      "displayName": "freshly cracked black pepper",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_sugar-005",
      "displayName": "sugar",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_red-pepper-flakes-005",
      "displayName": "red pepper flakes",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_chicken-broth-091",
      "displayName": "chicken broth",
      "amount": 5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_noodles-115",
      "displayName": "noodles",
      "amount": 8,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_whole-milk-ricotta-cheese-193",
      "displayName": "whole milk ricotta cheese",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_hredded-mozzarella-cheese-057",
      "displayName": "hredded mozzarella cheese",
      "amount": 0.5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_rated-parmesan-cheese-040",
      "displayName": "rated parmesan cheese",
      "amount": 0.25,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_fresh-chopped-parsley-015",
      "displayName": "fresh chopped parsley",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_reshly-cracked-black-pepper-002",
      "displayName": "reshly cracked black pepper",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Heat a large dutch oven or soup pot over medium heat and add the oil.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "Crumble and brown the Italian sausage.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "Once the sausage has browned, add the diced onion, diced bell pepper, and minced garlic to the pot.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 4,
      "instruction": "Continue to sauté over medium heat until the onion is translucent and the garlic is fragrant.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "Now add the tomato paste, crushed tomatoes, diced tomatoes, Italian seasoning, salt, black pepper, sugar, red pepper flakes, and chicken broth.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "Stir all the ingredients together well.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 7,
      "instruction": "Place a lid on the pot, and bring the pot up to a boil.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 8,
      "instruction": "While the pot is heating up, break the lasagna noodles into one to two-inch pieces.",
      "timer": false,
      "parallel": true
    },
    {
      "stepNumber": 9,
      "instruction": "Add the noodles to the pot and give the soup a stir.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 10,
      "instruction": "Replace the lid, turn the heat down slightly to medium heat and continue boiling the soup for 12-14 minutes or until the lasagna noodles are tender.",
      "timerMinutes": 13,
      "timer": true,
      "parallel": false
    },
    {
      "stepNumber": 11,
      "instruction": "While the soup and noodles are boiling, make the ricotta cheese topping.",
      "timer": false,
      "parallel": true
    },
    {
      "stepNumber": 12,
      "instruction": "In a medium bowl, combine the ricotta, shredded mozzarella, grated parmesan cheese, chopped parsley, black pepper, and a pinch of salt.",
      "timer": false,
      "parallel": false
    }
  ],
  "tags": [
    "italian",
    "comfort_food",
    "weeknight"
  ]
} satisfies Recipe;
