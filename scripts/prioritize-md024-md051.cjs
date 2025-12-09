#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function slugify(text) {
  // GitHub-style slug approximation: lowercase, trim, remove punctuation except spaces and hyphens, replace spaces with hyphens
  return text
    .toLowerCase()
    .trim()
    .replace(/<.*?>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function analyze(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);

  const headings = []; // {level, raw, slug, line}
  const slugMap = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^\s{0,3}(#{1,6})\s+(.*)$/);
    if (m) {
      const level = m[1].length;
      const raw = m[2].trim();
      const slug = slugify(raw);
      headings.push({ level, raw, slug, line: i+1 });
      const key = raw;
      if (!slugMap.has(key)) slugMap.set(key, []);
      slugMap.get(key).push(i+1);
    }
  }

  // duplicates: headings with same raw text appearing >1
  const duplicates = [];
  for (const [raw, arr] of slugMap.entries()) {
    if (arr.length > 1) duplicates.push({ raw, count: arr.length, lines: arr });
  }
  duplicates.sort((a,b)=>b.count - a.count);

  // collect anchors from headings (unique slugs)
  const slugSet = new Set(headings.map(h=>h.slug));

  // find internal fragment links
  const fragmentLinks = []; // {line, text, fragment}
  const linkRegex = /\[([^\]]+)\]\((#[-a-zA-Z0-9_\s%\(\)\.:,;!\?']+)\)/g;
  for (let i=0;i<lines.length;i++){
    let line = lines[i];
    let m;
    while ((m = linkRegex.exec(line)) !== null) {
      const textLink = m[1];
      let frag = m[2];
      if (frag.startsWith('#')) frag = frag.slice(1);
      // normalize percent-encodings and spaces
      try { frag = decodeURIComponent(frag); } catch(e) {}
      frag = frag.replace(/\+/g,' ');
      const norm = slugify(frag);
      fragmentLinks.push({ line: i+1, text: textLink, fragment: frag, norm });
    }
  }

  const broken = fragmentLinks.filter(l => !slugSet.has(l.norm));

  return { duplicates, broken, headingsCount: headings.length, fragmentCount: fragmentLinks.length };
}

function main(){
  const args = process.argv.slice(2);
  if (!args.length) { console.error('Usage: node prioritize-md024-md051.cjs <file>'); process.exit(2); }
  const file = args[0];
  if (!fs.existsSync(file)) { console.error('File not found:', file); process.exit(2); }
  const res = analyze(file);
  console.log('Headings found:', res.headingsCount);
  console.log('Internal fragment links found:', res.fragmentCount);
  console.log('');
  console.log('Top duplicate headings (MD024) — showing up to 20:');
  console.log('-----------------------------------------------');
  res.duplicates.slice(0,20).forEach((d, idx)=>{
    console.log(`${idx+1}. "${d.raw}" — ${d.count} occurrences at lines: ${d.lines.join(', ')}`);
  });
  if (res.duplicates.length===0) console.log('  (none)');
  console.log('');
  console.log('Broken/internal link fragments (MD051) — showing up to 40:');
  console.log('-----------------------------------------------------------');
  res.broken.slice(0,40).forEach((b, idx)=>{
    console.log(`${idx+1}. Line ${b.line}: link text "${b.text}" -> fragment "${b.fragment}" (slug: "${b.norm}")`);
  });
  if (res.broken.length===0) console.log('  (none)');
}

main();
