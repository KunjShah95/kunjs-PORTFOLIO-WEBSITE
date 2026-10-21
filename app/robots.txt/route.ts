import { ORIGIN } from "@/lib/routes";

/**
 * Crawler policy, written by hand rather than via `MetadataRoute.Robots`
 * because that type cannot express Content Signals
 * (https://contentsignals.org): search=yes, ai-input=yes, ai-train=no.
 *
 * Answer engines and AI agents are allowed, listed by name so the intent is
 * auditable rather than implied by a wildcard. `/api/` stays disallowed except
 * the public portfolio export. Training-only crawlers are blocked outright.
 */
export const dynamic = "force-static";

const CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=no";

const AI_AND_SEARCH_CRAWLERS = [
  // Search
  "Googlebot",
  "Google-Extended",
  "GoogleOther",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "Baiduspider",
  "Yandex",
  // Answer / retrieval
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-CloudVertexBot",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "YouBot",
  "Diffbot",
  "Bytespider",
  "Amazonbot",
  "MistralAI-User",
] as const;

/** Training crawl only — search/answer bots stay allowed via the rules above. */
const TRAINING_ONLY_CRAWLERS = ["CCBot"] as const;

const group = (agents: readonly string[], lines: string[]) =>
  [...agents.map((a) => `User-agent: ${a}`), ...lines].join("\n");

const allowRules = [CONTENT_SIGNAL, "Allow: /", "Allow: /api/portfolio.json", "Disallow: /api/"];

export function GET() {
  const body = [
    "# Kunj Shah: crawler and AI usage policy",
    "# Content Signals: https://contentsignals.org",
    group(["*"], allowRules),
    group(AI_AND_SEARCH_CRAWLERS, allowRules),
    group(TRAINING_ONLY_CRAWLERS, ["Disallow: /"]),
    `Sitemap: ${ORIGIN}/sitemap.xml`,
    `Host: ${ORIGIN}`,
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
