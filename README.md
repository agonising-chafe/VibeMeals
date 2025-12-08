# VibeMeals

Meal planning, shopping, and cooking workflows that actually work.

## Quick Start

```bash
npm install
npm test
```

## Recipe Import

Import recipes from URLs with AI-enhanced metadata:

```bash
# Set your Gemini API key (optional but recommended)
export GEMINI_API_KEY="your_key_here"

# Import a recipe
npm run import:url -- https://www.budgetbytes.com/sheet-pan-chicken-fajitas/
```

The importer will:
1. ✅ Scrape recipe from URL (JSON-LD schema)
2. 🤖 Enhance with AI (criticality, preflight, time band)
3. 📝 Interactive review session
4. 💾 Save to `src/domain/recipes/`

### Without AI (manual enhancement)

Works fine without API key - you'll just do more manual review:

```bash
npm run import:url -- https://www.seriouseats.com/easy-skillet-chicken/
```

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
  ├── import-recipe-url.ts  # Recipe URL importer
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
