#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function wrapLine(text, width) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + (cur ? ' ' : '') + w).length > width) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + ' ' + w : w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function reflowBlock(blockLines, width) {
  if (blockLines.length === 0) return blockLines;
  // Detect if block is a list item (starts with optional indent + marker)
  const first = blockLines[0];
  const m = first.match(/^(\s*([-+*]|\d+\.)\s+)(.*)$/);
  if (m) {
    const marker = m[1];
    const rest = m[3] + ' ' + blockLines.slice(1).map(l => l.trim()).join(' ');
    const wrapped = wrapLine(rest, width - marker.length);
    const out = wrapped.map((ln, i) => (i === 0 ? marker + ln : ' '.repeat(marker.length) + ln));
    return out;
  }
  // Normal paragraph
  const text = blockLines.map(l => l.trim()).join(' ');
  return wrapLine(text, width);
}

function processFile(filePath, width) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  let inFence = false;
  let fenceMarker = null;
  const out = [];
  let block = [];
  let modified = false;

  function flushBlock() {
    if (block.length === 0) return;
    const reflowed = reflowBlock(block, width);
    // preserve trailing blank line after block if existed previously
    if (reflowed.join('\n') !== block.join('\n')) modified = true;
    out.push(...reflowed);
    block = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // fence detection (```) or (~) maybe only ``` present
    const fenceMatch = line.match(/^\s*(```+|~~~+)(.*)$/);
    if (fenceMatch) {
      // entering/exiting fence
      if (!inFence) {
        flushBlock();
        inFence = true;
        fenceMarker = fenceMatch[1];
        out.push(line);
        continue;
      } else {
        // if same marker, close fence
        if (fenceMatch[1] === fenceMarker) {
          inFence = false;
          fenceMarker = null;
          out.push(line);
          continue;
        } else {
          // different fence char; still treat as normal
          out.push(line);
          continue;
        }
      }
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    // skip table rows (lines with pipes and at least two pipes or contains | and not starting with >)
    if (/\|/.test(line) && line.trim().startsWith('|')) {
      flushBlock();
      out.push(line);
      continue;
    }
    // skip explicit headings
    if (/^\s{0,3}#{1,6}\s+/.test(line)) {
      flushBlock();
      out.push(line);
      continue;
    }
    // skip HTML blocks
    if (/^\s*<\/?[A-Za-z]/.test(line)) {
      flushBlock();
      out.push(line);
      continue;
    }
    // if blank line, flush current paragraph block
    if (line.trim() === '') {
      flushBlock();
      out.push(line);
      continue;
    }
    // if this line looks like a table row but not starting with | (e.g., cells with pipes), skip
    if (line.includes('|') && line.trim().includes('|')) {
      flushBlock();
      out.push(line);
      continue;
    }
    // otherwise accumulate into block
    block.push(line);
  }
  flushBlock();
  const newText = out.join('\n');
  if (newText !== text) {
    fs.writeFileSync(filePath, newText, 'utf8');
    modified = true;
  }
  return modified;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node reflow-doc.cjs <file> [width]');
    process.exit(2);
  }
  const file = args[0];
  const width = parseInt(args[1] || '80', 10);
  const abs = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  if (!fs.existsSync(abs)) {
    console.error('File not found:', abs);
    process.exit(2);
  }
  const changed = processFile(abs, width);
  if (changed) {
    console.log('Reflowed:', abs);
    process.exit(0);
  } else {
    console.log('No changes needed for', abs);
    process.exit(0);
  }
}

main();
