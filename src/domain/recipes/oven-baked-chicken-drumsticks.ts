// Spec: recipe-spec.md §2.1, version 4.6.0
// Oven Baked Chicken Drumsticks
// Source: https://www.budgetbytes.com/baked-chicken-drumsticks/
// Imported: 2025-12-08T14:50:10.567Z

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
      "ingredientId": "ing_smoked-paprika-010",
      "displayName": "smoked paprika ($0.10)",
      "amount": 1,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_garlic-powder-005",
      "displayName": "garlic powder ($0.05)",
      "amount": 0.5,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_onion-powder-003",
      "displayName": "onion powder ($0.03)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_cayenne-pepper-002",
      "displayName": "cayenne pepper ($0.02)",
      "amount": 0.125,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_dried-oregano-003",
      "displayName": "dried oregano ($0.03)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_salt-002",
      "displayName": "salt ($0.02)",
      "amount": 0.5,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_black-pepper-freshly-cracked-002",
      "displayName": "black pepper (freshly cracked, $0.02)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_-chicken-drumsticks-6-pieces-423-",
      "displayName": ". chicken drumsticks (6 pieces, $4.23 *)",
      "amount": 1.75,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_cooking-oil-032-",
      "displayName": "cooking oil ($0.32 **)",
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
      "instruction": "Preheat the oven to 425ºF.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "Combine the smoked paprika, garlic powder, onion powder, cayenne pepper, oregano, salt, and pepper in a bowl.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "Place the chicken drumsticks in a bowl and drizzle the cooking oil over top.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 4,
      "instruction": "Sprinkle the prepared seasoning over the drumsticks, then toss until they&#39;re evenly coated in oil and spices.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "Place the seasoned drumsticks on a baking sheet with enough space around each so they&#39;re not touching.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "You can line the baking sheet with foil or parchment for easier cleanup, if desired.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 7,
      "instruction": "Transfer the chicken to the oven and bake for 40 minutes, or until they reach an internal temperature of 175ºF, flipping the drumsticks once half-way through.",
      "timerMinutes": 40,
      "timer": true,
      "parallel": false
    }
  ],
  "tags": []
};
