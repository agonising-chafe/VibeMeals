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

## Writing & updating documentation

All documentation is linted in CI for quality and consistency. Follow these steps when editing or adding docs:

- Run the strict linter locally before pushing to catch CI failures early:

```bash
npm run lint:md:strict
```

## Local developer setup

- After pulling the repository, install dependencies and set up local hooks:

```bash
npm ci
npm run prepare   # installs husky hooks
```

- If you're working on docs exclusively, you can run the strict doc linter:

```bash
npm run lint:md:strict
```

### Secrets & local scanning

- This repo uses a combination of a GitHub secret scan action (gitleaks) and a local pre-commit hook to prevent accidental inclusion of secrets in the repo. After running `npm ci`, install Husky hooks with `npm run prepare` to get the `pre-commit` hook.

```bash
npm ci
npm run prepare
```

If you still accidentally commit a key, rotate it immediately and open a PR to revoke the key where it was generated.

- If the linter complains and the formatting is intentional (rare), add a per-file override entry to `.markdownlint.strict.json`, for example:

```json
{
  "MD024": { "siblings_only": true },
  "MD033": { "allowed_elements": ["script"] }
}
```

- Avoid disabling rules globally unless absolutely necessary; prefer targeted per-file overrides and document the rationale in your PR.

- CI will upload `reports/markdown-lint-strict.txt` for strict lint failures; check the artifact to see exactly what needs fixing.

Keeping docs tidy helps reviewers and prevents regressions; please follow these steps for every doc change.

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
