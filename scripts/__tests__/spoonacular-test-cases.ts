/**
 * Comprehensive Spoonacular Mapper Test Cases
 * 
 * 16 real-world test cases covering edge cases for VibeMeals recipe import.
 * Run with: npx tsx scripts/__tests__/spoonacular-test-cases.ts
 */

import { mapSpoonacularToVibeMeals, type SpoonacularExtractResponse } from '../spoonacular-mapper';

// ============================================================================
// Test Cases 1-6: Core scenarios (from initial set)
// ============================================================================

const fajitasResponse: SpoonacularExtractResponse = {
  id: 715594,
  title: "Sheet Pan Chicken Fajitas",
  readyInMinutes: 25,
  servings: 4,
  sourceUrl: "https://www.budgetbytes.com/sheet-pan-chicken-fajitas/",
  cuisines: ["Mexican"],
  dishTypes: ["lunch", "main course", "dinner"],
  diets: ["gluten free", "dairy free"],
  extendedIngredients: [
    { id: 5062, name: "chicken breast", amount: 1.5, unit: "lb" },
    { id: 10211821, name: "bell pepper", amount: 3, unit: "" },
    { id: 11282, name: "onion", amount: 1, unit: "" },
    { id: 4582, name: "olive oil", amount: 2, unit: "Tbsp" },
    { id: 2011, name: "chili powder", amount: 1, unit: "Tbsp" },
    { id: 1002014, name: "cumin", amount: 1, unit: "tsp" },
    { id: 1002030, name: "paprika", amount: 1, unit: "tsp" },
    { id: 2047, name: "salt", amount: 0.5, unit: "tsp" },
  ],
  analyzedInstructions: [
    {
      name: "",
      steps: [
        { number: 1, step: "Preheat oven to 400°F." },
        { number: 2, step: "Slice the chicken, bell peppers, and onion into thin strips." },
        { number: 3, step: "Toss everything with oil and spices. Spread on a sheet pan." },
        { number: 4, step: "Bake 20-25 minutes, stirring halfway." },
      ],
    },
  ],
};

const mushroomPastaResponse: SpoonacularExtractResponse = {
  id: 715449,
  title: "One Pot Creamy Mushroom Pasta",
  readyInMinutes: 40,
  servings: 6,
  sourceUrl: "https://www.budgetbytes.com/one-pot-creamy-mushroom-pasta/",
  cuisines: [],
  dishTypes: ["dinner"],
  diets: ["vegetarian"],
  extendedIngredients: [
    { name: "mushrooms", amount: 1, unit: "lb" },
    { name: "garlic", amount: 4, unit: "cloves" },
    { name: "butter", amount: 4, unit: "Tbsp" },
    { name: "pasta", amount: 1, unit: "lb" },
    { name: "vegetable broth", amount: 4.5, unit: "cups" },
    { name: "heavy cream", amount: 0.5, unit: "cup" },
    { name: "parmesan", amount: 0.5, unit: "cup" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Sauté mushrooms and garlic in butter until golden." },
        { number: 2, step: "Add dry pasta and broth. Bring to boil, then simmer 15 minutes, stirring occasionally." },
        { number: 3, step: "When pasta is tender, stir in cream and parmesan." },
      ],
    },
  ],
};

const slowCookerChiliResponse: SpoonacularExtractResponse = {
  id: 715424,
  title: "Slow Cooker Chili",
  readyInMinutes: 370,
  servings: 8,
  sourceUrl: "https://www.budgetbytes.com/slow-cooker-chili/",
  cuisines: ["American"],
  dishTypes: ["soup", "main course"],
  diets: ["gluten free", "dairy free"],
  extendedIngredients: [
    { name: "ground beef", amount: 1, unit: "lb" },
    { name: "kidney beans", amount: 30, unit: "oz" },
    { name: "diced tomatoes", amount: 28, unit: "oz" },
    { name: "tomato sauce", amount: 15, unit: "oz" },
    { name: "chili powder", amount: 2, unit: "Tbsp" },
    { name: "cumin", amount: 1, unit: "Tbsp" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Brown ground beef in a skillet." },
        { number: 2, step: "Add beef and remaining ingredients to slow cooker." },
        { number: 3, step: "Cook on low for 6-8 hours or high for 3-4 hours." },
      ],
    },
  ],
};

