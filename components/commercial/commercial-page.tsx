import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { QuickAnswer } from "@/components/quick-answer";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { CopyEmailRow } from "@/components/ui/copy-email";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/components/seo/json-ld";
import { projectBySlug, site } from "@/lib/site-data";
import type { CommercialPage, CommercialSection } from "@/lib/commercial-pages";

/**
 * Shared layout for the three commercial-intent pages (proof of work, hire an
 * agent developer, and AI automation consulting). The copy lives in
 * lib/commercial-pages.ts; this component only renders it, with the same
 * evidence-first order on every page: direct answer, checkable claims, shipped
 * systems, then the questions a buyer asks before writing.
 */
function SectionBody({ section }: { section: CommercialSection }) {
  if (section.kind === "paragraphs") {
    return (
      <div className="mx-auto max-w-[68ch] flex flex-col gap-4 font-body-md text-body-md text-text-secondary">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (section.kind === "bullets") {
    return (
      <ul className="border-t border-border-hairline">
        {section.items.map((item) => (
          <li
            className="flex gap-3 border-b border-border-hairline py-5 font-body-md text-body-md text-text-secondary"
            key={item}
          >
            <Icon className="mt-0.5 shrink-0 text-signal-ink" name="check" size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (section.kind === "steps") {
    return (
      <ol className="grid gap-3 md:grid-cols-2">
        {section.items.map((item, index) => (
          <li
            className="flex flex-col gap-2 rounded-2xl border border-border-hairline p-5 md:p-6"
            key={item}
          >
            <span className="eyebrow text-text-muted" data-numeric>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-body-md text-body-md text-text-primary">{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (section.kind === "projects") {
    return (
      <ul className="grid gap-3 md:grid-cols-2">
        {section.slugs.map((slug) => {
          const project = projectBySlug(slug);
          if (!project) return null;
          return (
            <li key={slug}>
              <Link
                className="group lift flex h-full flex-col gap-2 rounded-2xl border border-border-hairline bg-surface-card p-5 md:p-6"
                data-track="Proof Link Clicked"
                data-track-from={slug}
                href={`/projects/${slug}`}
              >
                <span className="font-label-meta text-label-meta text-text-muted">
                  {project.category} · {project.status}
                </span>
                <span className="font-headline-md text-headline-md text-text-primary">
                  {project.title}
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary text-pretty">
                  {project.summary}
                </span>
                {project.metrics[0] && (
                  <span className="font-body-sm text-body-sm text-text-muted" data-numeric>
                    {project.metrics[0].value} {project.metrics[0].label}
                  </span>
                )}
                <span className="mt-auto pt-1 inline-flex items-center gap-1 font-body-sm text-body-sm font-medium text-text-primary">
                  Read the case study
                  <Icon
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    name="arrow_forward"
                    size={14}
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border-hairline">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">{section.caption}</caption>
        <thead>
          <tr className="border-b border-border-hairline bg-surface-container-low">
            {section.columns.map((column) => (
              <th
                className="px-4 py-3 font-body-sm text-body-sm font-medium text-text-primary"
                key={column}
                scope="col"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, index) => (
            <tr className="border-b border-border-hairline last:border-b-0" key={index}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th
                    className="px-4 py-4 align-top font-body-sm text-body-sm font-medium text-text-primary"
                    key={cellIndex}
                    scope="row"
                  >
                    {cell}
                  </th>
                ) : (
                  <td
                    className="px-4 py-4 align-top font-body-sm text-body-sm text-text-secondary"
                    key={cellIndex}
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CommercialPageView({ page }: { page: CommercialPage }) {
  const url = `${site.website}${page.path}`;

  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={webPageJsonLd({ path: page.path, name: page.metaTitle, description: page.description })} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "" },
            { name: page.metaTitle, path: page.path },
          ])}
        />
        <JsonLd data={faqPageJsonLd(page.faqs)} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: page.metaTitle,
            description: page.description,
            url,
            provider: { "@id": `${site.website}/#organization` },
            areaServed: [
              { "@type": "City", name: "Ahmedabad" },
              { "@type": "State", name: "Gujarat" },
              { "@type": "Country", name: "India" },
            ],
          }}
        />

        <PageIntro eyebrow={page.eyebrow} lead={page.lead} title={page.title}>
          <Link
            className={buttonStyles.primary}
            data-track="Contact CTA Clicked"
            data-track-from={page.path}
            href="/contact#inquiryForm"
          >
            Start a project
          </Link>
          <Link className={buttonStyles.secondary} href="/proof-of-work">
            See the proof
          </Link>
        </PageIntro>

        <QuickAnswer source={page.quickSources}>
          <strong>{page.quickAnswer}</strong>
        </QuickAnswer>

        {page.sections.map((section) => (
          <PageSection id={section.id} key={section.id} meta={section.meta} title={section.title}>
            <SectionBody section={section} />
          </PageSection>
        ))}

        <PageSection meta="Answered plainly, before you write." title="Questions before you hire">
          <div className="mx-auto max-w-3xl border-t border-border-hairline">
            {page.faqs.map((faq) => (
              <details className="group border-b border-border-hairline" key={faq.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-body-lg text-body-lg font-medium text-text-primary [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border-hairline text-text-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-12 font-body-md text-body-md text-text-secondary">{faq.answer}</p>
              </details>
            ))}
          </div>
        </PageSection>

        <CtaBand body={page.ctaBody} title={page.ctaTitle}>
          <Link
            className={buttonStyles.primary}
            data-track="Contact CTA Clicked"
            data-track-from={`${page.path}-cta`}
            href="/contact#inquiryForm"
          >
            Start a project
          </Link>
          <CopyEmailRow className="bg-surface-card" />
        </CtaBand>
      </div>
    </PageShell>
  );
}
