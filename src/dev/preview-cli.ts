#!/usr/bin/env tsx
// src/dev/preview-cli.ts
// Tiny CLI wrapper around the preview demo utilities.

import { printShoppingList, printTonightState } from './preview-week';

function parseArgs() {
  const args = process.argv.slice(2);
  const out: Record<string, string | boolean> = { mode: 'all' };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--mode' || a === '-m') {
      out.mode = args[i + 1] ?? 'all';
      i++;
    } else if (a === '--date' || a === '-d') {
      out.date = args[i + 1];
      i++;
    } else if (a === '--help' || a === '-h') {
      out.help = true;
    } else {
      // ignore unknown for now
    }
  }

  return out;
}

function printHelp() {
  console.log('Usage: tsx src/dev/preview-cli.ts [--mode all|shopping|tonight] [--date YYYY-MM-DD]');
  console.log('');
  console.log('Options:');
  console.log('  --mode, -m   Which output to show (default: all)');
  console.log('  --date, -d   ISO date for tonight state (required for mode=tonight, default: today)');
  console.log('  --help, -h   Show this help');
}

async function main() {
  const opts = parseArgs();
  if (opts.help) return printHelp();

  const mode = String(opts.mode || 'all');

  if (mode === 'shopping' || mode === 'all') {
    console.log('\n--- Shopping List (demo) ---\n');
    printShoppingList();
  }

  if (mode === 'tonight' || mode === 'all') {
    const date = String(opts.date ?? new Date().toISOString().slice(0, 10));
    console.log(`\n--- Tonight State for ${date} (demo) ---\n`);
    printTonightState(date as any);
  }
}

main().catch(err => {
  console.error('Preview CLI failed:', err);
  process.exit(1);
});
