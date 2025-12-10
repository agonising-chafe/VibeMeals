# VibeMeals Recipe Specification – v1.1.0

**Status:** Implementation-Ready (Draft → Adopt)  
**Last Updated:** December 9, 2025 (Updated for v1.3.0 data model)  

#### Wired to

- `vision.md` (Golden Tests G1–G6)  

- `spec-planner.md`, `spec-today.md`, `spec-shop.md`, `spec-cooking.md`  

- `data-model.md` (`Recipe`, `RecipeIngredientRequirement`, `RecipePreflightRequirement`, `Recipe.steps`)

> **Purpose:** Define what a **VibeMeals-grade recipe** is as a logistics asset (not blog content). This spec is the contract for catalog work, AI generation, and manual authoring.

---

## 1. What a VibeMeals Recipe Must Do

A VibeMeals recipe is not just “ingredients + steps.” It must:

1. **Plan well** – Expose realistic time band and effort for week-shape logic.

1. **Shop safely** – Provide clear ingredient breakdown with critical vs non-critical flags.

1. **Make tonight viable** – Declare preflight needs so Today can say “you’re good” or “we need options.”

1. **Cook calmly** – Provide clear, parallelizable steps for Cooking Mode.

1. **Learn quietly** – Include tags/hooks so the system can learn tastes and suggest “same vibe” alternatives.

If a recipe doesn’t support these, it’s not a VibeMeals recipe yet.

---

## 2. Recipe Shape (Top-Level)

Matches `Recipe` in `data-model.md` (steps required in v1; can be simple).

```ts
interface Recipe {
  id: RecipeId;
  name: string;
  slug: string;

metadata: RecipeMetadata;
  ingredients: RecipeIngredientRequirement[];
  preflight: RecipePreflightRequirement[];

steps: RecipeStep[]; // see Section 6 (can start minimal)

// optional personalization hooks
  tags?: RecipeTag[];
  variantHints?: VariantHint[];
}
``` text

---

## 3. Planning Metadata (Planner-facing)

Planner chooses recipes without extra config. It uses `metadata`:

```ts
interface RecipeMetadata {
  timeBand: 'FAST' | 'NORMAL' | 'PROJECT';
  estimatedMinutes: number;            // realistic "time to table"
  equipmentTags?: EquipmentTag[];      // e.g. ['SHEET_PAN', 'SLOW_COOKER'], fully typed (v1.3.0+)
  leftoverStrategy?: 'NONE' | 'EXPECTED' | 'COOK_ONCE_EAT_TWICE';
}
``` text

### 3.1 Time Band Guidelines

- **FAST**: 15–30 minutes, minimal prep, few pans, safe for chaotic nights.

- **NORMAL**: 30–45 minutes, moderate prep, default weeknight.

- **PROJECT**: 45+ minutes or high coordination; reserve for calmer nights.

#### Musts
- `timeBand` must align with `estimatedMinutes` (no fake FAST).

- If a recipe regularly runs 45+ minutes for typical households, tag `NORMAL`→`PROJECT`, not FAST.

### 3.2 Leftover Strategy

`leftoverStrategy` is used for “cook once, eat twice” and chaos weeks.

- `NONE` – No meaningful leftovers expected.

- `EXPECTED` – Likely some extra (not guaranteed).

- `COOK_ONCE_EAT_TWICE` – Explicitly designed to feed a second meal.

#### Musts
- If designed to feed a second night, mark `COOK_ONCE_EAT_TWICE` and portion accordingly.

- Don’t mark leftover strategy unless quantities and structure support it.

---

## 4. Ingredient Metadata (Shop & Safety)

Matches `RecipeIngredientRequirement` in `data-model.md`:

```ts
interface RecipeIngredientRequirement {
  ingredientId: string;
  displayName: string;
  amount: number;
  unit: 'UNIT' | 'GRAM' | 'KG' | 'OZ' | 'LB' | 'CUP' | 'TBSP' | 'TSP' | 'ML';
  criticality: 'CRITICAL' | 'NON_CRITICAL';
  kind: 'PROTEIN' | 'CARB' | 'VEG' | 'DAIRY' | 'FAT_OIL' | 'SPICE' | 'CONDIMENT' | 'OTHER';
  shoppingCategory: 'PRODUCE' | 'MEAT_SEAFOOD' | 'DAIRY_EGGS' | 'PANTRY_DRY' | 'FROZEN' | 'OTHER';
}
``` text

