// Regenerate ../index.html from every */*/visualize.html in the repo.
// Run from the repo root:  node viz/gen-index.mjs
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const titleCase = (d) => d.replace(/^\d\d-/, '').split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

const cats = readdirSync(root).filter((d) => /^\d\d-/.test(d) && statSync(join(root, d)).isDirectory()).sort();

let sections = '';
let total = 0;
for (const cat of cats) {
  const dir = join(root, cat);
  const probs = readdirSync(dir).filter((p) => existsSync(join(dir, p, 'visualize.html'))).sort();
  if (!probs.length) continue;
  let cards = '';
  for (const p of probs) {
    const html = readFileSync(join(dir, p, 'visualize.html'), 'utf8');
    const title = (html.match(/title:\s*"([^"]+)"/) || [])[1] || p;
    const sub = (html.match(/subtitle:\s*"([^"]+)"/) || [])[1] || '';
    cards += `    <a class="card" href="${cat}/${p}/visualize.html"><div class="t">${esc(title)}</div><div class="d">${esc(sub)}</div></a>\n`;
    total++;
  }
  sections += `  <div class="cat">${esc(titleCase(cat))}</div>\n  <div class="grid">\n${cards}  </div>\n\n`;
}

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LeetCode in TypeScript — Visualizers</title>
<link rel="stylesheet" href="viz/viz.css">
<style>
  .vz-app { max-width: 900px; }
  .cat { margin: 26px 0 8px; color: var(--muted); font-size: 13px; letter-spacing: .04em; text-transform: uppercase; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
  .card { display: block; text-decoration: none; color: var(--text); background: var(--panel); border: 1px solid var(--border); border-radius: 10px; padding: 13px 15px; transition: all .15s; }
  .card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .card .t { font-weight: 600; font-size: 15px; }
  .card .d { color: var(--muted); font-size: 12px; margin-top: 4px; }
  .note { background: var(--panel); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 6px; padding: 12px 16px; font-size: 14px; color: var(--muted); margin-top: 8px; }
  code { font-family: var(--mono); color: var(--text); background: var(--panel2); padding: 1px 6px; border-radius: 4px; }
</style>
</head>
<body>
<div class="vz-app">
  <div class="vz-head">
    <h1 class="vz-title">🧩 Interactive Visualizers</h1>
    <div class="vz-sub">${total} algorithms, animated step by step. Watch the data move and follow the highlighted code line. Use ◀ / ▶ (or arrow keys) and ▶ Play.</div>
  </div>

${sections}  <div class="note">
    Each visualizer runs the <em>real</em> algorithm through a tiny recorder, so the animation always matches the logic.
    Every problem also has a <code>README.md</code> (idea + ASCII walkthrough) and a runnable <code>solution.ts</code> (<code>./run.sh &lt;name&gt;</code>).
  </div>
</div>
</body>
</html>
`;

writeFileSync(join(root, 'index.html'), page);
console.log(`Wrote index.html with ${total} visualizers across ${cats.length} categories.`);