const marinatedBowlsResponse: SpoonacularExtractResponse = {
  id: 716429,
  title: "Marinated Chicken Rice Bowls",
  readyInMinutes: 55,
  servings: 4,
  sourceUrl: "https://www.budgetbytes.com/marinated-chicken-rice-bowls/",
  cuisines: ["Asian"],
  dishTypes: ["dinner"],
  diets: [],
  extendedIngredients: [
    { name: "chicken thighs", amount: 1.5, unit: "lb" },
    { name: "soy sauce", amount: 0.25, unit: "cup" },
    { name: "brown sugar", amount: 2, unit: "Tbsp" },
    { name: "garlic", amount: 3, unit: "cloves" },
    { name: "rice", amount: 2, unit: "cups uncooked" },
    { name: "broccoli", amount: 1, unit: "head" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Combine soy sauce, brown sugar, garlic, and oil. Marinate chicken for at least 30 minutes (or overnight)." },
        { number: 2, step: "Cook rice." },
        { number: 3, step: "Sear marinated chicken 5-6 minutes per side." },
        { number: 4, step: "Steam broccoli and assemble bowls." },
      ],
    },
  ],
};

const friedRiceResponse: SpoonacularExtractResponse = {
  id: 716381,
  title: "Easy Fried Rice",
  readyInMinutes: 20,
  servings: 4,
  sourceUrl: "https://www.budgetbytes.com/easy-fried-rice/",
  cuisines: ["Chinese"],
  dishTypes: ["side dish", "main course"],
  diets: ["vegetarian"],
  extendedIngredients: [
    { name: "day-old rice", amount: 4, unit: "cups" },
    { name: "frozen mixed vegetables", amount: 2, unit: "cups" },
    { name: "eggs", amount: 2, unit: "" },
    { name: "soy sauce", amount: 3, unit: "Tbsp" },
    { name: "sesame oil", amount: 1, unit: "tsp" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Heat oil in skillet. Scramble eggs and set aside." },
        { number: 2, step: "Sauté frozen veggies 3 minutes." },
        { number: 3, step: "Add cold rice and soy sauce. Stir-fry until hot." },
        { number: 4, step: "Stir in eggs and sesame oil." },
      ],
    },
  ],
};

const aglioOlioResponse: SpoonacularExtractResponse = {
  id: 716406,
  title: "Spaghetti Aglio e Olio",
  readyInMinutes: 20,
  servings: 4,
  sourceUrl: "https://www.seriouseats.com/spaghetti-aglio-olio-recipe",
  cuisines: ["Italian"],
  dishTypes: ["dinner"],
  diets: ["vegan"],
  extendedIngredients: [
    { name: "spaghetti", amount: 1, unit: "lb" },
    { name: "garlic", amount: 8, unit: "cloves" },
    { name: "olive oil", amount: 0.5, unit: "cup" },
    { name: "red pepper flakes", amount: 1, unit: "tsp" },
    { name: "parsley", amount: 0.25, unit: "cup" },
    { name: "lemon", amount: 1, unit: "" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Boil pasta in heavily salted water." },
        { number: 2, step: "While pasta cooks, slowly heat olive oil and sliced garlic until golden." },
        { number: 3, step: "Add red pepper flakes, then toss with drained pasta and a splash of pasta water." },
        { number: 4, step: "Finish with parsley and lemon zest." },
      ],
    },
  ],
};

// ============================================================================
// Test Cases 7-16: Edge cases
// ============================================================================

const pizzaDoughResponse: SpoonacularExtractResponse = {
  id: 663667,
  title: "The Best Pizza Dough",
  readyInMinutes: 150,
  servings: 8,
  sourceUrl: "https://www.seriouseats.com/best-pizza-dough-recipe",
  cuisines: ["Italian"],
  dishTypes: ["dinner"],
  diets: ["vegan"],
  extendedIngredients: [
    { name: "bread flour", amount: 500, unit: "g" },
    { name: "water", amount: 325, unit: "g" },
    { name: "yeast", amount: 7, unit: "g" },
    { name: "salt", amount: 10, unit: "g" },
    { name: "olive oil", amount: 15, unit: "g" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Mix flour, water, yeast. Let rest 15 minutes." },
        { number: 2, step: "Add salt and oil. Knead 5 minutes." },
        { number: 3, step: "Let dough rise at room temperature for 8–24 hours, or refrigerate overnight." },
        { number: 4, step: "Shape and top as desired. Bake at 500°F." },
      ],
    },
  ],
};

