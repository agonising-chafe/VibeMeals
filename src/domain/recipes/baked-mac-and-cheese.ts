// Spec: recipe-spec.md §2.1, version 4.6.0
// Baked Mac and Cheese
// Source: https://www.budgetbytes.com/baked-mac-and-cheese/
// Imported: 2025-12-08T14:50:30.897Z

import { Recipe } from '../types';

export const bakedMacAndCheese: Recipe = {
  "id": "r_baked-mac-and-cheese",
  "name": "Baked Mac and Cheese",
  "slug": "baked-mac-and-cheese",
  "metadata": {
    "timeBand": "PROJECT",
    "estimatedMinutes": 69,
    "equipmentTags": [
      "DUTCH_OVEN"
    ],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_chicken-broth-016",
      "displayName": "chicken broth",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_heavy-cream-149",
      "displayName": "heavy cream",
      "amount": 1,
      "unit": "CUP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_italian-seasoning-002",
      "displayName": "Italian seasoning",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_garlic-powder-002",
      "displayName": "garlic powder",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_smoked-paprika-002",
      "displayName": "smoked paprika",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_cayenne-pepper-001",
      "displayName": "cayenne pepper",
      "amount": 0.125,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_black-pepper-freshly-cracked-002",
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
      "amount": 0.5,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_cheddar-cheese-shredded-124",
      "displayName": "cheddar cheese",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_italian-cheese-blend-shredded-124",
      "displayName": "Italian cheese blend",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_-macaroni-uncooked-067-",
      "displayName": "macaroni",
      "amount": 8,
      "unit": "OZ",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_butter-028",
      "displayName": "butter",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_panko-breadcrumbs-025",
      "displayName": "panko breadcrumbs",
      "amount": 0.5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_italian-seasoning-002",
      "displayName": "Italian seasoning",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_garlic-powder-002",
      "displayName": "garlic powder",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_smoked-paprika-002",
      "displayName": "smoked paprika",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_lack-pepper-freshly-cracked-002",
      "displayName": "lack pepper",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_alt-002",
      "displayName": "alt",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_cheddar-cheese-shredded-029",
      "displayName": "cheddar cheese",
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
      "instruction": "Preheat the oven to 375ºF.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "Add the chicken broth, heavy cream, Italian seasoning, garlic powder, ¼ tsp smoked paprika, cayenne, salt, and pepper to a sauce pot.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "Bring the mixture to a boil over medium-high heat, whisking occasionally.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 4,
      "instruction": "Once boiling, turn the heat down to medium and allow the mixture to simmer for 7 minutes, whisking often, to reduce.",
      "timerMinutes": 7,
      "timer": true,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "Remove the sauce from the heat.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "In a separate bowl, combine the shredded cheddar cheese and Italian cheese blend.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 7,
      "instruction": "Reserve about 1/4 of the cheese mix to use as a layer in the casserole dish.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 8,
      "instruction": "Add the remaining cheeses to the sauce a handful at a time, whisking it into the sauce until fully melted before adding more.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 9,
      "instruction": "Continue whisking in the cheese until all of it has been added and the sauce is smooth.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 10,
      "instruction": "Set the sauce aside (whisk occasionally to prevent a skin from forming).",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 11,
      "instruction": "Bring a large pot of water to a boil for the macaroni.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 12,
      "instruction": "Once boiling, add the macaroni and boil just until tender (about 7 minutes).",
      "timerMinutes": 7,
      "timer": true,
      "parallel": false
    }
  ],
  "tags": [
    "healthy"
  ]
};
