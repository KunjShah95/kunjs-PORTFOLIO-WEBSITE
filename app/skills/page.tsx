import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { StackFilter } from "@/components/skills/stack-filter";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { Tag } from "@/components/ui/primitives";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { skillGroups, stackInventory } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMeta({
  path: "/skills",
  title: "Technical Skills & Stack",
  description: "The tools Kunj Shah ships with, Python, FastAPI, LangGraph, CrewAI, PyTorch, CUDA, YOLOv8, React, Next.js, Docker, and the infrastructure underneath.",
  keywords: ["AI engineer skills", "LangGraph", "CrewAI", "PyTorch", "FastAPI", "MLOps stack", "Python AI developer"],
});

export default function SkillsPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Skills", "/skills")} />
        <PageIntro
          title="Skills"
          lead="Grouped by discipline rather than by logo, the stack I actually reach for on each kind of problem."
        />

        {/* --------------------------------------------------------- discipline */}
        <PageSection meta={`${skillGroups.length} disciplines`} title="By discipline">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            {skillGroups.map((group) => (
              <div
                className="p-space-md md:p-6 rounded-2xl bg-surface-card border border-border-hairline flex flex-col gap-space-sm"
                key={group.key}
              >
                <div className="flex items-center gap-space-sm">
                  <h3 className="font-headline-md text-headline-md text-text-primary">
                    {group.title}
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  {group.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Tag
                      key={skill}
                      tone="subtle"
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        {/* -------------------------------------------------------- full stack */}
        <PageSection
          meta={`${stackInventory.length} disciplines`}
          title="Full inventory"
        >
          <StackFilter />
        </PageSection>

        <CtaBand
          body="Send the brief. A 15-minute intro call is free, and I'll tell you honestly whether I'm the right fit, including when I'm not."
          title="Not sure which of these applies to your problem?"
        >
          <Link className={buttonStyles.primary} href="/contact">
            Get in touch
          </Link>
        </CtaBand>

        <SubPageFooter current="/skills" />
      </div>
    </PageShell>
  );
}