const cauliflowerTacosResponse: SpoonacularExtractResponse = {
  id: 716627,
  title: "Crispy Cauliflower Tacos",
  readyInMinutes: 45,
  servings: 4,
  sourceUrl: "https://minimalistbaker.com/crispy-cauliflower-tacos/",
  cuisines: ["Mexican"],
  dishTypes: ["dinner"],
  diets: ["gluten free", "dairy free", "vegan"],
  extendedIngredients: [
    { name: "cauliflower", amount: 1, unit: "head" },
    { name: "corn tortillas", amount: 12, unit: "" },
    { name: "avocado", amount: 2, unit: "" },
    { name: "lime", amount: 2, unit: "" },
    { name: "cabbage", amount: 2, unit: "cups" },
    { name: "chipotle powder", amount: 1, unit: "tsp" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Cut cauliflower into florets. Toss with oil and spices." },
        { number: 2, step: "Roast at 425°F for 25–30 minutes until crispy." },
        { number: 3, step: "Warm tortillas. Assemble with cauliflower, cabbage, avocado, lime." },
      ],
    },
  ],
};

const macAndCheeseResponse: SpoonacularExtractResponse = {
  id: 655050,
  title: "Baked Macaroni and Cheese",
  readyInMinutes: 60,
  servings: 8,
  sourceUrl: "https://www.budgetbytes.com/baked-mac-and-cheese/",
  cuisines: [],
  dishTypes: ["side dish", "main course"],
  diets: ["vegetarian"],
  extendedIngredients: [
    { name: "elbow macaroni", amount: 1, unit: "lb" },
    { name: "cheddar cheese", amount: 4, unit: "cups shredded" },
    { name: "butter", amount: 4, unit: "Tbsp" },
    { name: "milk", amount: 3, unit: "cups" },
    { name: "flour", amount: 0.25, unit: "cup" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Cook pasta. Make cheese sauce with butter, flour, milk, cheese." },
        { number: 2, step: "Combine pasta and sauce. Transfer to baking dish." },
        { number: 3, step: "Top with extra cheese. Bake at 350°F for 30 minutes." },
      ],
    },
  ],
};

const padThaiResponse: SpoonacularExtractResponse = {
  id: 654959,
  title: "Pad Thai",
  readyInMinutes: 35,
  servings: 4,
  sourceUrl: "https://www.seriouseats.com/pad-thai-recipe",
  cuisines: ["Thai"],
  dishTypes: ["dinner"],
  diets: [],
  extendedIngredients: [
    { name: "rice noodles", amount: 8, unit: "oz" },
    { name: "shrimp", amount: 0.5, unit: "lb" },
    { name: "eggs", amount: 2, unit: "" },
    { name: "bean sprouts", amount: 2, unit: "cups" },
    { name: "garlic chives", amount: 1, unit: "bunch" },
    { name: "peanuts", amount: 0.25, unit: "cup" },
    { name: "tamarind paste", amount: 3, unit: "Tbsp" },
    { name: "fish sauce", amount: 3, unit: "Tbsp" },
    { name: "palm sugar", amount: 2, unit: "Tbsp" },
    { name: "dried shrimp", amount: 2, unit: "Tbsp" },
    { name: "chili powder", amount: 1, unit: "tsp" },
    { name: "lime", amount: 2, unit: "" },
    { name: "garlic", amount: 4, unit: "cloves" },
    { name: "shallot", amount: 1, unit: "" },
    { name: "vegetable oil", amount: 3, unit: "Tbsp" },
  ],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Soak noodles in warm water 30 minutes." },
        { number: 2, step: "Heat oil. Stir-fry garlic, shallot, dried shrimp." },
        { number: 3, step: "Add fresh shrimp, scramble eggs, add noodles and sauce." },
        { number: 4, step: "Toss with bean sprouts, chives, peanuts, lime." },
      ],
    },
  ],
};

