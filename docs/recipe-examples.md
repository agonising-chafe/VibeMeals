# VibeMeals Recipe Examples – Seed Catalog (v1)

**Status:** Ready for use in tests, fixtures, and catalog authoring  
**Last Updated:** December 7, 2025  
**Wired to:** `recipe-spec.md` (v1.0.0), `data-model.md` (Recipe shape)

> These examples exercise key edge cases: FAST chaos weeks, staple-heavy Quick Review, leftovers, and preflight/missed-preflight handling.

---

## Example A — FAST: Pantry Rescue Tomato Pasta (Chaos Backup)

Purpose: FAST band, pantry-first, many NON_CRITICAL staples for Quick Review. No preflight.

```ts
const pantryRescuePasta: Recipe = {
  id: 'r_pantry_rescue_pasta',
  name: 'Pantry Rescue Tomato Pasta',
  slug: 'pantry-rescue-pasta',
  metadata: {
    timeBand: 'FAST',
    estimatedMinutes: 20,
    equipmentTags: ['STOVETOP', 'ONE_POT'],
    leftoverStrategy: 'NONE',
  },
  ingredients: [
    { ingredientId: 'ing_dry_spaghetti', displayName: 'Dry spaghetti', amount: 12, unit: 'OZ', criticality: 'CRITICAL', kind: 'CARB', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_canned_tomato_sauce', displayName: 'Canned tomato sauce', amount: 15, unit: 'OZ', criticality: 'CRITICAL', kind: 'OTHER', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_garlic_powder', displayName: 'Garlic powder', amount: 1, unit: 'TSP', criticality: 'NON_CRITICAL', kind: 'SPICE', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_olive_oil', displayName: 'Olive oil', amount: 1, unit: 'TBSP', criticality: 'NON_CRITICAL', kind: 'FAT_OIL', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_salt', displayName: 'Salt', amount: 1, unit: 'TSP', criticality: 'NON_CRITICAL', kind: 'SPICE', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_parmesan', displayName: 'Grated Parmesan (for serving)', amount: 0.5, unit: 'CUP', criticality: 'NON_CRITICAL', kind: 'DAIRY', shoppingCategory: 'DAIRY_EGGS' },
  ],
  preflight: [],
  steps: [
    { stepNumber: 1, instruction: 'Boil salted water; cook spaghetti to al dente.', timerMinutes: 10 },
    { stepNumber: 2, instruction: 'Warm tomato sauce with garlic powder and olive oil.', timerMinutes: 5 },
    { stepNumber: 3, instruction: 'Toss pasta with sauce; season to taste.' },
  ],
  tags: ['fast', 'pasta', 'bowl', 'comfort_food'],
  variantHints: [
    { description: 'Add canned tuna or leftover chicken for extra protein.' },
    { description: 'Use any short pasta if spaghetti is unavailable.' },
  ],
};
```

**Exercises:**
- Shop S2/S3: critical carbs + sauce; staples surfaced for Quick Review.
- Shop S4: garlic powder, olive oil, salt, Parmesan are candidates; spaghetti/sauce never offered to drop.
- Today T2/T4: no preflight → READY if ingredients present.

---

## Example B — NORMAL: Weeknight Beef Tacos (Leftover-Friendly)

Purpose: NORMAL band, clear CRITICAL vs NON_CRITICAL split, leftover-friendly.

```ts
const beefTacoNight: Recipe = {
  id: 'r_beef_taco_night',
  name: 'Weeknight Beef Tacos',
  slug: 'weeknight-beef-tacos',
  metadata: {
    timeBand: 'NORMAL',
    estimatedMinutes: 35,
    equipmentTags: ['STOVETOP'],
    leftoverStrategy: 'EXPECTED',
  },
  ingredients: [
    { ingredientId: 'ing_ground_beef', displayName: 'Ground beef', amount: 1, unit: 'LB', criticality: 'CRITICAL', kind: 'PROTEIN', shoppingCategory: 'MEAT_SEAFOOD' },
    { ingredientId: 'ing_taco_shells', displayName: 'Hard taco shells', amount: 12, unit: 'UNIT', criticality: 'CRITICAL', kind: 'CARB', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_taco_seasoning', displayName: 'Taco seasoning packet', amount: 1, unit: 'UNIT', criticality: 'CRITICAL', kind: 'SPICE', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_shredded_lettuce', displayName: 'Shredded lettuce', amount: 4, unit: 'OZ', criticality: 'NON_CRITICAL', kind: 'VEG', shoppingCategory: 'PRODUCE' },
    { ingredientId: 'ing_shredded_cheddar', displayName: 'Shredded cheddar cheese', amount: 1, unit: 'CUP', criticality: 'NON_CRITICAL', kind: 'DAIRY', shoppingCategory: 'DAIRY_EGGS' },
    { ingredientId: 'ing_salsa', displayName: 'Salsa', amount: 0.5, unit: 'CUP', criticality: 'NON_CRITICAL', kind: 'CONDIMENT', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_sour_cream', displayName: 'Sour cream', amount: 0.5, unit: 'CUP', criticality: 'NON_CRITICAL', kind: 'DAIRY', shoppingCategory: 'DAIRY_EGGS' },
  ],
  preflight: [],
  steps: [
    { stepNumber: 1, instruction: 'Brown ground beef; drain if needed.', timerMinutes: 8 },
    { stepNumber: 2, instruction: 'Stir in taco seasoning with splash of water; simmer.', timerMinutes: 5 },
    { stepNumber: 3, instruction: 'Warm taco shells briefly in oven or skillet.' },
    { stepNumber: 4, instruction: 'Assemble tacos with toppings.' },
  ],
  tags: ['kid_friendly', 'taco_format', 'tex_mex'],
  variantHints: [
    { description: 'Swap ground beef for ground turkey.', safeSubIngredientId: 'ing_ground_turkey' },
    { description: 'Serve components separately for picky eaters.' },
  ],
};
```

