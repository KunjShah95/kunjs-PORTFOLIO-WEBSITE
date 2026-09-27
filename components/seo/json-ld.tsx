import { site } from "@/lib/site-data";
import { ORIGIN } from "@/lib/routes";

/**
 * JSON-LD emitter. Renders a single `<script type="application/ld+json">`.
 *
 * The payload is serialised with `<` escaped so a stray angle bracket in
 * content can never terminate the script tag early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Content is JSON.stringify'd above, so no untrusted interpolation here.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

const PERSON_ID = `${ORIGIN}/#person`;
const SITE_ID = `${ORIGIN}/#website`;

/** Social profiles, deduplicated and kept in the order AI agents prefer. */
const sameAs = [
  site.links.github,
  site.links.linkedin,
  site.links.x,
  site.links.huggingface,
  site.links.peerlist,
  site.links.medium,
];

/**
 * `Person` + `WebSite` as a single @graph.
 *
 * `Person` is the load-bearing entity for a portfolio: it is what lets search
 * engines and answer engines resolve "Kunj Shah" to a canonical human rather
 * than a string of name collisions. `sameAs` ties the GitHub/LinkedIn/X
 * profiles into one identity. `WebSite` carries the SearchAction and links
 * the two nodes together.
 */
export function PersonSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": PERSON_ID,
            name: site.name,
            alternateName: ["KunjShah95", "KunjShah01", "kunjshah_dev", "kkshah2005"],
            url: `${ORIGIN}/`,
            mainEntityOfPage: { "@type": "WebPage", "@id": `${ORIGIN}/` },
            email: `mailto:${site.email}`,
            image: `${ORIGIN}/profile.png`,
            jobTitle: site.role,
            description:
              "AI engineer in Ahmedabad, India building production AI systems: autonomous agents, RAG pipelines, edge computer vision, and full-stack AI applications.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ahmedabad",
              addressRegion: "Gujarat",
              addressCountry: "IN",
            },
            areaServed: [
              { "@type": "City", name: "Ahmedabad" },
              { "@type": "Country", name: "India" },
              { "@type": "Place", name: "Worldwide (remote)" },
            ],
            knowsAbout: [
              "Artificial Intelligence",
              "Machine Learning",
              "Large Language Models",
              "AI Agents",
              "Retrieval-Augmented Generation",
              "Computer Vision",
              "MLOps",
              "Edge AI",
              "Full-Stack Development",
            ],
            knowsLanguage: ["English", "Gujarati", "Hindi"],
            sameAs,
          },
          {
            "@type": "WebSite",
            "@id": SITE_ID,
            url: `${ORIGIN}/`,
            name: `${site.name} — ${site.role}`,
            description: "Portfolio of an AI engineer in Ahmedabad, India.",
            inLanguage: "en-IN",
            publisher: { "@id": PERSON_ID },
          },
        ],
      }}
    />
  );
}

/** `WebPage` wrapper used per-route, linking the page back to the person. */
export function webPageJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = `${ORIGIN}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": PERSON_ID },
    inLanguage: "en-IN",
  };
}

/** `BreadcrumbList` for subpages; omitted on the home page. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${ORIGIN}${crumb.path}`,
    })),
  };
}

/** Label + trail for a single-level subpage, e.g. Projects → /projects. */
export function pageBreadcrumb(label: string, path: string) {
  return breadcrumbJsonLd([
    { name: "Home", path: "" },
    { name: label, path },
  ]);
}
