#!/usr/bin/env node
/**
 * scripts/spoonacular-workflow.ts
 * Unified CLI for Spoonacular recipe fetch → promote workflow
 *
 * CRITICAL SAFETY RULES:
 * - --promote requires explicit --dry-run first or a confirmation prompt
 * - canonicalizeIngredients never mutates the original artifact
 * - All promoted recipes validated against Recipe schema at runtime
 * - Identifier collisions detected before write
 *
 * Usage:
 *   npx tsx scripts/spoonacular-workflow.ts fetch <id1> [id2] ... [--promote] [--yes]
 *   npx tsx scripts/spoonacular-workflow.ts promote [--batch] [dir] [--dry-run] [--yes]
 *   npx tsx scripts/spoonacular-workflow.ts info <id>
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Project, SyntaxKind } from 'ts-morph';
import { mapSpoonacularToRecipe, MappedRecipe, fetchRecipeById } from '../src/integrations/spoonacular';
import type { Recipe } from '../src/domain/types';

const IMPORTED_DIR = path.resolve(process.cwd(), 'src', 'dev', 'imported');
const RECIPES_DIR = path.resolve(process.cwd(), 'src', 'domain', 'recipes');
const SEED_PATH = path.resolve(process.cwd(), 'src', 'domain', 'fixtures', 'recipes.seed.ts');

// Ensure directories exist
[IMPORTED_DIR, RECIPES_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ============================================================================
// VALIDATION & SAFETY
// ============================================================================

/**
 * Validate that a recipe satisfies the Recipe interface at runtime
 * Catches mapper regressions early instead of at app startup
 */
function validateRecipe(obj: any): obj is Recipe {
  if (!obj || typeof obj !== 'object') return false;
  if (typeof obj.id !== 'string' || !obj.id) return false;
  if (typeof obj.name !== 'string' || !obj.name) return false;
  if (typeof obj.slug !== 'string' || !obj.slug) return false;
  if (!obj.metadata || typeof obj.metadata !== 'object') return false;
  if (!Array.isArray(obj.ingredients)) return false;
  if (!Array.isArray(obj.preflight)) return false;
  if (!Array.isArray(obj.steps)) return false;

  // Check critical fields on ingredients
  for (const ing of obj.ingredients) {
    if (typeof ing.ingredientId !== 'string') return false;
    if (typeof ing.displayName !== 'string') return false;
    if (typeof ing.amount !== 'number' || isNaN(ing.amount)) return false;
    if (!['UNIT', 'GRAM', 'KG', 'OZ', 'LB', 'CUP', 'TBSP', 'TSP', 'ML'].includes(ing.unit)) return false;
    if (!['CRITICAL', 'NON_CRITICAL'].includes(ing.criticality)) return false;
  }

  return true;
}

/**
 * Detect identifier collisions (e.g., chicken-parmesan vs chickenParmesan both → chickenParmesan)
 */
function checkIdentifierCollision(newIdentifier: string, existingIdentifiers: Set<string>) {
  if (existingIdentifiers.has(newIdentifier)) {
    throw new Error(`❌ Identifier collision: '${newIdentifier}' already exists in seed`);
  }
}

/**
 * Prompt user for confirmation (can be skipped with --yes flag)
 */
