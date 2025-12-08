// Spec: recipe-spec.md §2.1, version 4.6.0
// Lasagna Soup
// Source: https://www.budgetbytes.com/lasagna-soup/
// Imported: 2025-12-08T02:08:07.069Z

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
      "ingredientId": "ing_cooking-oil-0-04",
      "displayName": "cooking oil ($0.04)",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "FAT_OIL",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_lb-italian-sausage-4-69",
      "displayName": "lb. Italian sausage* ($4.69)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_onion-diced-0-32",
      "displayName": "onion, diced ($0.32)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_bell-pepper-diced-1-50",
      "displayName": "bell pepper, diced ($1.50)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_of-garlic-minced-0-32",
      "displayName": "of garlic, minced ($0.32)",
      "amount": 4,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_tomato-paste-0-30",
      "displayName": "tomato paste ($0.30)",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_15oz-can-crushed-tomatoes-1-50",
      "displayName": "15oz. can crushed tomatoes ($1.50)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_14oz-can-diced-tomatoes-1-50",
      "displayName": "14oz. can diced tomatoes ($1.50)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_italian-seasoning-0-20",
      "displayName": "Italian seasoning ($0.20)",
      "amount": 2,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_salt-0-05",
      "displayName": "salt ($0.05)",
      "amount": 0.75,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_freshly-cracked-black-pepper-0-02",
      "displayName": "freshly cracked black pepper ($0.02)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_sugar-0-05",
      "displayName": "sugar ($0.05)",
      "amount": 2,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_red-pepper-flakes-0-05",
      "displayName": "red pepper flakes ($0.05)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_chicken-broth-0-91",
      "displayName": "chicken broth ($0.91)",
      "amount": 5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_noodles-1-15",
      "displayName": "noodles ($1.15)",
      "amount": 8,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "CARB",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_whole-milk-ricotta-cheese-1-93",
      "displayName": "whole milk ricotta cheese ($1.93)",
      "amount": 1,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_shredded-mozzarella-cheese-0-57",
      "displayName": "shredded mozzarella cheese ($0.57)",
      "amount": 0.5,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_grated-parmesan-cheese-0-40",
      "displayName": "grated parmesan cheese ($0.40)",
      "amount": 0.25,
      "unit": "CUP",
      "criticality": "CRITICAL",
      "kind": "DAIRY",
      "shoppingCategory": "DAIRY_EGGS"
    },
    {
      "ingredientId": "ing_fresh-chopped-parsley-0-15",
      "displayName": "fresh chopped parsley ($0.15)",
      "amount": 1,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_freshly-cracked-black-pepper-0-02",
      "displayName": "freshly cracked black pepper ($0.02)",
      "amount": 0.25,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_pinch-of-salt-0-02",
      "displayName": "pinch of salt ($0.02)",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    }
  ],
  "preflight": [],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Heat a large dutch oven or soup pot over medium heat and add the oil. Crumble and brown the Italian sausage."
    },
    {
      "stepNumber": 2,
      "instruction": "Once the sausage has browned, add the diced onion, diced bell pepper, and minced garlic to the pot. Continue to sauté over medium heat until the onion is translucent and the garlic is fragrant."
    },
    {
      "stepNumber": 3,
      "instruction": "Now add the tomato paste, crushed tomatoes, diced tomatoes, Italian seasoning, salt, black pepper, sugar, red pepper flakes, and chicken broth. Stir all the ingredients together well. Place a lid on the pot, and bring the pot up to a boil."
    },
    {
      "stepNumber": 4,
      "instruction": "While the pot is heating up, break the lasagna noodles into one to two-inch pieces. Add the noodles to the pot and give the soup a stir."
    },
    {
      "stepNumber": 5,
      "instruction": "Replace the lid, turn the heat down slightly to medium heat and continue boiling the soup for 12-14 minutes or until the lasagna noodles are tender."
    },
    {
      "stepNumber": 6,
      "instruction": "While the soup and noodles are boiling, make the ricotta cheese topping. In a medium bowl, combine the ricotta, shredded mozzarella, grated parmesan cheese, chopped parsley, black pepper, and a pinch of salt. Mix the ingredients together."
    },
    {
      "stepNumber": 7,
      "instruction": "Once the soup is done and the lasagna noodles are tender, remove the pot from the heat. Serve this lasagna soup with 1-2 tbsp of the cheese topping, extra fresh parsley, and garlic bread on the side. Enjoy!"
    }
  ],
  "tags": [
    "italian",
    "comfort_food",
    "one_pot",
    "budget_friendly"
  ]
};
