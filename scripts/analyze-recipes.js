import fs from 'fs';
import path from 'path';
const recipesDir = 'src/domain/recipes';
const files = fs.readdirSync(recipesDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .sort();
const recipes = [];
files.forEach(file => {
    const content = fs.readFileSync(path.join(recipesDir, file), 'utf-8');
    // Extract name
    const nameMatch = content.match(/"name":\s*"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : 'Unknown';
    // Extract timeBand
    const bandMatch = content.match(/"timeBand":\s*"([^"]+)"/);
    const timeBand = bandMatch ? bandMatch[1] : 'UNKNOWN';
    // Count ingredients
    const ingredientMatches = content.match(/"ingredientId":/g);
    const ingredients = ingredientMatches ? ingredientMatches.length : 0;
    // Extract preflight types
    const preflightMatches = content.match(/"type":\s*"([^"]+)"/g);
    const preflight = preflightMatches
        ? [...new Set(preflightMatches.map(m => m.match(/"type":\s*"([^"]+)"/)?.[1] || ''))]
        : [];
    // Extract tags
    const tagsMatch = content.match(/"tags":\s*\[([\s\S]*?)\]/);
    const tags = tagsMatch
        ? tagsMatch[1].match(/"([^"]+)"/g)?.map(t => t.replace(/"/g, '')) || []
        : [];
    // Extract equipment
    const equipMatch = content.match(/"equipmentTags":\s*\[([\s\S]*?)\]/);
    const equipment = equipMatch
        ? equipMatch[1].match(/"([^"]+)"/g)?.map(e => e.replace(/"/g, '')) || []
        : [];
    if (name !== 'Unknown' && timeBand !== 'UNKNOWN' && !name.includes('Page Not Found') && !name.includes('Error')) {
        recipes.push({ file: file.replace('.ts', ''), name, timeBand, ingredients, preflight, tags, equipment });
    }
});
// Print results
console.log('\n📊 RECIPE INVENTORY ANALYSIS\n');
console.log('═══════════════════════════════════════════════════════════════════\n');
// Group by time band
const byBand = { FAST: [], NORMAL: [], PROJECT: [] };
recipes.forEach(r => {
    if (byBand[r.timeBand]) {
        byBand[r.timeBand].push(r);
    }
});
Object.entries(byBand).forEach(([band, recs]) => {
    console.log(`${band} (${recs.length} recipes)`);
    console.log('─'.repeat(70));
    recs.forEach(r => {
        const preflightStr = r.preflight.length > 0 ? ` | Preflight: ${r.preflight.join(', ')}` : '';
        const equipStr = r.equipment.length > 0 ? ` | Equipment: ${r.equipment.join(', ')}` : '';
        console.log(`  • ${r.name} (${r.ingredients} ing)${preflightStr}${equipStr}`);
    });
    console.log('');
});
// Coverage analysis
console.log('═══════════════════════════════════════════════════════════════════\n');
console.log('COVERAGE ANALYSIS\n');
const allTags = recipes.flatMap(r => r.tags);
const uniqueTags = [...new Set(allTags)];
console.log(`Tags: ${uniqueTags.join(', ')}`);
const allEquipment = recipes.flatMap(r => r.equipment);
const uniqueEquipment = [...new Set(allEquipment)];
console.log(`Equipment: ${uniqueEquipment.join(', ')}`);
const allPreflight = recipes.flatMap(r => r.preflight);
const uniquePreflight = [...new Set(allPreflight)];
console.log(`Preflight: ${uniquePreflight.length > 0 ? uniquePreflight.join(', ') : 'None detected'}`);
console.log(`\nTotal: ${recipes.length} recipes (FAST: ${byBand.FAST.length}, NORMAL: ${byBand.NORMAL.length}, PROJECT: ${byBand.PROJECT.length})`);
console.log(`Avg ingredients: ${(recipes.reduce((sum, r) => sum + r.ingredients, 0) / recipes.length).toFixed(1)}`);
