# Imported Spoonacular Outputs

This directory contains non-destructive import outputs from `scripts/import-spoonacular.ts`.

Guidelines:

- Files here are not used by the planner or fixtures unless you explicitly move them into `src/domain/recipes/` and update `src/domain/fixtures/recipes.seed.ts`.
- Each import file contains `{ mapped, raw }` where `mapped` is our `Recipe` shape and `raw` is the original Spoonacular response.
- Keep provenance metadata intact (`mapped.provenance`).

To import a recipe locally (example):

```pwsh
$env:SPOONACULAR_API_KEY = 'your_key_here'
npx ts-node scripts/import-spoonacular.ts 716429
```

After review, copy selected mapped JSON into `src/domain/recipes/` as a `.ts` file following existing patterns, and add it to `src/domain/fixtures/recipes.seed.ts` if desired.
