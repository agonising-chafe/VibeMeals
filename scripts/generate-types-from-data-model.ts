import fs from 'fs';
import path from 'path';

const DATA_MODEL_PATH = path.resolve(__dirname, '../docs/data-model.md');
const TYPES_PATH = path.resolve(__dirname, '../src/domain/types.ts');

const HEADER = `// Shared domain types (generated from docs/data-model.md)
// Last sync: ${new Date().toISOString().slice(0, 10)}
// Do not edit directly. Edit docs/data-model.md and re-generate.
\n`;

const md = fs.readFileSync(DATA_MODEL_PATH, 'utf8');
const match = md.match(/```typescript([\s\S]*?)```/);
if (!match) {
  throw new Error('No TypeScript code block found in docs/data-model.md');
}
const typesBlock = match[1].trim();

const output = HEADER + typesBlock + '\n';
fs.writeFileSync(TYPES_PATH, output);
console.log(`Generated src/domain/types.ts from docs/data-model.md.`);
