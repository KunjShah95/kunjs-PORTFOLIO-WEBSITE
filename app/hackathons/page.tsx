import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { SectionLabel } from "@/components/ui/primitives";
import { CtaBand, StatStrip, buttonStyles } from "@/components/ui/blocks";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";
import { hackathons } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMeta({
  path: "/hackathons",
  title: "Hackathons",
  description: "10 hackathons, 4 finals, including a solo finalist spot out of 2000+ teams at Autonomous Hacks 2026, building an autonomous AI system in 48 hours.",
  keywords: ["AI hackathon winner", "Autonomous Hacks 2026", "SIH 2025 finalist", "AI hackathon India"],
});

export default function HackathonsPage() {
  const finals = hackathons.filter((h) => h.placement === "Finalist");
  const years = [...new Set(hackathons.map((h) => h.year))].sort((a, b) => b - a);

  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Hackathons", "/hackathons")} />
        <PageIntro
          title="Hackathons"
          lead="Weekend-built systems under time pressure, the fastest way to find out whether an idea actually works."
        >
          <span className="inline-flex items-center gap-1 font-body-sm text-body-sm text-accent-emerald font-medium">
            <Icon name="badge" size={14} />
            {finals.length} Finals
          </span>
        </PageIntro>

        <div className="flex flex-col gap-3 md:gap-4">
          <StatStrip
            items={[
              { value: String(hackathons.length), label: "Entered" },
              { value: String(finals.length), label: "Finals" },
              { value: "2,000+", label: "Largest field" },
            ]}
          />

        {/* -------------------------------------------------- highlight: solo win */}
        <Reveal as="section" className="relative overflow-hidden bg-primary text-on-primary rounded-2xl p-space-lg md:p-10 flex flex-col gap-space-sm md:gap-4">
          <SectionLabel className="block" tone="emerald">
            Solo Finalist
          </SectionLabel>
          <h2 className="relative font-headline-xl-mobile text-headline-xl-mobile text-on-primary tracking-tight">
            Autonomous Hacks 2026
          </h2>
          <p className="relative font-body-md text-body-md text-on-primary-container leading-relaxed max-w-2xl">
            Selected out of 2000+ teams in the online round, and from 300+ teams
            in the offline final. Built an autonomous AI system end-to-end in 48
            hours, alone.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {["2000+ teams online", "300+ offline", "Solo", "48 hours"].map(
              (item) => (
                <span
                  className="px-2 py-0.5 rounded-full bg-on-primary/15 font-body-sm text-body-sm text-on-primary"
                  key={item}
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </Reveal>
        </div>

        {/* -------------------------------------------------------------- all */}
        {years.map((year) => {
          const rows = hackathons.filter((h) => h.year === year);
          return (
            <PageSection key={year} title={String(year)} meta={`${rows.length} events`}>
              <div className="grid gap-3 md:grid-cols-2">
                {rows.map((h) => {
                  const isFinal = h.placement === "Finalist";
                  return (
                    <div
                      className="p-space-md md:p-6 rounded-2xl bg-surface-card border border-border-hairline flex flex-col gap-2"
                      key={h.title}
                    >
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="min-w-0">
                            <h3 className="font-headline-md text-headline-md text-text-primary">
                              {h.title}
                            </h3>
                            <span className="font-body-sm text-body-sm text-text-muted">
                              {h.event} · Team of {h.team}
                            </span>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full font-label-badge text-label-badge shrink-0",
                            isFinal
                              ? "bg-accent-emerald text-on-primary"
                              : "bg-surface-subtle text-text-secondary",
                          )}
                        >
                          {h.placement}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </PageSection>
          );
        })}

        <CtaBand
          body="I take the prototypes that survive their weekend and turn them into systems with tests, observability, and a bill that makes sense."
          title="The 48-hour version is the demo. The production version is the job."
        >
          <Link className={buttonStyles.primary} href="/projects">
            <Icon name="code_blocks" size={18} />
            View projects
          </Link>
        </CtaBand>

        <SubPageFooter current="/hackathons" />
      </div>
    </PageShell>
  );
}
