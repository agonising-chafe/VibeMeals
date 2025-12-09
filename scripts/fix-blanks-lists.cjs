#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  let inFence = false;
  let fenceMarker = null;
  const out = [];
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // detect code fence
    const fm = line.match(/^\s*(```+|~~~+)(.*)$/);
    if (fm) {
      if (!inFence) {
        inFence = true; fenceMarker = fm[1];
      } else if (fm[1] === fenceMarker) {
        inFence = false; fenceMarker = null;
      }
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    // skip table rows (start with | or contain | and not start with list/heading)
    if (/^\s*\|/.test(line) || (/\|/.test(line) && !/^\s*([-+*]|\d+\.|#+)\s+/.test(line))) {
      out.push(line);
      continue;
    }

    // headings: ensure blank line before (except if previous is start of file or previous is another heading)
    if (/^\s{0,3}#{1,6}\s+/.test(line)) {
      const prev = out.length ? out[out.length - 1] : '';
      if (prev.trim() !== '') {
        out.push('');
        modified = true;
      }
      out.push(line);
      continue;
    }

    // list item detection
    const listMatch = line.match(/^(\s*)([-+*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const leading = listMatch[1] || '';
      const marker = listMatch[2];
      const rest = listMatch[3] || '';
      // compute normalized indent: top-level 0, nested levels by groups of 2 spaces
      const currentSpaces = leading.replace(/\t/g, '    ').length;
      const level = Math.max(0, Math.floor(currentSpaces / 2));
      const newIndent = ' '.repeat(level * 2);
      const newLine = newIndent + marker + ' ' + rest;

      // ensure blank line before a top-level list (level 0) or when previous line is not blank
      const prev = out.length ? out[out.length - 1] : '';
      if (prev.trim() !== '') {
        out.push('');
        modified = true;
      }

      if (newLine !== line) modified = true;
      out.push(newLine);
      continue;
    }

    // non-list non-heading normal line: just push
    out.push(line);
  }

  const newText = out.join('\n');
  if (newText !== text) {
    fs.writeFileSync(filePath, newText, 'utf8');
    modified = true;
  }
  return modified;
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Usage: node fix-blanks-lists.cjs <file>');
    process.exit(2);
  }
  const file = args[0];
  const abs = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  if (!fs.existsSync(abs)) {
    console.error('File not found:', abs);
    process.exit(2);
  }
  try {
    const changed = processFile(abs);
    if (changed) console.log('Updated:', abs);
    else console.log('No change:', abs);
    process.exit(0);
  } catch (e) {
    console.error('Error processing', abs, e.message);
    process.exit(2);
  }
}

main();
