// Spec: recipe-spec.md §2.1, version 4.6.0
// Slow Cooker Pulled Pork
// Source: https://www.budgetbytes.com/slow-cooker-pulled-pork/
// Imported: 2025-12-08T14:50:46.505Z

import { Recipe } from '../types';

export const slowCookerPulledPork: Recipe = {
  "id": "r_slow-cooker-pulled-pork",
  "name": "Slow Cooker Pulled Pork",
  "slug": "slow-cooker-pulled-pork",
  "metadata": {
    "timeBand": "PROJECT",
    "estimatedMinutes": 319,
    "equipmentTags": [
      "SHEET_PAN",
      "SLOW_COOKER"
    ],
    "leftoverStrategy": "EXPECTED"
  },
  "ingredients": [
    {
      "ingredientId": "ing_-pork-butt-807",
      "displayName": "pork butt",
      "amount": 3,
      "unit": "LB",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_onion-cut-into-chunks-037",
      "displayName": "onion, cut into chunks",
      "amount": 1,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_garlic-roughly-chopped-032",
      "displayName": "garlic, roughly chopped",
      "amount": 4,
      "unit": "UNIT",
      "criticality": "CRITICAL",
      "kind": "PROTEIN",
      "shoppingCategory": "MEAT_SEAFOOD"
    },
    {
      "ingredientId": "ing_paprika-020",
      "displayName": "paprika",
      "amount": 2,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_smoked-paprika-010",
      "displayName": "smoked paprika",
      "amount": 1,
      "unit": "TSP",
      "criticality": "NON_CRITICAL",
      "kind": "SPICE",
      "shoppingCategory": "PANTRY_DRY"
    },
    {
      "ingredientId": "ing_brown-sugar-008",
      "displayName": "brown sugar",
      "amount": 2,
      "unit": "TBSP",
      "criticality": "NON_CRITICAL",
      "kind": "OTHER",
      "shoppingCategory": "OTHER"
    },
    {
      "ingredientId": "ing_garlic-powder-010",
      "displayName": "garlic powder",
      "amount": 1,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    },
    {
      "ingredientId": "ing_onion-powder-010",
      "displayName": "onion powder",
      "amount": 1,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
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
      "ingredientId": "ing_freshly-cracked-black-pepper-004",
      "displayName": "freshly cracked black pepper",
      "amount": 0.5,
      "unit": "TSP",
      "criticality": "CRITICAL",
      "kind": "VEG",
      "shoppingCategory": "PRODUCE"
    }
  ],
  "preflight": [
    {
      "type": "SLOW_COOK",
      "description": "Slow cooker recipe: plan 6-8 hours cook time.",
      "hoursBeforeCook": 0
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Combine the spices for the spice rub in a bowl.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 2,
      "instruction": "Cut the pork butt into large chunks.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 3,
      "instruction": "If the pork butt has a bone you can either remove it before cooking or wait until you are shredding the cooked meat to remove it.",
      "timer": false,
      "parallel": true
    },
    {
      "stepNumber": 4,
      "instruction": "Keep in mind the pork will require extra cooking time if cooking with the bone in.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 5,
      "instruction": "Add the pork pieces to a large bowl and sprinkle the spice rub over top.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 6,
      "instruction": "Toss until the pork is evenly coated in spices.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 7,
      "instruction": "Dice the yellow onion and add it to the bottom of the slow cooker.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 8,
      "instruction": "Place the seasoned pork on top of the onion, then add the roughly chopped garlic on top.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 9,
      "instruction": "Place the lid on the slow cooker and cook on high for four hours or low for eight hours.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 10,
      "instruction": "Test the pork with a fork to make sure the meat is tender.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 11,
      "instruction": "It should shred easily with a fork.",
      "timer": false,
      "parallel": false
    },
    {
      "stepNumber": 12,
      "instruction": "If not, cook for one hour longer.",
      "timer": false,
      "parallel": false
    }
  ],
  "tags": [
    "sheet_pan",
    "slow_cooker"
  ]
};
