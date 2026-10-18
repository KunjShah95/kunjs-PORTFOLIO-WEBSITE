import { ORIGIN } from "@/lib/routes";
import {
  articles,
  education,
  hackathons,
  jobs,
  metrics,
  projects,
  services,
  site,
} from "@/lib/site-data";

/** ISO date for machine-readable freshness signals (build day in UTC). */
export function portfolioLastUpdated(): string {
  const stamp = Number(process.env.NEXT_PUBLIC_BUILD_TIME);
  if (stamp > 0) return new Date(stamp).toISOString().slice(0, 10);
  return "2026-10-11";
}

/**
 * Canonical JSON document advertised in llms.txt, ai.txt, and the API catalog.
 * Kept in one module so the route handler stays a thin cache wrapper.
 *
 * `schemaVersion` is a plain integer that increments on any breaking change to
 * the non-schema.org payload. Consumers should treat a version they don't
 * recognise as "fields may have moved" rather than assuming additive-only
 * growth. Bump it whenever a key is removed or renamed.
 *
 *   2 — services[] restructured: `outcome` removed in favour of `proof`,
 *       and `problem`/`stack` added. `summary` retained, now carrying the
 *       deliverable. Consumers on v1 must move `outcome` reads to `proof`.
 */
export function buildPortfolioDocument() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    schemaVersion: 2,
    url: `${ORIGIN}/`,
    dateModified: portfolioLastUpdated(),
    mainEntity: {
      "@type": "Person",
      "@id": `${ORIGIN}/#person`,
      name: site.name,
      alternateName: ["KunjShah95", "KunjShah01", "kunjshah_dev", "kkshah2005"],
      jobTitle: site.role,
      email: site.email,
      url: `${ORIGIN}/`,
      image: `${ORIGIN}/profile.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      sameAs: [
        site.links.github,
        site.links.linkedin,
        site.links.x,
        site.links.huggingface,
        site.links.peerlist,
        site.links.medium,
        site.links.producthunt,
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Large Language Models",
        "AI Agents",
        "Retrieval-Augmented Generation",
        "Computer Vision",
        "MLOps",
      ],
    },
    headline: `${site.name} — ${site.role}`,
    description:
      "AI engineer in Ahmedabad, India building production AI systems: autonomous agents, RAG pipelines, edge computer vision, and full-stack AI applications.",
    location: site.locationLong,
    timezone: site.timezone,
    availability: "Open to freelance, contract, retainer, and full-time AI roles",
    metrics: metrics.map((m) => ({ value: m.value, label: m.label })),
    education: {
      institution: education.institution,
      degree: education.degree,
      period: education.period,
      specialization: education.specialization,
    },
    experience: jobs.map((job) => ({
      company: job.company,
      role: job.role,
      period: job.period,
      kind: job.kind,
      description: job.description,
      live: job.live ?? false,
    })),
    // `outcome` is replaced by `proof`, and `problem`/`stack` are new, so
    // this is a breaking change to the published schema rather than a rename.
    // `summary` is retained but now carries the deliverable. Any external
    // consumer reading `services[].outcome` needs to move to `proof`.
    services: services.map((s) => ({
      title: s.title,
      problem: s.problem,
      summary: s.deliverable,
      proof: s.proof,
      stack: s.stack,
    })),
    projects: projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      status: p.status,
      summary: p.summary,
      stack: p.stack,
      metrics: p.metrics,
      url: `${ORIGIN}/projects#${p.slug}`,
      demo: p.demo,
      github: p.github,
    })),
    hackathons: hackathons.map((h) => ({
      title: h.title,
      event: h.event,
      placement: h.placement,
      year: h.year,
      team: h.team,
      description: h.description,
    })),
    writing: articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      date: a.date,
      category: a.categoryLabel,
      excerpt: a.excerpt,
      url: `${ORIGIN}/writing#${a.slug}`,
    })),
    machineReadable: {
      llmsTxt: `${ORIGIN}/llms.txt`,
      llmsFullTxt: `${ORIGIN}/llms-full.txt`,
      aiTxt: `${ORIGIN}/ai.txt`,
      humansTxt: `${ORIGIN}/humans.txt`,
      citePage: `${ORIGIN}/cite`,
      pricingMd: `${ORIGIN}/pricing.md`,
      servicesMd: `${ORIGIN}/services.md`,
      sitemap: `${ORIGIN}/sitemap.xml`,
      rss: `${ORIGIN}/rss.xml`,
    },
    contact: {
      email: site.email,
      page: `${ORIGIN}/contact`,
    },
  };
}
