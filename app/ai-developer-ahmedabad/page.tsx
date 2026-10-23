import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { CopyEmailRow } from "@/components/ui/copy-email";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/components/seo/json-ld";
import { pageMeta } from "@/lib/seo";
import { ORIGIN } from "@/lib/routes";
import {
  localFaqs,
  pilotSteps,
  pricingIncludes,
  pricingTiers,
  projects,
  services,
  site,
} from "@/lib/site-data";

const PATH = "/ai-developer-ahmedabad";
const TITLE = "AI Developer in Ahmedabad";
const DESCRIPTION =
  "Kunj Shah is an AI developer in Ahmedabad, Gujarat who builds AI agents, RAG search, full-stack AI apps and edge computer vision. Fixed prices in INR, 2 to 4 week builds, code in your repo.";

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: `${TITLE} | ${site.name}`,
  keywords: [
    "AI developer Ahmedabad",
    "AI developer near me",
    "hire AI developer Ahmedabad",
    "AI engineer Ahmedabad",
    "freelance AI developer India",
    "AI agent developer Gujarat",
    "RAG developer India",
    "Next.js AI developer Ahmedabad",
  ],
});

/** Shipped work with a live build, so a visitor can try it before writing. */
const liveWork = projects.filter((p) => p.demo && p.video).slice(0, 4);

export default function AiDeveloperAhmedabadPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={webPageJsonLd({ path: PATH, name: TITLE, description: DESCRIPTION })} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "" },
            { name: TITLE, path: PATH },
          ])}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${ORIGIN}${PATH}#service`,
            name: "AI development",
            serviceType: "AI software development",
            provider: { "@id": `${ORIGIN}/#organization` },
            areaServed: [
              { "@type": "City", name: "Ahmedabad" },
              { "@type": "State", name: "Gujarat" },
              { "@type": "Country", name: "India" },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Fixed-scope AI projects",
              itemListElement: pricingTiers.map((tier) => ({
                "@type": "Offer",
                name: tier.name,
                description: tier.body,
                priceCurrency: "INR",
              })),
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: localFaqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />

        <PageIntro
          eyebrow={`${site.locationLong} · ${site.timezone}`}
          lead="I'm Kunj Shah, an AI engineer in Ahmedabad. I build AI agents, search over your own documents, full-stack AI apps and computer vision that runs on the device, for founders and small teams here and anywhere a repository can be shared."
          title={
            <>
              An AI developer in Ahmedabad who{" "}
              <span className="display-accent">shows the tests.</span>
            </>
          }
        >
          <Link
            className={buttonStyles.primary}
            data-track="Contact CTA Clicked"
            data-track-from="local-hero"
            href="/contact#inquiryForm"
          >
            Start a project
          </Link>
          <Link className={buttonStyles.secondary} href="#pricing">
            See prices in INR
          </Link>
        </PageIntro>

        {/* ------------------------------------------------- what gets built */}
        <PageSection
          meta="Five kinds of project, each with the evidence behind it."
          title="What I build"
        >
          <ul className="border-t border-border-hairline">
            {services.map((service) => (
              <li
                className="grid gap-3 py-6 border-b border-border-hairline md:grid-cols-12 md:gap-8"
                key={service.title}
              >
                <div className="md:col-span-4 flex flex-col gap-1.5">
                  <p className="eyebrow text-text-muted">{service.pill}</p>
                  <h2 className="font-headline-md text-headline-md text-text-primary text-balance">
                    {service.title}
                  </h2>
                </div>
                <div className="md:col-span-8 flex flex-col gap-2">
                  <p className="font-body-md text-body-md text-text-primary">{service.deliverable}</p>
                  <p className="font-body-sm text-body-sm text-text-secondary">{service.proof}</p>
                </div>
              </li>
            ))}
          </ul>
        </PageSection>

        {/* --------------------------------------------------- live builds */}
        <PageSection
          meta={
            <Link className={buttonStyles.link} href="/projects">
              All {projects.length} projects
            </Link>
          }
          title="Try the work first"
        >
          <div className="grid gap-3 md:grid-cols-2">
            {liveWork.map((project) => (
              <a
                className="group lift flex flex-col gap-2 p-5 rounded-2xl bg-surface-card border border-border-hairline"
                data-track="Live Demo Clicked"
                data-track-from="local-page"
                href={project.demo}
                key={project.slug}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-headline-md text-headline-md text-text-primary">
                    {project.title}
                  </span>
                  <span className="eyebrow text-text-muted shrink-0" data-numeric>
                    {project.metrics[0].value} {project.metrics[0].label}
                  </span>
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary text-pretty">
                  {project.description}
                </span>
                <span className="mt-auto pt-1 inline-flex items-center gap-1 font-body-sm text-body-sm font-medium text-text-primary">
                  Open the live build
                  <Icon
                    className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                    name="arrow_outward"
                    size={14}
                  />
                </span>
              </a>
            ))}
          </div>
        </PageSection>

        {/* ------------------------------------------------------- pricing */}
        <PageSection
          id="pricing"
          meta="Fixed prices, quoted in writing after a free 15-minute call."
          title="What it costs"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                className="flex flex-col gap-2 p-5 rounded-2xl bg-surface-card border border-border-hairline"
                key={tier.name}
              >
                <span className="font-body-sm text-body-sm text-text-secondary">{tier.name}</span>
                <span className="font-headline-lg text-headline-lg tracking-tight text-text-primary" data-numeric>
                  {tier.price}
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary text-pretty">{tier.body}</span>
              </div>
            ))}
          </div>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 font-body-sm text-body-sm text-text-secondary">
            {pricingIncludes.map((item) => (
              <li className="inline-flex items-center gap-1.5" key={item}>
                <Icon className="text-signal-ink" name="check" size={14} />
                {item}
              </li>
            ))}
          </ul>
        </PageSection>

        {/* ------------------------------------------------- how it runs */}
        <PageSection meta="The same four steps for every fixed-scope project." title="How a project runs">
          <ol className="grid gap-3 md:grid-cols-4">
            {pilotSteps.map((step) => (
              <li className="flex flex-col gap-2 p-5 rounded-2xl border border-border-hairline" key={step.number}>
                <span className="eyebrow text-text-muted" data-numeric>
                  {step.number} · {step.meta}
                </span>
                <span className="font-headline-md text-headline-md text-text-primary">{step.title}</span>
                <span className="font-body-sm text-body-sm text-text-secondary text-pretty">{step.body}</span>
              </li>
            ))}
          </ol>
        </PageSection>

        {/* ------------------------------------------------------------ faq */}
        <PageSection meta="Asked by people searching for a developer nearby." title="Questions">
          <div className="mx-auto max-w-3xl border-t border-border-hairline">
            {localFaqs.map((faq) => (
              <details className="group border-b border-border-hairline" key={faq.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-body-lg text-body-lg font-medium text-text-primary [&::-webkit-details-marker]:hidden">
                  <h3>{faq.question}</h3>
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

        <CtaBand
          body="Two or three sentences is enough: what it should do, who uses it, and when you need it. I reply within one working day."
          title="Tell me what you're building."
        >
          <Link
            className={buttonStyles.primary}
            data-track="Contact CTA Clicked"
            data-track-from="local-cta"
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
