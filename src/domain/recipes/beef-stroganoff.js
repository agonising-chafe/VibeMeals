// Spec: recipe-spec.md §2.1, version 4.6.0
// Beef Stroganoff
// Source: https://www.budgetbytes.com/beef-stroganoff/
// Imported: 2025-12-08T01:25:42.323Z
export const beefStroganoff = {
    "id": "r_beef-stroganoff",
    "name": "Beef Stroganoff",
    "slug": "beef-stroganoff",
    "metadata": {
        "timeBand": "NORMAL",
        "estimatedMinutes": 38,
        "equipmentTags": [],
        "leftoverStrategy": "NONE"
    },
    "ingredients": [
        {
            "ingredientId": "ing_garlic",
            "displayName": "garlic",
            "amount": 2,
            "unit": "UNIT",
            "criticality": "NON_CRITICAL",
            "kind": "OTHER",
            "shoppingCategory": "PRODUCE"
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
            "ingredientId": "ing_ground-beef",
            "displayName": "ground beef",
            "amount": 0.5,
            "unit": "LB",
            "criticality": "CRITICAL",
            "kind": "PROTEIN",
            "shoppingCategory": "MEAT_SEAFOOD"
        },
        {
            "ingredientId": "ing_mushrooms",
            "displayName": "mushrooms",
            "amount": 8,
            "unit": "OZ",
            "criticality": "CRITICAL",
            "kind": "VEG",
            "shoppingCategory": "PRODUCE"
        },
        {
            "ingredientId": "ing_pepper",
            "displayName": "pepper",
            "amount": 0.125,
            "unit": "TSP",
            "criticality": "NON_CRITICAL",
            "kind": "VEG",
            "shoppingCategory": "PANTRY_DRY"
        },
        {
            "ingredientId": "ing_beef-broth",
            "displayName": "beef broth",
            "amount": 2,
            "unit": "CUP",
            "criticality": "CRITICAL",
            "kind": "PROTEIN",
            "shoppingCategory": "MEAT_SEAFOOD"
        },
        {
            "ingredientId": "ing_worcestershire-sauce",
            "displayName": "worcestershire sauce",
            "amount": 1,
            "unit": "TBSP",
            "criticality": "NON_CRITICAL",
            "kind": "CONDIMENT",
            "shoppingCategory": "PANTRY_DRY"
        },
        {
            "ingredientId": "ing_dijon-mustard",
            "displayName": "dijon mustard",
            "amount": 0.5,
            "unit": "TSP",
            "criticality": "NON_CRITICAL",
            "kind": "CONDIMENT",
            "shoppingCategory": "OTHER"
        },
        {
            "ingredientId": "ing_wide-egg-noodles",
            "displayName": "wide egg noodles",
            "amount": 8,
            "unit": "OZ",
            "criticality": "CRITICAL",
            "kind": "CARB",
            "shoppingCategory": "DAIRY_EGGS"
        },
        {
            "ingredientId": "ing_cream",
            "displayName": "cream",
            "amount": 0.33333334,
            "unit": "CUP",
            "criticality": "CRITICAL",
            "kind": "DAIRY",
            "shoppingCategory": "DAIRY_EGGS"
        },
        {
            "ingredientId": "ing_parsley",
            "displayName": "parsley",
            "amount": 1,
            "unit": "TBSP",
            "criticality": "NON_CRITICAL",
            "kind": "OTHER",
            "shoppingCategory": "PRODUCE"
        }
    ],
    "preflight": [],
    "steps": [
        {
            "stepNumber": 1,
            "instruction": "Mince the garlic."
        },
        {
            "stepNumber": 2,
            "instruction": "Add the garlic and butter to a large pot or skillet and sauté over medium heat for about one minute, or until the garlic is soft and fragrant."
        },
        {
            "stepNumber": 3,
            "instruction": "Add the ground beef and continue to sauté until it is fully browned."
        },
        {
            "stepNumber": 4,
            "instruction": "While the beef is browning, slice the mushrooms."
        },
        {
            "stepNumber": 5,
            "instruction": "Add the sliced mushrooms and some freshly cracked pepper to the pot with the beef. Continue to sauté until the mushrooms are soft (about five minutes)."
        },
        {
            "stepNumber": 6,
            "instruction": "Add the uncooked egg noodles to the pot along with the beef broth, Worcestershire sauce, and Dijon mustard. Stir to combine. The liquid will not fully cover the noodles, but that's okay."
        },
        {
            "stepNumber": 7,
            "instruction": "Place a lid on the pot and allow the liquid to come up to a boil over medium-high heat. As soon as it reaches a boil, give the pot a stir, replace the lid, and reduce the heat to low. Allow the pot to simmer on low heat for about 7-10 minutes, stirring occasionally and replacing the lid every couple of minutes. After 7-10 minutes the pasta should be tender and most of the liquid absorbed."
        },
        {
            "stepNumber": 8,
            "instruction": "Once the noodles are tender, add the sour cream and fold it into the noodles until everything is rich and creamy. Give the noodles a taste and add extra salt or pepper, if needed. Roughly chop a handful of parsley leaves and sprinkle over top."
        },
        {
            "stepNumber": 9,
            "instruction": "Serve hot."
        }
    ],
    "tags": [
        "budget_friendly"
    ]
};
