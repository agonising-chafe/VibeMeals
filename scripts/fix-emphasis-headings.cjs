#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const p = path.join(dir, file);
    const stat = fs.statSync(p);
    if (stat && stat.isDirectory()) {
      results.push(...walk(p));
    } else if (p.endsWith('.md')) {
      results.push(p);
    }
  });
  return results;
}

function processFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  let inFence = false;
  const out = [];
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // detect code fence (``` or ```lang)
    if (/^```/.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    // skip table rows to avoid breaking them
    if (line.includes('|') && /\|/.test(line)) {
      out.push(line);
      continue;
    }

    // match a whole-line emphasis (e.g. **Text**, *Text*, _Text_)
    const m = line.match(/^\s*([*_]{1,2})(.+?)\1\s*$/);
    if (m) {
      const content = m[2].trim();
      // ensure blank line before
      if (out.length > 0 && out[out.length - 1].trim() !== '') {
        out.push('');
      }
      out.push('#### ' + content);
      // ensure a blank line after heading if next line isn't blank (we'll handle when next pushes)
      changed = true;
      continue;
    }

    // for top-level list items, ensure a blank line before the list
    if (/^\s*[-+*]\s+/.test(line)) {
      if (out.length > 0 && out[out.length - 1].trim() !== '') {
        out.push('');
      }
    }

    out.push(line);
  }

  const newText = out.join('\n');
  if (newText !== text) {
    fs.writeFileSync(filePath, newText, 'utf8');
    changed = true;
  }
  return changed;
}

const docsDir = path.join(__dirname, '..', 'docs');
const files = walk(docsDir);
let modified = [];
for (const f of files) {
  try {
    if (processFile(f)) modified.push(f);
  } catch (err) {
    console.error('ERROR processing', f, err.message);
  }
}

if (modified.length) {
  console.log('Modified files:');
  for (const m of modified) console.log(' -', m);
  process.exit(0);
} else {
  console.log('No changes made.');
  process.exit(0);
}
