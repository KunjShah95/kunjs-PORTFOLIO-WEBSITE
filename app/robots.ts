import type { MetadataRoute } from "next";
import { ORIGIN } from "@/lib/routes";

/**
 * Crawler policy.
 *
 * Answer engines and AI agents are explicitly allowed, listed by name so the
 * intent is auditable rather than implied by a wildcard. Search crawlers are
 * allowed on the same terms.
 *
 * `Disallow` is scoped to `/api/` only. Note this file controls *crawling*;
 * whether a crawler trains on your content is governed by the
 * `Content-Signal: ai-train=no` response header (set in vercel.json), which
 * these directives do not and cannot express.
 */
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
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "YouBot",
  "Diffbot",
  "Bytespider",
  "Amazonbot",
  "MistralAI-User",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Named agents, same terms as the wildcard. Redundant with the rule
      // above but makes the policy explicit and self-documenting.
      ...AI_AND_SEARCH_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
    host: ORIGIN,
  };
}
