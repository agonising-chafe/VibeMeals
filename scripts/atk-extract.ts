#!/usr/bin/env node
/**
 * scripts/atk-extract.ts
 * Heuristic extractor for America's Test Kitchen book text -> candidate Recipe JSON artifacts.
 *
 * Flow:
 * - Reads the ATK .txt dump in repo root by default (override via CLI arg 1)
 * - Detects recipe blocks (title + SERVES/MAKES + body)
 * - Parses rough ingredients and steps
 * - Applies "fit" heuristics (no hero exceptions); writes artifacts with fit flag
 * - Outputs to src/dev/imported/atk-book (override via CLI arg 2)
 *
 * This is deliberately conservative and lossy; promotion to canonical recipes
 * should only consider artifacts where fit === true.
 */

import fs from 'fs';
import path from 'path';
import type {
  Recipe,
  RecipeMetadata,
  RecipeIngredientRequirement,
  RecipeStep,
} from '../src/domain/types';

interface RawBlock {
  title: string;
  yieldLine: string;
  start: number;
  end: number;
  lines: string[];
}

interface Artifact {
  mapped: Recipe;
  raw: { source: 'atk_book'; bookPath: string; start: number; end: number; yieldLine: string };
  fit: boolean;
  fitReason?: string;
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function looksLikeYield(line: string): boolean {
  return /^(SERVES|MAKES)\b/i.test(line.trim());
}

function isAllCaps(s: string): boolean {
  const letters = s.replace(/[^A-Za-z]/g, '');
  return !!letters && letters === letters.toUpperCase();
}

function shouldSkipTitle(title: string): boolean {
  if (!title.trim()) return true;
  if (looksLikeYield(title)) return true;
  if (/PRAISE FOR|ALSO BY|CONTENTS|COPYRIGHT|SHOPPING GUIDE/i.test(title)) return true;
  if (/TEST KITCHEN FAVORITES/i.test(title)) return true;
  if (/^ITEM\b|^WHAT TO LOOK FOR/i.test(title)) return true;
  if (isAllCaps(title)) return true;
  return false;
}

function detectBlocks(lines: string[]): RawBlock[] {
  const indices: { titleIndex: number; yieldIndex: number }[] = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const title = lines[i].trim();
    if (shouldSkipTitle(title)) continue;
    let k = i + 1;
    while (k < lines.length && !lines[k].trim()) k++;
    if (k >= lines.length) break;
    if (!looksLikeYield(lines[k])) continue;
    indices.push({ titleIndex: i, yieldIndex: k });
  }

  return indices.map((c, idx) => {
    const next = indices[idx + 1];
    const start = c.titleIndex;
    const end = next ? next.titleIndex - 1 : lines.length - 1;
    return {
      title: lines[start].trim(),
      yieldLine: lines[c.yieldIndex].trim(),
      start,
      end,
      lines: lines.slice(start, end + 1),
    };
  });
}

// Basic amount parsing: integers, simple decimals, or fallback to null
function parseAmountToken(token: string): number | null {
  const cleaned = token.replace(/[^0-9/.,]/g, '');
  if (!cleaned) return null;

  // ATK-style compressed mixed fractions like 11/2, 13/4, 33/4 => 1.5, 1.75, 3.75
  const mixed = cleaned.match(/^(\d)(\d)\/(\d)$/);
  if (mixed) {
    const whole = Number(mixed[1]);
    const num = Number(mixed[2]);
    const den = Number(mixed[3]);
    return whole + num / den;
  }

  // simple fraction like 1/2
  const frac = cleaned.match(/^(\d+)\/(\d+)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);

  const num = Number(cleaned.replace(',', '.'));
  return Number.isNaN(num) ? null : num;
}

function guessUnit(token: string): RecipeIngredientRequirement['unit'] | null {
  const cleaned = token.toLowerCase();
  if (/^cup/.test(cleaned)) return 'CUP';
  if (/^tbsp|tablespoon/.test(cleaned)) return 'TBSP';
  if (/^tsp|teaspoon/.test(cleaned)) return 'TSP';
  if (/^oz|ounce/.test(cleaned)) return 'OZ';
  if (/^lb|pound/.test(cleaned)) return 'LB';
  if (/^g|gram/.test(cleaned)) return 'GRAM';
  if (/^kg|kilogram/.test(cleaned)) return 'KG';
  if (/^ml|milliliter|liter/.test(cleaned)) return 'ML';
  if (/^clove|can|packet|slice|strip/.test(cleaned)) return 'UNIT';
  return null;
}

function parseIngredientLine(line: string): RecipeIngredientRequirement | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (/^WHY THIS RECIPE WORKS/i.test(trimmed)) return null;
  if (/^\d+\./.test(trimmed)) return null; // likely a step

  const tokens = trimmed.split(/\s+/);
  if (tokens.length === 0) return null;

  let amount: number | null = parseAmountToken(tokens[0]);
  let unit: RecipeIngredientRequirement['unit'] | null = null;
  let startIdx = 0;

  if (amount !== null) {
    startIdx = 1;
    if (tokens[1]) {
      const maybeUnit = guessUnit(tokens[1]);
      if (maybeUnit) {
        unit = maybeUnit;
        startIdx = 2;
      }
    }
  } else {
    amount = 1;
    unit = 'UNIT';
    startIdx = 0;
  }

  const displayName = tokens.slice(startIdx).join(' ').trim() || trimmed;
  const ingredientId = slugify(displayName) || 'ingredient';

  return {
    ingredientId,
    displayName,
    amount: amount ?? 1,
    unit: unit || 'UNIT',
    criticality: 'CRITICAL', // default safe; human can relax later
    kind: 'OTHER',
    shoppingCategory: 'PANTRY_DRY',
    quantityKind: 'FIXED',
  };
}

