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
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)(`{3,}|~{3,})\s*$/);
    if (m) {
      // fence with no language -> add 'text'
      lines[i] = m[1] + m[2] + ' text';
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(file, lines.join('\n'), 'utf8');
  return changed;
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Usage: node add-fence-language.cjs <file-or-dir>');
    process.exit(2);
  }
  const target = args[0];
  const abs = path.isAbsolute(target) ? target : path.join(process.cwd(), target);
  let candidates = [];
  if (!fs.existsSync(abs)) { console.error('Path not found:', abs); process.exit(2); }
  const stat = fs.statSync(abs);
  if (stat.isDirectory()) candidates = walk(abs);
  else if (stat.isFile() && isMarkdown(abs)) candidates = [abs];
  else { console.error('No markdown files found at path'); process.exit(2); }

  const modifiedFiles = [];
  for (const f of candidates) {
    try {
      if (processFile(f)) modifiedFiles.push(f);
    } catch (e) {
      console.error('Error processing', f, e.message);
    }
  }

  if (modifiedFiles.length) {
    console.log('Added fence language to files:');
    modifiedFiles.forEach(f => console.log('  ' + f));
  } else console.log('No changes');
}

main();