async function confirmAction(message: string, autoYes: boolean): Promise<boolean> {
  if (autoYes) return true;

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(`\n⚠️  ${message} (y/n) `, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

// ============================================================================
// FETCH: Retrieve recipes from Spoonacular API and save as dev artifacts
// ============================================================================

async function fetchRecipes(ids: number[], autoPromote = false, autoYes = false) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    console.error('❌ SPOONACULAR_API_KEY not set');
    process.exit(1);
  }

  // Safety: --promote without --dry-run is dangerous
  if (autoPromote) {
    const warning = `This will fetch recipes and IMMEDIATELY promote them to canonical files + update seed.ts. Continue?`;
    const confirmed = await confirmAction(warning, autoYes);
    if (!confirmed) {
      console.log('Cancelled.');
      process.exit(0);
    }
  }

  console.log(`📥 Fetching ${ids.length} recipes from Spoonacular...`);
  let fetched = 0;
  let failed = 0;

  for (const id of ids) {
    try {
      const raw = await fetchRecipeById(id, apiKey);
      const mapped = mapSpoonacularToRecipe(raw);

      // Validate before saving
      if (!validateRecipe(mapped)) {
        throw new Error('Mapped recipe failed validation');
      }

      const slug = mapped.slug || `spoon_${id}`;
      const outPath = path.join(IMPORTED_DIR, `${slug}.json`);
      const artifact = { mapped, raw };

      fs.writeFileSync(outPath, JSON.stringify(artifact, null, 2), 'utf-8');
      console.log(`✅ ${id} → ${slug}`);
      fetched++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ ${id} failed: ${msg}`);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${fetched} fetched, ${failed} failed`);

  if (autoPromote && fetched > 0) {
    console.log('\n🚀 Auto-promoting fetched recipes...\n');
    await promoteRecipes(IMPORTED_DIR, false, false, autoYes);
  }
}

// ============================================================================
// PROMOTE: Convert dev artifacts to canonical .ts files and update seed
// ============================================================================

/**
 * Deep clone to avoid mutating the original artifact
 */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Canonicalize a cloned recipe (never mutates the original)
 */
function canonicalizeIngredients(recipeObj: any) {
  if (!Array.isArray(recipeObj.ingredients)) return;

  const unitMap: Array<[RegExp, string]> = [
    [/^tbsp|tablespoon|tablespoons$/i, 'TBSP'],
    [/^tsp|teaspoon|teaspoons$/i, 'TSP'],
    [/^cup|cups$/i, 'CUP'],
    [/^oz|ounce|ounces$/i, 'OZ'],
    [/^g|gram|grams$/i, 'GRAM'],
    [/^kg|kilogram|kilograms$/i, 'KG'],
    [/^lb|pound|pounds$/i, 'LB'],
    [/^ml|milliliter|milliliters$/i, 'ML'],
    [/^clove|cloves$/i, 'UNIT'],
    [/^can|cans$/i, 'UNIT'],
    [/^large$/i, 'UNIT'],
    [/^dash|dashes$/i, 'TSP'],
  ];

  function slugify(s: string) {
    return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function inferPackageMetadata(ing: any) {
    const name = String(ing.displayName || '');

    // Pattern: "2 (15-oz) cans", "2 (15 oz) cans"
    let m =
      name.match(/(\d+)\s*\(\s*(\d+(?:\.\d+)?)\s*[- ]?(oz|ounce|ounces|ml|milliliter|milliliters|g|gram|grams)\s*\)\s*cans?/i) ||
      // Pattern: "2 cans (15 oz)", "1 can (28-ounce)"
      name.match(/(\d+)\s*cans?\s*\(\s*(\d+(?:\.\d+)?)\s*[- ]?(oz|ounce|ounces|ml|milliliter|milliliters|g|gram|grams)\s*\)/i) ||
      // Pattern: "1 (28-ounce) can"
      name.match(/(\d+)\s*\(\s*(\d+(?:\.\d+)?)\s*[- ]?(oz|ounce|ounces|ml|milliliter|milliliters|g|gram|grams)\s*\)\s*can\b/i);

    let packages: number | undefined;
    let pkgAmount: number | undefined;
    let unitSrc: string | undefined;

    if (m) {
      packages = Number(m[1]);
      pkgAmount = Number(m[2]);
      unitSrc = m[3];
    } else {
      // Fallback: "3 cans" with no explicit size
      const mCount = name.match(/(\d+)\s*cans?\b/i);
      if (mCount) {
        packages = Number(mCount[1]);
      }
    }

    if (!packages) return;

    let pkgUnit: 'OZ' | 'ML' | 'GRAM' | 'UNIT' = 'UNIT';
    if (unitSrc) {
      const u = unitSrc.toLowerCase();
      if (u.startsWith('oz') || u.startsWith('ounce')) pkgUnit = 'OZ';
      else if (u === 'g' || u.startsWith('gram')) pkgUnit = 'GRAM';
      else if (u.startsWith('ml') || u.startsWith('milliliter')) pkgUnit = 'ML';
    }

    ing.packages = packages;
    if (pkgAmount && pkgUnit !== 'UNIT') {
      ing.packageSize = { amount: pkgAmount, unit: pkgUnit };
    }
  }

  for (const ing of recipeObj.ingredients) {
    // qty → amount
    if (ing.qty !== undefined && ing.amount === undefined) {
      ing.amount = Number(ing.qty);
      delete ing.qty;
    }

    // Ensure numeric amount
    if (ing.amount === undefined || Number.isNaN(Number(ing.amount))) {
      const m = String(ing.displayName || '').match(/^(\d+(?:\.\d+)?)/);
      ing.amount = m ? Number(m[1]) : 1;
    }

    // Normalize unit
    const rawUnit = String(ing.unit || '').trim();
    let found = false;
    for (const [rx, code] of unitMap) {
      if (rx.test(rawUnit)) {
        ing.unit = code;
        found = true;
        break;
      }
    }
    if (!found) {
      ing.unit = rawUnit ? rawUnit.toUpperCase() : 'UNIT';
    }

    // Infer package metadata (e.g., "2 (15 oz) cans")
    inferPackageMetadata(ing);

    // Ensure ingredientId
    if (!ing.ingredientId) {
      const dn = String(ing.displayName || '')
        .replace(/^[^a-zA-Z0-9]+/, '')
        .replace(/\(.*\)/, '')
        .replace(/^\d+\s*/, '');
      ing.ingredientId = slugify(dn.split(/,| and | with | - /)[0]);
    }

    // Ensure criticality
    if (!ing.criticality) ing.criticality = 'CRITICAL';
  }
}

/**
 * Strip non-schema fields and log warnings for future-hostile removals
 */
function stripNonSchemaFields(recipeObj: any): { removed: string[]; warnings: string[] } {
  const removed: string[] = [];
  const warnings: string[] = [];

  // Explicit allowlist of known non-schema fields that SHOULD be removed
  const knownRemovable = ['provenance', 'raw', 'servings', 'sourceUrl', 'estimatedCostUsd'];

  for (const field of knownRemovable) {
    const key = field as keyof any;
    if ((recipeObj as any)[key] !== undefined) {
      delete (recipeObj as any)[key];
      removed.push(field);
    }
  }

  // Warn if unknown fields detected
  const allowed = [
    'id',
    'name',
    'slug',
    'metadata',
    'scalable',
    'ingredients',
    'preflight',
    'steps',
    'tags',
    'variantHints',
    'recipeAllergens',
  ];
  for (const key of Object.keys(recipeObj)) {
    if (!allowed.includes(key) && !knownRemovable.includes(key)) {
      warnings.push(`⚠️  Unexpected field '${key}' present (not removed, may cause type error)`);
    }
  }

  return { removed, warnings };
}

function toIdentifier(slug: string) {
  return slug
    .split('-')
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

function generateRecipeTs(identifier: string, recipeObj: any): string {
  function isIdentifier(key: string) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
  }

  function escString(s: string) {
    return String(s)
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$')
      .replace(/"/g, '\\"');
  }

  function tsLiteral(v: any, indent = 0): string {
    const pad = '  '.repeat(indent);
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    if (typeof v === 'string') return `"${escString(v)}"`;
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (Array.isArray(v)) {
      if (v.length === 0) return '[]';
      const items = v.map(i => tsLiteral(i, indent + 1)).join(',\n');
      return `[\n${'  '.repeat(indent + 1)}${items.replace(/\n/g, '\n' + '  '.repeat(indent + 1))}\n${pad}]`;
    }
    if (typeof v === 'object') {
      const keys = Object.keys(v);
      if (keys.length === 0) return '{}';
      const parts = keys.map(k => {
        const key = isIdentifier(k) ? k : `"${String(k).replace(/"/g, '\\"')}"`;
        return `${pad}  ${key}: ${tsLiteral(v[k], indent + 1)}`;
      });
      return `{\n${parts.join(',\n')}\n${pad}}`;
    }
    return 'null';
  }

  const now = new Date().toISOString();
  const tsObj = tsLiteral(recipeObj, 0);
  return `// Generated by scripts/spoonacular-workflow.ts on ${now}
// Source: promoted from src/dev/imported (provenance preserved there)
// ⚠️  This is a canonical recipe file. Edit manually or regenerate with workflow.

import { Recipe } from '../types';

export const ${identifier} = ${tsObj} satisfies Recipe;
`;
}

function updateSeedWithAst(identifier: string, slug: string, timeBand: string, dryRun: boolean) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(SEED_PATH);

  // Add import if not already present (match exact module + identifier)
  const importExists = sourceFile
    .getImportDeclarations()
    .some(imp =>
      imp.getModuleSpecifier().getLiteralValue() === `../recipes/${slug}` &&
      imp.getNamedImports().some(n => n.getName() === identifier),
    );

  if (!importExists) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: `../recipes/${slug}`,
      namedImports: [identifier],
    });
  }

  // Find the mvpRecipeCatalog array and add entry if not present
  const arrayVar = sourceFile
    .getVariableDeclarations()
    .find(v => v.getName() === 'mvpRecipeCatalog');

  if (arrayVar && arrayVar.getInitializer()?.getKind() === SyntaxKind.ArrayLiteralExpression) {
    const arrayLiteral = arrayVar.getInitializer() as any;
    const elements = arrayLiteral.getElements();
    const elementTexts = elements.map((e: any) => e.getText());

    if (!elementTexts.includes(identifier)) {
      // Find the correct section by looking for comment nodes
      let insertIndex = elements.length;
      const sectionComment = `// ${timeBand}`;

      for (let i = 0; i < elements.length; i++) {
        const node = elements[i];
        const fullText = node.getFullText();

        if (fullText.includes(sectionComment)) {
          insertIndex = i;
          break;
        }
      }

      if (!dryRun) {
        arrayLiteral.insertElement(insertIndex, identifier);
      }
    }
  }

  if (!dryRun) {
    sourceFile.saveSync();
    console.log(`✅ Updated seed: ${identifier} in ${timeBand}`);
  } else {
    console.log(`📋 [DRY-RUN] Would update seed: ${identifier} in ${timeBand}`);
  }
}

