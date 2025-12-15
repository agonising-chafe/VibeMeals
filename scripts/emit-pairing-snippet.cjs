const fs = require('fs');
const path = require('path');
const data = require(path.join(__dirname, '..', 'reports', 'atk-pairing-map-gemini-merged.json'));
const map = data.map;
const entries = Object.entries(map)
  .map(([main, list]) => ({ main, list }))
  .sort((a, b) => a.main.localeCompare(b.main));

const lines = [];
lines.push('// AUTO-GENERATED FROM reports/atk-pairing-map-gemini-merged.json (confidence >= 0.8)');
lines.push('const BOOK_ACCOMPANIMENTS: Readonly<Record<RecipeId, readonly { kind: MealComponentKind; recipeId: RecipeId }[]>> = Object.freeze({');
for (const entry of entries) {
  lines.push(`  '${entry.main}': [`);
  for (const item of entry.list) {
    lines.push(`    { kind: '${item.kind}' as MealComponentKind, recipeId: '${item.recipeId}' as RecipeId },`);
  }
  lines.push('  ],');
}
lines.push('});');
fs.writeFileSync('reports/atk-pairing-map-gemini-ts-snippet.txt', lines.join('\n'));
