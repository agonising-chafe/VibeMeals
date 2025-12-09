#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function isMarkdown(file) { return /\.md$/i.test(file); }

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
  let changed = false;
  const out = [];

  for (let line of lines) {
    const fm = line.match(/^\s*(```+|~~~+)(.*)$/);
    if (fm) {
      // toggle fence state
      if (!inFence) { inFence = true; fenceMarker = fm[1]; }
      else if (fm[1] === fenceMarker) { inFence = false; fenceMarker = null; }
      out.push(line);
      continue;
    }
    if (inFence) { out.push(line); continue; }

    // skip table rows
    if (/^\s*\|/.test(line) || (/\|/.test(line) && !/^\s*([-+*]|\d+\.|#+)\s+/.test(line))) {
      out.push(line);
      continue;
    }

    // skip lines containing inline code/backticks to avoid breaking `code_like_names`
    if (/`/.test(line)) { out.push(line); continue; }

    // perform conservative replacement: only when underscores are surrounded by whitespace or line boundaries
    // pad line to make \s-based lookarounds safe
    const padded = ' ' + line + ' ';
    let replaced = padded
      .replace(/(?<=\s)__(.+?)__(?=\s)/g, (m, p1) => ' **' + p1 + '** ')
      .replace(/(?<=\s)_(.+?)_(?=\s)/g, (m, p1) => ' *' + p1 + '* ');

    const newLine = replaced.slice(1, -1);
    if (newLine !== line) changed = true;
    out.push(newLine);
  }

  if (changed) fs.writeFileSync(file, out.join('\n'), 'utf8');
  return changed;
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Usage: node convert-underscore-emphasis.cjs <file-or-dir>');
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
    console.log('Converted underscore emphasis to asterisk in files:');
    modified.forEach(f => console.log('  ' + f));
  } else console.log('No changes');
}

main();