const noStepsResponse: SpoonacularExtractResponse = {
  id: 123456,
  title: "Secret Family Lasagna",
  readyInMinutes: 90,
  servings: 6,
  sourceUrl: "https://some-blog.com/secret-lasagna",
  cuisines: ["Italian"],
  dishTypes: ["dinner"],
  diets: [],
  extendedIngredients: [
    { name: "ground beef", amount: 1, unit: "lb" },
    { name: "lasagna noodles", amount: 12, unit: "" },
    { name: "ricotta", amount: 15, unit: "oz" },
    { name: "mozzarella", amount: 3, unit: "cups" },
  ],
  analyzedInstructions: [],
};

const parallelStepsResponse: SpoonacularExtractResponse = {
  id: 644123,
  title: "Weeknight Stir-Fry with Rice",
  readyInMinutes: 30,
  servings: 4,
  sourceUrl: "https://www.budgetbytes.com/weeknight-stir-fry/",
  cuisines: ["Chinese"],
  dishTypes: ["dinner"],
  diets: [],
  analyzedInstructions: [
    {
      name: "Cook the rice",
      steps: [
        { number: 1, step: "Bring 2 cups rice and 4 cups water to a boil. Reduce heat and simmer 15 minutes." },
      ],
    },
    {
      name: "Meanwhile, prep the stir-fry",
      steps: [
        { number: 1, step: "Slice chicken and vegetables." },
        { number: 2, step: "Heat oil in wok. Stir-fry chicken 5 minutes." },
        { number: 3, step: "Add vegetables and sauce. Cook 5 more minutes." },
      ],
    },
  ],
  extendedIngredients: [
    { name: "rice", amount: 2, unit: "cups" },
    { name: "chicken breast", amount: 1, unit: "lb" },
    { name: "mixed vegetables", amount: 3, unit: "cups" },
    { name: "soy sauce", amount: 3, unit: "Tbsp" },
  ],
};

const frozenSalmonResponse: SpoonacularExtractResponse = {
  id: 716300,
  title: "One Pan Salmon and Asparagus",
  readyInMinutes: 35,
  servings: 4,
  sourceUrl: "https://www.budgetbytes.com/one-pan-salmon-asparagus/",
  cuisines: [],
  dishTypes: ["dinner"],
  diets: ["gluten free", "dairy free"],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Thaw frozen salmon in the refrigerator overnight or under cold water for 30 minutes." },
        { number: 2, step: "Preheat oven to 400°F." },
        { number: 3, step: "Place salmon and asparagus on sheet pan. Drizzle with oil, lemon, salt." },
        { number: 4, step: "Bake 15–20 minutes until salmon flakes." },
      ],
    },
  ],
  extendedIngredients: [
    { name: "frozen salmon fillets", amount: 4, unit: "" },
    { name: "asparagus", amount: 1, unit: "lb" },
    { name: "lemon", amount: 1, unit: "" },
    { name: "olive oil", amount: 2, unit: "Tbsp" },
  ],
};

const lentilSoupResponse: SpoonacularExtractResponse = {
  id: 660106,
  title: "Hearty Lentil Soup",
  readyInMinutes: 60,
  servings: 10,
  sourceUrl: "https://www.budgetbytes.com/hearty-lentil-soup/",
  cuisines: [],
  dishTypes: ["soup"],
  diets: ["vegetarian", "vegan"],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Sauté onion, carrot, celery in olive oil." },
        { number: 2, step: "Add garlic, cumin, lentils, vegetable broth." },
        { number: 3, step: "Simmer 40 minutes until lentils are tender." },
      ],
    },
  ],
  extendedIngredients: [
    { name: "lentils", amount: 2, unit: "cups" },
    { name: "vegetable broth", amount: 8, unit: "cups" },
    { name: "carrot", amount: 2, unit: "" },
    { name: "celery", amount: 2, unit: "ribs" },
    { name: "onion", amount: 1, unit: "" },
  ],
};

