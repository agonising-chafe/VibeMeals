import fs from "fs";
import path from "path";

// Load GEMINI_API_KEY from env or .env
function loadEnvKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return undefined;
  const txt = fs.readFileSync(envPath, "utf-8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^GEMINI_API_KEY=(.+)$/);
    if (m) return m[1].trim();
  }
  return undefined;
}

const API_KEY = loadEnvKey();
if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in environment/.env");
  process.exit(1);
}

const bookPath = process.argv[2] || path.join('.txt recipe files', "The Complete America's Test Kit - America's Test Kitchen.txt");
const outPath = process.argv[3] || path.join('reports', 'atk-pairing-map-gemini.json');
const limit = Number(process.argv[4] || 40); // to avoid too many calls; adjust as needed
const offset = Number(process.argv[5] || 0);

if (!fs.existsSync(bookPath)) {
  console.error(`❌ Input file not found: ${bookPath}`);
  process.exit(1);
}

function norm(text: string) {
  return text
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function tokenize(text: string): string[] {
  return norm(text)
    .split(' ')
    .filter(Boolean);
}
function jaccard(a: string[], b: string[]): number {
  const sa = new Set(a);
  const sb = new Set(b);
  let inter = 0;
  for (const t of sa) if (sb.has(t)) inter++;
  const union = sa.size + sb.size - inter;
  return union === 0 ? 0 : inter / union;
}

// Load recipes metadata
const recipesDir = path.join('src', 'domain', 'recipes');
const recipeFiles = fs.readdirSync(recipesDir).filter(f => f.endsWith('.ts'));
type RecipeMeta = { id: string; name: string; slug: string };
const recipes: RecipeMeta[] = [];
for (const file of recipeFiles) {
  const full = path.join(recipesDir, file);
  const content = fs.readFileSync(full, 'utf-8');
  const idMatch = content.match(/id:\s*"([^"]+)"/);
  const nameMatch = content.match(/name:\s*"([^"]+)"/);
  const id = idMatch ? idMatch[1] : path.basename(file, '.ts');
  const name = nameMatch ? nameMatch[1] : path.basename(file, '.ts').replace(/-/g, ' ');
  const slug = path.basename(file, '.ts');
  recipes.push({ id, name, slug });
}

const text = fs.readFileSync(bookPath, 'utf-8');
const lines = text.split(/\r?\n/);

function bestCandidates(phrase: string, topN: number): RecipeMeta[] {
  const tokens = tokenize(phrase);
  const scored = recipes.map(r => ({ r, score: jaccard(tokens, tokenize(r.name)) }));
  return scored.sort((a, b) => b.score - a.score).slice(0, topN).map(s => s.r);
}

async function callGemini(prompt: string): Promise<any> {
  // Use stable Flash for price/perf; switch to Pro only if needed.
  const model = "models/gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, contents: [{ parts: [{ text: prompt }] }] }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gemini error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error('Gemini returned no text');
  const cleaned = raw
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();
  return JSON.parse(cleaned);
}

const occurrences: { idx: number; phrase: string; context: string; mainContext: string }[] = [];
for (let i = 0; i < lines.length; i++) {
  if (!/serve with/i.test(lines[i])) continue;
  const phraseMatch = lines[i].match(/serve with\s+([^\.\n;]+)/i);
  if (!phraseMatch) continue;
  const phrase = phraseMatch[1].trim();
  const ctxStart = Math.max(0, i - 3);
  const ctxEnd = Math.min(lines.length, i + 4);
  const context = lines.slice(ctxStart, ctxEnd).join(' ').replace(/\s+/g, ' ');
  const mainContext = lines.slice(Math.max(0, i - 12), i).join(' ').replace(/\s+/g, ' ');
  occurrences.push({ idx: i, phrase, context, mainContext });
}

const limited = occurrences.slice(offset, offset + limit);
const results: any[] = [];

(async () => {
  for (const [idx, occ] of limited.entries()) {
    const mainCandidates = bestCandidates(occ.mainContext || occ.context, 30);
    const compCandidates = bestCandidates(occ.phrase, 30);
    const prompt = `You map cookbook pairings. Given context and candidate recipe IDs, choose the main recipe and the companion mentioned after "serve with". Return JSON with fields mainId, companionId, kind (SIDE/SAUCE/APPETIZER/DESSERT), confidence (0-1). If unsure, set confidence to 0 and null IDs.
Context: ${occ.context}
Main context: ${occ.mainContext}
Companion phrase: ${occ.phrase}
Candidate mains: ${mainCandidates.map(r => `${r.id} :: ${r.name}`).join(' | ')}
Candidate companions: ${compCandidates.map(r => `${r.id} :: ${r.name}`).join(' | ')}
Output JSON only.`;
    try {
      const response = await callGemini(prompt);
      results.push({ ...occ, response, mainCandidates, compCandidates });
      console.log(`[${idx + 1}/${limited.length}] ok`);
    } catch (err: any) {
      console.error(`[${idx + 1}/${limited.length}] failed: ${err.message}`);
      results.push({ ...occ, error: err.message });
    }
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ results }, null, 2), 'utf-8');
  console.log(`Wrote ${results.length} results to ${outPath}`);
})();
