import { describe, it, expect } from 'vitest';
import { getBookAccompaniments, hasBookAccompaniments } from '../accompaniments';

describe('Book accompaniments map', () => {
  it('returns empty array when no pairing exists', () => {
    const result = getBookAccompaniments('r_nonexistent' as any);
    expect(result).toEqual([]);
    expect(hasBookAccompaniments('r_nonexistent' as any)).toBe(false);
  });

  it('returns curated accompaniments when present', () => {
    // Use a real ATK recipeId from BOOK_ACCOMPANIMENTS
    const realId = 'atk_beef-stroganoff';
    const result = getBookAccompaniments(realId as any);
    expect(result.length).toBeGreaterThan(0);
    expect(hasBookAccompaniments(realId as any)).toBe(true);
  });
});
