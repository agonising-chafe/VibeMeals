#!/usr/bin/env python3
"""
Scan the repository for references to npm scripts and path fragments in Markdown files.
Generates a report at `reports/doc-drift-report.txt`.
"""
import re
import json
from pathlib import Path
import sys

repo_root = Path(__file__).resolve().parent.parent
reports_dir = repo_root / 'reports'
reports_dir.mkdir(exist_ok=True)
report_file = reports_dir / 'doc-drift-report.txt'

# Load package.json scripts
pkg_file = repo_root / 'package.json'
if not pkg_file.exists():
    print('package.json not found at', pkg_file)
    sys.exit(1)

pkg = json.loads(pkg_file.read_text(encoding='utf-8'))
scripts = pkg.get('scripts', {})
script_keys = list(scripts.keys())

# Patterns
npm_pattern = re.compile(r"\bnpm\s*(?:run|run-script)?\s+([A-Za-z0-9:_-]+)\b", re.I)
script_path_pattern = re.compile(r"\b(?:scripts|script)[/\\][\w\-./\\]+", re.I)
src_path_pattern = re.compile(r"\bsrc[/\\][\w\-./\\]+", re.I)
# We'll also search for explicit script-name tokens that match package.json keys (backticked or plain)

def find_matches_in_text(path, text):
    results = {'npm_runs': [], 'script_paths': [], 'src_paths': [], 'script_key_mentions': []}
    for m in npm_pattern.finditer(text):
        results['npm_runs'].append(m.group(1))
    for m in script_path_pattern.finditer(text):
        results['script_paths'].append(m.group(0))
    for m in src_path_pattern.finditer(text):
        results['src_paths'].append(m.group(0))
    # find mentions of known script keys
    for key in script_keys:
        # match as whole token or backticked
        pat = re.compile(rf"(?<![\w:-]){re.escape(key)}(?![\w:-])")
        if pat.search(text):
            results['script_key_mentions'].append(key)
    # make unique preserving order
    for k in results:
        seen = set()
        out = []
        for item in results[k]:
            if item not in seen:
                seen.add(item)
                out.append(item)
        results[k] = out
    return results

# Files to scan: all .md files in repo, but prioritize docs/
md_files = list(repo_root.rglob('*.md'))
md_files = [p for p in md_files if not any(part.startswith('.git') for part in p.parts)]
md_files_sorted = sorted(md_files)

report_lines = []
report_lines.append(f'Repo root: {repo_root}\n')
report_lines.append(f'Found {len(md_files_sorted)} markdown files to scan.\n')

total_matches = {'npm_runs':0,'script_paths':0,'src_paths':0,'script_key_mentions':0}

for p in md_files_sorted:
    try:
        text = p.read_text(encoding='utf-8')
    except Exception as e:
        report_lines.append(f'Could not read {p}: {e}\n')
        continue
    m = find_matches_in_text(p, text)
    if any(m.values()):
        report_lines.append(f'File: {p.relative_to(repo_root)}')
        if m['npm_runs']:
            report_lines.append(f'  npm run occurrences: {m["npm_runs"]}')
            total_matches['npm_runs'] += len(m['npm_runs'])
        if m['script_key_mentions']:
            report_lines.append(f'  script keys mentioned: {m["script_key_mentions"]}')
            total_matches['script_key_mentions'] += len(m['script_key_mentions'])
        if m['script_paths']:
            report_lines.append(f'  scripts/... fragments: {m["script_paths"]}')
            total_matches['script_paths'] += len(m['script_paths'])
            # existence checks
            for frag in m['script_paths']:
                candidate = repo_root / frag
                exists = candidate.exists()
                report_lines.append(f'    -> {frag} exists: {exists}')
        if m['src_paths']:
            report_lines.append(f'  src/... fragments: {m["src_paths"]}')
            total_matches['src_paths'] += len(m['src_paths'])
            for frag in m['src_paths']:
                candidate = repo_root / frag
                exists = candidate.exists()
                report_lines.append(f'    -> {frag} exists: {exists}')
        report_lines.append('')

report_lines.append('Summary:')
report_lines.append(f"  npm run matches: {total_matches['npm_runs']}")
report_lines.append(f"  script key mentions: {total_matches['script_key_mentions']}")
report_lines.append(f"  scripts/... fragments: {total_matches['script_paths']}")
report_lines.append(f"  src/... fragments: {total_matches['src_paths']}")
report_lines.append('\nPackage.json scripts:')
for k in script_keys:
    report_lines.append(f'  - {k}')

# Also list any package.json scripts that were not mentioned in docs
mentioned = set()
for line in report_lines:
    # crude collect
    for key in script_keys:
        if key in line:
            mentioned.add(key)

not_mentioned = [k for k in script_keys if k not in mentioned]
report_lines.append('\nScripts not mentioned in docs:')
for k in not_mentioned:
    report_lines.append(f'  - {k}')

report_text = '\n'.join(report_lines)
report_file.write_text(report_text, encoding='utf-8')
print(f'Report written to {report_file}')
print('Done.')
