# Recipe Starter Pack

## Quick-start recipe recommendations for VibeMeals MVP

## Week 1: Core 15 Recipes

### FAST (≤30 min) - 8 recipes

1. **Sheet Pan Chicken Fajitas** (FAST, NO_PREFLIGHT)

    - Source: Budget Bytes
    - Why: One-pan, minimal cleanup, kid-friendly

2. **Pantry Pasta** (FAST, NO_PREFLIGHT)

    - Source: Already in fixtures
    - Why: Emergency meal, mostly pantry staples

3. **Ground Beef Tacos** (FAST, NO_PREFLIGHT)

    - Source: Already in fixtures (Beef Tacos)
    - Why: Family favorite, simple

4. **Stir-Fry Chicken & Vegetables** (FAST, NO_PREFLIGHT)

    - Source: Budget Bytes / Serious Eats
    - Why: Fast, healthy, flexible

5. **Quesadillas** (FAST, NO_PREFLIGHT)

    - Source: Budget Bytes
    - Why: Kid-approved, customizable, truly fast

6. **Fried Rice** (FAST, NO_PREFLIGHT)

    - Source: Serious Eats
    - Why: Leftover rice hero, quick

7. **Spaghetti Aglio e Olio** (FAST, NO_PREFLIGHT)

    - Source: Serious Eats / NYT
    - Why: 6 ingredients, 20 minutes

8. **Fish Tacos** (FAST, NO_PREFLIGHT)

    - Source: Budget Bytes
    - Why: Quick protein, healthy

### NORMAL (30-50 min) - 5 recipes

1. **One-Pot Chicken and Rice** (NORMAL, NO_PREFLIGHT)

    - Source: Budget Bytes
    - Why: Minimal dishes, comfort food

2. **Baked Salmon with Roasted Vegetables** (NORMAL, NO_PREFLIGHT)

    - Source: Serious Eats
    - Why: Healthy, sheet pan, elegant

3. **Chicken Parmesan** (NORMAL, NO_PREFLIGHT)

    - Source: Serious Eats
    - Why: Classic, crowd-pleaser

4. **Beef & Broccoli** (NORMAL, THAW optional)

    - Source: Budget Bytes
    - Why: Better than takeout

5. **Baked Ziti** (NORMAL, NO_PREFLIGHT)

    - Source: Budget Bytes / NYT
    - Why: Batch-friendly, freezes well

### PROJECT (>50 min) - 2 recipes

1. **Slow Cooker Chili** (PROJECT, SLOW_COOK)

    - Source: Already in fixtures
    - Why: Set and forget, feeds crowd

2. **Marinated Chicken Bowls** (PROJECT, MARINATE)

    - Source: Already in fixtures
    - Why: Meal prep hero

## Week 2: Expansion 10 Recipes

### More Protein Variety

1. **Pork Chops with Apple** (NORMAL, NO_PREFLIGHT)

2. **Shrimp Scampi** (FAST, NO_PREFLIGHT)

3. **BBQ Pulled Pork** (PROJECT, SLOW_COOK)

4. **Lemon Herb Chicken Thighs** (NORMAL, THAW)

### Vegetarian Options

1. **Black Bean Burgers** (NORMAL, NO_PREFLIGHT)

2. **Veggie Stir-Fry with Tofu** (FAST, NO_PREFLIGHT)

3. **Lentil Soup** (NORMAL, NO_PREFLIGHT)

### Budget-Friendly

1. **Bean & Cheese Burritos** (FAST, NO_PREFLIGHT)

2. **Egg Fried Rice** (FAST, NO_PREFLIGHT)

### Kid-Friendly Classic

1. **Homemade Mac & Cheese** (NORMAL, NO_PREFLIGHT)

## Recommended Sources

### Budget Bytes

- Best for: Weeknight meals, budget-conscious recipes

- URL pattern: `https://www.budgetbytes.com/[recipe-name]/`

- Known working recipes: One-Pot Chicken and Rice, Sheet Pan Fajitas

### Serious Eats

- Best for: Technique-focused, well-tested recipes

- URL pattern: `https://www.seriouseats.com/[recipe-name]`

- Known for: Accurate times, detailed instructions

### NYT Cooking (may require subscription)

- Best for: Classic recipes, crowd-pleasers

- URL pattern: `https://cooking.nytimes.com/recipes/[id]-[name]`

### King Arthur Baking

- Best for: Baking, bread, weekend projects

- URL pattern: `https://www.kingarthurbaking.com/recipes/[recipe-name]`

## Import Order Strategy

### Day 1: Quick Wins (2 hours)

Import 5 recipes with NO_PREFLIGHT and FAST time band:

- Pantry Pasta (already done)
- Sheet Pan Chicken Fajitas
- Ground Beef Tacos (already done)
- Quesadillas
- Stir-Fry Chicken

### Day 2: Core Variety (2 hours)

Import 5 recipes with mix of time bands:

- One-Pot Chicken and Rice
- Baked Salmon
- Slow Cooker Chili (already done)
- Fish Tacos
- Spaghetti Aglio e Olio

### Day 3: Fill Gaps (2 hours)

Import 5 recipes for dietary variety:

- Chicken Parmesan
- Beef & Broccoli

- Marinated Bowls (already done)

- Fried Rice

### Weekend: Testing Phase

Cook 2-3 recipes yourself:

- 1 FAST recipe (validate time)

- 1 NORMAL recipe (validate preflight)

- 1 PROJECT recipe (validate complexity)

## Quality Checklist

Before importing each recipe, verify:

- [ ] Source is trusted (Budget Bytes, Serious Eats, etc.)

- [ ] Recipe has ≤15 ingredients

- [ ] Instructions are clear and complete

- [ ] Time estimate seems reasonable

- [ ] Equipment is standard (no sous vide, etc.)

During import, confirm:

- [ ] Main protein/carb marked CRITICAL

- [ ] Garnishes/spices marked NON_CRITICAL

- [ ] Time band feels honest

- [ ] Preflight requirements noted

- [ ] Equipment beyond basics tagged

After 15 recipes:

- [ ] Mix of FAST (8), NORMAL (5), PROJECT (2)

- [ ] Mix of proteins (chicken, beef, pork, fish, veg)

- [ ] Mix of preflight (mostly NONE, some THAW, some MARINATE/SLOW_COOK)

- [ ] All recipes pass validation tests

## Next Steps

1. **Start with what you have:**

- 5 recipes already in fixtures (Chicken, Chili, Bowls, Pasta, Tacos)

1. **Import 10 more this week:**

- Focus on FAST weeknight meals

- Use the scraper tool

- Don't overthink criticality (conservative is safe)

1. **Test 2-3 recipes this weekend:**

- Validate time estimates

- Adjust metadata

- Build confidence in the system

1. **Launch with 25-30 recipes:**

- Enough variety for 2 weeks of dinners

- Real user feedback will guide expansion

- Quality > quantity

---

### Ready to start?

```bash
npm run import:url -- https://www.budgetbytes.com/sheet-pan-chicken-fajitas/
```text


