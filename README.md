# VibeMeals

Meal planning, shopping, and cooking workflows that actually work.

## Quick Start

```bash
npm install
npm test
```

## Environment

No external integrations are active in this scope. Recipe import pipeline is disabled; add recipes manually per `docs/recipe-spec.md`.

## Project Structure

```
src/domain/
  ├── types.ts              # Shared types (synced with docs/data-model.md)
  ├── shop.ts               # Shopping list generation
  ├── today.ts              # Tonight's cooking readiness
  ├── recipes/              # Imported recipe files
  └── fixtures/             # Test/seed data

docs/                       # Comprehensive specifications
  ├── vision.md             # Product vision & Golden Tests
  ├── data-model.md         # Type contracts
  └── spec-*.md             # Surface specifications

scripts/
  ├── import-recipe-url.ts  # Stub (disabled). Add recipes manually.
  └── validate-type-sync.ts # Type/spec sync checker
```

## Development

```bash
# Run tests
npm test

# Type check
npx tsc --noEmit

# Validate type sync
npm run validate:types

# Preview week planning
npm run dev:preview
```

## Documentation

See `docs/` for detailed specifications:
- **vision.md** - Product vision and Golden Tests (G1-G6)
- **data-model.md** - Shared data contracts
- **recipe-spec.md** - Recipe requirements
- **spec-*.md** - Surface specifications (Planner, Shop, Today, Cooking)

## Recipe Import Examples

### Budget Bytes
```bash
npm run import:url -- https://www.budgetbytes.com/sheet-pan-chicken-fajitas/
```

### Serious Eats
```bash
npm run import:url -- https://www.seriouseats.com/easy-skillet-chicken-thighs-with-lemon-herb-pan-sauce-recipe
```

### Any site with JSON-LD recipe schema
Most modern recipe sites work automatically.

## License

Private
