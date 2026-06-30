// Postbuild: emit per-route static HTML shells from dist/index.html.
// Each route gets its own <title>, description, canonical, OG/Twitter, and a
// route-specific <noscript> body. Non-JS crawlers (GPTBot, etc.) get per-page
// content + meta; JS users still boot the SPA. Vercel serves these static files
// before the catch-all rewrite, so /about -> dist/about/index.html.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'https://kunjshah.vercel.app';

const tpl = readFileSync(join(DIST, 'index.html'), 'utf-8');
const data = readFileSync(join(ROOT, 'src/data/portfolio.ts'), 'utf-8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// pull {title, slug, desc} from each object in an array slice of the data file.
// Fields read independently per object so source field-order doesn't matter.
function extract(arr, descKey) {
  const start = data.indexOf(`export const ${arr}`);
  const end = data.indexOf('export const ', start + 1);
  const slice = data.slice(start, end === -1 ? undefined : end);
  const out = [];
  for (const body of slice.split(/\r?\n {4}\{/).slice(1)) {
    const t = body.match(/title: '([^']*)'/);
    const s = body.match(/slug: '([^']*)'/);
    const d = body.match(new RegExp(`${descKey}: '([^']*)'`));
    if (t && s) out.push({ title: t[1], slug: s[1], desc: d ? d[1] : '' });
  }
  return out;
}

const projects = extract('PROJECTS', 'desc');
const blogs = extract('BLOGS', 'excerpt');

const NAME = 'Kunj Shah';
// static (non-detail) routes
const routes = [
  { path: 'about', title: 'About', desc: 'Kunj Shah — 22, freelance AI engineer in Ahmedabad. Bio, principles, open-source contributions (OWASP, Microsoft, Ollama), and experience.' },
  { path: 'projects', title: 'Projects', desc: 'Things Kunj Shah has shipped — AI agents, web apps, APIs, and ML systems. Live demos, source, and case studies.' },
  { path: 'blogs', title: 'Writing', desc: 'Long-form notes from shipping — agentic systems, computer vision at the edge, and AI fairness, by Kunj Shah.' },
  { path: 'experience', title: 'Experience', desc: 'Work and open-source experience of Kunj Shah — AI automation, multi-agent systems, full-stack engineering.' },
  { path: 'skills', title: 'Skills', desc: 'The stack Kunj Shah ships with — React/Next.js, FastAPI, LangChain, PyTorch, Docker, and cloud infra.' },
  { path: 'hackathons', title: 'Hackathons', desc: 'Kunj Shah at hackathons — 4 finals including Autonomous Hacks, Odoo, and SIH.' },
  { path: 'labs', title: 'Labs', desc: 'Experiments and research prototypes by Kunj Shah.' },
  { path: 'contact', title: 'Contact', desc: 'Have something to ship? Reach Kunj Shah — AI agents, web apps, APIs, prototypes.' },
  { path: 'education', title: 'Education', desc: 'Educational background of Kunj Shah — Computer Engineering coursework, research projects, and academic history.' },
];

// detail routes from data
for (const p of projects) {
  routes.push({ path: `projects/${p.slug}`, title: p.title, desc: p.desc, kicker: 'Project' });
}
for (const b of blogs) {
  routes.push({ path: `blogs/${b.slug}`, title: b.title, desc: b.desc, kicker: 'Essay' });
}

function routeBody(r) {
  const links = projects.length
    ? `<p><a href="/projects">All projects</a> · <a href="/blogs">Writing</a> · <a href="/about">About</a> · <a href="/contact">Contact</a></p>`
    : '';
  if (r.kicker) {
    return `<main><p>${esc(r.kicker)} · ${NAME}</p><h1>${esc(r.title)}</h1><p>${esc(r.desc)}</p>${links}</main>`;
  }
  return `<main><h1>${esc(r.title)} — ${NAME}</h1><p>${esc(r.desc)}</p>${links}</main>`;
}

let count = 0;
for (const r of routes) {
  const url = `${ORIGIN}/${r.path}`;
  const fullTitle = `${NAME} | ${r.title}`;
  let html = tpl
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/(<meta name="description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${esc(r.desc)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(fullTitle)}$2`)
    .replace(/(<meta property="og:description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${esc(r.desc)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(fullTitle)}$2`)
    .replace(/(<meta name="twitter:description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${esc(r.desc)}$2`)
    .replace(/(<link data-rh="true" rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${routeBody(r)}</div>`);

  const dir = join(DIST, r.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  count++;
}

// Generate 404.html custom fallback
const errorRoute = {
  path: '404',
  title: 'Page Not Found',
  desc: 'The page you are looking for does not exist or has been moved. Return to the home page or browse projects and writing.',
  kicker: '404'
};
const errorUrl = `${ORIGIN}/404`;
const errorFullTitle = `${NAME} | ${errorRoute.title}`;
let html404 = tpl
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(errorFullTitle)}</title>`)
  .replace(/(<meta name="description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${esc(errorRoute.desc)}$2`)
  .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(errorFullTitle)}$2`)
  .replace(/(<meta property="og:description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${esc(errorRoute.desc)}$2`)
  .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${errorUrl}$2`)
  .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(errorFullTitle)}$2`)
  .replace(/(<meta name="twitter:description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${esc(errorRoute.desc)}$2`)
  .replace(/(<link data-rh="true" rel="canonical" href=")[^"]*(")/, `$1${errorUrl}$2`)
  .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${routeBody(errorRoute)}</div>`);
writeFileSync(join(DIST, '404.html'), html404);

console.log(`prerender-routes: wrote ${count} route shells (${projects.length} projects, ${blogs.length} blogs) and 404.html`);
