/**
 * Post-deploy IndexNow ping.
 *
 * Run this only AFTER the deployment is live. It waits until the live sitemap
 * lists every URL this build intends to publish — including newly added
 * commercial pages, case studies and essays — then notifies IndexNow and Bing.
 *
 *   npm run postdeploy
 *
 * Override the wait with INDEXNOW_ATTEMPTS (default 12) and
 * INDEXNOW_WAIT_MS (default 10000).
 */
import { indexNowKeyLocation, indexNowUrlList, submitIndexNowAll } from "../lib/indexnow";
import { ORIGIN } from "../lib/routes";

const attempts = Number(process.env.INDEXNOW_ATTEMPTS ?? 12);
const waitMs = Number(process.env.INDEXNOW_WAIT_MS ?? 10_000);

/** Poll the live sitemap until it matches this build's indexable URL set. */
async function waitForDeploy(expected: string[]): Promise<void> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(`${ORIGIN}/sitemap.xml`, {
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        // The sitemap writes the root as https://kunjshah.in with no slash,
        // while indexNowUrlList() uses the canonical trailing slash. Compare
        // after stripping trailing slashes so the two agree.
        const normalize = (url: string) => url.replace(/\/+$/, "");
        const live = new Set(
          [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
            normalize(m[1].trim()),
          ),
        );
        const missing = expected.filter((url) => !live.has(normalize(url)));
        if (missing.length === 0) {
          console.log(`Live sitemap matches ${expected.length} expected URLs.`);
          return;
        }
        if (attempt === attempts) {
          console.error(`Deploy not live. Missing ${missing.length} URLs:`);
          for (const url of missing.slice(0, 10)) console.error(`  ${url}`);
          process.exit(1);
        }
        console.log(`Attempt ${attempt}/${attempts}: ${missing.length} URLs not live yet.`);
      } else {
        console.log(`Attempt ${attempt}/${attempts}: sitemap returned ${res.status}.`);
      }
    } catch (error) {
      console.log(
        `Attempt ${attempt}/${attempts}: ${error instanceof Error ? error.message : "fetch failed"}.`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  process.exit(1);
}

async function main(): Promise<void> {
  const expected = indexNowUrlList();
  console.log(`Waiting for ${expected.length} URLs to go live at ${ORIGIN}...`);
  await waitForDeploy(expected);

  const results = await submitIndexNowAll(expected);
  for (const result of results) {
    console.log(`${result.endpoint} → ${result.status} ${result.ok ? "ok" : "FAILED"}`);
  }
  if (!results.some((result) => result.ok)) {
    console.error(`IndexNow submissions all failed. Check ${indexNowKeyLocation()}.`);
    process.exit(1);
  }
  console.log(`Submitted ${expected.length} URLs to IndexNow and Bing.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
