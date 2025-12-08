// Spec: recipe-spec.md §2.1, version 4.6.0
// Spaghetti Aglio e Olio (Pasta in Garlic and Oil Sauce)
// Source: https://www.seriouseats.com/spaghetti-aglio-olio-recipe
// Imported: 2025-12-08T01:52:28.445Z

import { Recipe } from '../types';

export const spaghettiAglioEOlioPastaInGarlicAndOilSauce: Recipe = {
  "id": "r_spaghetti-aglio-e-olio-pasta-in-garlic-and-oil-sauce",
  "name": "Spaghetti Aglio e Olio (Pasta in Garlic and Oil Sauce)",
  "slug": "spaghetti-aglio-e-olio-pasta-in-garlic-and-oil-sauce",
  "metadata": {
    "timeBand": "FAST",
    "estimatedMinutes": 13,
    "equipmentTags": [],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_kosher-salt",
      "displayName": "kosher salt",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_spaghetti",
      "displayName": "spaghetti",
      "amount": 450,
      "unit": "GRAM",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_olive-oil",
      "displayName": "olive oil",
      "amount": 120,
      "unit": "ML",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_garlic",
      "displayName": "garlic",
      "amount": 4,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_",
      "displayName": "",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_",
      "displayName": "",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "In a pot of salted boiling water, cook spaghetti until just shy of al dente (about 1 minute less than the package directs). Reserve pasta cooking water."
    },
    {
      "stepNumber": 2,
      "instruction": "Meanwhile, in a large skillet, combine 6 tablespoons oil and garlic."
    },
    {
      "stepNumber": 3,
      "instruction": "Add pinch of red pepper flakes, if using. Cook over medium heat until garlic is very lightly golden, about 5 minutes. (Adjust heat as necessary to keep it gently sizzling.)"
    },
    {
      "stepNumber": 4,
      "instruction": "Transfer pasta to skillet along with 1/2 cup pasta water, increase heat to high, and cook, stirring and tossing rapidly, until a creamy, emulsified sauce forms and coats the noodles."
    },
    {
      "stepNumber": 5,
      "instruction": "Remove from heat, add remaining 2 tablespoons olive oil, and stir well to combine."
    },
    {
      "stepNumber": 6,
      "instruction": "Mix in parsley, if using, and serve right away."
    }
  ],
  "tags": [
    "quick",
    "kid_friendly"
  ]
};
