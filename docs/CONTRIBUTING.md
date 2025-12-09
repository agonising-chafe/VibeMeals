# Linting Note

`docs/vision.md` is intentionally excluded from Markdownlint checks.  
It is a LOCKED specification (v4.6.0) with deliberate repeated headings (for example: "Given", "When", "Design/Eng Notes") and punctuation that produces stable, human-readable fragments. Changing it for lint compliance would violate the lock.

## Markdown linting for `docs/`

We use markdownlint with a pragmatic default configuration so docs authoring is low-friction.

- `npm run lint:md` — runs markdownlint with the repository's default config (`.markdownlint.json`). This is the gate we expect CI to run.
- `npm run lint:md:strict` — runs markdownlint with `.markdownlint.strict.json`. This is an optional audit tool to surface stricter style rules (heading increments, duplicate headings, fenced-code languages). Do not wire this into CI; use it for one-off audits.

Guidance:

- If `lint:md` fails during a PR, fix the reported issues or adjust the config collaboratively.
- Use `lint:md:strict` when preparing a cleanup pass; treat its findings as suggestions unless you decide to make strict mode a project standard.

If you need to exclude a specific doc (e.g., a locked spec), add it to `.markdownlintignore` with a brief rationale comment in the PR.

## Pre-merge checklist

- **Run the pragmatic gate:** `npm run lint:md` and **unit tests:** `npm test` before merging any PR that touches `docs/` or core logic.

## Quick fixes / Panic button

- If a docs edit produces noisy lint output or you did a large bulk edit, run the repository normalizer and re-check the pragmatic gate:

```powershell
pwsh scripts/normalize-docs-md.ps1
npm run lint:md
```

- Use `npm run lint:md:strict` as an occasional health check (pre-release, large cleanup) rather than a blocking CI gate.
