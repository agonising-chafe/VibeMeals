# VibeMeals

Meal planning, shopping, and cooking workflows that actually work.

**Current Version:** 1.0.0 (Backend MVP – Domain Logic + Tests, No UI yet)

## Quick Start

```bash
npm install
npm test
```

## Environment

No external integrations are active in this scope. Recipe import
pipeline is disabled; add recipes manually per
`docs/recipe-spec.md`.

## Project Structure

```text
src/domain/
  ├── types.ts
  │     # Shared types (synced with docs/data-model.md v1.2.0)
  ├── planner.ts
  │     # Week planning, recipe selection, swaps, locks
  │     # (468 lines)
  ├── shop.ts
  │     # Shopping list generation & optimization
  │     # (149 lines)
  ├── today.ts
  │     # Tonight's readiness detection
  │     # (225 lines)
  ├── preflight.ts
  │     # Preflight requirement detection
  │     # (216 lines)
  ├── recipes/
  │     # 14 curated recipes with full ingredient metadata
  ├── __tests__/
  │     # 56 unit/spec tests (all passing)
  ├── __acceptance__/
  │     # 6 Golden Experience Tests - G1 through G6
  │     # (all passing)
  └── fixtures/
        # Test/seed data (mvpRecipeCatalog)

docs/
  ├── vision.md
  │     # Product vision & Golden Tests (4749 lines)
  ├── data-model.md
  │     # Type contracts v1.2.0
  │     # (markdownlint compliant)
  ├── spec-planner.md
  │     # Planner surface spec (domain logic ✅ implemented)
  ├── spec-shop.md
  │     # Shop surface spec (domain logic ✅ implemented)
  ├── spec-today.md
  │     # Today surface spec (domain logic ✅ implemented)
  ├── recipe-spec.md
  │     # Recipe structure requirements
  ├── technical.md
  │     # Full-stack architecture (backend done,
  │     # UI/DB planned v1.1+)
  └── changelog.md
        # Release notes (v1.0.0 with comprehensive entry)

scripts/
  ├── validate-type-sync.ts
  │     # Type/spec sync checker
  └── (recipe import scripts disabled in v1.0.0)
```

## Development

```bash
# Run all 62 tests (56 unit/spec + 6 acceptance)
npm test

# Type check
npx tsc --noEmit

# Validate type sync with specs
npm run validate:types

# Preview week planning
npm run dev:preview
npm run dev:planner
```

## Documentation

See `docs/` for detailed specifications:

- **vision.md** - Product vision and Golden Tests (G1-G6)
- **data-model.md** - Shared data contracts (v1.2.0)
- **recipe-spec.md** - Recipe requirements
- **spec-planner.md, spec-shop.md, spec-today.md**
  - Surface specifications (domain logic ✅ implemented)
  - UI planned v1.1+
- **technical.md**
  - Full-stack architecture (backend ✅ complete)
  - Frontend/database planned v1.1+
- **changelog.md** - Release notes (v1.0.0)

## Golden Experience Tests (v1.0.0) ✅

All 6 tests passing with real personas (Ashley + Kayla):

- **G1** - Tonight is actually cookable
  - No surprise unfrozen proteins or missing items
- **G2** - Shopping is minimized
  - Critical vs non-critical ingredients clearly split
- **G3** - One-trip shopping is possible
  - Ingredients consolidate across recipes
- **G4** - Plans can bend without breaking
  - Swap/remove dinners; plan stays valid
- **G5** - Personas feel heard
  - DINK household gets 2-person-appropriate recipes
- **G6** - Dinner never feels boring
  - Variety in time bands and cuisines

See
`src/domain/__acceptance__/personas-ashley-kayla.spec.ts`
for the full acceptance test suite.

## Architecture Highlights

### Domain-Driven Design

- Planner (486 lines)
  - Shop (149 lines)
  - Today (225 lines)
  - Preflight (247 lines)
  - All are separate, testable modules
- Shared types in `types.ts`
  - (263 lines, perfectly synced with docs/data-model.md v1.2.0)
- No global state; explicit function-based data passing

### Spec-First Development

- Every function traces to a documented spec section and version
- Golden Tests (G1-G6) as acceptance criteria—all passing

### Testing & Quality

- 56 unit/spec tests across all domains (`src/domain/__tests__/`)
- 6 Golden Experience Tests (G1–G6)
  - With real personas (`src/domain/__acceptance__/`)
- All 62 tests passing with 100% domain coverage

### Recipe Catalog (v1.0.0 - 14 recipes)

- **3 FAST** (≤30 min):
  - One-Pot Creamy Mushroom Pasta
  - Simple Chicken Fajitas
  - Spaghetti Aglio e Olio

- **6 NORMAL** (30–60 min):
  - Beef Stroganoff
  - Lasagna Soup
  - One-Pot Cajun Chicken Pasta
  - One-Pot Teriyaki Chicken & Rice
  - One-Pot Chicken Rice
  - Southern Meatloaf

- **5+ PROJECT** (>60 min):
  - Baked Mac & Cheese
  - BBQ Ribs
  - Easy Baked Ziti
  - Homestyle Chicken Noodle Soup
  - Oven-Baked Chicken Drumsticks
  - Slow Cooker Pulled Pork
  - Slow Cooker White Chicken Chili

Each recipe includes:

- ingredient criticality (`CRITICAL` / `NON_CRITICAL`)
- shopping category
- ingredient kind
- normalized amounts/units
- step-by-step instructions
- preflight requirements

## What's Next (v1.1+)

- Nuxt 3 web UI with responsive design
- PostgreSQL database with Prisma ORM
- REST/GraphQL API layer
- User authentication & household management
- Multi-week planning & persistence
- AI-powered recipe suggestions (optional)

## License

Private
