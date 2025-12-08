/**
 * Recipe Import Script (v3)
 * 
 * Imports a single recipe from URL using recipe-scrapers Python library.
 * Orchestrates: Python scraper → mapper → TypeScript file save
 * 
 * Usage:
 *   npx tsx scripts/import-recipe-url.ts <url>
 *   npx tsx scripts/import-recipe-url.ts https://www.budgetbytes.com/sheet-pan-chicken/
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import type { Recipe } from '../src/domain/types';
import { mapRecipeScrapersToVibeMeals } from './recipe-scrapers-mapper.js';

// ============================================================================
// Entry Point
// ============================================================================

async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.error('❌ Usage: npx tsx scripts/import-recipe-url.ts <url>');
    console.error('❌ Example: npx tsx scripts/import-recipe-url.ts https://www.budgetbytes.com/sheet-pan-chicken/');
    process.exit(1);
  }
  
  console.log(`🔍 Scraping recipe from: ${url}`);
  
  try {
    // Step 1: Scrape via recipe-scrapers
    console.log('🐍 Calling Python recipe-scrapers bridge...');
    const scrapedData = scrapeViaRecipeScrapers(url);
    
    if (!scrapedData) {
      console.error('❌ Failed to scrape recipe. Trying JSON-LD fallback...');
      const jsonLdData = await scrapeViaJsonLd(url);
      if (!jsonLdData) {
        console.error('❌ All scraping methods failed.');
        process.exit(1);
      }
    }
    
    const data = scrapedData || (await scrapeViaJsonLd(url));
    
    // Step 2: Map to VibeMeals Recipe
    console.log('  ✅ Scraped: ' + (data?.title || 'Unknown'));
    console.log('✅ Found recipe: ' + data!.title);
    console.log('✅ Mapped to VibeMeals Recipe');
    
    const recipe = mapRecipeScrapersToVibeMeals(data!, url);
    
    console.log(`   ${recipe.ingredients.length} ingredients | ${recipe.steps.length} steps | ${recipe.preflight.length} preflight | ${recipe.tags?.length || 0} tags`);
    
    // Step 3: Save to file
    const success = saveRecipe(recipe, url);
    
    if (success) {
      console.log('\n💾 Saved to: src/domain/recipes/' + recipe.slug + '.ts');
      console.log('\n🎉 Import complete!');
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// ============================================================================
// Recipe Scraping Methods
// ============================================================================

function scrapeViaRecipeScrapers(url: string): any {
  try {
    const result = execFileSync('python3', ['scripts/recipe-scrapers-bridge.py', url], {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    
    const data = JSON.parse(result);
    
    // Check for error response
    if (data.error) {
      console.error(`  ❌ Python error: ${data.error}`);
      return null;
    }
    
    return data;
  } catch (error) {
    const err = error as any;
    if (err.status === 127 || err.code === 'ENOENT') {
      console.error('  ❌ Python 3 not found. Install with: pip3 install recipe-scrapers');
      return null;
    }
    console.error(`  ❌ Python bridge error:`, err.message);
    return null;
  }
}

async function scrapeViaJsonLd(url: string): Promise<any> {
  try {
    const html = await fetchHtml(url);
    if (!html) return null;
    
    const jsonLd = extractJsonLd(html);
    if (!jsonLd) return null;
    
    return normalizeJsonLd(jsonLd);
  } catch (error) {
    console.error('  ❌ JSON-LD fallback failed:', error instanceof Error ? error.message : String(error));
    return null;
  }
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    if (!response.ok) {
      console.error(`  ❌ HTTP ${response.status}`);
      return null;
    }
    
    return await response.text();
  } catch (error) {
    console.error('  ❌ Fetch failed:', error instanceof Error ? error.message : String(error));
    return null;
  }
}

function extractJsonLd(html: string): any {
  const scripts = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  if (!scripts) return null;
  
  for (const script of scripts) {
    try {
      const json = script.match(/>(\{[\s\S]*\})<\/script>/i)?.[1];
      if (!json) continue;
      
      const data = JSON.parse(json);
      
      // Handle @graph structure
      if (data['@graph']) {
        const recipe = data['@graph'].find((item: any) => item['@type'] === 'Recipe');
        if (recipe) return recipe;
      }
      
      if (data['@type'] === 'Recipe') return data;
    } catch {
      continue;
    }
  }
  
  return null;
}

function normalizeJsonLd(schema: any): any {
  // Convert JSON-LD Recipe schema to recipe-scrapers format
  return {
    title: schema.name || 'Unknown Recipe',
    prep_time: parseISO8601Duration(schema.prepTime),
    cook_time: parseISO8601Duration(schema.cookTime),
    total_time: parseISO8601Duration(schema.totalTime),
    yields: schema.recipeYield ? String(schema.recipeYield).split(' ')[0] : '4',
    ingredients: Array.isArray(schema.recipeIngredient) 
      ? schema.recipeIngredient.map(String)
      : [],
    instructions: Array.isArray(schema.recipeInstructions)
      ? schema.recipeInstructions.map((i: any) => i.text || String(i)).join(' ')
      : schema.recipeInstructions?.text || '',
    cuisine: schema.recipeCuisine ? String(schema.recipeCuisine) : undefined,
    category: schema.recipeCategory ? String(schema.recipeCategory) : undefined,
    keywords: schema.keywords ? String(schema.keywords).split(',') : undefined,
    difficulty: schema.recipeDifficulty ? String(schema.recipeDifficulty) : undefined,
  };
}

function parseISO8601Duration(duration?: string): number | undefined {
  if (!duration) return undefined;
  
  // Parse ISO 8601 duration format: PT1H30M = 90 minutes
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return undefined;
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  return hours * 60 + minutes + Math.ceil(seconds / 60);
}

// ============================================================================
// File Operations
// ============================================================================

function saveRecipe(recipe: Recipe, sourceUrl?: string): boolean {
  try {
    // Ensure directory exists
    const dir = path.join('src', 'domain', 'recipes');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Generate TypeScript file
    const content = generateRecipeFile(recipe, sourceUrl);
    const filePath = path.join(dir, recipe.slug + '.ts');
    
    // Write file
    fs.writeFileSync(filePath, content, 'utf-8');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to save recipe:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

function generateRecipeFile(recipe: Recipe, sourceUrl?: string): string {
  const timestamp = new Date().toISOString();
  
  return `// Spec: recipe-spec.md §2.1, version 4.6.0
// ${recipe.name}
// Source: ${sourceUrl || 'N/A'}
// Imported: ${timestamp}

import { Recipe } from '../types';

export const ${camelCaseId(recipe.slug)}: Recipe = ${JSON.stringify(recipe, null, 2)};
`;
}

function camelCaseId(slug: string): string {
  return slug
    .split('-')
    .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// ============================================================================
// Run
// ============================================================================

main();
