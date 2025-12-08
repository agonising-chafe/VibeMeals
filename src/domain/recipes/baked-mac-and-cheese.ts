// Spec: recipe-spec.md §2.1, version 4.6.0
// Baked Mac and Cheese
// Source: https://www.budgetbytes.com/baked-mac-and-cheese/
// Imported: 2025-12-08T02:00:21.389Z

import { Recipe } from '../types';

export const bakedMacAndCheese: Recipe = {
  "id": "r_baked-mac-and-cheese",
  "name": "Baked Mac and Cheese",
  "slug": "baked-mac-and-cheese",
  "metadata": {
    "timeBand": "PROJECT",
    "estimatedMinutes": 69,
    "equipmentTags": [],
    "leftoverStrategy": "NONE"
  },
  "ingredients": [
    {
      "ingredientId": "ing_chicken-broth",
      "displayName": "chicken broth",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_heavy-cream",
      "displayName": "heavy cream",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_seasoning",
      "displayName": "seasoning",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_garlic-powder",
      "displayName": "garlic powder",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_paprika",
      "displayName": "paprika",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
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
      "ingredientId": "ing_pepper",
      "displayName": "pepper",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PANTRY_DRY"
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
      "ingredientId": "ing_cheddar-cheese",
      "displayName": "cheddar cheese",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_cheese-blend",
      "displayName": "cheese blend",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_macaroni",
      "displayName": "macaroni",
      "amount": 8,
      "unit": "OZ",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_butter",
      "displayName": "butter",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_panko-breadcrumbs",
      "displayName": "panko breadcrumbs",
      "amount": 0.5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_seasoning",
      "displayName": "seasoning",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_garlic-powder",
      "displayName": "garlic powder",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_paprika",
      "displayName": "paprika",
      "amount": 0.25,
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
      "ingredientId": "ing_salt",
      "displayName": "salt",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_cheddar-cheese",
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
      "instruction": "Preheat the oven to 375ºF."
    },
    {
      "stepNumber": 2,
      "instruction": "Add the chicken broth, heavy cream, Italian seasoning, garlic powder, ¼ tsp smoked paprika, cayenne, salt, and pepper to a sauce pot. Bring the mixture to a boil over medium-high heat, whisking occasionally."
    },
    {
      "stepNumber": 3,
      "instruction": "Once boiling, turn the heat down to medium and allow the mixture to simmer for 7 minutes, whisking often, to reduce."
    },
    {
      "stepNumber": 4,
      "instruction": "Remove the sauce from the heat. In a separate bowl, combine the shredded cheddar cheese and Italian cheese blend. Reserve about 1/4 of the cheese mix to use as a layer in the casserole dish."
    },
    {
      "stepNumber": 5,
      "instruction": "Add the remaining cheeses to the sauce a handful at a time, whisking it into the sauce until fully melted before adding more. Continue whisking in the cheese until all of it has been added and the sauce is smooth. Set the sauce aside (whisk occasionally to prevent a skin from forming)."
    },
    {
      "stepNumber": 6,
      "instruction": "Bring a large pot of water to a boil for the macaroni. Once boiling, add the macaroni and boil just until tender (about 7 minutes)."
    },
    {
      "stepNumber": 7,
      "instruction": "Drain the macaroni in a colander."
    },
    {
      "stepNumber": 8,
      "instruction": "While the macaroni is boiling, make the breadcrumbs. Melt the butter in a small skillet over medium heat. Once melted, add the Panko, Italian seasoning, garlic powder, ¼ tsp smoked paprika, salt, and pepper. Stir and cook for about 3 minutes, or just until the breadcrumbs begin to toast."
    },
    {
      "stepNumber": 9,
      "instruction": "Remove the breadcrumbs from the heat and allow them to cool slightly."
    },
    {
      "stepNumber": 10,
      "instruction": "Stir the drained macaroni into the cheese sauce until well combined. Grease an 8x8-inch baking dish."
    },
    {
      "stepNumber": 11,
      "instruction": "Layer half of the macaroni into the baking dish."
    },
    {
      "stepNumber": 12,
      "instruction": "Sprinkle the reserved shredded cheese mixture over the macaroni."
    },
    {
      "stepNumber": 13,
      "instruction": "Layer the second half of the macaroni over the cheese."
    },
    {
      "stepNumber": 14,
      "instruction": "Combine the cooled breadcrumbs with the remaining 1/4 cup shredded cheddar cheese, then sprinkle over top the macaroni and cheese."
    },
    {
      "stepNumber": 15,
      "instruction": "Bake the macaroni and cheese in the preheated oven for about 20 minutes or until the cheese is bubbling up around the edges and the breadcrumbs on top are golden brown. Allow the mac and cheese to cool for about 5 minutes before serving."
    }
  ],
  "tags": [
    "budget_friendly"
  ]
};
