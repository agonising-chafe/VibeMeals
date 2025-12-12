#!/usr/bin/env node
/**
 * scripts/atk-enrich-agent.ts
 *
 * AI enrichment agent for ATK cookbook artifacts.
 *
 * - Reads src/dev/imported/atk-book/*.json (output of scripts/atk-extract.ts)
 * - For each fit === true artifact, calls a text model (Gemini) with the recipe
 *   and asks for enriched metadata/ingredient classifications/preflight/tags.
 * - Merges the AI response back into the Recipe object and writes to
 *   src/dev/imported/atk-book-enriched/<slug>.json.
 *
 * NOTE:
 * - Requires GEMINI_API_KEY in the environment.
 * - This script is best-effort and assumes a Google Generative Language API
 *   compatible endpoint; adjust model name / URL as needed.
 */

import fs from 'fs';
import path from 'path';
import type {
  Recipe,
  RecipeIngredientRequirement,
  RecipePreflightRequirement,
  RecipeMetadata,
  RecipeTag,
} from '../src/domain/types';

interface AtkArtifact {
  mapped: Recipe;
  raw: {
    source: 'atk_book';
    bookPath: string;
    start: number;
    end: number;
    yieldLine: string;
  };
  fit: boolean;
  fitReason?: string;
}

interface EnrichedFields {
  metadata?: Partial<RecipeMetadata>;
  ingredients?: Partial<RecipeIngredientRequirement>[];
  preflight?: RecipePreflightRequirement[];
  tags?: string[];
}

const ATK_INPUT_DIR = path.resolve(process.cwd(), 'src', 'dev', 'imported', 'atk-book');
const ATK_OUTPUT_DIR = path.resolve(process.cwd(), 'src', 'dev', 'imported', 'atk-book-enriched');

function safeReadJson(filePath: string): AtkArtifact | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as AtkArtifact;
  } catch (err) {
    console.error(`Failed to read/parse ${filePath}:`, err instanceof Error ? err.message : String(err));
    return null;
  }
}

function buildPrompt(recipe: Recipe, raw: AtkArtifact['raw']): string {
  const lines: string[] = [];

  lines.push('You are an assistant that converts cookbook recipes into a structured logistics format used by a meal-planning app called VibeMeals.');
  lines.push('The target TypeScript types are: Recipe, RecipeMetadata, RecipeIngredientRequirement, RecipePreflightRequirement, RecipeStep, and RecipeTag.');
  lines.push('');
  lines.push('Given the recipe below, your job is to enrich it with:');
  lines.push('- Realistic RecipeMetadata: estimatedMinutes, timeBand (FAST | NORMAL | PROJECT), equipmentTags, leftoverStrategy, baseServings, yieldText (copy from source).');
  lines.push('- Ingredient metadata: for each ingredient, set kind (PROTEIN | CARB | VEG | FRUIT | DAIRY | FAT_OIL | SPICE | CONDIMENT | OTHER), shoppingCategory (PRODUCE | MEAT_SEAFOOD | DAIRY_EGGS | PANTRY_DRY | FROZEN | OTHER), criticality (CRITICAL | NON_CRITICAL), quantityKind (FIXED | APPROXIMATE | TO_TASTE), and optional component labels where the recipe obviously has subcomponents (e.g. SAUCE, GARNISH).');
  lines.push('- Preflight requirements: any THAW/MARINATE/SLOW_COOK/LONG_PREP requirements that start 1+ hours before cooking or require advance prep.');
  lines.push('- Tags: keep atk_source and add cuisine / vibe tags such as american, italian, mexican, asian, comfort_food, weeknight, meal_prep, etc., drawn from the existing RecipeTag union (do not invent new tags).');
  lines.push('');
  lines.push('Do NOT change ingredient amounts or units; treat them as authoritative from the source.');
  lines.push('Be conservative and honest about timeBand and estimatedMinutes for a typical home cook (not a pro kitchen).');
  lines.push('');
  lines.push('Return ONLY a JSON object with this shape (no prose):');
  lines.push('{');
  lines.push('  "metadata": { /* partial RecipeMetadata override */ },');
  lines.push('  "ingredients": [ /* array of partial ingredient objects, in the same order as input.ingredients */ ],');
  lines.push('  "preflight": [ /* RecipePreflightRequirement[] */ ],');
  lines.push('  "tags": [ "atk_source", "american", "comfort_food" ]');
  lines.push('}');
  lines.push('');
  lines.push('Recipe (from ATK cookbook):');
  lines.push(`Title: ${recipe.name}`);
  if (recipe.metadata.yieldText) {
    lines.push(`Yield line: ${recipe.metadata.yieldText}`);
  } else {
    lines.push(`Yield line: ${raw.yieldLine}`);
  }
  lines.push('');
  lines.push('Ingredients:');
  recipe.ingredients.forEach((ing, idx) => {
    lines.push(`- [${idx}] ${ing.amount} ${ing.unit} ${ing.displayName}`);
  });
  lines.push('');
  lines.push('Steps:');
  recipe.steps.forEach((step) => {
    lines.push(`${step.stepNumber}. ${step.instruction}`);
  });

  return lines.join('\n');
}

