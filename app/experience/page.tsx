import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { Tag } from "@/components/ui/primitives";
import { CtaBand, StatStrip, buttonStyles } from "@/components/ui/blocks";
import { hackathons, impactMetrics, jobs, site } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMeta({
  path: "/experience",
  title: "Experience",
  description: "Work history of Kunj Shah: Python and AI/ML intern at Ideaboat, automation intern at PHAZE_AI, and open-source contributions to OWASP, Microsoft, and Ollama.",
  keywords: ["AI engineer work experience", "AI internship India", "machine learning intern Ahmedabad", "OWASP contributor"],
});

const finals = hackathons.filter((h) => h.placement === "Finalist").length;

export default function ExperiencePage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Experience", "/experience")} />
        <PageIntro
          title="Experience"
          lead="Internships shipping AI into production, alongside continuous upstream open-source work."
        >
        </PageIntro>

        {/* --------------------------------------------------------- timeline */}
        <PageSection meta="Most recent first" title="Career timeline">

          <div className="relative pl-7 md:pl-9 space-y-space-lg">
            <div className="absolute left-2.5 md:left-3.5 top-3 bottom-3 w-px bg-border-dotted" />
            {jobs.map((job) => (
              <div className="relative group" key={`${job.company}-${job.period}`}>
                <div className="absolute -left-7 md:-left-9 top-5 w-5 h-5 md:w-7 md:h-7 border border-border-hairline rounded-full bg-surface-card shadow-sm flex items-center justify-center">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      job.live ? "bg-accent-emerald" : "bg-text-muted"
                    }`}
                  />
                </div>
                <div className="bg-surface-card rounded-2xl p-space-md md:p-6 border border-border-hairline space-y-space-xs">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span
                      className={`font-body-sm text-body-sm ${
                        job.live
                          ? "text-accent-emerald font-semibold"
                          : "text-text-muted"
                      }`}
                    >
                      {job.period}
                    </span>
                    <Tag tone="subtle">
                      {job.kind}
                    </Tag>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-text-primary">
                    {job.role}
                  </h3>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    {job.company}
                  </p>
                  <p className="font-body-sm text-body-sm text-text-secondary pt-1">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.skills.map((skill) => (
                      <Tag
                        key={skill}
                        tone="container"
                      >
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        {/* ------------------------------------------------------ impact strip */}
        <PageSection title="Open source impact">
          <StatStrip items={impactMetrics} />
          <Link
            className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors w-fit"
            href="/open-source"
          >
            See the actual pull requests
            <Icon name="arrow_forward" size={13} />
          </Link>
        </PageSection>

        {/* ----------------------------------------------------- hackathon tie */}
        <PageSection
          meta={
            <Link
              className="font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors"
              href="/hackathons"
            >
              All {hackathons.length} â†’
            </Link>
          }
          title="Hackathons"
        >
          <StatStrip
            items={[
              { value: String(finals), label: "Finals reached" },
              { value: String(hackathons.length), label: "Entered" },
            ]}
          />
          <p className="font-body-sm text-body-sm text-text-secondary">
            Solo finalist out of 2000+ teams at Autonomous Hacks 2026, building
            an autonomous AI system end-to-end in 48 hours.
          </p>
        </PageSection>

        <CtaBand
          body="Currently partnering with teams building agent orchestration layers, edge vision platforms, and high-throughput LLM architectures."
          title="Have an AI pipeline to build or optimize?"
        >
          <Link className={buttonStyles.primary} href="/contact">
            Get in touch
          </Link>
          <a className={buttonStyles.secondary} href={`mailto:${site.email}`}>
            <Icon name="mail" size={18} />
            <span className="truncate">{site.email}</span>
          </a>
        </CtaBand>

        <SubPageFooter current="/experience" />
      </div>
    </PageShell>
  );
}
