/**
 * Manual IndexNow submit (run after deploy or when content changes).
 *
 *   INDEXNOW_KEY=... node scripts/submit-indexnow.mjs
 *
 * Key file must exist at https://kunjshah.in/{key}.txt
 */

const ORIGIN = "https://kunjshah.in";
const KEY = process.env.INDEXNOW_KEY ?? "7c4f9e2a1b8d4056a3f2e1d9c8b7a605";

const paths = [
  "",
  "/projects",
  "/about",
  "/skills",
  "/writing",
  "/experience",
  "/hackathons",
  "/open-source",
  "/labs",
  "/manifesto",
  "/education",
  "/contact",
  "/cite",
  "/privacy",
  "/terms",
  "/llms.txt",
  "/llms-full.txt",
  "/ai.txt",
  "/pricing.md",
  "/services.md",
  "/api/portfolio.json",
  "/rss.xml",
  "/humans.txt",
  "/cite.txt",
];

const urlList = paths.map((p) => (p === "" ? `${ORIGIN}/` : `${ORIGIN}${p}`));

const body = JSON.stringify({
  host: "kunjshah.in",
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
});

async function ping(endpoint) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });
  console.log(`${endpoint} → ${res.status} ${res.statusText}`);
}

await ping("https://api.indexnow.org/indexnow");
await ping("https://www.bing.com/indexnow");
