import { Recipe } from '../types';

export const spaghettiAglioEOlio = {
  id: "spoon_716429",
  name: "Spaghetti Aglio e Olio",
  slug: "spaghetti-aglio-e-olio",
  metadata: {
    timeBand: "FAST",
    estimatedMinutes: 20,
    equipmentTags: [
      "LARGE_POT",
      "LARGE_SKILLET"
    ],
    leftoverStrategy: "NONE"
  },
  scalable: true,
  ingredients: [
    {
      displayName: "4 cloves garlic, minced",
      ingredientId: "garlic",
      amount: 4,
      unit: "UNIT",
      criticality: "CRITICAL",
      kind: "VEG",
      shoppingCategory: "PRODUCE"
    },
    {
      displayName: "12 oz spaghetti",
      ingredientId: "spaghetti",
      amount: 12,
      unit: "OZ",
      criticality: "CRITICAL",
      kind: "CARB",
      shoppingCategory: "PANTRY_DRY"
    },
    {
      displayName: "2 tbsp butter",
      ingredientId: "butter",
      amount: 2,
      unit: "TBSP",
      criticality: "CRITICAL",
      kind: "DAIRY",
      shoppingCategory: "DAIRY_EGGS"
    }
  ],
  preflight: [],
  steps: [
    { stepNumber: 1, instruction: "Boil pasta until al dente." },
    { stepNumber: 2, instruction: "Melt butter and sauté garlic until fragrant." },
    { stepNumber: 3, instruction: "Toss pasta with garlic butter and serve." }
  ],
  tags: [
    "vegetarian",
    "weeknight",
    "pantry_staple",
    "italian"
  ],
  
} satisfies Recipe;
