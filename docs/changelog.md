# VibeMeals Changelog

## Living Document Version History

---

## Version 1.3.1 - December 9, 2025 🔧

### EQUIPMENT CATALOG EXPANSION & CONSTRAINT TRACKING

VibeMeals v1.3.1 adds outdoor cooking equipment support and comprehensive rejection diagnostics for recipe filtering.

#### What's New

- ✅ **Added `SMOKER` to `EquipmentTag` enum**: Complete outdoor cooking support
  - Values now: `LARGE_POT`, `LARGE_SKILLET`, `DUTCH_OVEN`, `SHEET_PAN`, `BAKING_DISH`, `OVEN`, `GRILL`, `SLOW_COOKER`, `INSTANT_POT`, `RICE_COOKER`, `FOOD_PROCESSOR`, `BLENDER`, `SMOKER` (13 values)
  - Joins `GRILL` for full outdoor/BBQ workflow support

- ✅ **New `RecipeRejectionReason` Type**: Diagnostic tracking for recipe filtering
  - Values: `RECENTLY_USED`, `DIET_CONSTRAINT_VIOLATED`, `EQUIPMENT_NOT_AVAILABLE`, `INGREDIENT_MISSING`, `OTHER`
  - Enables UI to explain why recipes weren't recommended

- ✅ **New `RecipeRejection` Interface**: Structured rejection tracking
  - Fields: `recipeId`, `reason: RecipeRejectionReason`, `details?: string`
  - Optional parameter in `filterRecipesByConstraints()` for backward compatibility

- ✅ **Equipment Constraints in `HouseholdProfile`**: New optional field
  - `availableEquipment?: EquipmentTag[]` specifies what equipment household has
  - Planner now checks equipment requirements against household profile

#### Technical Improvements

- `src/domain/types.ts`: Added SMOKER to EquipmentTag, added RecipeRejection types
- `docs/data-model.md`: Updated v1.3.1 with equipment and rejection documentation
- `src/domain/planner.ts`: Enhanced `filterRecipesByConstraints()` with equipment checking and rejection tracking
- `src/domain/shop.ts`: Fixed ShoppingItemSourceUsage type handling with exactOptionalPropertyTypes
- **All Tests**: 110/110 passing, backward compatible

#### Migration Notes

The rejection tracking parameter is optional. Existing callers of `filterRecipesByConstraints()` continue to work without changes.

---

## Version 1.3.0 - December 9, 2025 ✨

### DOMAIN MODEL HARDENING – COMPREHENSIVE TYPE SAFETY

VibeMeals v1.3.0 adds critical type safety and ingredient classification improvements. All enums are now exhaustive, fully typed, and validated by TypeScript compiler. Recipe discovery, shopping aggregation, and equipment planning are now bulletproof.

#### What's New

- ✅ **Added `FRUIT` to `IngredientKind` enum**: Lemons, berries, apples, citrus now correctly categorize as `FRUIT` instead of `VEG` fallback
  - Fixes shopping aggregation for fruit-based recipes (lemon-garlic-chicken, berry smoothies, etc.)
  - Enables dietary filtering by fruit content

- ✅ **New `RecipeTag` Union Type (22 values)**: Replaces open `string[]` with fully typed enum
  - Values: `vegetarian`, `vegan`, `gluten_free`, `dairy_free`, `one_pot`, `sheet_pan`, `slow_cooker`, `meal_prep`, `make_ahead`, `budget_friendly`, `kid_friendly`, `family_friendly`, `crowd_favorite`, `comfort_food`, `italian`, `mexican`, `asian`, `american`, `southern`, `pantry_staple`, `weeknight`, `under_30_minutes`
  - Compiler now catches tag typos at compile-time (e.g., `'family_dinner'` → `'family_friendly'`)
  - Enables type-safe recipe filtering and discovery

- ✅ **New `EquipmentTag` Union Type (12 values)**: Replaces open `string[]` with fully typed enum
  - Values: `LARGE_POT`, `LARGE_SKILLET`, `DUTCH_OVEN`, `SHEET_PAN`, `BAKING_DISH`, `OVEN`, `GRILL`, `SLOW_COOKER`, `INSTANT_POT`, `RICE_COOKER`, `FOOD_PROCESSOR`, `BLENDER`
  - Enables household equipment constraint detection
  - All recipes now validated against available equipment

- ✅ **Type Sync**: Data model v1.2.0 → v1.3.0, all interfaces updated

#### Technical Improvements

- `src/domain/types.ts`: Enhanced with 3 new union types (IngredientKind +1, RecipeTag +1, EquipmentTag +2 with GRILL)
- `docs/data-model.md`: Updated to v1.3.0 with new enums and type documentation
- `src/domain/recipes/*`: Fixed 8 invalid tag values, 1 equipment tag normalization
- `src/integrations/spoonacular.ts`: Type casts for mapper output
- **Compiler Validation**: 0 recipe type violations, 110/110 tests passing

#### Breaking Changes

