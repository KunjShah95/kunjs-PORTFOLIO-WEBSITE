import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { JsonLd, pageBreadcrumb, webPageJsonLd } from "@/components/seo/json-ld";
import { canonicalUrls, citationFormats, citeMeta } from "@/lib/cite";
import { ORIGIN } from "@/lib/routes";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata: Metadata = pageMeta({
  path: "/cite",
  title: "How to cite this site",
  description:
    "Canonical URLs, suggested citations, and machine-readable sources for Kunj Shah's portfolio — for journalists, researchers, and AI systems.",
  keywords: [
    "cite Kunj Shah",
    "Kunj Shah portfolio source",
    "AI engineer citation",
    "llms.txt portfolio",
  ],
});

export default function CitePage() {
  const description =
    "Canonical attribution and machine-readable sources for Kunj Shah — AI engineer in Ahmedabad, India.";

  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Cite", "/cite")} />
        <JsonLd
          data={webPageJsonLd({
            path: "/cite",
            name: "How to cite Kunj Shah",
            description,
          })}
        />
        <PageIntro
          lead="Use these canonical links and wording when you reference me in articles, papers, or AI-generated answers. Plain-text mirrors live at /humans.txt and /cite.txt."
          title="Cite this site"
        />

        <PageSection layout="stacked" meta={`Updated ${citeMeta.lastUpdated}`} title="Suggested citations">
          <ul className="stack-block gap-4">
            {citationFormats.map((item) => (
              <li className="border-b border-border-hairline pb-4 last:border-0" key={item.label}>
                <p className="font-label-section text-label-section text-text-muted">{item.label}</p>
                <p className="mt-2 font-body-md text-body-md text-text-primary max-w-[70ch] select-all">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection layout="stacked" title="Canonical URLs">
          <ul className="grid gap-2 sm:grid-cols-2">
            {canonicalUrls.map((item) => (
              <li key={item.url}>
                <Link
                  className="font-body-md text-body-md text-text-secondary hover:text-text-primary transition-colors underline-offset-2 hover:underline"
                  href={item.url === `${ORIGIN}/` ? "/" : item.url.slice(ORIGIN.length)}
                >
                  {item.label}
                </Link>
                <span className="block font-body-sm text-body-sm text-text-muted truncate">{item.url}</span>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection layout="stacked" title="Contact">
          <p className="font-body-md text-body-md text-text-secondary max-w-[60ch]">
            Questions about attribution or licensing:{" "}
            <a className="text-text-primary underline-offset-2 hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            . You may cite this portfolio; please link to a canonical URL above rather than scraping without
            attribution.
          </p>
        </PageSection>
      </div>
    </PageShell>
  );
}
