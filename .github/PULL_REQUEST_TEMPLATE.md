# Summary

<!-- Short description of what this PR does. -->

- Surface(s): <!-- Planner / Shop / Today / Cooking / Docs / Domain -->
- Type: <!-- Feature / Fix / Chore / Docs -->

## Checklist

Before requesting review, I have:

- [ ] Run unit tests locally:

  ```bash
  npm test
  ```

- [ ] Run pragmatic markdown lint (if docs changed):

  ```bash
  npm run lint:md
  ```

- [ ] Run strict markdown lint (if docs changed):

  ```bash
  npm run lint:md:strict
  ```

  If the strict linter flags intentional formatting, add a per-file override to `.markdownlint.strict.json` and explain the reason in the PR description.

- [ ] (If I touched data-model or domain types) Verified types are in sync:

  ```bash
  npm run validate:types
  ```

- [ ] (If I edited docs heavily) Optionally normalized docs:

  ```bash
  # optional but recommended for big doc edits
  pwsh scripts/normalize-docs-md.ps1
  ```

## Screenshots / Output (if relevant)

<!-- e.g., CLI preview output, Planner screenshot, etc. -->
