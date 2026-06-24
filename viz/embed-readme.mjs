// Embed each problem's README.md into its visualize.html so the visualizer page
// shows the full write-up (idea, ASCII walkthrough, complexity) below the animation.
// Idempotent — re-run any time after editing a README. Run from the repo root:
//   node viz/embed-readme.mjs
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOCK = /\n?<script type="text\/markdown" id="vz-readme">[\s\S]*?<\/script>\n?/;

const cats = readdirSync(root).filter((d) => /^\d\d-/.test(d) && statSync(join(root, d)).isDirectory()).sort();
let count = 0;
for (const cat of cats) {
  for (const p of readdirSync(join(root, cat))) {
    const dir = join(root, cat, p);
    const htmlPath = join(dir, 'visualize.html');
    const mdPath = join(dir, 'README.md');
    if (!existsSync(htmlPath) || !existsSync(mdPath)) continue;

    // Drop the title (# ...) and the 🔗 link line — the page header already shows them.
    // Keep everything from the first "## " heading onward.
    const md = readFileSync(mdPath, 'utf8');
    const lines = md.split('\n');
    const start = lines.findIndex((l) => /^##\s/.test(l));
    const body = (start >= 0 ? lines.slice(start) : lines).join('\n').trim();

    const block = `\n<script type="text/markdown" id="vz-readme">\n${body}\n</script>\n`;
    let html = readFileSync(htmlPath, 'utf8').replace(BLOCK, '\n'); // remove any prior block
    if (html.includes('</body>')) html = html.replace('</body>', `${block}</body>`);
    else html = html.trimEnd() + '\n' + block;
    writeFileSync(htmlPath, html);
    count++;
  }
}
console.log(`Embedded README write-ups into ${count} visualizers.`);
