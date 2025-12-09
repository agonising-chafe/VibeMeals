#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function isMarkdown(file) { return /.md$/i.test(file); }

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else if (e.isFile() && isMarkdown(e.name)) files.push(full);
  }
  return files;
}

function processFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  let inFence = false;
  let fenceMarker = null;
  const out = [];
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // detect code fence
    const fm = line.match(/^(\s*)(`{3,}|~{3,})(.*)$/);
    if (fm) {
      if (!inFence) { inFence = true; fenceMarker = fm[2]; }
      else if (fm[2] === fenceMarker) { inFence = false; fenceMarker = null; }
      out.push(line);
      continue;
    }

    // Remove trailing spaces, but preserve exactly two spaces (Markdown hard break)
    const trailing = line.match(/(\s+)$/);
    if (trailing) {
      const count = trailing[1].length;
      if (count === 1) {
        line = line.replace(/\s+$/, '');
        changed = true;
      } else if (count > 2) {
        line = line.replace(/\s+$/, '  ');
        changed = true;
      }
    }

    // If we're inside a fence, just output trimmed line
    if (inFence) { out.push(line); continue; }

    // Skip table rows
    if (/^\s*\|/.test(line) || (/\|/.test(line) && !/^\s*([-+*]|\d+\.|#+)\s+/.test(line))) {
      out.push(line);
      continue;
    }

    // Headings: ensure blank line before (except if at file start or prev is blank or prev is another heading)
    if (/^\s{0,3}#{1,6}\s+/.test(line)) {
      const prev = out.length ? out[out.length - 1] : null;
      const prevTrim = prev === null ? null : prev.trim();
      if (prev !== null && prevTrim !== '' && !/^#{1,6}\s+/.test(prevTrim)) {
        out.push('');
        changed = true;
      }
      out.push(line);
      continue;
    }

    out.push(line);
  }

  const newText = out.join('\n');
  if (newText !== text) {
    fs.writeFileSync(file, newText, 'utf8');
    changed = true;
  }
  return changed;
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Usage: node trim-trailing-and-fix-headings.cjs <file-or-dir>');
    process.exit(2);
  }
  const target = args[0];
  const abs = path.isAbsolute(target) ? target : path.join(process.cwd(), target);
  if (!fs.existsSync(abs)) { console.error('Path not found:', abs); process.exit(2); }

  let candidates = [];
  const stat = fs.statSync(abs);
  if (stat.isDirectory()) candidates = walk(abs);
  else if (stat.isFile() && isMarkdown(abs)) candidates = [abs];
  else { console.error('No markdown files found at path'); process.exit(2); }

  const modified = [];
  for (const f of candidates) {
    try {
      if (processFile(f)) modified.push(f);
    } catch (e) {
      console.error('Error processing', f, e.message);
    }
  }

  if (modified.length) {
    console.log('Updated files:');
    modified.forEach(f => console.log('  ' + f));
  } else console.log('No changes');
}

main();