### 4.1 Criticality Rules

**CRITICAL** ingredients:

- Main protein (chicken, ground beef, tofu, beans if main).

- Main carb (pasta, rice, tortillas, pizza crust).

- Primary veg that defines the dish (broccoli in sheet-pan chicken & broccoli).

- Core sauce base (tomato sauce in spaghetti, broth in soup).

**NON_CRITICAL** ingredients:

- Garnishes: cilantro, scallions, sesame seeds.

- Optional herbs/spices that don’t break the recipe if missing.

- “Extra” cheese, lime wedges, sour cream topping, etc.

#### Hard rules
- Never mark the main protein as `NON_CRITICAL`.

- Never put CRITICAL items into Quick Review suggestions (Shop logic depends on this flag).

- If unsure, lean `CRITICAL` for v1.

### 4.2 Kind & Category

- `kind` is for logic (substitutions, "same vibe"). Valid values (v1.3.0+): `'PROTEIN'`, `'CARB'`, `'VEG'`, `'FRUIT'`, `'DAIRY'`, `'FAT_OIL'`, `'SPICE'`, `'CONDIMENT'`, `'OTHER'`.

- `shoppingCategory` is for Shop grouping: `'PRODUCE'`, `'MEAT_SEAFOOD'`, `'DAIRY_EGGS'`, `'PANTRY_DRY'`, `'FROZEN'`, `'OTHER'`.

Examples:

- Chicken breast → `kind: 'PROTEIN'`, `shoppingCategory: 'MEAT_SEAFOOD'`

- Dry spaghetti → `kind: 'CARB'`, `shoppingCategory: 'PANTRY_DRY'`

- Lemon → `kind: 'FRUIT'` (v1.3.0+), `shoppingCategory: 'PRODUCE'` ← Important: fixes fruit aggregation

- Shredded cheddar → `kind: 'DAIRY'`, `shoppingCategory: 'DAIRY_EGGS'`

- Olive oil → `kind: 'FAT_OIL'`, `shoppingCategory: 'PANTRY_DRY'`

#### Musts (v1.3.0+)
- Fruits (lemons, apples, berries, etc.) must use `kind: 'FRUIT'`, not `'VEG'`.
- Cooking fats/oils (olive oil, butter) must use `kind: 'FAT_OIL'`, not `'CONDIMENT'`.
- All `kind` values are now TypeScript enums; compiler catches invalid values.

---

## 5. Preflight Metadata (Today-facing)

Matches `RecipePreflightRequirement`:

```ts
interface RecipePreflightRequirement {
  type: 'THAW' | 'MARINATE' | 'SLOW_COOK' | 'LONG_PREP';
  description: string;
  hoursBeforeCook?: number;  // when to start, relative to cook time
}
``` text

Examples:

- `{ type: 'THAW', description: 'Thaw chicken in the fridge overnight', hoursBeforeCook: 12 }`

- `{ type: 'MARINATE', description: 'Marinate chicken at least 30 minutes before cooking', hoursBeforeCook: 0.5 }`

- `{ type: 'SLOW_COOK', description: 'Start slow cooker 8 hours before dinner', hoursBeforeCook: 8 }`

- `{ type: 'LONG_PREP', description: 'Allow at least 30 minutes for slow onion cooking', hoursBeforeCook: 0 }`

#### Musts
- If missing a preflight that materially affects viability (frozen protein, slow cook, long prep), Today cannot correctly detect “missed preflight.”

- If no preflight is needed, use `preflight: []` (v1 normalization).

---

## 6. Cooking Mode Metadata (Steps)

Use `Recipe.steps` from `data-model.md`. Shape:

```ts
interface RecipeStep {
  stepNumber: number;          // 1-based
  instruction: string;         // short, imperative (2–3 sentences max)
  timerMinutes?: number;       // duration in minutes (only if >= 3 min)
  timer?: boolean;             // show [Set Timer] button (default: false)
  parallel?: boolean;          // can happen alongside other steps (default: false)
}
``` text

#### Guidelines
- Instructions short and direct: ✅ "Preheat oven to 425°F." / ✅ "Chop broccoli into florets."

