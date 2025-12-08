import fs from 'fs';
import path from 'path';

const VISION_PATH = path.resolve(__dirname, '../docs/vision.md');
const TESTS_DIR = path.resolve(__dirname, '../src/domain/__tests__');

const vision = fs.readFileSync(VISION_PATH, 'utf8');
const goldenRegex = /\*\*G(\d+)\s*[\u2013\-]\s*(.*?)\*\*/g;
const goldenTests: { id: string, title: string }[] = [];
let m;
while ((m = goldenRegex.exec(vision))) {
  goldenTests.push({ id: `G${m[1]}`, title: m[2].trim() });
}

function scanTestFiles() {
  const files = fs.readdirSync(TESTS_DIR).filter(f => f.endsWith('.spec.ts'));
  const coverage: Record<string, string[]> = {};
  for (const { id } of goldenTests) coverage[id] = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(TESTS_DIR, file), 'utf8');
    for (const { id } of goldenTests) {
      if (content.includes(id)) coverage[id].push(file);
    }
  }
  return coverage;
}

const coverage = scanTestFiles();
console.log('| Golden ID | Title | Covered | Tests |');
console.log('|-----------|-------|---------|-------|');
for (const { id, title } of goldenTests) {
  const files = coverage[id];
  const covered = files.length > 0 ? '✅' : '⚠️';
  console.log(`| ${id} | ${title} | ${covered} | ${files.join(', ')} |`);
}