None. All existing code remains compatible; new types are additive and enforce stricter validation.

#### Migration Guide for Batch Imports

When importing new recipes via Spoonacular, all tags and equipment are now validated by TypeScript:

```typescript
// ✅ Valid
tags: ['vegetarian', 'weeknight', 'one_pot']
equipmentTags: ['LARGE_POT', 'SLOW_COOKER']

// ❌ Invalid (compiler error)
tags: ['healthy', 'family_dinner']  // Use 'family_friendly' instead
equipmentTags: ['GRILL']            // Use 'OVEN' for oven-based cooking
```

---

## Version 1.0.0 - December 8, 2025 🚀

### PRODUCTION RELEASE – MVP LAUNCH

VibeMeals v1.0.0 is the first production-ready release. All core features are implemented, tested, and spec-compliant. Golden Experience Tests (G1–G6) are validated and locked.

#### What's Included

- ✅ **Core Domain Logic**: Planner (plan generation, swaps, locks), Shop (list building, grouping), Today (cookability detection, preflight status)

- ✅ **Data Model** (v1.2.0): Complete type contracts for all domains, markdownlint compliant

- ✅ **Recipe Catalog** (14 recipes): All time bands (FAST/NORMAL/PROJECT), equipment types, dietary variants, Budget Bytes sourced

- ✅ **Comprehensive Specs**: vision.md, data-model.md, spec-planner/shop/today/cooking.md, recipe-spec.md

- ✅ **Type Sync**: Perfect alignment between types.ts and data-model.md

- ✅ **Test Suite** (56 tests passing): Unit and spec tests covering all persona scenarios

- ✅ **Documentation**: Locked specs, persona checklists, technical architecture, Golden Tests

- ✅ **Accessibility**: AI agent instructions (.github/copilot-instructions.md) for future development

#### Key Features

1. **Weekday Meal Planning**: Generate 7-day plans respecting household mode (SOLO, FAMILY, DINK, EMPTY_NEST, LARGE)

1. **Smart Shopping Lists**: Ingredient normalization, categorization, Quick Review (pantry staples), missing items tracking

1. **Tonight's Readiness**: Real-time cookability check—preflight status, missing critical ingredients, out-eating override

1. **Preflight Detection**: Automatic thaw/marinate/slow-cook requirement flagging

1. **Flexible Swapping**: Lock/unlock dinners, swap recipes, move/delete dinners while maintaining plan validity

#### Golden Experience Tests (G1–G6) – LOCKED FOR v1

- **G1**: Tonight is actually cookable (or shows explicit reasons why not)

- **G2**: Shopping is minimized & optimized

- **G3**: One-trip shopping possible

- **G4**: Plans can bend without breaking

- **G5**: Personas feel heard

- **G6**: Dinner never feels boring

#### Non-Goals for v1

- ❌ UI/Web frontend (planned v1.1+)

- ❌ User authentication (planned v1.1+)

- ❌ AI recipe generation (planned v2+)

- ❌ Multi-household management (planned v2+)

- ❌ Nutritional tracking (planned v2+)

#### Breaking Changes

None—this is the initial release.

#### Deprecations

None—this is the initial release.

#### Known Limitations

- Preflight coverage: Only SLOW_COOK patterns included (1/14 recipes). THAW, MARINATE, LONG_PREP patterns planned for v1.1

- Dietary diversity: Mostly meat-heavy; vegetarian/vegan variants planned for v1.1

- Recipe count: 14 MVP recipes. Full 40+ catalog planned for v1.1+

#### How to Get Started

```bash
npm install
npm test                    # Run all 56 tests
npm run dev:preview         # Preview plan generation
npm run validate:types      # Check type/spec sync
``` text

See `README.md` and `docs/` for full documentation.

#### License

Private

---

## Version 5.1.0 - December 7, 2025

### 🍲 Recipe Catalog Contract (Implementation-Ready)

Introduced `recipe-spec.md` as the authoritative definition of a VibeMeals-grade recipe, aligned to the shared data model and v1 tickets.

#### Changes

- New doc: `recipe-spec.md` (v1.0.0) covering recipe metadata, ingredient criticality, preflight, steps shape, tags/variants, invariants, and examples.

- Cross-wired to: `vision.md` (G1–G6), `data-model.md` (`Recipe*` types), surface specs (Planner/Today/Shop/Cooking), and ticket references.

- Authoring checklist added to keep catalog contributions consistent (manual and AI-generated).

#### Impact

- Catalog team and AI generation now have a concrete contract to avoid drift in time bands, criticality, and preflight coverage.

- Shop/Today safety: CRITICAL vs NON_CRITICAL ingredients are explicitly defined; preflight gaps are harder to miss.

- Cooking readiness: Steps required (even minimal) to support Cooking Mode and tonight viability.

---

## Version 5.1.1 - December 7, 2025

### 🍽️ Seed Recipes & Edge-Case Coverage

Added `recipe-examples.md` with three fully-specified recipes that exercise FAST chaos backup, NORMAL taco night, and MARINATE preflight scenarios.

