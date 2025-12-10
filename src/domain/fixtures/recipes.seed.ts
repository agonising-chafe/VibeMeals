/**
 * src/domain/fixtures/recipes.seed.ts
 * 
 * Production-ready MVP recipe catalog
 * 16 curated recipes covering all time bands, personas, and dietary needs
 * Auto-generated from src/domain/recipes/ directory (imported Dec 2025)
 */

import { Recipe } from '../types';

// FAST (≤30 min) - Chaos Night Heroes
import { onePotCreamyMushroomPasta } from '../recipes/one-pot-creamy-mushroom-pasta';
import { simpleChickenFajitas } from '../recipes/simple-chicken-fajitas';
import { spaghettiAglioEOlio } from '../recipes/spaghetti-aglio-e-olio';

// NORMAL (30–60 min) - Weeknight Winners
import { beefStroganoff } from '../recipes/beef-stroganoff';
import { lasagnaSoup } from '../recipes/lasagna-soup';
import { onePotCreamyCajunChickenPasta } from '../recipes/one-pot-creamy-cajun-chicken-pasta';
import { onePotTeriyakiChickenAndRice } from '../recipes/one-pot-teriyaki-chicken-and-rice';
import { onePotChickenRice } from '../recipes/one-pot-chicken-rice';
import { southernMeatloafRecipe } from '../recipes/southern-meatloaf';

// PROJECT (>60 min) - Weekend Batch Cooking
import { bakedMacAndCheese } from '../recipes/baked-mac-and-cheese';
import { bbqRibs } from '../recipes/bbq-ribs';
import { easyBakedZiti } from '../recipes/easy-baked-ziti';
import { homestyleChickenNoodleSoup } from '../recipes/homestyle-chicken-noodle-soup';
import { ovenBakedChickenDrumsticks } from '../recipes/oven-baked-chicken-drumsticks';
import { slowCookerPulledPork } from '../recipes/slow-cooker-pulled-pork';
import { slowCookerWhiteChickenChili } from '../recipes/slow-cooker-white-chicken-chili';
import { lemonAndGarlicSlowRoastedChicken } from '../recipes/lemon-and-garlic-slow-roasted-chicken';
import { pastaWithTuna } from '../recipes/pasta-with-tuna';
import { easyHomemadeRiceAndBeans } from '../recipes/easy-homemade-rice-and-beans';


/**
 * MVP Recipe Catalog
 * 
 * Coverage:
 * ✅ 3 FAST recipes (chaos nights)
 * ✅ 6 NORMAL recipes (weeknights)
 * ✅ 7 PROJECT recipes (weekend/batch)
 * ✅ Equipment: sheet pan, Dutch oven, slow cooker
 * ✅ Preflight examples: MARINATE (beef stroganoff), SLOW_COOK (2 slow cooker recipes)
 * ⏳ Missing preflight types: THAW, LONG_PREP (need real Budget Bytes recipes)
 * ✅ Tags: budget_friendly, comfort_food, dietary options
 * ✅ All recipes: ≤20 ingredients, family-friendly, budget-optimized
 */
export const mvpRecipeCatalog: Recipe[] = [
  // FAST
  onePotCreamyMushroomPasta,
  simpleChickenFajitas,
  spaghettiAglioEOlio,
  // NORMAL
  beefStroganoff, // MARINATE preflight
  lasagnaSoup,
  onePotCreamyCajunChickenPasta,
  onePotTeriyakiChickenAndRice,
  onePotChickenRice,
  southernMeatloafRecipe,
  lemonAndGarlicSlowRoastedChicken,
  pastaWithTuna,
  easyHomemadeRiceAndBeans,
  // PROJECT
  bakedMacAndCheese,
  bbqRibs,
  easyBakedZiti,
  homestyleChickenNoodleSoup,
  ovenBakedChickenDrumsticks,
  slowCookerPulledPork, // SLOW_COOK preflight
  slowCookerWhiteChickenChili, // SLOW_COOK preflight
];

/**
 * Export by time band for easy filtering
 */
export const fastRecipes = mvpRecipeCatalog.filter(r => r.metadata.timeBand === 'FAST');
export const normalRecipes = mvpRecipeCatalog.filter(r => r.metadata.timeBand === 'NORMAL');
export const projectRecipes = mvpRecipeCatalog.filter(r => r.metadata.timeBand === 'PROJECT');

/**
 * Export by tag for persona-based recommendations
 */
export const budgetFriendlyRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('budget_friendly'));
export const comfortFoodRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('comfort_food'));
export const weeknightRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('weeknight'));
export const mealPrepRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('meal_prep'));
export const makeAheadRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('make_ahead'));

// Legacy exports for existing code compatibility
export const allRecipes = mvpRecipeCatalog;
export const seedRecipes = mvpRecipeCatalog;
