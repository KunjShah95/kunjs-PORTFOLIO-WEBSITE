import { services, site } from "@/lib/site-data";
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
const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const BLOG_ID = `${ORIGIN}/writing#blog`;

/** Social profiles, deduplicated and kept in the order AI agents prefer. */
const sameAs = [
  site.links.github,
  site.links.linkedin,
  site.links.x,
  site.links.huggingface,
  site.links.peerlist,
  site.links.medium,
  site.links.producthunt,
];

/**
 * `Person` + `Organization` + `WebSite` as a single @graph.
 *
 * `Person` is the load-bearing entity for a portfolio: it is what lets search
 * engines and answer engines resolve "Kunj Shah" to a canonical human rather
 * than a string of name collisions. `sameAs` ties the GitHub/LinkedIn/X
 * profiles into one identity. `WebSite` carries the SearchAction and links
 * the two nodes together.
 *
 * `Organization` is the other half, and it was missing. A site that sells
 * services, lists rates and takes enquiries is read by an answer engine as an
 * organisation, not as a person with a blog: without it there is no node that
 * says what the place is, who runs it, and what it offers — so a machine
 * asking "who runs this?" gets nothing but a name. It describes the same
 * human: `founder` and `employee` point back at the `Person`, and the
 * `Person` points back with `worksFor`, so the two nodes reinforce each other
 * instead of competing.
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
            worksFor: { "@id": ORGANIZATION_ID },
            founderOf: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": ["Organization", "ProfessionalService"],
            "@id": ORGANIZATION_ID,
            name: site.name,
            legalName: site.name,
            alternateName: ["Kunj Shah AI Engineering", "KunjShah95"],
            url: `${ORIGIN}/`,
            logo: {
              "@type": "ImageObject",
              url: `${ORIGIN}/logo.png`,
              width: 512,
              height: 512,
              caption: `${site.name} | ${site.role}`,
            },
            image: `${ORIGIN}/og-image.png`,
            email: `mailto:${site.email}`,
            description:
              "AI engineering practice building production agent systems, RAG pipelines, edge computer vision, and full-stack AI applications for teams shipping real products.",
            slogan: site.hero,
            foundingDate: "2023",
            founder: { "@id": PERSON_ID },
            employee: { "@id": PERSON_ID },
            member: { "@id": PERSON_ID },
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
              "AI Agents",
              "Retrieval-Augmented Generation",
              "Large Language Models",
              "Edge AI",
              "Computer Vision",
              "MLOps",
              "Model Serving",
            ],
            priceRange: "₹₹",
            currenciesAccepted: "INR",
            paymentAccepted: "Bank Transfer, UPI",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: site.email,
              url: `${ORIGIN}/contact`,
              availableLanguage: ["English", "Gujarati", "Hindi"],
              areaServed: "Worldwide",
            },
            sameAs,
            // What the practice actually sells, described as offers rather
            // than as prose, so a machine can match a need to a service.
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "AI engineering services",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  description: service.deliverable,
                  serviceType: service.pill,
                  provider: { "@id": ORGANIZATION_ID },
                  areaServed: "Worldwide",
                },
              })),
            },
          },
          {
            "@type": "WebSite",
            "@id": SITE_ID,
            url: `${ORIGIN}/`,
            name: `${site.name} | ${site.role}`,
            description: "Portfolio of an AI engineer in Ahmedabad, India.",
            inLanguage: "en-IN",
            publisher: { "@id": ORGANIZATION_ID },
            author: { "@id": PERSON_ID },
            copyrightHolder: { "@id": PERSON_ID },
            potentialAction: {
              "@type": "ReadAction",
              target: [
                `${ORIGIN}/llms.txt`,
                `${ORIGIN}/api/portfolio.json`,
                `${ORIGIN}/pricing.md`,
              ],
            },
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

/**
 * The `Blog` node for the writing archive.
 *
 * It was previously emitted inline on /writing with every post pointing at
 * its Medium URL. Now that each essay is served from this site, the same node
 * points at the local article pages, so an engine reading the archive sees
 * posts it can actually fetch and quote.
 */
export function blogJsonLd(essays: { slug: string; title: string; date: string; excerpt: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_ID,
    url: `${ORIGIN}/writing`,
    name: `${site.name} | Writing`,
    description:
      "Essays on AI engineering, agent systems, retrieval, evaluation, and edge machine learning.",
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
    author: { "@id": PERSON_ID },
    blogPost: essays.map((essay) => ({
      "@type": "BlogPosting",
      "@id": `${ORIGIN}/writing/${essay.slug}#blogposting`,
      headline: essay.title,
      url: `${ORIGIN}/writing/${essay.slug}`,
      datePublished: essay.date,
      description: essay.excerpt,
      author: { "@id": PERSON_ID },
      publisher: { "@id": ORGANIZATION_ID },
    })),
  };
}

/**
 * `BlogPosting` for a single essay.
 *
 * This is the node that makes an essay citable: it names the headline, the
 * author, the publication date, the publisher, and points `mainEntityOfPage`
 * at the page a reader can open. `sameAs` ties it to the original post so the
 * two copies are known to be the same work rather than two competing ones.
 */
export function blogPostingJsonLd({
  slug,
  title,
  description,
  datePublished,
  image,
  wordCount,
  keywords,
  section,
  mediumUrl,
}: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  image?: string | null;
  wordCount: number;
  keywords: string[];
  section: string;
  mediumUrl: string;
}) {
  const url = `${ORIGIN}/writing/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    headline: title,
    alternativeHeadline: title,
    description,
    datePublished,
    dateModified: datePublished,
    inLanguage: "en",
    isAccessibleForFree: true,
    wordCount,
    keywords: keywords.join(", "),
    articleSection: section,
    image: image ? [image] : [`${ORIGIN}/og-image.png`],
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": BLOG_ID },
    sameAs: mediumUrl,
  };
}
