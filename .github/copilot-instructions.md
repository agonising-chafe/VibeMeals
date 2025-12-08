   # Copilot Instructions for VibeMeals


## Project Overview
- **TypeScript monorepo** for meal planning, shopping, and cooking workflows.
- All implementation is governed by detailed specs and data models in `docs/`.
- Key domains: `shop`, `today`, and `types` in `src/domain/`.
- Developer preview and utility scripts in `src/dev/`.
- Seed data for recipes in `src/domain/fixtures/`.


## Architecture & Patterns
- **Spec-first, doc-driven**: All code, types, and flows must trace to a section and version in `docs/` (see below).
- **Golden Tests**: All logic must pass the "Golden Experience Tests" defined in `docs/vision.md` and referenced in each surface spec.
- **Domain-driven structure**: Each domain (e.g., `shop`, `today`) encapsulates business logic and types.
- **Types**: Centralized in `src/domain/types.ts` for strong typing and cross-domain contracts. **CRITICAL**: `types.ts` must stay in perfect sync with `docs/data-model.md`. Any change to one requires updating the other.
- **Tests**: Located in `src/domain/__tests__/`, using `.spec.ts` naming.
- **Fixtures**: Use `src/domain/fixtures/recipes.seed.ts` for test and dev data.
- **Preview scripts**: `src/dev/preview-week.ts` for manual/test runs of planning logic.
- **Tech stack**: Currently pure TypeScript with Node.js. `docs/technical.md` describes the planned full-stack architecture (Nuxt 3, PostgreSQL, etc.) which is not yet implemented.
## Doc-Driven Development

- **Specs are authoritative**: All implementation must align with the specs in `docs/` (especially `vision.md`, `spec-planner.md`, `spec-shop.md`, `spec-today.md`, and `data-model.md`).
- **No ad hoc extensions**: Never introduce new data structures, flows, or features without updating the corresponding spec and data model.
- **Traceability**: All new code, types, and flows must reference the relevant spec section and version.
- **Acceptance criteria**: Use the "Golden Tests" in the specs as the standard for correctness.
- **Personas and UX**: User personas and pain points in the specs should inform all logic and flows.
- **Sync workflow**: When changing data structures: (1) Update `docs/data-model.md` first, (2) Update `src/domain/types.ts` to match exactly, (3) Update version/date in both files, (4) Implement code using the updated types.


## Workflows
- **Build**: Use `tsc` (TypeScript compiler). No custom build scripts detected.
- **Test**: Place tests in `src/domain/__tests__/`. Use `npm test` (Vitest). No coverage script is defined yet.
- **Fixtures/Seeding**: Use `src/domain/fixtures/recipes.seed.ts` for test/dev data. No post-install scripts required unless noted in `package.json`.
- **Debug**: Run scripts in `src/dev/` with `npx ts-node` or after compiling with `node`.
- **Lint/Type Check**: Run `npx tsc --noEmit` for type checks. Linting is not enforced unless configured in `package.json`.
- **Validate Type Sync**: Run `npm run validate:types` to check if `types.ts` and `data-model.md` are in sync.
- **CI/CD**: No CI/CD config detected; if present, check `.github/workflows/` or `package.json` scripts for automation steps.


## Conventions
- **File naming**: Use kebab-case for files, camelCase for variables/functions, PascalCase for types/classes.
- **Type safety**: Always define and import types from `src/domain/types.ts`.
- **No global state**: Prefer explicit data passing between modules.
- **Test data**: Use fixtures for repeatable tests.
- **Extensibility**: To add new features, create a new domain file in `src/domain/`, update `types.ts` for shared types, and add tests in `__tests__/`. Avoid modifying unrelated domains directly.


## Integration & Dependencies
- **External dependencies**: Review `package.json` for libraries (e.g., Vitest, ts-node, etc.). Install with `npm install`.
- **API integration (feature-flagged)**: Walmart pricing via `USE_WALMART_PRICING=true` plus `WALMART_CLIENT_ID` / `WALMART_CLIENT_SECRET`. Missing/invalid creds keep service in fallback (null price, in-stock true, no itemId) and log a one-time warning.
- **Cross-domain communication**: Domains interact via shared types in `src/domain/types.ts`. Direct imports between domains are allowed only for type-safe, explicit data flows.



## Examples
- To add a new domain or feature: First update the relevant spec(s) and data model in `docs/`, then implement in `src/domain/`, update types in `types.ts`, add tests in `__tests__/`, and update fixtures if needed. Reference the spec section in code comments if possible.
- To run a preview: `npx ts-node src/dev/preview-week.ts` (or compile and run with Node).
- To check types: `npx tsc --noEmit`
- To run all tests with coverage: `npx jest --coverage`



## Key Files & Directories
- `docs/vision.md`: Product vision, Golden Tests, personas, and system boundaries (authoritative)
- `docs/spec-*.md`: Surface specs for Planner, Shop, Today, Cooking (implementation contracts)
- `docs/data-model.md`: Shared TypeScript data model (must match `src/domain/types.ts`)
- `src/domain/types.ts`: Shared types for all domains (must mirror `docs/data-model.md`)
- `src/domain/shop.ts`, `src/domain/today.ts`: Core business logic
- `src/domain/__tests__/`: Test cases (Jest)
- `src/domain/fixtures/recipes.seed.ts`: Seed/fixture data for tests/dev
- `src/dev/preview-week.ts`: Manual/dev preview script
- `package.json`: Scripts, dependencies, and test/lint config
- `docs/`: Specifications and technical documentation

---
For more details, see `docs/` for specifications and technical documentation.
