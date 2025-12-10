// Spec: recipe-spec.md §2.1, version 4.6.0
// BBQ Ribs
// Source: https://www.budgetbytes.com/slow-cooker-bbq-ribs/
// Imported: 2025-12-08T14:50:55.056Z

import { Recipe } from '../types';

export const bbqRibs: Recipe = {
  "id": "r_bbq-ribs",
  "name": "BBQ Ribs",
  "slug": "bbq-ribs",
  "metadata": {
    "timeBand": "PROJECT",
    "estimatedMinutes": 182,
    "equipmentTags": [
      "OVEN",
      "BAKING_DISH"
    ],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_pork-ribs-882",
      "displayName": "pork ribs",
      "amount": 3,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_butter-melted-037",
      "displayName": "butter, melted",
      "amount": 4,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_salt-010",
      "displayName": "salt",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_black-pepper-010",
      "displayName": "black pepper",
      "amount": 1,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_garlic-powder-020",
      "displayName": "garlic powder",
      "amount": 2,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_onion-powder-020",
      "displayName": "onion powder",
      "amount": 2,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
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
      "ingredientId": "ing_brown-sugar-004",
      "displayName": "brown sugar",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_cayenne-020",
      "displayName": "cayenne",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_ground-mustard-020",
      "displayName": "ground mustard",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_chicken-broth-039",
      "displayName": "chicken broth",
      "amount": 3,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_bbq-sauce-094",
      "displayName": "BBQ sauce",
      "amount": 1.5,
      "unit": "CUP",
      "criticality": "NON_CRITICAL",
      "kind": "CONDIMENT",
      "shoppingCategory": "PANTRY_DRY"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Place an oven rack in the center of the oven and preheat it to 300°F.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "Trim the ribs, removing excess fat.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "Trim the thicker end to even out the thickness. (Cook the trimmed meat with the ribs as a cook&#39;s bonus.) Turn the ribs over and remove the silvery membrane from the back of the ribs.",
      "timer": false,
      "parallel": true
    },
    {
      "stepNumber": 4,
      "instruction": "Line a sheet pan that&#39;s at least 2 inches deep with heavy-duty aluminum foil and place a wire cooling rack in it.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "If you do not have a cooling rack, crumple a long sheet of aluminum and roll it into a rack-sized donut that is at least 2 inches thick.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "Place the trimmed ribs on the rack.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 7,
      "instruction": "Pat off any excess moisture with a paper towel.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 8,
      "instruction": "Make a rub by mixing salt, pepper, garlic powder, onion powder, smoked paprika, brown sugar, cayenne, ground mustard, and melted butter.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 9,
      "instruction": "Rub the seasoning generously all over the meaty top of the ribs in a thick layer.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 10,
      "instruction": "Pour chicken broth into the sheet pan, being careful not to pour it on the ribs.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 11,
      "instruction": "Place the sheet pan in the oven.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 12,
      "instruction": "Lower the temperature to 250°F.",
      "timer": false,
      "parallel": false
    }
  ],
  "tags": [
    "sheet_pan"
  ]
};
