#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import { allergenOverrides } from '../src/domain/allergen-overrides';

const RECIPES_DIR = path.resolve(process.cwd(), 'src', 'domain', 'recipes');

// High-risk allergens we care about for correctness
const HIGH_RISK: Record<string, RegExp> = {
  TREE_NUT: /(almond|walnut|pecan|cashew|hazelnut|pistachio|macadamia|pine nut|brazil nut|\b(?!pea)nuts?\b)/i,
  PEANUT: /\bpeanuts?\b/i,
  SHELLFISH: /(shrimp|prawn|lobster|crab|scallop|mussel|oyster|clam)/i,
  FISH: /(salmon|tuna|cod|halibut|tilapia|trout|snapper|anchovy|sardine|fish sauce)/i,
  WHEAT: /(wheat|semolina|farina|spelt|durum)/i,
};

function auditRecipe(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  // Only scan ingredient names/ids, not the entire file/steps/narrative.
  const ingredientNames: string[] = [];
  const displayNameRegex = /displayName:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = displayNameRegex.exec(raw)) !== null) {
    ingredientNames.push(m[1]);
  }

  // Quick exit if no ingredients found (shouldn't happen for canonical files)
  if (ingredientNames.length === 0) return;

  // Collect any explicit allergen tags present in the file
  const taggedAllergens = new Set<string>();
  const allergenRegex = /["'](TREE_NUT|PEANUT|SHELLFISH|FISH|WHEAT)["']/g;
  while ((m = allergenRegex.exec(raw)) !== null) {
    taggedAllergens.add(m[1]);
  }

  const missing: string[] = [];

  for (const [allergen, regex] of Object.entries(HIGH_RISK)) {
    const hasWord = ingredientNames.some(name => {
      // Ignore false positives for corn-based "nuts"
      if (allergen === 'TREE_NUT' && /corn nuts/i.test(name)) return false;
      return regex.test(name);
    });
    const hasOverride = ingredientNames.some(name => {
      const lower = name.toLowerCase();
      return Object.entries(allergenOverrides).some(
        ([needle, tags]) => tags.includes(allergen as any) && lower.includes(needle),
      );
    });
    const tagged = taggedAllergens.has(allergen);
    if ((hasWord || hasOverride) && !tagged) {
      missing.push(allergen);
    }
  }

  if (missing.length > 0) {
    const rel = path.relative(process.cwd(), filePath);
    console.log(`${rel} :: missing tags: ${missing.join(', ')}`);
  }
}

function main() {
  if (!fs.existsSync(RECIPES_DIR)) {
    console.error(`Recipes directory not found: ${RECIPES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.ts'));
  files.forEach(f => auditRecipe(path.join(RECIPES_DIR, f)));
}

main();
