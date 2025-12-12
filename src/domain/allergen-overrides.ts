// Deterministic allergen overrides for noisy ingredient names/IDs.
// Keys are lowercase substrings to match against ingredientId or displayName.
// Use sparingly: only high-risk allergens where false negatives are not acceptable.
import { Allergen } from './types';

export const allergenOverrides: Record<string, Allergen[]> = {
  'pesto': ['TREE_NUT'], // pine nuts
  'pine nut': ['TREE_NUT'],
  'pine-nut': ['TREE_NUT'],
  'fish sauce': ['FISH'],
  'anchovy': ['FISH'],
  'anchovies': ['FISH'],
  'nutella': ['TREE_NUT', 'DAIRY'],
  'hazelnut spread': ['TREE_NUT', 'DAIRY'],
  'almond extract': ['TREE_NUT'],
  'walnut oil': ['TREE_NUT'],
  'tahini': ['SESAME'],
};
