import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PeopleAlsoAsk } from "@/components/people-also-ask";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { CopyEmailRow } from "@/components/ui/copy-email";
import { Tag } from "@/components/ui/primitives";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/components/seo/json-ld";
import { essayCategoryLabel, essayDateLabel } from "@/lib/essays";
import { ORIGIN } from "@/lib/routes";
import { pilotSteps, pricingIncludes } from "@/lib/site-data";
import type { ResolvedServicePage } from "@/lib/service-pages";

/**
 * One service, laid out as the evidence a buyer checks: what you get, how it
 * is done (each step tied to the case study that proves it), the systems
 * themselves, what it costs, the essays behind the method, and the questions
 * people ask before writing. Data comes from lib/service-pages.ts.
 */
export function ServiceLanding({ page }: { page: ResolvedServicePage }) {
  const { service } = page;
  const url = `${ORIGIN}${page.path}`;
  const titleOf = (slug: string) => page.projects.find((p) => p.slug === slug)?.title ?? slug;

  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={webPageJsonLd({ path: page.path, name: page.metaTitle, description: page.description })} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "" },
            { name: page.title, path: page.path },
          ])}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: page.title,
            serviceType: page.title,
            description: page.description,
            url,
            provider: { "@id": `${ORIGIN}/#organization` },
            areaServed: { "@type": "Country", name: "India" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${page.title}: fixed-scope projects`,
              itemListElement: page.tiers.map((tier) => ({
                "@type": "Offer",
                name: tier.name,
                description: tier.body,
                priceCurrency: "INR",
              })),
            },
          }}
        />
        <JsonLd data={faqPageJsonLd(page.faqs)} />

        <PageIntro eyebrow={`Service · ${service.pill}`} lead={service.deliverable} title={service.problem}>
          <Link
            className={buttonStyles.primary}
            data-track="Contact CTA Clicked"
            data-track-from={`service${page.path}`}
            href="/contact#inquiryForm"
          >
            {service.cta}
          </Link>
          <Link className={buttonStyles.secondary} href="#proof">
            See the work
          </Link>
        </PageIntro>

        {/* --------------------------------------------------------- approach */}
        <PageSection meta="Each step is how a shipped system already works." title="How I build it">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border-hairline bg-border-hairline md:grid-cols-2">
            {page.approach.map((step, index) => (
              <li className="flex flex-col gap-2 bg-surface p-5 md:p-6" key={step.title}>
                <span className="eyebrow text-text-muted" data-numeric>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-headline-md text-headline-md text-text-primary text-balance">{step.title}</h2>
                <p className="font-body-md text-body-md text-text-secondary">{step.body}</p>
                <Link
                  className="mt-auto pt-1 w-fit font-body-sm text-body-sm font-medium text-text-primary link-dots"
                  href={`/projects/${step.slug}`}
                >
                  Proof: {titleOf(step.slug)}
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {service.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </PageSection>

        {/* ------------------------------------------------------------ proof */}
        <PageSection id="proof" meta={service.proof} title="Systems I've shipped">
          <ul className="grid gap-3 md:grid-cols-2">
            {page.projects.map((project) => (
              <li className="flex" key={project.slug}>
                <Link
                  className="group lift flex flex-1 flex-col gap-3 p-5 md:p-6 rounded-2xl bg-surface-card border border-border-hairline"
                  data-track="Related Project Clicked"
                  data-track-from={`service${page.path}`}
                  href={`/projects/${project.slug}`}
                >
                  <span className="font-label-meta text-label-meta text-text-muted">
                    {project.category} · {project.status}
                  </span>
                  <span className="font-headline-md text-headline-md text-text-primary">{project.title}</span>
                  <span className="font-body-sm text-body-sm text-text-secondary">{project.summary}</span>
                  <span className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border-hairline pt-3">
                    {project.metrics.map((metric) => (
                      <span className="font-body-sm text-body-sm text-text-muted" key={metric.label}>
                        <span className="font-medium text-text-primary" data-numeric>
                          {metric.value}
                        </span>{" "}
                        {metric.label.toLowerCase()}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1 font-body-sm text-body-sm font-medium text-text-primary">
                    Read the case study
                    <Icon className="transition-transform duration-300 group-hover:translate-x-0.5" name="arrow_forward" size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>

        {/* ---------------------------------------------------------- pricing */}
        <PageSection id="pricing" meta="Fixed prices in INR, quoted in writing after a free 15-minute call." title="What it costs">
          <ul className="grid gap-3 md:grid-cols-2">
            {page.tiers.map((tier) => (
              <li className="flex flex-col gap-2 p-5 md:p-6 rounded-2xl bg-surface-card border border-border-hairline" key={tier.name}>
                <span className="font-body-md text-body-md font-medium text-text-primary">{tier.name}</span>
                <span className="text-[clamp(1.75rem,1.4rem+1.2vw,2.25rem)] leading-none font-semibold tracking-[-0.03em] text-text-primary" data-numeric>
                  {tier.price}
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary">{tier.body}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-body-sm text-body-sm text-text-secondary">
            {pricingIncludes.map((line) => (
              <li className="flex items-center gap-1.5" key={line}>
                <Icon className="text-text-muted" name="check" size={14} />
                {line}
              </li>
            ))}
          </ul>
          <ol className="mt-8 grid gap-4 border-t border-border-hairline pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {pilotSteps.map((step) => (
              <li className="flex flex-col gap-1" key={step.number}>
                <span className="eyebrow text-text-muted" data-numeric>
                  {step.number} · {step.meta}
                </span>
                <span className="font-body-md text-body-md font-medium text-text-primary">{step.title}</span>
                <span className="font-body-sm text-body-sm text-text-secondary">{step.body}</span>
              </li>
            ))}
          </ol>
        </PageSection>

        {/* ----------------------------------------------------------- essays */}
        {page.essays.length > 0 && (
          <PageSection
            meta={<Link className={buttonStyles.link} href="/writing">All essays</Link>}
            title="How I think about it"
          >
            <ul className="flex flex-col border-t border-border-hairline">
              {page.essays.map((essay) => (
                <li className="border-b border-border-hairline" key={essay.slug}>
                  <Link
                    className="group flex flex-col gap-1.5 py-5"
                    data-track="Related Essay Clicked"
                    data-track-from={`service${page.path}`}
                    href={`/writing/${essay.slug}`}
                  >
                    <span className="font-label-meta text-label-meta text-text-muted">
                      {essayCategoryLabel(essay.category)} · {essayDateLabel(essay.date)} · {essay.readMinutes} min read
                    </span>
                    <span className="font-headline-md text-headline-md text-text-primary transition-transform duration-300 group-hover:translate-x-1">
                      {essay.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </PageSection>
        )}

        <PeopleAlsoAsk items={page.faqs} />

        <CtaBand
          body="Two or three sentences about the problem is enough. I reply within one working day, and the first 15-minute call is free."
          footnote={
            <>
              Hiring full-time instead?{" "}
              <a className="link-dots" data-track="Resume Clicked" data-track-from={`service${page.path}`} href="/kunjshah_cv.pdf" rel="noopener" target="_blank">
                View the resume
              </a>
            </>
          }
          title="Tell me what you're building."
        >
          <Link
            className={buttonStyles.primary}
            data-track="Contact CTA Clicked"
            data-track-from={`service${page.path}-cta`}
            href="/contact#inquiryForm"
          >
            {service.cta}
          </Link>
          <CopyEmailRow />
        </CtaBand>
      </div>
    </PageShell>
  );
}
