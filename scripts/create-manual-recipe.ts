#!/usr/bin/env tsx
/**
 * Demo: Manual Recipe Creation
 * 
 * This demonstrates creating a recipe file manually when scraping isn't available.
 * Use this approach for:
 * - Sites that don't expose JSON-LD
 * - Recipes from cookbooks
 * - Your own tested recipes
 */

import { Recipe } from '../src/domain/types';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// Example: Creating a recipe manually
const simpleChickenFajitas: Recipe = {
  id: 'r_simple-chicken-fajitas',
  name: 'Simple Chicken Fajitas',
  slug: 'simple-chicken-fajitas',
  
  metadata: {
    timeBand: 'FAST', // ≤30 minutes
    estimatedMinutes: 25,
    equipmentTags: ['SHEET_PAN'],
    leftoverStrategy: 'NONE'
  },
  
  ingredients: [
    // Main protein - CRITICAL
    {
      ingredientId: 'ing_chicken-breast',
      displayName: 'boneless skinless chicken breast',
      amount: 1.5,
      unit: 'LB',
      criticality: 'CRITICAL',
      kind: 'PROTEIN',
      shoppingCategory: 'MEAT_SEAFOOD'
    },
    // Primary vegetables - CRITICAL
    {
      ingredientId: 'ing_bell-pepper-red',
      displayName: 'red bell pepper',
      amount: 1,
      unit: 'UNIT',
      criticality: 'CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE'
    },
    {
      ingredientId: 'ing_bell-pepper-yellow',
      displayName: 'yellow bell pepper',
      amount: 1,
      unit: 'UNIT',
      criticality: 'CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE'
    },
    {
      ingredientId: 'ing_onion-red',
      displayName: 'red onion',
      amount: 1,
      unit: 'UNIT',
      criticality: 'CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE'
    },
    // Oil - NON_CRITICAL (probably have it)
    {
      ingredientId: 'ing_olive-oil',
      displayName: 'olive oil',
      amount: 2,
      unit: 'TBSP',
      criticality: 'NON_CRITICAL',
      kind: 'FAT_OIL',
      shoppingCategory: 'PANTRY_DRY'
    },
    // Spices - NON_CRITICAL
    {
      ingredientId: 'ing_salt',
      displayName: 'salt',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_black-pepper',
      displayName: 'black pepper',
      amount: 0.5,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_garlic-powder',
      displayName: 'garlic powder',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY'
    },
    {
      ingredientId: 'ing_paprika',
      displayName: 'paprika',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY'
    },
    // Garnish - NON_CRITICAL
    {
      ingredientId: 'ing_parsley',
      displayName: 'fresh parsley',
      amount: 0.25,
      unit: 'CUP',
      criticality: 'NON_CRITICAL',
      kind: 'OTHER',
      shoppingCategory: 'PRODUCE'
    }
  ],
  
  // No preflight - can cook tonight!
  preflight: [],
  
  steps: [
    {
      stepNumber: 1,
      instruction: 'Preheat oven to 425°F (220°C).'
    },
    {
      stepNumber: 2,
      instruction: 'Cut chicken breasts into strips and place in a large bowl.'
    },
    {
      stepNumber: 3,
      instruction: 'Add sliced bell peppers and onion to the bowl with chicken.'
    },
    {
      stepNumber: 4,
      instruction: 'Drizzle with olive oil and season with salt, pepper, garlic powder, and paprika.'
    },
    {
      stepNumber: 5,
      instruction: 'Toss everything together until evenly coated.'
    },
    {
      stepNumber: 6,
      instruction: 'Spread mixture on a large sheet pan in a single layer.'
    },
    {
      stepNumber: 7,
      instruction: 'Bake for 25-30 minutes until chicken is cooked through (165°F internal temp).'
    },
    {
      stepNumber: 8,
      instruction: 'Garnish with fresh parsley and serve with tortillas, rice, or salad.'
    }
  ],
  
  tags: ['mexican', 'weeknight', 'sheet_pan', 'kid_friendly', 'gluten_free']
};

async function main() {
  const recipesDir = join(process.cwd(), 'src', 'domain', 'recipes');
  const filepath = join(recipesDir, 'simple-chicken-fajitas.ts');
  
  const fileContent = `// Simple Chicken Fajitas
// Source: Manual creation / demonstration
// Created: ${new Date().toISOString()}

import { Recipe } from '../types';

export const simpleChickenFajitas: Recipe = ${JSON.stringify(simpleChickenFajitas, null, 2)};
`;
  
  await writeFile(filepath, fileContent, 'utf-8');
  console.log('✅ Created recipe file:', filepath);
  console.log('\n📊 Recipe Summary:');
  console.log(`   Name: ${simpleChickenFajitas.name}`);
  console.log(`   Time: ${simpleChickenFajitas.metadata.estimatedMinutes} minutes (${simpleChickenFajitas.metadata.timeBand})`);
  console.log(`   Ingredients: ${simpleChickenFajitas.ingredients.length} total`);
  console.log(`     - ${simpleChickenFajitas.ingredients.filter(i => i.criticality === 'CRITICAL').length} CRITICAL`);
  console.log(`     - ${simpleChickenFajitas.ingredients.filter(i => i.criticality === 'NON_CRITICAL').length} NON_CRITICAL`);
  console.log(`   Preflight: ${simpleChickenFajitas.preflight.length ? 'YES' : 'None - cook tonight!'}`);
  console.log(`   Steps: ${simpleChickenFajitas.steps.length}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Add to fixtures: import { simpleChickenFajitas } from \'../recipes/simple-chicken-fajitas\';');
  console.log('   2. Run tests: npm test');
  console.log('   3. Cook it yourself to validate time estimate!');
}

main().catch(console.error);
