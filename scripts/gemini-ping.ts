import fs from "fs";
import path from "path";

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

async function call(prompt: string) {
  const key = loadEnvKey();
  if (!key) throw new Error('GEMINI_API_KEY missing');
  const model = 'models/gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, contents: [{ parts: [{ text: prompt }] }] }),
  });
  const text = await resp.text();
  console.log(resp.status, text.slice(0, 400));
}

call('ping');