- Keep steps to 2–3 sentences max for Cooking Mode readability.

- Use `timer: true` when step has explicit time cue ("roast for 15 min", "simmer 5–7 min").

- Set `timerMinutes` to the parsed duration (only if >= 3 min, to reduce timer fatigue).

- Use `parallel: true` for steps that can overlap ("Meanwhile, prepare vegetables" or "While dough rises...").

- Each step is a logical chunk, not a word-for-word recipe instruction. Aggregation is OK if it improves clarity.

---

## 7. Personalization Hooks (Tags & Variants)

Simple, but important for “same vibe” and learning.

```ts
type RecipeTag =
  | 'vegetarian'
  | 'vegan'
  | 'gluten_free'
  | 'dairy_free'
  | 'one_pot'
  | 'sheet_pan'
  | 'slow_cooker'
  | 'meal_prep'
  | 'make_ahead'
  | 'budget_friendly'
  | 'kid_friendly'
  | 'family_friendly'
  | 'crowd_favorite'
  | 'comfort_food'
  | 'italian'
  | 'mexican'
  | 'asian'
  | 'american'
  | 'southern'
  | 'pantry_staple'
  | 'weeknight'
  | 'under_30_minutes';

interface VariantHint {
  description: string;           // “Swap ground beef for turkey”
  safeSubIngredientId?: string;  // optional link to known safe sub
}
``` text

#### Examples
- Sheet-pan chicken → `['kid_friendly', 'sheet_pan', 'comfort_food', 'family_friendly']`

- Vegetarian one-pot → `['vegetarian', 'one_pot', 'meal_prep', 'weeknight']`

- Slow-cooker pulled pork → `['southern', 'slow_cooker', 'comfort_food', 'crowd_favorite', 'make_ahead']`

Variant hints:

- "Swap ground beef for turkey if desired."

- "Can be made meatless by skipping chicken and doubling beans."

#### Musts (v1.3.0+)
- All tags must be from the `RecipeTag` union; compiler enforces this.
- Typos in tag values are now compile-time errors, not runtime surprises.
- Tag selection should honestly reflect the recipe.

---

## 8. Invariants for Recipes

Recipe-specific invariants (builds on `data-model.md` invariants):

1. Every recipe has `id`, `name`, `slug`, `metadata`, `ingredients`, `steps` (steps can be minimal but must exist).

1. At least one `CRITICAL` ingredient exists; main protein must be `CRITICAL`.

1. Preflight truthfully represents anything that starts ≥ 1 hour before cooking or involves thawing.

1. `estimatedMinutes` reflects a typical household, not pro-kitchen speed.

1. `timeBand` matches `estimatedMinutes` (no gaming FAST).

1. If `leftoverStrategy = 'COOK_ONCE_EAT_TWICE'`, quantities and structure support it.

---

## 9. Example 1 – “Sheet-Pan Chicken & Veg”

```ts
const sheetPanChicken: Recipe = {
  id: 'r_sheet_pan_chicken_veg',
  name: 'Sheet-Pan Chicken & Veg',
  slug: 'sheet-pan-chicken-veg',
  metadata: {
    timeBand: 'FAST',
    estimatedMinutes: 35,
    equipmentTags: ['SHEET_PAN'],
    leftoverStrategy: 'EXPECTED',
  },
  ingredients: [
    {
      ingredientId: 'ing_chicken_breast',
      displayName: 'Boneless skinless chicken breast',
      amount: 1.5,
      unit: 'LB',
      criticality: 'CRITICAL',
      kind: 'PROTEIN',
      shoppingCategory: 'MEAT_SEAFOOD',
    },
    {
      ingredientId: 'ing_broccoli_florets',
      displayName: 'Broccoli florets',
      amount: 12,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'VEG',
      shoppingCategory: 'PRODUCE',
    },
    {
      ingredientId: 'ing_olive_oil',
      displayName: 'Olive oil',
      amount: 2,
      unit: 'TBSP',
      criticality: 'NON_CRITICAL',
      kind: 'FAT_OIL',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_salt',
      displayName: 'Salt',
      amount: 1,
      unit: 'TSP',
      criticality: 'NON_CRITICAL',
      kind: 'SPICE',
      shoppingCategory: 'PANTRY_DRY',
    },
  ],
  preflight: [],
  steps: [
    { stepNumber: 1, instruction: 'Preheat oven to 425°F.' },
    { stepNumber: 2, instruction: 'Toss chicken and broccoli with oil, salt.' },
    { stepNumber: 3, instruction: 'Roast until chicken reaches temp.', timerMinutes: 20 },
  ],
  tags: ['kid_friendly', 'sheet_pan', 'mild', 'comfort_food'],
  variantHints: [{ description: 'Swap chicken breast for thighs if preferred.' }],
};
``` text