async function promoteRecipes(
  dirPath: string,
  dryRun = false,
  skipValidation = false,
  _autoYes = false,
  overwriteExisting = false,
) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    console.error(`❌ Directory not found: ${dirPath}`);
    process.exit(1);
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
  if (files.length === 0) {
    console.log('ℹ️  No JSON files to promote');
    return;
  }

  console.log(`🔄 Promoting ${files.length} recipes${dryRun ? ' [DRY-RUN]' : ''}...`);

  // Pre-scan for identifier collisions
  const existingIdentifiers = new Set<string>();
  const recipesDir = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.ts'));
  for (const recipeFile of recipesDir) {
    const basename = path.basename(recipeFile, '.ts');
    const id = toIdentifier(basename);
    existingIdentifiers.add(id);
  }

  let promoted = 0;
  let failed = 0;

  for (const f of files) {
    try {
      const fullPath = path.join(dirPath, f);
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      const mappedOriginal: MappedRecipe = data.mapped || data;

      // CRITICAL: Clone before any mutations
      const mapped = deepClone(mappedOriginal);

      // Strip non-schema fields and log warnings
      const { removed, warnings } = stripNonSchemaFields(mapped);

      // Canonicalize on the clone only
      canonicalizeIngredients(mapped);

      // Validate the final shape
      if (!skipValidation && !validateRecipe(mapped)) {
        throw new Error('Final recipe failed validation (missing required fields or type mismatches)');
      }

      // Check for identifier collision
      const slug =
        mapped.slug ||
        (mapped.name ? String(mapped.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : path.basename(fullPath, '.json'));

      const identifier = toIdentifier(slug);
      const existsAlready = existingIdentifiers.has(identifier);
      if (!overwriteExisting) {
        checkIdentifierCollision(identifier, existingIdentifiers);
      }
      // Track to prevent dupes within this run
      existingIdentifiers.add(identifier);

      // Generate and write
      const outPath = path.join(RECIPES_DIR, `${slug}.ts`);
      const content = generateRecipeTs(identifier, mapped);

      if (dryRun) {
        console.log(
          `?? [DRY-RUN] Would ${existsAlready && overwriteExisting ? 'overwrite' : 'write'}: ${outPath}`,
        );
        if (removed.length > 0) console.log(`   Removed fields: ${removed.join(', ')}`);
        if (warnings.length > 0) warnings.forEach(w => console.log(`   ${w}`));
      } else {
        fs.writeFileSync(outPath, content, 'utf-8');
        console.log(`${existsAlready && overwriteExisting ? '♻️' : '?'} ${slug}`);
        if (removed.length > 0) console.log(`   Removed: ${removed.join(', ')}`);
        if (warnings.length > 0) warnings.forEach(w => console.log(`   ${w}`));

        // Update seed using AST
        const timeBand = (mapped.metadata?.timeBand as string) || 'NORMAL';
        updateSeedWithAst(identifier, slug, timeBand, false);
        promoted++;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ ${f}: ${msg}`);
      failed++;
    }
  }

  if (dryRun) {
    console.log(`\n📋 [DRY-RUN] Would promote ${promoted} recipes, ${failed} failed`);
    console.log('Run again without --dry-run to actually write files');
  } else {
    console.log(`\n📊 Results: ${promoted} promoted, ${failed} failed`);
  }
}

// ============================================================================
// INFO: Show details about a recipe
// ============================================================================

function showInfo(id: number) {
  const candidates = fs.readdirSync(IMPORTED_DIR).filter(f => f.includes(`spoon_${id}`));
  if (candidates.length === 0) {
    console.log(`ℹ️  No artifacts found for id ${id}`);
    return;
  }

  for (const cand of candidates) {
    const fullPath = path.join(IMPORTED_DIR, cand);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    const mapped = data.mapped || data;
    console.log(`\n📖 ${mapped.name} (${mapped.slug})`);
    console.log(`   Time Band: ${mapped.metadata?.timeBand || 'N/A'}`);
    console.log(`   Est. Minutes: ${mapped.metadata?.estimatedMinutes || 'N/A'}`);
    console.log(`   Ingredients: ${mapped.ingredients?.length || 0}`);
    console.log(`   Tags: ${(mapped.tags || []).join(', ')}`);
    console.log(`   Has Provenance: ${mapped.provenance ? 'Yes' : 'No'}`);
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📚 Spoonacular Workflow CLI

SAFETY FIRST:
- fetch --promote requires confirmation (or use --yes)
- promote --dry-run shows changes without writing
- All recipes validated at runtime before promotion
- Identifier collisions detected before seed update
- Original artifacts never mutated (full audit trail preserved)

Usage:
  npx tsx scripts/spoonacular-workflow.ts fetch <id1> [id2] ... [--promote] [--yes]
    Fetch recipes and save as dev artifacts
    --promote: Auto-promote after fetching
    --yes: Skip confirmation prompts

  npx tsx scripts/spoonacular-workflow.ts promote [--batch] [dir] [--dry-run] [--yes] [--overwrite]
    Promote dev artifacts to canonical .ts files
    --batch: Process all JSON files in dir (default: src/dev/imported)
    --dry-run: Preview changes without writing
    --yes: Skip confirmation prompts
    --overwrite: Replace existing recipes/seed entries if identifiers collide

  npx tsx scripts/spoonacular-workflow.ts info <id>
    Show details about a fetched recipe

Examples:
  npx tsx scripts/spoonacular-workflow.ts fetch 654959 649495 --promote --yes
  npx tsx scripts/spoonacular-workflow.ts promote --batch src/dev/imported --dry-run
  npx tsx scripts/spoonacular-workflow.ts promote --batch src/dev/imported --yes
  npx tsx scripts/spoonacular-workflow.ts info 654959
`);
    process.exit(0);
  }

  const command = args[0];

  try {
    if (command === 'fetch') {
      const ids = args.slice(1).filter(a => !a.startsWith('--')).map(Number);
      const autoPromote = args.includes('--promote');
      const autoYes = args.includes('--yes');
      if (ids.length === 0) {
        console.error('❌ No recipe IDs provided');
        process.exit(1);
      }
      await fetchRecipes(ids, autoPromote, autoYes);
    } else if (command === 'promote') {
      const batchMode = args.includes('--batch');
      const dryRun = args.includes('--dry-run');
      const autoYes = args.includes('--yes');
      const overwrite = args.includes('--overwrite');
      const dirArg = args.find(a => !a.startsWith('--') && a !== 'promote') || IMPORTED_DIR;
      const dir = batchMode || args[1] === '--batch' ? dirArg : IMPORTED_DIR;
      await promoteRecipes(dir, dryRun, false, autoYes, overwrite);
    } else if (command === 'info') {
      const id = Number(args[1]);
      if (isNaN(id)) {
        console.error('❌ Invalid recipe ID');
        process.exit(1);
      }
      showInfo(id);
    } else {
      console.error(`❌ Unknown command: ${command}`);
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
