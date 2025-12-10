import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { mapSpoonacularToRecipe } from '../../integrations/spoonacular';

function loadJSON(relPath: string) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '__fixtures__', relPath), 'utf-8'));
}

describe('Spoonacular mapping', () => {
  it('maps sample Spoonacular response to our Recipe shape', () => {
    const raw = loadJSON('spoonacular-716429.raw.json');
    const expected = loadJSON('spoonacular-716429.mapped.json').mapped;

    const mapped = mapSpoonacularToRecipe(raw as any);

    // Compare key structural fields rather than object identity (avoid small formatting diffs)
    expect(mapped.id).toBe(expected.id);
    expect(mapped.name).toBe(expected.name);
    expect(mapped.slug).toBe(expected.slug);
    expect(mapped.metadata.timeBand).toBe(expected.metadata.timeBand);
    expect(mapped.metadata.estimatedMinutes).toBe(expected.metadata.estimatedMinutes);
    expect(mapped.ingredients.length).toBe(expected.ingredients.length);

    // Check ingredient displayNames and kinds
    for (let i = 0; i < expected.ingredients.length; i++) {
      expect(mapped.ingredients[i].displayName).toBe(expected.ingredients[i].displayName);
      expect(mapped.ingredients[i].kind).toBe(expected.ingredients[i].kind);
      expect(mapped.ingredients[i].shoppingCategory).toBe(expected.ingredients[i].shoppingCategory);
    }

    // Steps
    expect(mapped.steps.map(s => s.instruction)).toEqual(expected.steps.map((s: any) => s.instruction));

    // Tags and equipment
    expect(mapped.tags).toEqual(expected.tags);
    expect(mapped.metadata.equipmentTags).toEqual(expected.metadata.equipmentTags);

    // Provenance
    expect(mapped.provenance?.provider).toBe('spoonacular');
    expect(mapped.provenance?.id).toBe(String(raw.id));
  });
});
