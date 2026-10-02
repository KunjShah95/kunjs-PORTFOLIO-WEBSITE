import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { Tag } from "@/components/ui/primitives";
import { CtaBand, StatStrip, buttonStyles } from "@/components/ui/blocks";
import { education, hackathons, labs, site } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMeta({
  path: "/education",
  title: "Education",
  description: "B.Tech Computer Science at Indus University (2023-2027), specializing in AI/ML integration and automation. Coursework in deep learning, computer vision, NLP, and distributed systems.",
  keywords: ["Indus University", "B.Tech Computer Science Ahmedabad", "AI student India", "computer science Ahmedabad"],
});

export default function EducationPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Education", "/education")} />
        <PageIntro
          title="Education"
          lead="Focusing on the intersection of full stack development and AI, building automated systems that use distributed intelligence at scale."
        />

        {/* ------------------------------------------------------ degree card */}
        <PageSection title="Degree">
        <div className="bg-surface-card rounded-2xl p-space-lg md:p-8 border border-border-hairline flex flex-col gap-space-md">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
                  {education.degree}
                </h2>
                <p className="font-body-md text-body-md text-text-secondary">
                  {education.institution} · {education.location}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-accent-emerald/15 text-accent-emerald font-label-badge text-label-badge shrink-0">
              {education.year}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="p-space-sm rounded-lg bg-surface-subtle">
              <span className="font-body-sm text-body-sm text-text-muted block">
                Period
              </span>
              <span className="font-body-sm text-body-sm text-text-primary font-medium">
                {education.period}
              </span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-subtle">
              <span className="font-body-sm text-body-sm text-text-muted block">
                Specialization
              </span>
              <span className="font-body-sm text-body-sm text-text-primary font-medium">
                {education.specialization}
              </span>
            </div>
          </div>

          <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
            {education.summary}
          </p>
        </div>
        </PageSection>

        {/* ------------------------------------------------------- coursework */}
        <PageSection layout="stacked" title="Coursework">
          <div className="flex flex-wrap gap-1.5">
            {education.coursework.map((item) => (
              <Tag key={item} tone="subtle">
                {item}
              </Tag>
            ))}
          </div>
        </PageSection>

        {/* ---------------------------------------------------- learning by doing */}
        <PageSection
          meta={
            <Link
              className="font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors"
              href="/labs"
            >
              All {labs.length} â†’
            </Link>
          }
          title="Learning by building"
        >
          <p className="font-body-sm text-body-sm text-text-secondary">
            Coursework covers the theory. The labs are where the theory gets
            tested: a vector database from scratch, GPT-2 from first principles,
            and a tokenizer in pure Python.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            {labs.filter((l) => l.url).map((lab) => (
              <a
                className="group lift p-space-md rounded-2xl bg-surface-card border border-border-hairline flex flex-col gap-1.5"
                href={lab.url}
                key={lab.id}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-headline-md text-headline-md text-text-primary">
                    {lab.title}
                  </span>
                  <span className="text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5">
                    <Icon name="arrow_outward" size={14} />
                  </span>
                </span>
                <span className="font-body-sm text-body-sm text-text-muted">
                  {lab.status} · {lab.stack.slice(0, 3).join(", ")}
                </span>
              </a>
            ))}
          </div>
        </PageSection>

        {/* ---------------------------------------------------------- hackathons */}
        <PageSection
          meta={
            <Link
              className="font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors"
              href="/hackathons"
            >
              All {hackathons.length} â†’
            </Link>
          }
          title="Competitions"
        >
          <StatStrip
            items={[
              {
                value: String(hackathons.filter((h) => h.placement === "Finalist").length),
                label: "Finals reached",
              },
              { value: "2,000+", label: "Teams outrounded" },
            ]}
          />
        </PageSection>

        <CtaBand
          body={`Open to freelance, contract, part-time retainer, and full-time AI roles, remote-friendly from ${site.location}.`}
          title="Looking for an AI engineer who ships?"
        >
          <Link className={buttonStyles.primary} href="/contact">
            <Icon name="mail" size={18} />
            Get in touch
          </Link>
        </CtaBand>

        <SubPageFooter current="/education" />
      </div>
    </PageShell>
  );
}