#### Changes

- New doc: `recipe-examples.md` (seed catalog) aligned to `recipe-spec.md` and `data-model.md` shapes.

- Includes Quick Review-friendly pantry pasta, leftover-friendly tacos, and marinated bowls with preflight timing.

- Ready for use in fixtures/tests alongside the examples already in `recipe-spec.md`.

#### Impact

- Domain helper tests can validate `buildShoppingList` (critical vs staples) and `computeTonightState` (missed preflight) immediately.

- Catalog authors and AI generation have calibrated examples for time bands, criticality, and preflight coverage.

---

## Version 5.1.2 - December 8, 2025

### 🧹 Cleanup: removed unreviewed integrations

- Purged Walmart pricing notes and related guidance (feature removed).

- Removed recipe-scrapers and step-parser docs pending future reviewed pipeline.

- Clarified that current scope is the TypeScript domain only; no external integrations are active.

---

## Version 4.6.0 - December 7, 2025 🔒 LOCKED

### 🎯 Vision Complete: Tradeoff Principles & v1 Thin Slice

#### DOCUMENT STATUS: LOCKED
No further additions without breaking into separate specs (UX spec, technical spec, design spec).

This final version completes the vision document as handoff-ready foundation for implementation. Any further detail belongs in surface-specific specs, not vision.

#### Changes

#### 1. Core Tradeoff Principles (new section after "How to Read This Document")

- Decision framework for resolving product tradeoffs with explicit Golden Test references:

- Clever vs Safe → Choose safe (G1, G3)

- Variety vs Cookability → Choose cookability (G1, G6)

- Save $3 vs Avoid second trip → Avoid second trip (G3, G5)

- Precision inventory vs Low user effort → Choose low effort (G2)

- Perfect adherence vs Plans that bend → Choose bend (G4)

- Learning fast vs Learning stable → Choose stable (Section 14.4)

- More features vs Core promises → Choose core promises (Golden Tests non-negotiable)

- Explicit enforcement clause: "When a feature conflicts with these, feature must change or be dropped"

#### 2. Section 13.1: v1 Thin Slice – What Must Ship (replaces MVP capability list)

- Defines 5 required surfaces in user-facing terms (not capabilities):

- **Planner (Week View):** 5-10min check-in, household mode shapes, lock/swap/reroll, preflight visibility

- **Today View:** Single answer ("tonight's dinner"), preflight state, one-tap downgrade/skip

- **Shop / List → Cart:** De-duplicated + grouped, optional Quick Review (non-critical only), export options

- **Cooking Mode:** Step-by-step numbered, time-aware bands, parallelized without confusion

- **Settings / Household Profile:** Mode + headcount, dinners/week, constraints (lightweight)

- Success metrics tied directly to G1/G2/G3

- Zero new concepts—every phrase exists elsewhere in doc

#### 3. Subsection renumbering fixes

- Learning & Adaptation subsections corrected from 13.X → 14.X (14.1-14.9)

- Roadmap subsections: 13.1 (v1 Thin Slice), 13.2 (V2), 13.3 (V3+)

#### Impact

- **Instant tradeoff resolution:** Cheat sheet gives objective answers when product decisions involve competing priorities

- **v1 scope clarity:** Teams know exactly what surfaces must exist and how they must behave (Golden Tests as acceptance criteria)

- **Handoff-ready:** Vision now bridges philosophy → testable requirements → surface definitions without drifting into UI/UX/tech specs

- **Document locked:** Clear signal that further additions require separate spec documents

#### Rationale for "LOCKED" Status

- Vision document now covers:
  ✅ Why we exist, who we serve, what hurts (Sections 1-6)
  ✅ How we solve it: DLE + Catalog rules (Sections 7-8)
  ✅ What we must never break: Golden Tests G1-G6 (Sections 9-12)
  ✅ How we evolve: Roadmap + Learning + Boundaries (Sections 13-15)
  ✅ Quick reference: Tradeoff principles + navigation guide
  ✅ v1 handoff: Thin slice defining required surfaces

- Next steps are NOT more vision; they are:

- UX spec (flows, wireframes, interaction patterns)

- Technical spec (DLE architecture, data models, APIs)

- Design spec (visual design, component library, copy examples)

- Implementation tickets (scoped against v1 thin slice)

Any attempt to add user flows, UI mockups, technical architecture, or more persona stories to this document should be redirected to appropriate spec.

---

## Version 4.5.1 - December 7, 2025

### 📖 Navigation & Operational Clarity

Added document navigation guide and two critical operational subsections defining plan stability and household mode change behavior.

#### Changes

#### 1. How to Read This Document (after TOC)

- Role-based reading guides for: Executive/Product Leadership, PMs/Designers, Engineers, Content/Recipe teams, QA/Testing

- Logical reading flow for full document (Foundation → Who & What Hurts → How We Solve It → Testing → Operational Anchors → Appendices)

- Quick reference hierarchy for "Is this allowed?" questions: Golden Tests → System Boundaries → Catalog Rules → Tone Contract