const seitanRoastResponse: SpoonacularExtractResponse = {
  id: 715497,
  title: "Homemade Seitan Roast",
  readyInMinutes: 180,
  servings: 8,
  sourceUrl: "https://itdoesnttastelikechicken.com/best-vegan-roast/",
  cuisines: [],
  dishTypes: ["dinner"],
  diets: ["vegan"],
  analyzedInstructions: [
    {
      steps: [
        { number: 1, step: "Mix vital wheat gluten with spices and broth." },
        { number: 2, step: "Knead 5 minutes. Let rest 10 minutes." },
        { number: 3, step: "Wrap in foil and steam for 2 hours." },
      ],
    },
  ],
  extendedIngredients: [
    { name: "vital wheat gluten", amount: 2, unit: "cups" },
    { name: "vegetable broth", amount: 1, unit: "cup" },
    { name: "soy sauce", amount: 2, unit: "Tbsp" },
  ],
};

const brokenResponse: SpoonacularExtractResponse = {
  id: 0,
  title: "",
  readyInMinutes: undefined,
  servings: 0,
  extendedIngredients: [],
  analyzedInstructions: [],
} as any;

// ============================================================================
// Test Runner
// ============================================================================

const allCases = [
  { name: "Sheet Pan Fajitas", data: fajitasResponse },
  { name: "Mushroom Pasta", data: mushroomPastaResponse },
  { name: "Slow Cooker Chili", data: slowCookerChiliResponse },
  { name: "Marinated Bowls", data: marinatedBowlsResponse },
  { name: "Fried Rice", data: friedRiceResponse },
  { name: "Aglio e Olio", data: aglioOlioResponse },
  { name: "Pizza Dough", data: pizzaDoughResponse },
  { name: "Cauliflower Tacos", data: cauliflowerTacosResponse },
  { name: "Mac & Cheese", data: macAndCheeseResponse },
  { name: "Pad Thai", data: padThaiResponse },
  { name: "No Steps (Paywall)", data: noStepsResponse },
  { name: "Parallel Steps", data: parallelStepsResponse },
  { name: "Frozen Salmon", data: frozenSalmonResponse },
  { name: "Lentil Soup", data: lentilSoupResponse },
  { name: "Seitan Roast", data: seitanRoastResponse },
  { name: "Broken Data", data: brokenResponse },
];

console.log('🧪 Running Spoonacular Mapper Test Suite\n');
console.log('='.repeat(70));

let passed = 0;
let failed = 0;

allCases.forEach(({ name, data }, i) => {
  try {
    const recipe = mapSpoonacularToVibeMeals(data);
    passed++;
    
    console.log(`\n✓ Case ${i + 1}: ${name}`);
    console.log(`  Recipe: ${recipe.name}`);
    console.log(`  Time Band: ${recipe.metadata.timeBand} (${recipe.metadata.estimatedMinutes} min)`);
    console.log(`  Ingredients: ${recipe.ingredients.length} | Steps: ${recipe.steps.length}`);
    console.log(`  Preflight: ${recipe.preflight.length} | Equipment: ${recipe.metadata.equipmentTags?.length || 0}`);
    console.log(`  Tags: ${recipe.tags?.join(', ') || 'none'}`);
    console.log(`  Leftover: ${recipe.metadata.leftoverStrategy}`);
    
    // Validate critical fields
    const warnings: string[] = [];
    if (recipe.ingredients.length === 0) warnings.push('No ingredients');
    if (recipe.steps.length === 0) warnings.push('No steps');
    if (!recipe.name) warnings.push('No name');
    
    if (warnings.length > 0) {
      console.log(`  ⚠️  Warnings: ${warnings.join(', ')}`);
    }
  } catch (err) {
    failed++;
    console.log(`\n✗ Case ${i + 1}: ${name}`);
    console.log(`  Error: ${(err as Error).message}`);
    if (name !== "Broken Data") {
      console.log(`  (Unexpected failure)`);
    } else {
      console.log(`  (Expected - defensive test)`);
    }
  }
});

console.log('\n' + '='.repeat(70));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${allCases.length} total`);
console.log(`\n${passed === allCases.length - 1 ? '🎉 All tests passed (except expected failure)!' : '⚠️  Some tests failed'}`);