---

## 10. Example 2 – “Slow Cooker Chili” (with Preflight)

```ts
const slowCookerChili: Recipe = {
  id: 'r_slow_cooker_chili',
  name: 'Slow Cooker Beef & Bean Chili',
  slug: 'slow-cooker-chili',
  metadata: {
    timeBand: 'PROJECT',
    estimatedMinutes: 30, // hands-on
    equipmentTags: ['SLOW_COOKER'],
    leftoverStrategy: 'COOK_ONCE_EAT_TWICE',
  },
  ingredients: [
    {
      ingredientId: 'ing_ground_beef',
      displayName: 'Ground beef',
      amount: 2,
      unit: 'LB',
      criticality: 'CRITICAL',
      kind: 'PROTEIN',
      shoppingCategory: 'MEAT_SEAFOOD',
    },
    {
      ingredientId: 'ing_canned_tomatoes',
      displayName: 'Canned diced tomatoes',
      amount: 28,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'OTHER',
      shoppingCategory: 'PANTRY_DRY',
    },
    {
      ingredientId: 'ing_kidney_beans',
      displayName: 'Canned kidney beans',
      amount: 30,
      unit: 'OZ',
      criticality: 'CRITICAL',
      kind: 'OTHER',
      shoppingCategory: 'PANTRY_DRY',
    },
    // spices etc. as NON_CRITICAL
  ],
  preflight: [
    {
      type: 'SLOW_COOK',
      description: 'Start slow cooker at least 6–8 hours before dinner.',
      hoursBeforeCook: 8,
    },
  ],
  steps: [
    { stepNumber: 1, instruction: 'Brown beef with aromatics.' },
    { stepNumber: 2, instruction: 'Load slow cooker with all ingredients.' },
    { stepNumber: 3, instruction: 'Cook on low.', timerMinutes: 480, /* hands-off */ },
  ],
  tags: ['comfort_food', 'soup', 'bowl'],
  variantHints: [{ description: 'Swap ground beef for turkey for a lighter version.' }],
};
``` text

---

## 11. How This Ties Back to Tickets

- **Planner (P2, P3, P5, P6):** Uses `metadata.timeBand`, `estimatedMinutes`, `leftoverStrategy`, `tags`.

- **Shop (S2, S3, S4, S7, S8, S9):** Uses `ingredients.*`, `criticality`, `shoppingCategory`, `kind`.

- **Today (T2, T4, T5, T8):** Uses `preflight[]`, `tags`, `variantHints` (for easier options).

- **Cooking (C1–C4):** Uses `steps[]` (layout + timers) and tags for “same vibe.”

---

## 12. Authoring Checklist

When adding or generating a new recipe, ensure:

- [ ] `timeBand` + `estimatedMinutes` are realistic.

- [ ] At least one `CRITICAL` ingredient; main protein is `CRITICAL`.

- [ ] Every ingredient has `kind` + `shoppingCategory`.

- [ ] Preflight requirements (thaw, slow cook, etc.) are captured.

- [ ] Steps exist (even minimal) and match data-model shape.

- [ ] Basic tags added (format, cuisine, kid-friendliness).

- [ ] Variant hints added where simple safe swaps exist.

Once a recipe passes this checklist, it's **VibeMeals-ready** and safe to feed into Planner → Shop → Today.

---

## See Also

- **[recipe-acquisition.md](./recipe-acquisition.md)** – Learn the workflow for sourcing, validating, and integrating recipes into the catalog (MVP phase operational guide).

- **[recipe-examples.md](./recipe-examples.md)** – Ready-to-use seed recipes that exercise all time bands, criticality levels, and preflight scenarios.

---

## Version History

- **v1.0.0** (2025-12-07): Initial recipe specification aligned to `data-model.md` and v1 tickets.
