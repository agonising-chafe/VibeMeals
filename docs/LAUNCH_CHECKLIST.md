# VibeMeals – Launch Checklist

Before cutting a release build:

1. **Core health**
   - [ ] `npm test` passes
   - [ ] `npm run lint:md` passes
   - [ ] `npm run validate:types` passes

2. **Domain sanity**
   - [ ] `npm run dev:preview-cli` runs and prints a sane week
   - [ ] Tonight state shows `READY` / `MISSED_PREFLIGHT` / `MISSING_INGREDIENT` as expected

3. **Docs**
   - [ ] Major docs updated (Vision, Specs, Data Model, Tickets)
   - [ ] (Optional) `npm run lint:md:strict` reviewed; no scary new issues

4. **Git hygiene**
   - [ ] `git status` clean
   - [ ] `reports/` not tracked
