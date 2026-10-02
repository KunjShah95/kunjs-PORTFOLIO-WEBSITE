import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { CopyEmailRow } from "@/components/ui/copy-email";
import {
  ProjectsBrowser,
  ShippedStatus,
} from "@/components/projects/projects-browser";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { ArrowAffordance } from "@/components/ui/primitives";
import { otherBuilds, site } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMeta({
  path: "/projects",
  title: "AI Projects & Case Studies",
  description:
    "Case studies for 17 shipped AI systems: LangGraph multi-agent workflows, RAG pipelines, YOLOv8 edge vision on Jetson Orin, and full-stack AI apps with real production metrics.",
  keywords: [
    "AI projects",
    "machine learning projects",
    "AI agent projects",
    "RAG pipeline examples",
    "LangGraph projects",
    "edge AI case study",
    "computer vision project",
    "AI portfolio India",
    "gen AI case studies",
  ],
});

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Projects", "/projects")} />
        <div className="flex flex-col gap-8 md:gap-12">
          <PageIntro
            lead="Production AI systems, multi-agent frameworks, edge vision models, and full-stack software, architected from concept to deployment."
            title="Projects & case studies"
          >
            <ShippedStatus />
          </PageIntro>

          <div className="flex flex-col">
            <ProjectsBrowser />
          </div>
        </div>

        {/* ------------------------------------------- other selected builds */}
        <PageSection
          meta={`${otherBuilds.length} repositories`}
          title="Other builds"
        >
          <div className="grid gap-2 md:grid-cols-2">
            {otherBuilds.map((build) => (
              <a
                className="group lift flex items-center justify-between gap-3 p-space-sm md:p-4 bg-surface-card rounded-xl border border-border-hairline"
                href={site.links.github}
                key={build.title}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="flex flex-col min-w-0">
                    <span className="font-headline-md text-headline-md text-text-primary truncate">
                      {build.title}
                    </span>
                    <span className="font-body-sm text-body-sm text-text-muted truncate">
                      {build.body}
                    </span>
                  </span>
                </span>
                <ArrowAffordance icon="arrow_outward" />
              </a>
            ))}
          </div>
        </PageSection>

        {/* ------------------------------------------------- collaboration CTA */}
        <CtaBand
          body="I consult on multi-agent system design, production LLM latency optimization, and edge computer vision deployments."
          title="Have a complex AI project or agent architecture in mind?"
        >
          <a
            className={buttonStyles.primary}
            href={`mailto:${site.email}?subject=Architecture%20Call`}
          >
            Get in touch
          </a>
          <CopyEmailRow className="bg-surface-card" />
        </CtaBand>

        <div className="flex justify-center">
          <Link
            className="group inline-flex items-center gap-1.5 -my-3 py-3 font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors"
            href="/labs"
          >
            Research builds live in Labs
            <Icon className="transition-transform group-hover:translate-x-0.5" name="arrow_forward" size={13} />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
