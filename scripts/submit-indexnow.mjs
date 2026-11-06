/**
 * Manual IndexNow submit (run after deploy or when content changes).
 *
 *   INDEXNOW_KEY=... node scripts/submit-indexnow.mjs
 *
 * Key file must exist at https://kunjshah.in/{key}.txt
 */

const ORIGIN = "https://kunjshah.in";
const KEY = process.env.INDEXNOW_KEY ?? "7c4f9e2a1b8d4056a3f2e1d9c8b7a605";

// Submit exactly what the live sitemap lists. A hand-kept path list here had
// drifted: it named the static pages and the noindex discovery files, but
// none of the case studies or essays. Reading the sitemap keeps the two in
// step by construction. Run it after the deploy is live.
const sitemap = await fetch(`${ORIGIN}/sitemap.xml`);
if (!sitemap.ok) {
  console.error(`sitemap.xml returned ${sitemap.status}; nothing submitted.`);
  process.exit(1);
}
const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urlList.length) {
  console.error("sitemap.xml listed no URLs; nothing submitted.");
  process.exit(1);
}
console.log(`Submitting ${urlList.length} URLs from the sitemap.`);

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
