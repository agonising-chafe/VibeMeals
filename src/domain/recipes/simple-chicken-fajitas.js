// Spec: recipe-spec.md §2.1, version 4.6.0
// Simple Chicken Fajitas
// Source: Manual creation / demonstration
// Created: 2025-12-07T22:22:49.867Z
export const simpleChickenFajitas = {
    "id": "r_simple-chicken-fajitas",
    "name": "Simple Chicken Fajitas",
    "slug": "simple-chicken-fajitas",
    "metadata": {
        "timeBand": "FAST",
        "estimatedMinutes": 25,
        "equipmentTags": [
            "SHEET_PAN"
        ],
        "leftoverStrategy": "NONE"
    },
    "ingredients": [
        {
            "ingredientId": "ing_chicken-breast",
            "displayName": "boneless skinless chicken breast",
            "amount": 1.5,
            "unit": "LB",
            "criticality": "CRITICAL",
            "kind": "PROTEIN",
            "shoppingCategory": "MEAT_SEAFOOD"
        },
        {
            "ingredientId": "ing_bell-pepper-red",
            "displayName": "red bell pepper",
            "amount": 1,
            "unit": "UNIT",
            "criticality": "CRITICAL",
            "kind": "VEG",
            "shoppingCategory": "PRODUCE"
        },
        {
            "ingredientId": "ing_bell-pepper-yellow",
            "displayName": "yellow bell pepper",
            "amount": 1,
            "unit": "UNIT",
            "criticality": "CRITICAL",
            "kind": "VEG",
            "shoppingCategory": "PRODUCE"
        },
        {
            "ingredientId": "ing_onion-red",
            "displayName": "red onion",
            "amount": 1,
            "unit": "UNIT",
            "criticality": "CRITICAL",
            "kind": "VEG",
            "shoppingCategory": "PRODUCE"
        },
        {
            "ingredientId": "ing_olive-oil",
            "displayName": "olive oil",
            "amount": 2,
            "unit": "TBSP",
            "criticality": "NON_CRITICAL",
            "kind": "FAT_OIL",
            "shoppingCategory": "PANTRY_DRY"
        },
        {
            "ingredientId": "ing_salt",
            "displayName": "salt",
            "amount": 1,
            "unit": "TSP",
            "criticality": "NON_CRITICAL",
            "kind": "SPICE",
            "shoppingCategory": "PANTRY_DRY"
        },
        {
            "ingredientId": "ing_black-pepper",
            "displayName": "black pepper",
            "amount": 0.5,
            "unit": "TSP",
            "criticality": "NON_CRITICAL",
            "kind": "SPICE",
            "shoppingCategory": "PANTRY_DRY"
        },
        {
            "ingredientId": "ing_garlic-powder",
            "displayName": "garlic powder",
            "amount": 1,
            "unit": "TSP",
            "criticality": "NON_CRITICAL",
            "kind": "SPICE",
            "shoppingCategory": "PANTRY_DRY"
        },
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
            "ingredientId": "ing_parsley",
            "displayName": "fresh parsley",
            "amount": 0.25,
            "unit": "CUP",
            "criticality": "NON_CRITICAL",
            "kind": "OTHER",
            "shoppingCategory": "PRODUCE"
        }
    ],
    "preflight": [],
    "steps": [
        {
            "stepNumber": 1,
            "instruction": "Preheat oven to 425°F (220°C)."
        },
        {
            "stepNumber": 2,
            "instruction": "Cut chicken breasts into strips and place in a large bowl."
        },
        {
            "stepNumber": 3,
            "instruction": "Add sliced bell peppers and onion to the bowl with chicken."
        },
        {
            "stepNumber": 4,
            "instruction": "Drizzle with olive oil and season with salt, pepper, garlic powder, and paprika."
        },
        {
            "stepNumber": 5,
            "instruction": "Toss everything together until evenly coated."
        },
        {
            "stepNumber": 6,
            "instruction": "Spread mixture on a large sheet pan in a single layer."
        },
        {
            "stepNumber": 7,
            "instruction": "Bake for 25-30 minutes until chicken is cooked through (165°F internal temp)."
        },
        {
            "stepNumber": 8,
            "instruction": "Garnish with fresh parsley and serve with tortillas, rice, or salad."
        }
    ],
    "tags": [
        "mexican",
        "weeknight",
        "sheet_pan",
        "kid_friendly",
        "gluten_free"
    ]
};
