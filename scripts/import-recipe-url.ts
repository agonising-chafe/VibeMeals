#!/usr/bin/env tsx
/**
 * Recipe URL Importer
 * 
 * Scrapes recipe from URL, extracts JSON-LD schema, enhances with AI,
 * and provides interactive review before saving.
 * 
 * Usage:
 *   npm run import:url -- https://www.budgetbytes.com/sheet-pan-chicken/
 *   npm run import:url -- --from-file saved.html
 *   npm run import:url -- --from-file recipe.pdf
 */

import 'dotenv/config';
import * as readline from 'readline';
import { Recipe, RecipeIngredientRequirement, RecipePreflightRequirement } from '../src/domain/types';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import pdf from 'pdf-parse-fork';
import { mapSpoonacularToVibeMeals, type SpoonacularExtractResponse } from './spoonacular-mapper';

// ============================================================================
// Configuration
// ============================================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'models/gemini-pro-latest';
const SPOONACULAR_KEY = process.env.SPOONACULAR_KEY || '';
const TIME_BUFFER_MULTIPLIER = 1.25;

// Some recipe sites block default fetch UA. These headers mimic a normal browser.
const DEFAULT_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate',
  Connection: 'keep-alive',
  Referer: 'https://www.google.com/',
};

// ============================================================================
// Types
// ============================================================================

interface RecipeSchema {
  '@type': string;
  name?: string;
  recipeIngredient?: string[];
  recipeInstructions?: Array<string | { text: string }>;
  totalTime?: string;
  cookTime?: string;
  prepTime?: string;
  recipeYield?: string | string[];
  description?: string;
}

interface ParsedIngredient {
  raw: string;
  amount: number;
  unit: RecipeIngredientRequirement['unit'];
  displayName: string;
}

interface AIEnhancement {
  criticalityFlags: Record<string, 'CRITICAL' | 'NON_CRITICAL'>;
  preflight: RecipePreflightRequirement[];
  timeBand: 'FAST' | 'NORMAL' | 'PROJECT';
  equipmentTags: string[];
  tags: string[];
}

// ============================================================================
// Spoonacular (first-pass) helper
// ============================================================================

async function trySpoonacularExtract(url: string): Promise<{ schema: RecipeSchema; fullData: SpoonacularExtractResponse } | null> {
  if (!SPOONACULAR_KEY) return null;

  const endpoint = `https://api.spoonacular.com/recipes/extract?url=${encodeURIComponent(url)}&apiKey=${SPOONACULAR_KEY}`;
  try {
    console.log('🥄 Trying Spoonacular extract API...');
    const res = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      console.warn(`  Spoonacular returned ${res.status}`);
      return null;
    }
    const data: SpoonacularExtractResponse = await res.json();

    const ingredients: string[] = data.extendedIngredients?.map((ing: any) => ing.original || ing.originalString).filter(Boolean) || [];
    const instructionsArray: string[] = (data.analyzedInstructions?.[0]?.steps || []).map((step: any) => step.step).filter(Boolean);
    const fallbackInstructions: string[] = Array.isArray(data.instructions)
      ? data.instructions
      : typeof data.instructions === 'string'
        ? data.instructions.split(/\n|\./).map((s: string) => s.trim()).filter(Boolean)
        : [];

    const totalMinutes = data.readyInMinutes || 0;
    const totalTimeIso = totalMinutes ? `PT${Math.round(totalMinutes)}M` : undefined;

    const schema: RecipeSchema = {
      '@type': 'Recipe',
      name: data.title,
      description: data.summary,
      recipeIngredient: ingredients,
      recipeInstructions: instructionsArray.length ? instructionsArray : fallbackInstructions,
      totalTime: totalTimeIso,
      prepTime: data.preparationMinutes ? `PT${Math.round(data.preparationMinutes)}M` : undefined,
      cookTime: data.cookingMinutes ? `PT${Math.round(data.cookingMinutes)}M` : undefined,
    };

    return { schema, fullData: data };
  } catch (err) {
    console.warn('  Spoonacular failed, falling back to scraper.', err instanceof Error ? err.message : err);
    return null;
  }
}

// ============================================================================
// Scraping Functions
// ============================================================================