function extractIngredients(block: RawBlock): RecipeIngredientRequirement[] {
  const out: RecipeIngredientRequirement[] = [];
  const yieldIdx = block.lines.findIndex(looksLikeYield);
  if (yieldIdx === -1) return out;

  for (let i = yieldIdx + 1; i < block.lines.length; i++) {
    const text = block.lines[i].trim();
    if (!text) continue;
    if (/^\d+\./.test(text)) break; // steps begin
    if (isAllCaps(text) && !looksLikeYield(text)) continue; // component heading; skip for now
    const ing = parseIngredientLine(text);
    if (ing) out.push(ing);
  }
  return out;
}

function extractSteps(block: RawBlock): RecipeStep[] {
  const steps: RecipeStep[] = [];
  let n = 1;
  for (const line of block.lines) {
    const m = line.trim().match(/^(\d+)\.\s*(.*)$/);
    if (!m) continue;
    const instruction = m[2]?.trim() || line.trim();
    steps.push({ stepNumber: n++, instruction });
  }
  return steps;
}

function parseYieldMeta(yieldLine: string): { yieldText: string; baseServings?: number } {
  const m = yieldLine.match(/SERVES\s+(\d+)/i);
  const meta: { yieldText: string; baseServings?: number } = {
    yieldText: yieldLine.trim(),
  };
  if (m) {
    meta.baseServings = Number(m[1]);
  }
  return meta;
}

// Fit heuristics: no hero exceptions
function evaluateFit(recipe: Recipe): { fit: boolean; reason?: string } {
  const ingCount = recipe.ingredients.length;
  const stepCount = recipe.steps.length;
  if (ingCount < 3) return { fit: false, reason: 'too_few_ingredients' };
  if (stepCount < 2) return { fit: false, reason: 'too_few_steps' };
  if (ingCount > 30) return { fit: false, reason: 'too_many_ingredients' };
  const title = recipe.name.toLowerCase();
  if (/(cookie|cake|pie|brownie|cupcake|frosting|ice cream|dessert)/.test(title)) {
    return { fit: false, reason: 'dessert_skipped_for_mvp' };
  }
  return { fit: true };
}

function buildRecipe(block: RawBlock, bookPath: string): Artifact {
  const slug = slugify(block.title) || `atk-${block.start}`;
  const id = `atk_${slug}`;
  const ingredients = extractIngredients(block);
  const steps = extractSteps(block);
  const yieldMeta = parseYieldMeta(block.yieldLine);

  const metadata: RecipeMetadata = {
    timeBand: 'PROJECT',
    estimatedMinutes: 90,
    equipmentTags: ['OVEN'],
    leftoverStrategy: 'EXPECTED',
    ...yieldMeta,
  };

  const mapped: Recipe = {
    id,
    name: block.title,
    slug,
    metadata,
    scalable: true,
    ingredients,
    preflight: [],
    steps,
    tags: ['atk_source'], // provenance flag for ATK book imports
  };

  const fitEval = evaluateFit(mapped);
  const artifact: Artifact = {
    mapped,
    raw: { source: 'atk_book', bookPath, start: block.start, end: block.end, yieldLine: block.yieldLine },
    fit: fitEval.fit,
  };
  if (fitEval.reason) {
    artifact.fitReason = fitEval.reason;
  }
  return artifact;
}

function main() {
  const args = process.argv.slice(2);
  const bookPathArg = args[0];
  const outDirArg = args[1];

  const bookPath = bookPathArg
    ? path.resolve(process.cwd(), bookPathArg)
    : path.resolve(process.cwd(), '.txt recipe files', "The Complete America's Test Kit - America's Test Kitchen.txt");

  const outDir = outDirArg
    ? path.resolve(process.cwd(), outDirArg)
    : path.resolve(process.cwd(), 'src', 'dev', 'imported', 'atk-book');

  if (!fs.existsSync(bookPath)) {
    console.error(`ATK book text not found at: ${bookPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const lines = fs.readFileSync(bookPath, 'utf-8').split(/\r?\n/);
  const blocks = detectBlocks(lines);
  console.log(`Detected ${blocks.length} candidate recipe blocks`);

  let fit = 0;
  let reject = 0;
  const summary: Array<{ id: string; name: string; fit: boolean; fitReason?: string }> = [];

  for (const block of blocks) {
    const artifact = buildRecipe(block, bookPath);
    const file = path.join(outDir, `${artifact.mapped.slug}.json`);
    fs.writeFileSync(file, JSON.stringify(artifact, null, 2), 'utf-8');

    if (artifact.fit) {
      fit += 1;
    } else {
      reject += 1;
    }

    const entry: { id: string; name: string; fit: boolean; fitReason?: string } = {
      id: artifact.mapped.id,
      name: artifact.mapped.name,
      fit: artifact.fit,
    };
    if (artifact.fitReason) {
      entry.fitReason = artifact.fitReason;
    }
    summary.push(entry);
  }

  fs.writeFileSync(path.join(outDir, '_summary.json'), JSON.stringify(summary, null, 2), 'utf-8');
  console.log(`Done. Fit: ${fit}, Rejected: ${reject}. Artifacts in ${outDir}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