async function callGemini(prompt: string): Promise<EnrichedFields | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in the environment; cannot run AI enrichment.');
    return null;
  }

  // Use a model name that is guaranteed to exist in the current project.
  // Allows override via GEMINI_MODEL (e.g., "models/gemini-2.5-flash").
  const model = process.env.GEMINI_MODEL || 'models/gemini-flash-latest';

  // Try v1beta first, then fall back to v1 to avoid 404 model issues.
  const urlCandidates = [
    `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
    `https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${apiKey}`,
  ];

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  };

  let lastError: string | null = null;

  for (const url of urlCandidates) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        lastError = `Gemini API error at ${url}: ${res.status} ${res.statusText}`;
        continue;
      }

      const data: any = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text || typeof text !== 'string') {
        lastError = 'Gemini response missing text content.';
        continue;
      }

      // The model is instructed to return pure JSON
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) {
        lastError = 'Gemini response did not contain JSON object.';
        continue;
      }

      const jsonSnippet = text.slice(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(jsonSnippet) as EnrichedFields;
      return parsed;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  if (lastError) {
    console.error(lastError);
  }
  return null;
}

function mergeEnrichment(recipe: Recipe, enrichment: EnrichedFields): Recipe {
  const next: Recipe = { ...recipe };

  if (enrichment.metadata) {
    next.metadata = { ...next.metadata, ...enrichment.metadata };
  }

  if (Array.isArray(enrichment.ingredients)) {
    const updatedIngs: RecipeIngredientRequirement[] = next.ingredients.map((ing, idx) => {
      const patch = enrichment.ingredients?.[idx];
      if (!patch) return ing;
      return { ...ing, ...patch };
    });
    next.ingredients = updatedIngs;
  }

  if (Array.isArray(enrichment.preflight)) {
    next.preflight = enrichment.preflight;
  }

  if (Array.isArray(enrichment.tags)) {
    // Ensure atk_source is preserved
    const existing = new Set<RecipeTag>(next.tags ?? []);
    existing.add('atk_source');
    enrichment.tags.forEach((t) => existing.add(t as RecipeTag));
    next.tags = Array.from(existing);
  }

  return next;
}

async function main() {
  if (!fs.existsSync(ATK_INPUT_DIR)) {
    console.error(`ATK input directory not found: ${ATK_INPUT_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(ATK_OUTPUT_DIR)) {
    fs.mkdirSync(ATK_OUTPUT_DIR, { recursive: true });
  }

  const limit = process.env.ATK_LIMIT ? Number(process.env.ATK_LIMIT) : undefined;
  const allFiles = fs.readdirSync(ATK_INPUT_DIR).filter((f) => f.endsWith('.json') && f !== '_summary.json');
  const files = typeof limit === 'number' && Number.isFinite(limit) ? allFiles.slice(0, limit) : allFiles;

  if (files.length === 0) {
    console.log('No ATK artifacts found to enrich.');
    return;
  }

  console.log(`Enriching ${files.length} ATK artifacts with AI (Gemini)...${limit ? ` (ATK_LIMIT=${limit})` : ''}`);

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const fullPath = path.join(ATK_INPUT_DIR, file);
    const artifact = safeReadJson(fullPath);
    if (!artifact) {
      failed += 1;
      continue;
    }
    if (!artifact.fit) {
      skipped += 1;
      continue;
    }

    const baseRecipe = artifact.mapped;
    const prompt = buildPrompt(baseRecipe, artifact.raw);
    const enrichment = await callGemini(prompt);
    if (!enrichment) {
      console.warn(`Skipping enrichment for ${file} due to AI error.`);
      failed += 1;
      continue;
    }

    const merged = mergeEnrichment(baseRecipe, enrichment);
    const outArtifact: AtkArtifact = {
      ...artifact,
      mapped: merged,
    };

    const outPath = path.join(ATK_OUTPUT_DIR, file);
    fs.writeFileSync(outPath, JSON.stringify(outArtifact, null, 2), 'utf-8');
    processed += 1;
    console.log(`? Enriched ${file}`);
  }

  console.log(`\nDone. Enriched: ${processed}, skipped (not fit): ${skipped}, failed: ${failed}. Output: ${ATK_OUTPUT_DIR}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