#### 2. Section 7.X: Plan Stability – Once Planned, Don't Move the Ground

- Inserted as subsection under Section 7 (DLE Promise)

- Principle: After plan acceptance + main shop, system must not silently change recipes, ingredients, or portions

- Allowed changes: User-initiated only (swap, move, delete, change servings)

- Not allowed: "Smart" behind-the-scenes replanning without user action

- Connection to G4: "Bend" (user swaps easy) vs "Don't break" (no silent replanning)

#### 3. Section 5.2.9: Household Mode Changes – When Life Changes, We Reset Intentionally

- Inserted as final subsection under Section 5.2 (Household Modes & Week Shapes)

- Defines mode-changing events: headcount changes (1→2, 2→4, 4→2), intent changes (dinners/week), lifestyle changes (shift work, cooking ability)

- When mode changes: Re-anchor week shapes, preserve only stable preferences (likes/dislikes, health constraints), re-ask key intent questions

- What not to do: Drag forward incompatible patterns from old mode, assume old learning still applies

- Connection to Section 14: Mode changes are resets, not gradual adaptations; Section 14.4 tunes *within* mode, this handles mode switches

- Goal: "Start a new chapter with some remembered tastes" not "pretend it's the same household and let learning thrash"

#### Impact

- **Document navigability:** New readers can jump to relevant sections based on role, existing team members have clear quick-reference hierarchy

- **Plan stability protection:** Prevents "smart system" from undermining trust by silently changing committed plans (G4 enforcement)

- **Mode change clarity:** Prevents learning thrash when household fundamentally changes; explicit reset mechanism instead of gradual drift

- **Operational testability:** Both subsections provide concrete "allowed/not allowed" rules for implementation and QA

#### Placement Rationale

- **How to Read:** Right after TOC for immediate orientation

- **Plan Stability (7.X):** Under DLE section as core operational constraint on plan modifications

- **Household Mode Changes (5.2.9):** Last subsection of Week Shapes, before general "Who This Is For" section; logically follows 5.2.8 (Why Week Shapes Matter)

---

## Version 4.5.0 - December 7, 2025

### 🔗 System Boundaries & Integrations

Added comprehensive scope definition clarifying what VibeMeals owns vs what stores/external tools own, preventing feature creep and integration overreach.

#### Changes

- **New Section 15: System Boundaries & Integrations** (inserted after Learning & Adaptation, Appendices renumbered to Section 16)

- 15.1: What VibeMeals Owns – weekly plan logic, DLE, shopping lists, cooking flow, learning/personalization

- 15.2: What VibeMeals Does *Not* Own – real-time store inventory, payments/fulfillment, precise pantry inventory, nutrition/diet coaching, social features

- 15.3: Store & Cart Integrations – smart front-end for planning, not replacement for store apps; failure handling for missing items

- 15.4: Pantry Brain Boundaries – fuzzy inference, never drops critical ingredients, optional suggestions with quick overrides

- 15.5: Calendar, Reminders & External Tools – cooperation not replacement, minimal reminder spam, calendar as planning input

- 15.6: Data & Privacy Posture – high-level product stance on data use aligned with G1-G6, no shaming/selling patterns

- 15.7: Boundary Checks for New Features – 3-question framework referencing G1-G6, Section 14 (Learning), Section 8 (Catalog), Section 4.1 (Tone)

#### Impact

- **Prevents scope creep disasters:** Clear boundaries block "let's add [payments/social/nutrition tracking/precise inventory]" feature requests with objective rationale

- **Sets realistic integration expectations:** "Smart front-end for planning, not replacement for store apps" prevents overpromising on stock/fulfillment

- **Fuzzy pantry brain explicitly bounded:** Helps without requiring barcode scanning or manual logging

- **Enforceable via Golden Tests:** 15.7 ties boundary checks to existing sections, making violations objectively measurable

#### Key Principles

- **What we own:** Plan → Shop → Cook → Learn logistics

- **What stores own:** Stock and money (inventory, payments, fulfillment)

- **What users own:** Bodies and medical choices (health decisions, diet coaching)

- **Integration posture:** Cooperate with external tools, don't replace them

#### Placement Rationale

- Inserted as Section 15 (after Section 14: Learning & Adaptation, before Appendices)

- Completes "how the system works" operational guidance before appendices begin

- Positions boundaries as enforcement mechanism for maintaining vision integrity

---

## Version 4.4.0 - December 7, 2025

### 📚 Recipe Catalog & Time Bands

Added comprehensive operational constraints defining what recipes belong in VibeMeals and how time bands function as promises, not vibes.

#### Changes

- **New Section 8: Recipe Catalog & Time Bands** (inserted after DLE Promise, all subsequent sections renumbered)

- 8.1: Catalog Purpose – logistics first, not infinite discovery

- 8.2: Time Bands – The Contract (FAST ≤30min, NORMAL 30-50min, PROJECT >50min) with explicit connection to Section 5.2 household modes