**Exercises:**
- Leftovers: EXPECTED signals reuse options for bowls/nachos.
- S7: strong `kind` + `shoppingCategory` for grouping.
- Quick Review: beef/shells/seasoning protected; salsa/sour cream can be optional.

---

## Example C — NORMAL: Marinated Chicken Rice Bowls (Preflight: MARINATE)

Purpose: MARINATE preflight with `hoursBeforeCook = 0.5` to trigger Today missed-preflight logic if not done.

```ts
const marinatedChickenBowls: Recipe = {
  id: 'r_marinated_chicken_rice_bowls',
  name: 'Marinated Chicken Rice Bowls',
  slug: 'marinated-chicken-rice-bowls',
  metadata: {
    timeBand: 'NORMAL',
    estimatedMinutes: 40, // cook window; marinade tracked in preflight
    equipmentTags: ['STOVETOP'],
    leftoverStrategy: 'EXPECTED',
  },
  ingredients: [
    { ingredientId: 'ing_chicken_thighs', displayName: 'Boneless skinless chicken thighs', amount: 1.25, unit: 'LB', criticality: 'CRITICAL', kind: 'PROTEIN', shoppingCategory: 'MEAT_SEAFOOD' },
    { ingredientId: 'ing_rice', displayName: 'White rice (uncooked)', amount: 1.5, unit: 'CUP', criticality: 'CRITICAL', kind: 'CARB', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_broccoli_florets', displayName: 'Broccoli florets', amount: 12, unit: 'OZ', criticality: 'CRITICAL', kind: 'VEG', shoppingCategory: 'PRODUCE' },
    { ingredientId: 'ing_soy_sauce', displayName: 'Soy sauce', amount: 0.25, unit: 'CUP', criticality: 'NON_CRITICAL', kind: 'CONDIMENT', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_olive_oil', displayName: 'Olive oil', amount: 2, unit: 'TBSP', criticality: 'NON_CRITICAL', kind: 'FAT_OIL', shoppingCategory: 'PANTRY_DRY' },
    { ingredientId: 'ing_garlic_powder', displayName: 'Garlic powder', amount: 1, unit: 'TSP', criticality: 'NON_CRITICAL', kind: 'SPICE', shoppingCategory: 'PANTRY_DRY' },
  ],
  preflight: [
    { type: 'MARINATE', description: 'Marinate chicken at least 30 minutes before cooking.', hoursBeforeCook: 0.5 },
  ],
  steps: [
    { stepNumber: 1, instruction: 'Marinate chicken thighs with soy, oil, garlic powder.', timerMinutes: 30 },
    { stepNumber: 2, instruction: 'Cook rice according to package.', timerMinutes: 18 },
    { stepNumber: 3, instruction: 'Sauté marinated chicken until cooked through.', timerMinutes: 10 },
    { stepNumber: 4, instruction: 'Steam or sauté broccoli until tender-crisp.', timerMinutes: 6 },
    { stepNumber: 5, instruction: 'Assemble bowls with rice, chicken, broccoli, sauce.' },
  ],
  tags: ['bowl', 'asian_inspired', 'kid_friendly'],
  variantHints: [
    { description: 'Swap chicken thighs for tofu for a vegetarian version.', safeSubIngredientId: 'ing_firm_tofu' },
    { description: 'Use frozen broccoli instead of fresh; cook from frozen.' },
  ],
};
```

**Exercises:**
- Today T2/T4: if marinade not started by cook time → `MISSED_PREFLIGHT`; else READY.
- Shop S4: rice/chicken/broccoli protected; soy/oil/garlic powder can be Quick Review candidates.

---

## How to Use These

- **Docs:** Link from `recipe-spec.md` as additional examples.
- **Seed fixtures:** Drop into `src/domain/fixtures/recipes.seed.ts` with the two examples already in `recipe-spec.md`.
- **Tests:** Use to validate `buildShoppingList(...)` (critical vs optional) and `computeTonightState(...)` (marinade missed vs done).
