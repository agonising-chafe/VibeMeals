# Recipe Acquisition Strategy

**Version:** 1.0.0  
**Date:** 2024-12-07  
**Status:** Active  

## Overview

This document outlines the practical strategy for acquiring high-quality recipes that meet VibeMeals standards as a solo founder.

## Core Principle

**Quality > Quantity**: 25 validated recipes sufficient for MVP. Better to have 25 recipes that actually work than 100 that disappoint users.

## Target: MVP Recipe Count

- **Minimum viable:** 20 recipes

- **Comfortable launch:** 25-30 recipes

- **Ideal MVP:** 30-40 recipes

## Recipe Sources (Priority Order)

### 1. **Trusted Recipe Sites** (Primary)

- Budget Bytes

- Serious Eats

- NYT Cooking

- America's Test Kitchen

- King Arthur Baking

**Why:** Professionally tested, realistic times, detailed instructions.

### 2. **Manual Testing** (Validation)

- Cook 20-30% of imported recipes yourself

- Validate time estimates

- Confirm preflight requirements

- Adjust criticality based on actual experience

### 3. **AI Generation** (Secondary/Supplemental)

- Use AI only for gaps in coverage

- Require manual validation before inclusion

- AI better for suggesting metadata than generating full recipes

## Import Workflow

### Phase 1: Scraping (5-10 min per recipe)

```bash
# Set API key (optional but recommended)
export GEMINI_API_KEY="your_key_here"

# Import recipe
npm run import:url -- https://www.budgetbytes.com/sheet-pan-chicken/
``` text

#### Interactive review
1. ✅ Adjust time estimate (automatic 1.25x buffer applied)

2. ✅ Confirm/change time band (FAST ≤30min, NORMAL 30-50min, PROJECT >50min)

3. ✅ Review ingredient criticality (AI suggested, human confirmed)

4. ✅ Add/remove preflight requirements (thaw, marinate)

5. 💾 Saves to `src/domain/recipes/`

### Phase 2: Testing (1-2 hours per recipe)

#### Cook the recipe yourself
- Time the actual cooking process

- Note any preflight you forgot

- Identify critical vs non-critical ingredients

- Adjust metadata based on reality

#### Update the recipe file
- Correct time estimate if off by >10 minutes

- Add missed preflight requirements

- Adjust criticality based on what actually matters

- Add equipment tags you discovered

### Phase 3: Integration (5 min per recipe)

#### Add to fixtures
```typescript
// src/domain/fixtures/recipes.seed.ts
import { sheetPanChicken } from '../recipes/sheet-pan-chicken';

export const SEED_RECIPES: Recipe[] = [
  sheetPanChicken,
  // ... other recipes
];
``` text

#### Run tests
```bash
npm test
``` text

## Recipe Selection Strategy

### Week 1-2: Foundation (15 recipes)

**Focus:** Weeknight rotation staples

#### Time band mix
- 8 FAST (≤30min) - weeknight heroes

- 5 NORMAL (30-50min) - standard dinners  

- 2 PROJECT (>50min) - weekend meals

#### Preflight mix
- 10 NO_PREFLIGHT - spontaneous cooking

- 3 THAW - frozen protein planning

- 2 MARINATE - flavor building

#### Categories to cover
- 4 chicken recipes

- 3 ground beef recipes

- 2 pasta recipes

- 2 one-pot/sheet-pan recipes

- 2 slow cooker recipes

- 2 vegetarian options

### Week 3: Expansion (10 recipes)

**Focus:** Variety and dietary coverage

#### Add
- 2 pork recipes

- 2 fish/seafood recipes

- 2 more vegetarian

- 2 kid-friendly classics

- 2 budget-friendly meals

### Week 4: Polish (5 recipes)

**Focus:** Fill gaps identified during testing

#### Criteria
- Address missing equipment types

- Cover missing dietary needs

- Add seasonal options

- Include batch-cooking options

## Quality Gates

### Before Import

- ✅ Recipe from trusted source OR personally tested

- ✅ Has structured data (JSON-LD schema)

- ✅ Reasonable ingredient count (not 30+ items)

- ✅ Clear instructions (not vague or missing steps)

### During Review

- ✅ Time estimate feels realistic (add buffer if uncertain)

- ✅ Main protein/carb/veg marked CRITICAL

- ✅ Garnishes/spices marked NON_CRITICAL