- 8.3: Preflight – no hidden time bombs (thawing, marinating, slow-cooker start times)

- 8.4: Equipment Expectations – baseline vs optional equipment, tagging requirements

- 8.5: Ingredient Philosophy – boring-but-available over exotic-but-impressive

- 8.6: Portions & Scaling – canonical servings, graceful scaling for large households

- 8.7: Household-Mode Sensitivity – catalog filtering rules by mode (tightened from persona re-explanation to actionable filtering)

- 8.8: Catalog Hygiene – when to retag or remove recipes based on real-world behavior

- 8.9: Alignment with Golden Experiences – catalog rules as G1-G6 enforcement mechanisms

#### Refinements Applied

- **Time bands household mode connection (8.2):** Explicit guidance on which bands default for which modes (Family/Solo: FAST weeknights; Empty Nest/DINK: more NORMAL; PROJECT opt-in for all)

- **Household-mode sensitivity tightening (8.7):** Reframed as catalog filtering rules, not persona narrative repetition

- **G1-G6 enforcement clarity (8.9):** Added explicit statement that catalog violations = Golden Test violations, not suggestions

#### Impact

- **Prevents "Pinterest food" drift:** Clear operational definition of what recipes can enter core catalog

- **Time bands as contracts:** If real users experience longer/harder, we retag or remove—not aspirational marketing

- **G1 defense mechanism:** Time bands + preflight modeling are core enforcement for "tonight is actually cookable"

- **Curated over comprehensive:** Better to have fewer reliable recipes than huge catalog that breaks promises

#### Placement Rationale

- Inserted as Section 8 (right after Section 7: DLE Promise, before Golden Stories)

- Flow: DLE says "we provision reliably + respect time bands" → Recipe Catalog defines *what those mean* → Golden Stories test if promises hold

- Positions recipe constraints as core operational requirement, not late-stage content guidance

#### Section Renumbering

- Old Section 8 (Success Looks Like) → Section 9

- Old Section 9 (Non-Goals) → Section 10

- Old Section 10 (Why This Will Work) → Section 11

- Old Section 11 (Measuring Success) → Section 12

- Old Section 12 (Roadmap & Phasing) → Section 13

- Old Section 13 (Learning & Adaptation) → Section 14

- Old Section 14 (Appendices) → Section 15

---

## Version 4.3.0 - December 7, 2025

### 🧠 Learning & Adaptation Principles

Added comprehensive framework for how VibeMeals learns from user behavior without breaking trust, stability, or Golden Experiences [G1-G6].

#### Changes

- **New Section 13: Learning & Adaptation Principles**

- 13.1: Day-One Contract (system must work before it "knows you")

- 13.2: Signals We Learn From (explicit vs implicit, with weighting rules to prevent false positives)

