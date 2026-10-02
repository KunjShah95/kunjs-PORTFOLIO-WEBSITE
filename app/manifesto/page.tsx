import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { Reveal } from "@/components/primitives/Reveal";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { SectionLabel, Tag } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/json-ld";
import { evidence, principles, site } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/manifesto",
  title: "Manifesto",
  description: "Three non-negotiable engineering principles for building AI systems in production: determinism over hallucination, edge and cost efficiency, and observability first.",
  keywords: ["AI engineering principles", "production AI best practices", "LLM engineering philosophy"],
});

export default function ManifestoPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: principles.map((p) => ({
              "@type": "Question",
              name: p.title,
              acceptedAnswer: { "@type": "Answer", text: p.body },
            })),
          }}
        />
        <PageIntro
          title="Manifesto"
          lead="Three non-negotiable engineering principles learned from running inference in high-stakes production."
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
                <h2 className="font-headline-lg text-headline-lg md:text-[32px] md:leading-[40px] text-text-primary tracking-tight">
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
        <PageSection meta="Each principle, in shipped systems" title="Applied, not aspirational">

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {evidence.map((item) => (
              <div
                className="p-space-md md:p-6 rounded-2xl bg-surface-container-low flex flex-col gap-space-sm"
                key={item.for}
              >
                <div className="flex items-center gap-2">
                  <SectionLabel>{item.for}</SectionLabel>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {item.examples.map((example) => (
                    <li
                      className="flex items-start gap-2 font-body-sm text-body-sm text-text-secondary"
                      key={example}
                    >
                      <span className="text-accent-emerald shrink-0 mt-0.5">
                        <Icon name="check" size={14} />
                      </span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  className="group inline-flex items-center gap-1.5 mt-auto -my-3 py-3 font-body-sm text-body-sm text-text-secondary hover:text-text-primary transition-colors w-fit"
                  href={item.href}
                >
                  <Tag tone="subtle">
                    {item.project}
                  </Tag>
                  <Icon
                    className="transition-transform group-hover:translate-x-0.5"
                    name="arrow_forward"
                    size={13}
                  />
                </Link>
              </div>
            ))}
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