- ✅ Frozen/marinated items have preflight

- ✅ Equipment beyond basics is tagged

### After Testing

- ✅ Actual time within 20% of estimate

- ✅ All preflight requirements caught

- ✅ Criticality accurate (didn't skip any "non-critical" items)

- ✅ Instructions complete and clear

## Metadata Guidelines

### Time Bands (Be Honest!)

- **FAST (≤30min):** Truly quick meals. Count cleanup!

- **NORMAL (30-50min):** Standard weeknight cooking

- **PROJECT (>50min):** Weekend projects, slow cooker, marinating

#### Common mistakes
- ❌ Ignoring prep time (chopping, measuring)

- ❌ Ignoring cleanup time (pots, pans, dishes)

- ❌ Assuming expert knife skills

- ❌ Forgetting to account for oven preheat

### Criticality (When in Doubt, Mark CRITICAL)

- **CRITICAL:** Defines the dish, can't substitute easily

- Main protein (chicken, beef, tofu)

- Primary carb (pasta, rice, tortillas)

- Key vegetables (the "broccoli" in chicken-broccoli)

- **NON_CRITICAL:** Optional, easily substituted, or pantry staples

- Garnishes (cilantro, parsley)

- Most spices (unless it defines the dish)

- Optional toppings

- Common pantry items you probably have

**Safe over clever:** If unsure, mark CRITICAL. G3 (Safe over clever) means preventing 5pm panic.

### Preflight Requirements

#### THAW (12+ hours)
- Frozen chicken breast → THAW

- Frozen ground beef → THAW (unless you know the microwave trick)

- Frozen fish → THAW

#### MARINATE (2-12 hours)
- Chicken marinade for flavor → MARINATE

- Beef marinade for tenderness → MARINATE

- Quick 15-min marinades → NO PREFLIGHT (not worth the planning overhead)

#### SLOW_COOK (4-8 hours)
- Slow cooker pot roast → SLOW_COOK

- Slow cooker chili → SLOW_COOK

#### LONG_PREP (2-4 hours non-active)
- Bread dough rising → LONG_PREP

- Overnight oats → LONG_PREP (or MARINATE)

## Success Metrics

### Recipe Performance Indicators

- **Skip rate <20%:** If users skip this recipe often, investigate why

- **Waste signals:** If users mark ingredients as wasted, criticality may be wrong

- **Preflight misses:** If users miss preflight often, description unclear

- **Time complaints:** If users report "took way longer," time estimate wrong

### MVP Success Criteria

- ✅ 25+ recipes imported

- ✅ 5-8 recipes personally tested and validated

- ✅ All time bands represented (FAST, NORMAL, PROJECT)

- ✅ All preflight types represented (including NONE)

- ✅ Dietary variety (chicken, beef, vegetarian, etc.)

- ✅ Zero test failures in recipe validation suite

## Tools

### Recipe Import
```bash
npm run import:url -- <url>
``` text

### Type Validation
```bash
npm run validate:types
``` text

### Test Suite
```bash
npm test
``` text

### Development Preview
```bash
npm run dev:preview
``` text

## Troubleshooting

### "Failed to extract recipe schema from URL"
**Cause:** Site doesn't expose JSON-LD or uses JavaScript rendering

#### Solutions
1. Try a different recipe from the same site

2. Check browser DevTools → Network → look for `application/ld+json`

3. Manually copy recipe data and create file directly

4. Use a different source site

### "AI enhancement failed"
**Cause:** No `GEMINI_API_KEY` set or an API error occurred.

**Solution:** Continue without AI - just more manual review during interactive session

### "Time estimate way off after cooking"
**Cause:** Underestimated prep time, skill level, or cleanup

**Solution:** Update the recipe file directly:
```typescript
metadata: {
  timeBand: 'NORMAL', // was FAST
  estimatedMinutes: 45, // was 25
  // ...
}
``` text

## References

- **Recipe Spec:** `docs/recipe-spec.md`

- **Data Model:** `docs/data-model.md`

- **Vision (Golden Tests):** `docs/vision.md`

- **Type Definitions:** `src/domain/types.ts`

---

#### Next Steps
1. Import first batch of 5 recipes this weekend

2. Cook 1-2 to validate time estimates

3. Iterate on metadata accuracy

4. Scale to 25 recipes over 2-3 weeks


