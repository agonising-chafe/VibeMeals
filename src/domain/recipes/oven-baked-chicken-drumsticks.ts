// Spec: recipe-spec.md §2.1, version 4.6.0
// Oven Baked Chicken Drumsticks
// Source: https://www.budgetbytes.com/baked-chicken-drumsticks/
// Imported: 2025-12-08T01:55:21.569Z

import { Recipe } from '../types';

export const ovenBakedChickenDrumsticks: Recipe = {
  "id": "r_oven-baked-chicken-drumsticks",
  "name": "Oven Baked Chicken Drumsticks",
  "slug": "oven-baked-chicken-drumsticks",
  "metadata": {
    "timeBand": "PROJECT",
    "estimatedMinutes": 57,
    "equipmentTags": [
      "SHEET_PAN"
    ],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_paprika",
      "displayName": "paprika",
      "amount": 1,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_garlic-powder",
      "displayName": "garlic powder",
      "amount": 0.5,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_onion-powder",
      "displayName": "onion powder",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_cayenne-pepper",
      "displayName": "cayenne pepper",
      "amount": 0.125,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_oregano",
      "displayName": "oregano",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_salt",
      "displayName": "salt",
      "amount": 0.5,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
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
      "ingredientId": "ing_chicken-drumsticks",
      "displayName": "chicken drumsticks",
      "amount": 1.75,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_cooking-oil",
      "displayName": "cooking oil",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "PANTRY_DRY"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Preheat the oven to 425ºF."
    },
    {
      "stepNumber": 2,
      "instruction": "Combine the smoked paprika, garlic powder, onion powder, cayenne pepper, oregano, salt, and pepper in a bowl."
    },
    {
      "stepNumber": 3,
      "instruction": "Place the chicken drumsticks in a bowl and drizzle the cooking oil over top."
    },
    {
      "stepNumber": 4,
      "instruction": "Sprinkle the prepared seasoning over the drumsticks, then toss until they&#39;re evenly coated in oil and spices."
    },
    {
      "stepNumber": 5,
      "instruction": "Place the seasoned drumsticks on a baking sheet with enough space around each so they&#39;re not touching. You can line the baking sheet with foil or parchment for easier cleanup, if desired."
    },
    {
      "stepNumber": 6,
      "instruction": "Transfer the chicken to the oven and bake for 40 minutes, or until they reach an internal temperature of 175ºF, flipping the drumsticks once half-way through."
    },
    {
      "stepNumber": 7,
      "instruction": "Serve hot."
    }
  ],
  "tags": [
    "whole_30",
    "budget_friendly"
  ]
};