- 13.3: What We Learn (And What We Don't) – lightweight household profile, not psychoanalysis

- 13.4: How Fast We Adapt – stability over hyper-reactive personalization; explicit connection to Section 5.2 household modes

- 13.5: Guardrails – what learning must never do to protect G1-G6

- 13.6: Transparency – legible one-sentence explanations with tone guardrails matching Section 4.1 voice

- 13.7: User Control – easy nudges and local resets without starting over

- 13.8: Baseline Behavior – defaults for low-data states ("a bit generic" not "wildly wrong")

- 13.9: How This Connects to the DLE – learning within DLE safety guarantees

#### Impact

- **Prevents AI product disasters:** Blocks overfitting, opacity, user-hostile learning patterns before implementation

- **Personalization as bonus:** Ensures learning enhances working system rather than being requirement for basic functionality

- **Operationally testable:** Section 13.5 explicitly ties learning guardrails to G1-G6, making violations objectively wrong

- **Cold-start clarity:** Section 13.8 gives teams concrete answer for edge cases and low-data states

#### Refinements Applied

- Added **signal weighting** subsection (13.2) clarifying explicit signals > implicit patterns

- Added **tone guardrails** examples (13.6) matching Section 4.1 voice ("tired but competent friend," never clinical)

- Added **household mode connection** (13.4) ensuring learning tunes within week shapes, not wholesale redefinition

#### Placement

- Inserted as Section 13 (after Roadmap, before Appendices) as "systems behavior" anchor

- Completes implementation-ready guidance: personas + pain + golden tests + tone + week shapes + **learning framework**

---

## Version 4.2.1 - December 7, 2025

### 🎙️ Tone & Emotional Contract

Added explicit voice and emotional contract guidelines to prevent the pain-driven design work from being undermined by guilt-trippy or judgmental UI copy.

#### Changes

- **New Section 4.1: Tone & Emotional Contract**

- Defines VibeMeals voice: "tired but competent friend" who is good at logistics, never judgmental

- 4 core emotional promises: normalize chaos, celebrate small wins, never weaponize data, side with user not system

- Concrete "do/don't say" examples for common pain points (5pm panic, missed preflight, takeout, waste, constraints)

- Special guidance for health constraints, low-confidence cooks, and confident cooks

- Copy guardrails with litmus test: "Does this make user feel helped or judged?"

- Explicit connection to Golden Experience Tests (G1, G2, G4, G5, G6)

#### Impact

- **Voice rail for all copy:** Copywriters, designers, and PMs now have concrete "good/bad" examples to reference

- **Prevents tone regression:** Makes it objectively wrong to add shame-based or blame-based messaging

- **Enforceable via Golden Tests:** Tone violations now map to experience test failures, not just "vibes"

- **Protects emotional safety:** Explicit commitment to supportive, non-judgmental language for all user states

#### Placement

- Inserted as Section 4.1 (right after Core Philosophy: Calm Automation) so tone principles are established early, before personas and pain deep-dives

---

## Version 4.2.0 - December 7, 2025

### 🎯 Household Modes & Week Shapes

Added critical operational anchor that defines what a "successful week" looks like for each household type, preventing drift toward one-size-fits-all assumptions.

#### Changes

- **New Section 5.2: Household Modes & Default Week Shapes**

- Defines 5 primary household modes: Family with Kids, Solo/Planning for One, DINK, Empty Nest, Large/Multi-Gen

- Specifies default week shape for each mode (# dinners, time mix, leftover patterns)

- Establishes "what good looks like" metrics per household type

- Adds cross-mode principles (5-10 min planning, one shop, flexible plans, visible preflight)

- Prevents regression to "7-dinner grid for everyone" default

#### Impact

- **Product clarity:** Clear defaults for planner UI, algorithm behavior, and success metrics by household type

- **Prevents scope drift:** Solo users shouldn't see 7-slot grids; families shouldn't be forced into 2-dinner minimalism

- **Measurable success:** "Good week" now defined per mode (2-3 cook nights for Kayla = success, not failure)

- **Design tie-breaker:** When tradeoffs arise, this section defines optimization priorities per household mode

#### Placement

- Inserted as Section 5.2 (after personas, before pain map) to bridge "who they are" → "what their successful week looks like" → "what hurts"

---

## Version 4.1.1 - December 7, 2025

### 🧹 Document Consolidation & Extraction

Streamlined `vision.md` by removing duplicate content, trimming redundant narrative prose, and extracting reusable checklists to a dedicated file.

#### Changes

- **Consolidated Appendix C:** Removed duplicate persona narratives from Appendix C; replaced with pointer to canonical Golden Stories (section 10) plus implementation-ready Given/When/Then acceptance tests

- **Trimmed Section 6.0:** Removed ~400 lines of redundant "week-in-the-life" narrative prose that duplicated structured pains in 6.1–6.7; added note pointing to structured pain categories

- **Extracted Persona Checklists:** Moved all 6 persona pain checklists (Ashley, Brianna, Kayla, Danielle, Jake & Maya, Ellen & Mark) to new `persona-checklists.md` for team-wide regression testing use

- **Added Section 6.8:** New "Pain-Driven Design Principles" summary distilling 10 core design rules from pain map

#### Impact

- Reduced `vision.md` from 4223 to ~3200 lines (~24% reduction)

- Created standalone `persona-checklists.md` (147 lines) for reusable regression testing

- Improved navigability while preserving all essential content

---

## Version 4.1.0 - December 7, 2025

### ✨ Golden Tests, Overlays, and Traceability

Compressed 11 scattered persona/constraint stories into **6 cross-cutting Golden Experience Tests** that serve as non-negotiable regression gates. Added comprehensive overlays for special constraints and full traceability.

### Key Additions

#### 1. **Experience Tests – Golden v1.1** (The 6 Gates)

- **G1: Tonight Is Actually Cookable** – Pre-committed plan + preflight + downgrade path

- **G2: Planning Is a 5–10 Minute Check-In** – One-tap generation, no admin marathons

- **G3: Safe Over Clever (Critical Ingredients)** – Never drop core items; SKU-level safety for constraints

- **G4: Plans Bend, They Don't Break** – Swap/skip as first-class actions, zero guilt

- **G5: Budget & Waste Respected** – Quiet savings without bookkeeping

- **G6: Respect Constraints & Ability Levels** – Health/ADHD/skill-level accommodations

All prior persona stories (Ashley, Brianna, Kayla, Jake & Maya, Ellen & Mark) and special-constraint examples now map to these 6 gates via `[G1–G6]` tags for quick traceability.

#### 2. **Special Constraints – Overlays**
Added 6 constraint overlays as modifiers on top of personas (not new personas):

- Health-Constrained Household (celiac, diabetes, GERD, etc.)

- ADHD / Executive Dysfunction

- Shift Worker / Irregular Hours

- Large / Multi-Generational Household

- Low-Confidence / New Cook

- Food-as-Hobby / Confident Cook

Each includes: Who this is, How it amplifies pains, Do NOT/Must guardrails, and an experience target.

#### 3. **Traceability – Stories to Golden Gates**
Quick-reference map showing which persona stories and acceptance tests support each of the 6 Golden gates for faster regression review.

#### 4. **Roadmap & Phasing**
Added MVP (Months 1–4), V2 (Months 5–8), and V3+ scope with explicit success metrics per phase and a "Defer/Never" list to guard against scope creep.

#### 5. **Table of Contents**
Inserted comprehensive linked TOC after version header for navigation across 4200+ lines.

### Structural Improvements

- Bumped version to 4.1.0 to reflect Golden suite consolidation

- Tagged all existing persona and acceptance stories with `[G1–G6]` labels

- Clarified Golden 1 to surface preflight state on Today view

- Clarified Golden 3 with explicit SKU-level safety for health constraints

---

## Version 4.0.0 - December 7, 2025

### 🎉 Initial Living Document Release

Complete rewrite of VibeMeals documentation with focus on implementation-readiness and zero-friction UX.

### Major Decisions & Rationale

#### 1. **Safe Defaults Over Gates**

- **Decision:** Remove all blocking gates (Quick Review, confirmation steps). Users can always proceed to shopping.

- **Rationale:** VibeMeals is a logistics co-pilot, not a validator. Make conservative assumptions (add everything to list) so users can move fast. Optimization is optional.

- **Impact:**

- `canProceedToShop()` always returns `true`

- Quick Review becomes optional cost-saving tool, not requirement

- Eliminates "Low confidence detected" error states

#### 2. **Learn from Behavior, Not Surveys**

- **Decision:** No upfront pantry setup, no diet questionnaires, no preference forms. Learn from what users buy, cook, and skip.

- **Rationale:** Setup forms create friction and often go stale. Actions reveal true preferences.

- **Impact:**

- FTUE reduced to 2 questions (servings, time preference), both optional

- Smart staples learn from Quick Review behavior (3+ weeks → promote to staple)

- Taste profile builds from Weekly Recap feedback, not surveys

#### 3. **Modular Store Architecture**

- **Decision:** Split state management into focused stores (`usePlanStore`, `useShoppingStore`, `useInventoryStore`, `useCookStore`, `useUserStore`, `useFeedbackStore`, `useNavigationStore`).

- **Rationale:** "God Store" pattern creates maintenance burden and tight coupling. Single-responsibility stores are easier to test and reason about.

- **Impact:**

- Each store has clear boundaries and purpose

- Easier to unit test

- Reduces merge conflicts in team development

#### 4. **Implicit Inventory Over Manual Entry**

- **Decision:** Infer inventory from Purchased + Cooked events. Make Pantry drawer optional (power-user feature).

- **Rationale:** Manual inventory management feels like chores. Most users will skip it. Implicit tracking "just works."

- **Impact:**

- Mark Purchased updates inventory automatically

- Cook Mode auto-deducts ingredients

- Pantry drawer available but not required for value

#### 5. **Auto-Confirm Where Possible**

- **Decision:** Reduce manual confirmation steps. After shopping/export → allow one-tap purchased. Opening Cook Mode → infer ingredients available.

- **Rationale:** Each confirmation step adds friction. Automate wherever safe; provide Undo for mistakes.

- **Impact:**

- Mark Purchased becomes one-tap: "Did you get everything? [Yes]"

- No item-by-item confirmation

- Global Undo makes mistakes reversible

#### 6. **Deterministic Rerolls**

- **Decision:** Use seeded RNG (`${userId}-${week}-${slotId}-${attemptCount}`) for recipe selection.

- **Rationale:** Predictability builds trust. Users shouldn't be surprised by random changes. Undo/redo should restore exact previous state.

- **Impact:**

- Rerolling with same inputs produces same output

- Undo is perfectly reversible

- Easier to debug issues ("Show me the seed")

#### 7. **Two-Stop Navigation (Plan → Shop)**

- **Decision:** Simplify navigation to two primary surfaces with drawers for everything else.

- **Rationale:** Reduces cognitive load. One big CTA per surface (Generate Plan, Next: Shop, Checkout). Drawers feel like "mini-assistants," not separate chore pages.

- **Impact:**

- Clearer user flow

- Fewer "where am I?" moments

- Mobile-friendly (vertical navigation)

#### 8. **Questions, Not Errors**

- **Decision:** Reframe low-confidence items as "questions" in conversational language. No technical jargon.

- **Rationale:** "Low confidence detected" sounds like an error. "I'm not sure if you already have these things" sounds like a helpful question.

- **Impact:**

- Quick Review feels collaborative, not punitive

- Lower bounce rate on review step

- Aligns with "calm automation" philosophy

#### 9. **Leftover Tracking & Reuse**

- **Decision:** Automatically track residuals (purchased vs. used quantities). Suggest recipes that use leftovers in future plans.

- **Rationale:** Waste minimization without user effort. Gentle nudges, not guilt.

- **Impact:**

- "🍚 Uses leftover rice" badges on recipe cards

- Quick Review offers "Use leftovers" option

- Expiry estimates with gentle prompts

#### 10. **Graceful Degradation**

- **Decision:** Always provide fallbacks. If exports fail → provide alternate format. No recipes match → offer to loosen constraints.

- **Rationale:** Third-party dependencies will fail. Don't let them break the user experience.

- **Impact:**

- CSV → Text fallback (no external carts)

- Generate Plan failures offer solutions, not dead ends

- Cook Mode resume after crash

---

### Documentation Structure

Created modular documentation suite:

- **`index.md`** - Navigation hub and quick reference

- **`vision.md`** - Why VibeMeals exists, philosophy, JTBD

- **`ux-spec.md`** - Detailed UI specifications, flows, copy, accessibility

- **`technical.md`** - State management, algorithms, API contracts, database schema

- **`policies.md`** - Non-negotiables, business rules, edge cases

- **`changelog.md`** - This file

---

### Key Features Defined

#### Core Surfaces

1. **Planner** - 7-day grid with slot actions (Lock, Swap, Reroll, Expand)

1. **Quick Review** (optional) - Save money by confirming what's on-hand

1. **Shopping** - Grouped list with CSV/text export

1. **Cook Mode** - Step-by-step cooking with timers and parallelization

1. **Weekly Recap** - Thumbs/favorites/tags feed taste profile

1. **Pantry** (optional) - Manual inventory for power users

1. **Calendar** (optional) - Preflight reminders via ICS/notifications

#### The Golden Path

1. Generate Plan (2-3 min)

1. Optionally tweak (Swap/Reroll/Lock)

1. Next: Shop (immediately available, no gates)

1. Checkout (CSV or text export)

1. Mark Purchased (auto where possible)

1. Cook throughout week

1. Weekly Recap (optional feedback)

#### Technical Stack

- **Frontend:** Nuxt 3, Pinia, Tailwind CSS

- **Backend:** Nitro/NestJS, PostgreSQL, Prisma, Redis

- **Third-Party:** FCM, SendGrid

- **Infrastructure:** Vercel/Railway, Supabase/Neon, Cloudflare

---

### Breaking Changes from Previous Versions

#### Removed Features

- ❌ **Review & Resolve as mandatory step** → Now optional Quick Review

- ❌ **Low confidence blocking export** → Safe defaults allow immediate shopping

- ❌ **Multi-step confirmation flows** → Auto-confirm with Undo

- ❌ **Upfront pantry setup** → Implicit inventory + optional manual override

- ❌ **Diet preference forms** → Learn from behavior

#### Renamed Concepts

- "Review & Resolve" → "Quick Review" (emphasizes optional optimization)

- "Replace All Lows" → "Quick Fix" (less technical jargon) → **Removed entirely** (no blocking lows)

- "Confidence bins" → Internal only (users see "questions")

- "Provisioned" status chip → "All set" / "Might need something"

#### New Features

- ✅ **Implicit inventory** from Purchased + Cooked events

- ✅ **Smart staples** that learn from household behavior

- ✅ **Leftover tracking** with reuse nudges

- ✅ **Day-of flexibility** (emergency swaps for time changes)

- ✅ **Thaw fail-safe** (missed thaw? get fast alternatives)

- ✅ **Cook Mode resume** after crash

- ✅ **Global Undo** with 50-entry history stack

---

### Non-Functional Changes

#### Accessibility

- Full keyboard navigation with visible focus states

- Screen reader support with ARIA labels and live regions

- WCAG AA contrast ratios

- 44×44px touch targets on mobile

#### Performance

- Lazy load recipe images

- Debounced search/filter inputs

- Optimistic UI updates with rollback on error

- Redis caching for frequently accessed data

#### Testing Strategy

- **Unit tests:** Vitest for stores, algorithms, utilities

- **E2E tests:** Playwright for Golden Path scenarios

- **Acceptance criteria:** Defined inline in UX spec

---

### Migration Guide (For Existing Users - N/A for v4.0.0)

This is the initial release; no migration needed.

For future versions, migration guides will be added here.

---

### Known Limitations (MVP)

- Single household account (no multi-user)

- Dinner only (no breakfast, lunch as primary meal)

- English language only

- US-based stores (no active grocer integration)

- Recipe catalog curated by VibeMeals (no user-submitted recipes)

- No meal kit delivery integration

---

### Future Considerations (Post-MVP)

- Multi-household support

- Breakfast and lunch as primary meals

- Internationalization (i18n)

- Additional store integrations (Kroger, Target, Instacart)

- User-submitted recipes

- Social features (share plans, follow friends)

- Advanced nutrition tracking

- Voice-based recipe browsing

- Smart home integration (Alexa, Google Home)

---

## Changelog Template (For Future Updates)

### Version X.Y.Z - Date

#### Added

- New feature descriptions

#### Changed

- Breaking changes

- UX improvements

- Policy updates

#### Deprecated

- Features marked for future removal

#### Removed

- Deleted features with rationale

#### Fixed

- Bug fixes and edge case handling

#### Security

- Security updates

#### Major Decisions

- New architectural choices with rationale

---

#### [Back to Index](index.md)