function getPrintUrlVariants(url: string): string[] {
  const variants: string[] = [url]; // Original first
  
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    const pathname = parsed.pathname;
    
    // Damn Delicious: /wprm_print/{slug}
    if (hostname.includes('damndelicious.net')) {
      const slug = pathname.split('/').filter(s => s && s !== 'recipe').pop();
      if (slug) {
        variants.push(`${parsed.origin}/wprm_print/${slug}`);
      }
    }
    
    // NYT Cooking: /recipes/{id}-{slug}?print=true
    if (hostname.includes('cooking.nytimes.com')) {
      variants.push(`${url}?print=true`);
    }
    
    // Serious Eats: /print/{slug}
    if (hostname.includes('seriouseats.com')) {
      const slug = pathname.split('/').pop();
      if (slug) {
        variants.push(`${parsed.origin}/print/${slug}`);
      }
    }
    
    // Smitten Kitchen: /{slug}/print
    if (hostname.includes('smittenkitchen.com')) {
      variants.push(`${url.replace(/\/$/, '')}/print`);
    }
    
    // Generic patterns
    variants.push(`${url}?print=true`);
    variants.push(`${url}/print`);
    
    // Remove duplicates
    return [...new Set(variants)];
  } catch {
    return [url];
  }
}

async function fetchHtml(url: string): Promise<string> {
  const attempts = [
    { headers: DEFAULT_HEADERS },
    {
      // Second pass: slightly different UA and no compression hint
      headers: {
        ...DEFAULT_HEADERS,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        'Accept-Encoding': 'gzip, deflate',
      },
    },
  ];

  let lastError: unknown;

  for (const attempt of attempts) {
    try {
      const response = await fetch(url, {
        headers: attempt.headers,
        redirect: 'follow',
        cache: 'no-store',
      });

      if (!response.ok) {
        lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        // Retry on common block statuses
        if ([403, 429, 503].includes(response.status)) {
          continue;
        }
        throw lastError;
      }

      return await response.text();
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  // Fallback: use jina reader proxy to bypass basic blocking (returns plaintext/markdown)
  const jinaVariants = [
    `https://r.jina.ai/${url}`,
    `https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`,
  ];

  for (const jinaUrl of jinaVariants) {
    try {
      const jinaResponse = await fetch(jinaUrl, { headers: DEFAULT_HEADERS, cache: 'no-store' });
      if (jinaResponse.ok) {
        return await jinaResponse.text();
      }
      lastError = new Error(`Jina HTTP ${jinaResponse.status}: ${jinaResponse.statusText}`);
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error('Failed to fetch HTML');
}

async function scrapeRecipeSchema(url: string): Promise<RecipeSchema | null> {
  const urlsToTry = getPrintUrlVariants(url);
  
  for (const tryUrl of urlsToTry) {
    try {
      console.log(`  Trying: ${tryUrl}`);
      const html = await fetchHtml(tryUrl);
      const schema = parseRecipeSchemaFromHtml(html);
      if (schema) {
        console.log(`  ✅ Found recipe schema`);
        return schema;
      }
    } catch (error) {
      // Try next variant
      continue;
    }
  }
  
  console.error('  ❌ All URL variants failed');
  return null;
}

function parseRecipeSchemaFromHtml(html: string): RecipeSchema | null {
  // Extract all JSON-LD scripts
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = html.matchAll(jsonLdRegex);

  for (const match of matches) {
    try {
      const json = JSON.parse(match[1]);

      // Normalize into iterable items
      const items: any[] = Array.isArray(json) ? json : [json];

      const maybeGraph = items.flatMap((item) => {
        if (item && Array.isArray(item['@graph'])) return item['@graph'];
        return [item];
      });

      for (const item of maybeGraph) {
        const t = item?.['@type'];
        if (!t) continue;
        const types = Array.isArray(t) ? t : [t];
        if (types.includes('Recipe')) {
          return item as RecipeSchema;
        }
      }
    } catch (e) {
      continue;
    }
  }

  // Plaintext fallback (e.g., jina proxy) – try to extract headings/sections
  const plainFallback = extractFromPlainText(html);
  if (plainFallback) return plainFallback;

  return null;
}

function extractFromPlainText(text: string): RecipeSchema | null {
  // Expect headings like "# HOMESTYLE CHICKEN NOODLE SOUP" or "HOMESTYLE CHICKEN NOODLE SOUP" 
  // and sections "INGREDIENTS" / "INSTRUCTIONS" / "DIRECTIONS"
  const lines = text.split(/\r?\n/);

  // Find title (first line with food words, or starts with #)
  const titleLine = lines.find(l => l.trim().startsWith('# ')) || 
                    lines.find(l => {
                      const t = l.trim().toUpperCase();
                      return t.length > 10 && t.length < 100 && 
                             (t.includes('CHICKEN') || t.includes('SOUP') || t.includes('RECIPE'));
                    });
  const name = titleLine ? titleLine.replace(/^#+\s*/, '').trim() : undefined;

  const ingredients: string[] = [];
  const instructions: string[] = [];

  let mode: 'none' | 'ing' | 'inst' = 'none';
  let debugLines: string[] = [];
  let lineNum = 0;
  for (const rawLine of lines) {
    lineNum++;
    const line = rawLine.trim();
    if (!line) continue;
    const upper = line.toUpperCase();
    
    // Collect first 40 lines for debugging
    if (lineNum <= 40) {
      debugLines.push(`${lineNum}: [${mode}] ${line.substring(0, 50)}`);
    }
    
    // Section headers
    if (upper === 'INGREDIENTS' || upper.startsWith('INGREDIENTS')) { 
      mode = 'ing'; 
      debugLines.push(`[ING MODE ON]`);
      continue; 
    }
    if (upper === 'EQUIPMENT') {
      // Don't switch mode, just skip this line
      debugLines.push(`[EQUIPMENT header, staying in ${mode}]`);
      continue;
    }
    if (upper === 'INSTRUCTIONS' || upper === 'DIRECTIONS' || upper.startsWith('INSTRUCTIONS')) { 
      mode = 'inst'; 
      debugLines.push(`[INST MODE ON, ingredients=${ingredients.length}]`);
      continue; 
    }
    if (upper === 'NOTES' || upper.startsWith('RECIPE')) { 
      mode = 'none'; 
      continue; 
    }

    if (mode === 'ing') {
      debugLines.push(`[ING] ${line.substring(0, 60)}`);
      // Stop at next section
      if (upper === 'EQUIPMENT' || upper === 'INSTRUCTIONS' || upper === 'DIRECTIONS') {
        mode = 'none';
        continue;
      }
      // Skip sub-headers (all caps, short)
      if (upper === line && line.length < 30) {
        debugLines.push(`  -> skipped (header)`);
        continue;
      }
      
      // Ingredient lines (bullet or bare)
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        ingredients.push(line.replace(/^[-•*]\s*/, ''));
        debugLines.push(`  -> added (bullet)`);
        continue;
      }
      // Bare ingredient (starts with number or common ingredient word)
      if (line.match(/^\d/) || line.match(/^(chicken|beef|butter|salt|pepper|onion|garlic|cup|tablespoon|teaspoon)/i)) {
        ingredients.push(line);
        debugLines.push(`  -> added (bare)`);
        continue;
      }
      debugLines.push(`  -> skipped`);
      if (line.startsWith('#')) mode = 'none';
    }

    if (mode === 'inst') {
      // Stop at next section
      if (upper.startsWith('RECIPE') || upper.startsWith('BROUGHT TO YOU') || line.includes('damndelicious.net')) {
        mode = 'none';
        continue;
      }
      // Skip sub-headers and equipment lines
      if ((upper === line && line.length < 30) || upper === 'DUTCH OVEN') continue;
      
      // If we haven't captured ingredients yet and line starts with number + unit/ingredient word, it's likely an ingredient
      if (ingredients.length < 15 && line.match(/^\d+\s+(tablespoon|teaspoon|cup|pound|ounce|oz|lb|kg|gram|clove|onion|carrot|rib|bay)/i)) {
        ingredients.push(line);
        continue;
      }
      
      // Numbered step on its own line
      if (line.match(/^\d+\s*$/)) {
        // Just a number, skip (step number will be on next line)
        continue;
      }
      
      // After capturing ingredients, capture instruction lines (have cooking verbs or are complete sentences)
      if (ingredients.length > 0 && (
        line.match(/^(melt|stir|add|cook|heat|bring|remove|serve|season|reduce|simmer|dice|chop)/i) ||
        line.length > 20
      )) {
        instructions.push(line);
        continue;
      }
      
      if (line.startsWith('-') || line.startsWith('•')) {
        instructions.push(line.replace(/^[-•]\s*/, ''));
        continue;
      }
      if (line.startsWith('#')) mode = 'none';
    }
  }

  if (!name || ingredients.length === 0 || instructions.length === 0) {
    console.error(`  Parsed: name=${!!name}, ingredients=${ingredients.length}, instructions=${instructions.length}`);
    console.error(`  Debug lines:\n${debugLines.join('\n')}`);
    return null;
  }

  return {
    '@type': 'Recipe',
    name,
    recipeIngredient: ingredients,
    recipeInstructions: instructions,
  };
}

// ============================================================================
// Parsing Functions
// ============================================================================

function parseDuration(isoDuration: string): number {
  // Parse ISO 8601 duration (PT30M, PT1H30M, etc.)
  if (!isoDuration || !isoDuration.startsWith('PT')) return 0;
  
  const hours = isoDuration.match(/(\d+)H/);
  const minutes = isoDuration.match(/(\d+)M/);
  
  const h = hours ? parseInt(hours[1]) : 0;
  const m = minutes ? parseInt(minutes[1]) : 0;
  
  return h * 60 + m;
}

function parseIngredientLine(line: string): ParsedIngredient {
  // Try to parse: "2 lbs chicken breast" or "1/2 cup olive oil"
  // Pattern: [amount] [unit] [ingredient name]
  
  // Handle fractions
  line = line.replace(/½/g, '0.5').replace(/¼/g, '0.25').replace(/¾/g, '0.75');
  
  // Match patterns like: "2 lbs chicken" or "1/2 cup oil" or "2-3 chicken breasts"
  const match = line.match(/^(\d+(?:[\/\.]\d+)?(?:\s*-\s*\d+)?)\s*([a-zA-Z]+)?\s+(.+)$/);
  
  if (match) {
    let amount = match[1].trim();
    // Handle ranges (2-3 → 2.5)
    if (amount.includes('-')) {
      const [low, high] = amount.split('-').map(n => parseFloat(n));
      amount = ((low + high) / 2).toString();
    }
    // Handle fractions (1/2 → 0.5)
    if (amount.includes('/')) {
      const [num, denom] = amount.split('/').map(n => parseFloat(n));
      amount = (num / denom).toString();
    }
    
    return {
      raw: line,
      amount: parseFloat(amount),
      unit: normalizeUnit(match[2] || 'UNIT'),
      displayName: match[3].trim()
    };
  }
  
  // Fallback: treat as 1 UNIT
  return {
    raw: line,
    amount: 1,
    unit: 'UNIT',
    displayName: line.trim()
  };
}

function normalizeUnit(unit: string): RecipeIngredientRequirement['unit'] {
  const unitMap: Record<string, RecipeIngredientRequirement['unit']> = {
    'lb': 'LB', 'lbs': 'LB', 'pound': 'LB', 'pounds': 'LB',
    'oz': 'OZ', 'ounce': 'OZ', 'ounces': 'OZ',
    'kg': 'KG', 'kilogram': 'KG',
    'g': 'GRAM', 'gram': 'GRAM', 'grams': 'GRAM',
    'cup': 'CUP', 'cups': 'CUP', 'c': 'CUP',
    'tablespoon': 'TBSP', 'tablespoons': 'TBSP', 'tbsp': 'TBSP', 'tbs': 'TBSP',
    'teaspoon': 'TSP', 'teaspoons': 'TSP', 'tsp': 'TSP',
    'ml': 'ML', 'milliliter': 'ML', 'milliliters': 'ML',
    'unit': 'UNIT', 'whole': 'UNIT', 'each': 'UNIT'
  };
  
  const normalized = unit.toLowerCase().replace(/\./g, '');
  return unitMap[normalized] || 'UNIT';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateRecipeId(name: string): string {
  return `r_${slugify(name)}`;
}

function generateIngredientId(displayName: string): string {
  return `ing_${slugify(displayName)}`;
}

// ============================================================================
// AI Enhancement
// ============================================================================

async function enhanceWithAI(
  schema: RecipeSchema,
  ingredients: ParsedIngredient[]
): Promise<AIEnhancement | null> {
  if (!GEMINI_API_KEY) {
    console.warn('⚠️  No AI key found (GEMINI_API_KEY / GOOGLE_API_KEY). Skipping AI enhancement.');
    return null;
  }

  const prompt = buildEnhancementPrompt(schema, ingredients);
  const fallbackModel = 'models/gemini-flash-latest'; // Fallback to a faster model

  const callModel = async (model: string) => {
    const modelEndpoint = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent`;
    console.log(`  📞 Calling Gemini model: ${model}`);
    const res = await fetch(modelEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Gemini API error for model ${model}: ${res.status} ${res.statusText} – ${body}`);
    }
    return res.json();
  };

  try {
    let data;
    try {
      data = await callModel(GEMINI_MODEL);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('404') && GEMINI_MODEL !== fallbackModel) {
        console.warn(`⚠️  Primary model ${GEMINI_MODEL} unavailable; retrying with ${fallbackModel}`);
        data = await callModel(fallbackModel);
      } else {
        throw err;
      }
    }
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
    console.log('  📄 AI Response Text:', text ? text.substring(0, 150) + '...' : 'N/A');
    if (!text) return null;
    const jsonMatch = text.match(/```json\n([\s\S]+?)\n```/) || text.match(/\{[\s\S]+\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonStr);
    }
    return null;
  } catch (err) {
    console.error('AI enhancement error (Gemini):', err);
    return null;
  }
}

function buildEnhancementPrompt(schema: RecipeSchema, ingredients: ParsedIngredient[]): string {
  return `Analyze this recipe and provide VibeMeals metadata in JSON format.

Recipe: ${schema.name}
Description: ${schema.description || 'N/A'}

Ingredients:
${ingredients.map((ing, i) => `${i + 1}. ${ing.displayName} (${ing.amount} ${ing.unit})`).join('\n')}

Instructions (first 8 steps):
${schema.recipeInstructions?.slice(0, 8).map((step, i) => {
  const text = typeof step === 'string' ? step : step.text;
  return `${i + 1}. ${text}`;
}).join('\n') || 'N/A'}

Provide JSON with:
{
  "criticalityFlags": {
    "chicken breast": "CRITICAL",
    "olive oil": "NON_CRITICAL",
    // ... for EVERY ingredient above
  },
  "preflight": [
    // Only include if needed:
    // {"type": "THAW", "description": "Thaw chicken overnight", "hoursBeforeCook": 12}
    // {"type": "MARINATE", "description": "Marinate 2 hours", "hoursBeforeCook": 2}
  ],
  "timeBand": "FAST", // FAST (≤30min), NORMAL (30-50min), PROJECT (>50min)
  "equipmentTags": ["DUTCH_OVEN"], // Only non-standard: DUTCH_OVEN, SHEET_PAN, SLOW_COOKER, INSTANT_POT, BLENDER, FOOD_PROCESSOR
  "tags": ["comfort_food", "budget_friendly", "italian"] // Cuisine (italian, mexican, asian, american), vibe (comfort_food, kid_friendly, date_night, meal_prep), format (one_pot, sheet_pan, slow_cooker, budget_friendly, quick)
}

Criticality Rules (STRICT):
- CRITICAL: Main protein (chicken, beef, fish), main carb (pasta, rice, bread), primary vegetables that define the dish (mushrooms in stroganoff)
- NON_CRITICAL: Aromatics (garlic, onion unless primary), fats (butter, oil), spices/seasonings (salt, pepper, paprika), condiments (Worcestershire, mustard, soy sauce), garnishes (parsley, cilantro), optional toppings
- When in doubt about aromatics/fats: mark NON_CRITICAL

Equipment Rules:
- Only list if recipe specifically needs it AND it's not standard cookware
- Standard (don't list): pot, skillet, pan, cutting board, knife, mixing bowl, spoon
- List only: DUTCH_OVEN, SHEET_PAN, SLOW_COOKER, INSTANT_POT, BLENDER, FOOD_PROCESSOR, GRILL

Tag Guidelines:
- Cuisine: italian, mexican, asian, american, mediterranean, indian (if clear ethnic cuisine)
- Vibe: comfort_food, kid_friendly, date_night, meal_prep, healthy, indulgent
- Format: one_pot, sheet_pan, slow_cooker, budget_friendly, quick (under 30min), make_ahead
- Always include 2-4 tags minimum

Examples for reference:

Example 1 - Beef Stroganoff:
{
  "criticalityFlags": {
    "garlic": "NON_CRITICAL",
    "butter": "NON_CRITICAL",
    "ground beef": "CRITICAL",
    "mushrooms": "CRITICAL",
    "black pepper": "NON_CRITICAL",
    "beef broth": "CRITICAL",
    "Worcestershire sauce": "NON_CRITICAL",
    "Dijon mustard": "NON_CRITICAL",
    "egg noodles": "CRITICAL",
    "sour cream": "CRITICAL",
    "parsley": "NON_CRITICAL"
  },
  "preflight": [],
  "timeBand": "NORMAL",
  "equipmentTags": [],
  "tags": ["comfort_food", "one_pot", "budget_friendly"]
}

Example 2 - Sheet Pan Chicken Fajitas:
{
  "criticalityFlags": {
    "chicken breast": "CRITICAL",
    "bell peppers": "CRITICAL",
    "onion": "CRITICAL",
    "olive oil": "NON_CRITICAL",
    "chili powder": "NON_CRITICAL",
    "cumin": "NON_CRITICAL",
    "tortillas": "CRITICAL",
    "lime": "NON_CRITICAL",
    "cilantro": "NON_CRITICAL"
  },
  "preflight": [],
  "timeBand": "FAST",
  "equipmentTags": ["SHEET_PAN"],
  "tags": ["mexican", "quick", "sheet_pan", "kid_friendly"]
}

Now analyze the recipe above and return ONLY valid JSON (no markdown, no extra text).`;
}

// ============================================================================
// Interactive Review
// ============================================================================

async function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function confirm(rl: readline.Interface, question: string): Promise<boolean> {
  const answer = await ask(rl, `${question} (y/n): `);
  return answer.toLowerCase() === 'y';
}

async function interactiveReview(
  schema: RecipeSchema,
  ingredients: ParsedIngredient[],
  aiEnhancement: AIEnhancement | null,
  estimatedMinutes: number
): Promise<Partial<Recipe>> {
  console.log('\n' + '='.repeat(60));
  console.log('📝 Recipe Review: ' + schema.name);
  console.log('='.repeat(60));
  
  // Auto-accept time estimate
  console.log(`\n⏱️  Time Estimate: ${estimatedMinutes} minutes (buffered from original)`);
  
  // Auto-accept time band
  const timeBand = aiEnhancement?.timeBand || classifyTimeBand(estimatedMinutes);
  console.log(`\n🏷️  Time Band: ${timeBand}`);
  
    
  // Auto-accept AI criticality suggestions
  console.log('\n🔍 Ingredient Criticality:');
  const criticalityMap = aiEnhancement?.criticalityFlags || {};
  const finalCriticality: Record<string, 'CRITICAL' | 'NON_CRITICAL'> = {};
  
  ingredients.forEach(ing => {
    finalCriticality[ing.displayName] = 
      criticalityMap[ing.displayName] || suggestCriticality(ing.displayName);
    console.log(`  ${finalCriticality[ing.displayName] === 'CRITICAL' ? '🔴' : '⚪'} ${ing.displayName} → ${finalCriticality[ing.displayName]}`);
  });
    
  // Auto-accept preflight from AI
  const preflight = aiEnhancement?.preflight || [];
  if (preflight.length > 0) {
    console.log('\n⏰ Preflight Requirements:');
    preflight.forEach(p => {
      console.log(`  ${p.type}: ${p.description}`);
    });
  }
    
  // Auto-accept equipment and tags
  const equipmentTags = aiEnhancement?.equipmentTags || [];
  console.log(`\n🔧 Equipment: ${equipmentTags.join(', ') || 'Basic only'}`);
  
  const tags = aiEnhancement?.tags || [];
  console.log(`\n🏷️  Tags: ${tags.join(', ') || 'None'}`);
  
  // Build final recipe structure
  const finalIngredients: RecipeIngredientRequirement[] = ingredients.map(ing => ({
    ingredientId: generateIngredientId(ing.displayName),
    displayName: ing.displayName,
    amount: ing.amount,
    unit: ing.unit,
    criticality: finalCriticality[ing.displayName],
    kind: suggestIngredientKind(ing.displayName),
    shoppingCategory: suggestShoppingCategory(ing.displayName)
  }));
  
  const steps = extractSteps(schema);
  
  const recipe: Partial<Recipe> = {
    id: generateRecipeId(schema.name || 'unknown'),
    name: schema.name || 'Unknown Recipe',
    slug: slugify(schema.name || 'unknown'),
    metadata: {
      timeBand,
      estimatedMinutes,
      equipmentTags,
      leftoverStrategy: 'NONE'
    },
    ingredients: finalIngredients,
    preflight,
    steps,
    tags
  };
  
  console.log('\n✅ Recipe ready for import!');
  console.log(`   ${recipe.ingredients?.length} ingredients`);
  console.log(`   ${recipe.steps?.length} steps`);
  console.log(`   ${recipe.preflight?.length || 0} preflight requirements`);
  
  return recipe;
}

// ============================================================================
// Helper Functions
// ============================================================================

function classifyTimeBand(minutes: number): 'FAST' | 'NORMAL' | 'PROJECT' {
  if (minutes <= 30) return 'FAST';
  if (minutes <= 50) return 'NORMAL';
  return 'PROJECT';
}

function suggestCriticality(displayName: string): 'CRITICAL' | 'NON_CRITICAL' {
  const lower = displayName.toLowerCase();
  
  // Proteins are always critical
  if (lower.match(/chicken|beef|pork|fish|salmon|shrimp|tofu|beans|lentils/)) {
    return 'CRITICAL';
  }
  
  // Main carbs are critical
  if (lower.match(/pasta|rice|tortilla|bread|potato|noodle/)) {
    return 'CRITICAL';
  }
  
  // Main vegetables
  if (lower.match(/broccoli|carrot|spinach|bell pepper|onion|tomato/)) {
    return 'CRITICAL';
  }
  
  // Spices, garnishes are non-critical
  if (lower.match(/salt|pepper|oil|garlic powder|cilantro|parsley|basil/)) {
    return 'NON_CRITICAL';
  }
  
  // Conservative default
  return 'CRITICAL';
}

function suggestIngredientKind(displayName: string): RecipeIngredientRequirement['kind'] {
  const lower = displayName.toLowerCase();
  
  if (lower.match(/chicken|beef|pork|fish|salmon|shrimp|tofu|beans|lentils/)) {
    return 'PROTEIN';
  }
  if (lower.match(/pasta|rice|tortilla|bread|potato|noodle/)) {
    return 'CARB';
  }
  if (lower.match(/broccoli|carrot|spinach|lettuce|tomato|pepper|onion|zucchini/)) {
    return 'VEG';
  }
  if (lower.match(/cheese|milk|cream|yogurt|butter/)) {
    return 'DAIRY';
  }
  if (lower.match(/oil|lard|shortening/)) {
    return 'FAT_OIL';
  }
  if (lower.match(/salt|pepper|paprika|cumin|oregano|basil|thyme/)) {
    return 'SPICE';
  }
  if (lower.match(/sauce|ketchup|mayo|mustard|salsa/)) {
    return 'CONDIMENT';
  }
  
  return 'OTHER';
}

function suggestShoppingCategory(displayName: string): RecipeIngredientRequirement['shoppingCategory'] {
  const lower = displayName.toLowerCase();
  
  if (lower.match(/chicken|beef|pork|fish|salmon|shrimp/)) {
    return 'MEAT_SEAFOOD';
  }
  if (lower.match(/broccoli|carrot|spinach|lettuce|tomato|pepper|onion|zucchini/)) {
    return 'PRODUCE';
  }
  if (lower.match(/cheese|milk|cream|yogurt|butter|egg/)) {
    return 'DAIRY_EGGS';
  }
  if (lower.match(/frozen/)) {
    return 'FROZEN';
  }
  if (lower.match(/pasta|rice|flour|sugar|oil|sauce|spice|salt|pepper/)) {
    return 'PANTRY_DRY';
  }
  
  return 'OTHER';
}

function extractSteps(schema: RecipeSchema): any[] {
  if (!schema.recipeInstructions) return [];
  
  return schema.recipeInstructions.map((step, i) => {
    const text = typeof step === 'string' ? step : (step as any).text || '';
    return {
      stepNumber: i + 1,
      instruction: text
    };
  });
}

// ============================================================================
// Save Functions
// ============================================================================

async function saveRecipe(recipe: Partial<Recipe>, sourceUrl: string): Promise<void> {
  const recipesDir = join(process.cwd(), 'src', 'domain', 'recipes');
  await mkdir(recipesDir, { recursive: true });
  
  const filename = `${recipe.slug}.ts`;
  const filepath = join(recipesDir, filename);
  
  const fileContent = `// ${recipe.name}
// Source: ${sourceUrl}
// Imported: ${new Date().toISOString()}

import { Recipe } from '../types';

export const ${toCamelCase(recipe.slug || '')}: Recipe = ${JSON.stringify(recipe, null, 2)};
`;
  
  await writeFile(filepath, fileContent, 'utf-8');
  console.log(`\n💾 Saved to: ${filepath}`);
}

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: npm run import:url -- <recipe-url> | --from-file <path>');
    process.exit(1);
  }
  
  const fromFileIndex = args.indexOf('--from-file');
  const isFromFile = fromFileIndex !== -1;
  let url = '';
  let html: string | null = null;

  if (isFromFile) {
    const filePath = args[fromFileIndex + 1];
    if (!filePath) {
      console.error('❌ --from-file requires a path');
      process.exit(1);
    }
    
    // Check if PDF
    if (filePath.toLowerCase().endsWith('.pdf')) {
      const buffer = await readFile(filePath);
      const pdfData = await pdf(buffer);
      html = pdfData.text;
      console.log('📄 Extracted text from PDF:', filePath);
    } else {
      html = await readFile(filePath, 'utf-8');
      console.log('📄 Loading recipe from file:', filePath);
    }
    
    url = filePath;
  } else {
    url = args[0];
    console.log('🔍 Scraping recipe from:', url);
  }
  
  // Step 1: Try Spoonacular first (if key present), then fall back to scraper
  let schema: RecipeSchema | null = null;
  let spoonacularData: SpoonacularExtractResponse | null = null;
  let useSpoonacularMapper = false;

  if (!isFromFile) {
    const spoonResult = await trySpoonacularExtract(url);
    if (spoonResult) {
      schema = spoonResult.schema;
      spoonacularData = spoonResult.fullData;
      useSpoonacularMapper = true;
      console.log('✅ Spoonacular extract succeeded');
    }
  }

  if (!schema) {
    schema = html ? parseRecipeSchemaFromHtml(html) : await scrapeRecipeSchema(url);
  }
  if (!schema) {
    console.error('❌ Failed to extract recipe schema');
    process.exit(1);
  }
  
  console.log('✅ Found recipe:', schema.name);
  
  let recipe: Partial<Recipe> | null = null;

  // If Spoonacular provided full data, use rule-based mapper
  if (useSpoonacularMapper && spoonacularData) {
    console.log('🗺️  Using Spoonacular mapper (rule-based enrichment)...');
    try {
      recipe = mapSpoonacularToVibeMeals(spoonacularData);
      console.log('✅ Spoonacular mapper complete');
      console.log(`   ${recipe.ingredients?.length} ingredients | ${recipe.steps?.length} steps | ${recipe.preflight?.length || 0} preflight | ${recipe.tags?.length || 0} tags`);
    } catch (err) {
      console.warn('⚠️  Spoonacular mapper failed, falling back to AI:', err instanceof Error ? err.message : err);
      recipe = null;
    }
  }

  // Fallback: AI-based enrichment (for scraped HTML or mapper failure)
  if (!recipe) {
    // Step 2: Parse ingredients
    const ingredients = (schema.recipeIngredient || []).map(parseIngredientLine);
    console.log(`✅ Parsed ${ingredients.length} ingredients`);
    
    // Step 3: Calculate time
    let estimatedMinutes = 0;
    if (schema.totalTime) {
      estimatedMinutes = parseDuration(schema.totalTime);
    } else if (schema.cookTime && schema.prepTime) {
      estimatedMinutes = parseDuration(schema.cookTime) + parseDuration(schema.prepTime);
    }
    if (estimatedMinutes === 0) {
      estimatedMinutes = 45; // sensible default when source omits time
    }
    estimatedMinutes = Math.ceil(estimatedMinutes * TIME_BUFFER_MULTIPLIER);
    console.log(`✅ Estimated time: ${estimatedMinutes} minutes (with ${TIME_BUFFER_MULTIPLIER}x buffer)`);
    
    // Step 4: AI enhancement
    console.log('🤖 Enhancing with AI (Gemini fallback)...');
    const aiEnhancement = await enhanceWithAI(schema, ingredients);
    if (aiEnhancement) {
      console.log('✅ AI enhancement complete');
    }
    
    // Step 5: Build recipe from AI
    recipe = await interactiveReview(schema, ingredients, aiEnhancement, estimatedMinutes);
  }
  
  if (!recipe) {
    console.error('❌ Failed to generate recipe');
    process.exit(1);
  }
  
  // Step 6: Save
  await saveRecipe(recipe, url);
  
  console.log('\n🎉 Import complete!');
  console.log('\nNext steps:');
  console.log('1. Review the generated file');
  console.log('2. Cook the recipe to validate time estimate');
  console.log('3. Import into fixtures/recipes.seed.ts');
}

main().catch(console.error);
