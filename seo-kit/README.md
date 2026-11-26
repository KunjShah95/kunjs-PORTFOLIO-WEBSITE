# Client SEO kit

Reusable version of the work applied to kunjshah.in in this repo. Use it for a
freelance client site when the goal is commercial-intent discovery and AI
citation, not a job-board ranking.

## Order of work

1. **Collect truth, not adjectives.** Get the shipped-work list, the numbers,
   how each number was measured, what it excludes, the real rate card, and the
   links that can prove a claim. If a client cannot supply a proof link, the
   claim does not go on a page.
2. **Add one proof-of-work page.** It should answer, in the first paragraph,
   "who is this and what can I check?" Use the structure in
   `templates/proof-of-work.md`.
3. **Add two commercial-intent pages.** One transactional ("hire X for Y") and
   one local/consulting ("X consultant in city"). Keep them distinct from any
   careers or hiring-them page; a job-seeker page attracts the wrong intent.
4. **Add machine-readable files.** `llms.txt`, `llms-full.txt`, `pricing.md`
   and `services.md` at the site root, all served `noindex, follow` and linked
   from the HTML. Copy the pattern from `lib/routes.ts`, `lib/seo.ts` and
   `lib/markdown.ts` in this repo. Robots must allow answer-engine crawlers.
5. **Publish off-site links.** Start with the GitHub profile README and the
   README of each repo the site cites. Use `publish-backlinks.ps1` here. Then
   one linkable case-study post, shared on LinkedIn and one dev community.
6. **Ping the index after deploy.** Run `npm run postdeploy`. It waits until
   the live sitemap contains every URL in this build, then submits to IndexNow
   and Bing. Do not run it before the deploy is live: it will exit non-zero
   with the missing URLs rather than ping a stale sitemap.
7. **Measure.** Domain rating moves only when other domains link. Track it
   monthly; track query rank weekly and AI-index coverage biweekly.

## Files in this kit

- `checklist.md` — the ship gate.
- `templates/llms.txt` — concise site summary for answer engines.
- `templates/pricing.md` — machine-readable rates and freelancer-vs-agency table.
- `templates/proof-of-work.md` — page structure for the quotable proof page.
- `templates/backlink-footer.md` — paste-ready README footer.
- `publish-backlinks.ps1` — generic, idempotent GitHub README publisher.

## Rule that matters most

Every claim on a commercial page must resolve to a link the reader can open.
The "what this does not show" paragraph is not a disclaimer to hide; it is the
part that makes the rest credible to a buyer and to an answer engine.
