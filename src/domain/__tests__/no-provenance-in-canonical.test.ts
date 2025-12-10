import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

test('canonical recipe files must not contain provenance field', () => {
  const recipeDir = join(__dirname, '..', 'recipes');
  const files = readdirSync(recipeDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const content = readFileSync(join(recipeDir, file), 'utf-8');
    expect(content).not.toContain('provenance:');
    expect(content).not.toContain('"provider":');
  }
});
