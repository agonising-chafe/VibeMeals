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
      "displayName": "cooking oil ($0.04)",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_-italian-sausage-469",
      "displayName": ". Italian sausage* ($4.69)",
      "amount": 1,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_onion-diced-032",
      "displayName": "onion, diced ($0.32)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_bell-pepper-diced-150",
      "displayName": "bell pepper, diced ($1.50)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_of-garlic-minced-032",
      "displayName": "of garlic, minced ($0.32)",
      "amount": 4,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_tomato-paste-030",
      "displayName": "tomato paste ($0.30)",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_-can-crushed-tomatoes-150",
      "displayName": ". can crushed tomatoes ($1.50)",
      "amount": 1,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_-can-diced-tomatoes-150",
      "displayName": ". can diced tomatoes ($1.50)",
      "amount": 1,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_italian-seasoning-020",
      "displayName": "Italian seasoning ($0.20)",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_alt-005",
      "displayName": "alt ($0.05)",
      "amount": 0.75,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_reshly-cracked-black-pepper-002",
      "displayName": "reshly cracked black pepper ($0.02)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_sugar-005",
      "displayName": "sugar ($0.05)",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_ed-pepper-flakes-005",
      "displayName": "ed pepper flakes ($0.05)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_chicken-broth-091",
      "displayName": "chicken broth ($0.91)",
      "amount": 5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_noodles-115",
      "displayName": "noodles ($1.15)",
      "amount": 8,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_whole-milk-ricotta-cheese-193",
      "displayName": "whole milk ricotta cheese ($1.93)",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_hredded-mozzarella-cheese-057",
      "displayName": "hredded mozzarella cheese ($0.57)",
      "amount": 0.5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_rated-parmesan-cheese-040",
      "displayName": "rated parmesan cheese ($0.40)",
      "amount": 0.25,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_fresh-chopped-parsley-015",
      "displayName": "fresh chopped parsley ($0.15)",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_reshly-cracked-black-pepper-002",
      "displayName": "reshly cracked black pepper ($0.02)",
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
    "healthy",
    "weeknight"
  ]
};
