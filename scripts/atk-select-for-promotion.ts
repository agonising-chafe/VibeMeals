#!/usr/bin/env node
/**
 * scripts/atk-select-for-promotion.ts
 *
 * Helper to select ATK enriched recipes that are good candidates
 * for promotion into the canonical catalog.
 *
 * Filter (conservative first pass):
 * - Uses src/dev/imported/atk-book-enriched/*.json
 * - Only fit === true
 * - Excludes obvious desserts by name/slug
 * - Excludes PROJECT timeBand by default (unless --include-project is passed)
 * - Classifies:
 *   - mains: FAST/NORMAL, has CRITICAL PROTEIN, baseServings >= 3
 *   - sides: FAST/NORMAL, no CRITICAL PROTEIN, but CRITICAL VEG/CARB
 *
 * Usage:
 *   npx tsx scripts/atk-select-for-promotion.ts
 *   npx tsx scripts/atk-select-for-promotion.ts ./src/dev/imported/atk-book-enriched-batch-main1
 *
 * When a directory argument is provided, all candidate JSON files
 * are copied into that directory for batch promotion.
 */

import fs from 'fs';
import path from 'path';
import type { Recipe } from '../src/domain/types';

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

const ENRICHED_DIR = path.resolve(
  process.cwd(),
  'src',
  'dev',
  'imported',
  'atk-book-enriched',
);

const dessertRegex =
  /(cake|cookie|brownie|cupcake|tart|pie|cobbler|crumble|pudding|ice[- ]cream|sundae|trifle|parfait|biscotti|macaroon|macaron|mousse|meringue|fool|strudel|custard|sorbet|granita|donut|doughnut)/i;

function isDessertLike(name: string, slug: string): boolean {
  return dessertRegex.test(name) || dessertRegex.test(slug);
}

function classifyRecipe(recipe: Recipe, includeProject: boolean) {
  const tb = recipe.metadata.timeBand;
  const baseServings = recipe.metadata.baseServings ?? 0;

  const ingredients = recipe.ingredients || [];
  const hasProteinMain = ingredients.some(
    (ing) => ing.kind === 'PROTEIN' && ing.criticality === 'CRITICAL',
  );
  const hasMainVegOrCarb = ingredients.some(
    (ing) =>
      (ing.kind === 'VEG' || ing.kind === 'CARB') &&
      ing.criticality === 'CRITICAL',
  );

  const timeIsEligible =
    tb === 'FAST' || tb === 'NORMAL' || (includeProject && tb === 'PROJECT');
  const isDessert = isDessertLike(recipe.name, recipe.slug);
  const isProject = tb === 'PROJECT';

  const isMainCandidate =
    !isDessert && timeIsEligible && hasProteinMain && baseServings >= 3;

  const isSideCandidate =
    !isDessert && timeIsEligible && !hasProteinMain && hasMainVegOrCarb;

  return {
    isDessert,
    isProject,
    hasProteinMain,
    hasMainVegOrCarb,
    isMainCandidate,
    isSideCandidate,
  };
}

function main() {
  if (!fs.existsSync(ENRICHED_DIR)) {
    console.error(`Enriched ATK directory not found: ${ENRICHED_DIR}`);
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const includeProject = args.includes('--include-project');
  const copyDirArg = args.find((a) => !a.startsWith('--'));
  const copyDir = copyDirArg
    ? path.resolve(process.cwd(), copyDirArg)
    : undefined;

  if (copyDir) {
    if (!fs.existsSync(copyDir)) {
      fs.mkdirSync(copyDir, { recursive: true });
    }
  }

  const files = fs
    .readdirSync(ENRICHED_DIR)
    .filter((f) => f.endsWith('.json') && f !== '_summary.json');

  let totalFit = 0;
  let desserts = 0;
  let projectCount = 0;

  const mains: { slug: string; name: string; timeBand: string }[] = [];
  const sides: { slug: string; name: string; timeBand: string }[] = [];

  for (const file of files) {
    const fullPath = path.join(ENRICHED_DIR, file);
    let artifact: AtkArtifact;
    try {
      artifact = JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as AtkArtifact;
    } catch (err) {
      console.error(
        `Failed to read/parse ${fullPath}:`,
        err instanceof Error ? err.message : String(err),
      );
      continue;
    }

    if (!artifact.fit) continue;
    totalFit++;

    const r = artifact.mapped;
    const c = classifyRecipe(r, includeProject);

    if (c.isDessert) {
      desserts++;
      continue;
    }
    if (c.isProject && !includeProject) {
      projectCount++;
      continue;
    }

    if (c.isMainCandidate) {
      mains.push({
        slug: r.slug,
        name: r.name,
        timeBand: r.metadata.timeBand,
      });
    } else if (c.isSideCandidate) {
      sides.push({
        slug: r.slug,
        name: r.name,
        timeBand: r.metadata.timeBand,
      });
    }
  }

  console.log(`Total fit enriched recipes: ${totalFit}`);
  console.log(`Excluded as desserts (by name/slug): ${desserts}`);
  console.log(`Excluded as PROJECT timeBand: ${projectCount}`);
  console.log('');
  console.log(`Main-dish candidates (FAST/NORMAL with protein): ${mains.length}`);
  console.log(`Side/starch/veg candidates (no protein, veg/carb main): ${sides.length}`);
  console.log('');

  const show = (label: string, arr: { slug: string; name: string; timeBand: string }[]) => {
    console.log(`=== ${label} (showing up to 25) ===`);
    arr.slice(0, 25).forEach((r) => {
      console.log(
        `- [${r.timeBand}] ${r.slug} :: ${r.name}`,
      );
    });
    console.log('');
  };

  show('MAINS', mains);
  show('SIDES', sides);

  if (copyDir) {
    console.log(`Copying ${mains.length + sides.length} candidates to: ${copyDir}`);
    const all = [...mains, ...sides];
    for (const r of all) {
      const src = path.join(ENRICHED_DIR, `${r.slug}.json`);
      const dest = path.join(copyDir, `${r.slug}.json`);
      if (!fs.existsSync(src)) {
        console.warn(`Source missing, skipping: ${src}`);
        continue;
      }
      fs.copyFileSync(src, dest);
    }
    console.log('Copy complete.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
