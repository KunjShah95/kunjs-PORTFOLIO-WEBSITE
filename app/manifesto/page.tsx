import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { Reveal } from "@/components/primitives/Reveal";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { principles, projectBySlug, site } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/manifesto",
  title: "Manifesto",
  description:
    "Three non-negotiable engineering principles for building AI systems in production — determinism over hallucination, edge and cost efficiency, and observability first — each tied to the shipped systems that prove it.",
  keywords: [
    "AI engineering principles",
    "production AI best practices",
    "LLM engineering philosophy",
    "AI agent engineering",
  ],
});

/** Distinct systems behind the evidence, deduplicated across principles. */
const shippedSystems = new Set(
  principles.flatMap((principle) => principle.ships.map((ship) => ship.project)),
);

/**
 * The system standing behind one line of evidence.
 *
 * Each row links to that system's source rather than to the project archive:
 * the claim on this page is only worth reading if it can be checked, and a
 * link back to a list is not a check. Falls back to the archive for the rare
 * project with nothing published.
 */
function attribution(slug: string) {
  const project = projectBySlug(slug);
  const external = project?.github ?? project?.demo;
  return {
    name: project?.title ?? slug,
    status: project?.status,
    href: external ?? "/projects",
    external: external !== undefined,
  };
}

/** One principle plus the shipped systems behind it, as an FAQ answer. */
const faq = principles.map((principle) => ({
  "@type": "Question",
  name: principle.title,
  acceptedAnswer: {
    "@type": "Answer",
    text: `${principle.body} Shipped in: ${principle.ships
      .map((ship) => `${attribution(ship.project).name} — ${ship.claim}`)
      .join("; ")}.`,
  },
}));

export default function ManifestoPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq,
          }}
        />
        <PageIntro
          title="Manifesto"
          lead="Three non-negotiable engineering principles learned from running inference in high-stakes production. Each one is stated below with the shipped systems that hold it up — a principle nothing runs on is a preference, not a practice."
        />

        {/* -------------------------------------------------------- principles */}
        <section className="flex flex-col border-t border-text-primary">
          {principles.map((principle, i) => (
            <Reveal
              className="grid gap-3 md:grid-cols-12 md:gap-x-10 py-space-lg md:py-12 border-b border-border-hairline"
              delay={i * 0.06}
              key={principle.number}
            >
              <span className="md:col-span-3 font-label-section text-[40px] md:text-[72px] leading-none tracking-tight text-text-muted/60">
                {principle.number}
              </span>
              <div className="md:col-span-9 flex flex-col gap-2 min-w-0">
                <h2 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
                  {principle.title}
                </h2>
                <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed max-w-2xl">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* --------------------------------------------------------- evidence */}
        <PageSection
          layout="stacked"
          meta={
            <span className="flex flex-col gap-0.5">
              <span>Each principle, in shipped systems</span>
              <span className="text-text-muted/70">
                {shippedSystems.size} systems linked
              </span>
            </span>
          }
          title="Applied, not aspirational"
        >
          <div className="flex flex-col gap-space-xl">
            {principles.map((principle, i) => (
              <Reveal
                className="flex flex-col gap-3 md:gap-4"
                delay={i * 0.05}
                key={principle.number}
              >
                {/* Group header: the number pairs back to the principle above. */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-text-primary">
                  <span className="font-label-section text-label-section text-text-muted">
                    {principle.number}
                  </span>
                  <Icon className="text-text-muted" name={principle.icon} size={15} />
                  <h3 className="font-headline-md text-headline-md text-text-primary">
                    {principle.title}
                  </h3>
                </div>

                <ul className="flex flex-col">
                  {principle.ships.map((ship) => {
                    const source = attribution(ship.project);
                    return (
                      <li
                        className="grid gap-x-8 gap-y-2 py-4 border-b border-border-hairline last:border-b-0 md:grid-cols-12 md:items-baseline"
                        key={ship.claim}
                      >
                        <p className="md:col-span-7 flex items-start gap-3 font-body-lg text-body-lg text-text-primary">
                          <span className="text-accent-emerald shrink-0 mt-1">
                            <Icon name="check" size={15} />
                          </span>
                          {ship.claim}
                        </p>

                        {/* The proof hangs off the right margin on wide screens
                            and drops under the claim on phones, where it stays
                            on the same left edge so the pair still reads as one
                            citation. */}
                        <div className="md:col-span-5 md:justify-self-end flex items-center gap-2 flex-wrap">
                          {source.external ? (
                            <a
                              className="group inline-flex items-center gap-1.5 font-body-sm text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                              href={source.href}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span className="link-draw">{source.name}</span>
                              <Icon
                                className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                                name="arrow_outward"
                                size={13}
                              />
                            </a>
                          ) : (
                            <Link
                              className="group inline-flex items-center gap-1.5 font-body-sm text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                              href={source.href}
                            >
                              <span className="link-draw">{source.name}</span>
                              <Icon
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                                name="arrow_forward"
                                size={13}
                              />
                            </Link>
                          )}
                          {source.status && (
                            <span className="font-body-sm text-body-sm text-text-muted">
                              {source.status}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Every claim above links out to its own source. This is the way
              into the full write-ups for the five systems behind them. */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-text-primary">
            <span className="font-body-sm text-body-sm text-text-muted">
              Full write-ups, challenges and build notes for every system above
            </span>
            <Link
              className="group inline-flex items-center gap-1.5 shrink-0 font-body-sm text-body-sm font-medium text-text-primary transition-colors"
              href="/projects"
            >
              All projects
              <Icon
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                name="arrow_forward"
                size={14}
              />
            </Link>
          </div>
        </PageSection>

        <CtaBand
          body="I take on advisory and contract work where determinism, latency budgets, and cost governance actually matter."
          title="Want an engineer who argues with the hype?"
        >
          <Link className={buttonStyles.primary} href="/contact">
            Get in touch
          </Link>
          <a className={buttonStyles.secondary} href={`mailto:${site.email}`}>
            <Icon name="mail" size={18} />
            <span className="truncate">{site.email}</span>
          </a>
        </CtaBand>

        <SubPageFooter current="/manifesto" />
      </div>
    </PageShell>
  );
}
