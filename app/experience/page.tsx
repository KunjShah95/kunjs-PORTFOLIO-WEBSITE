import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { CareerTimeline } from "@/components/experience/career-timeline";
import {
  HackathonSpotlight,
  OpenSourceImpact,
} from "@/components/experience/experience-spotlights";
import { PageIntro, PageSection, RailLink } from "@/components/ui/page-intro";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { hackathons, githubClaimFloorsLabel, impactMetrics, jobs, roleAnchor, site } from "@/lib/site-data";
import { ORIGIN } from "@/lib/routes";
import { pageMeta } from "@/lib/seo";
import {
  JsonLd,
  collectionPageJsonLd,
  pageBreadcrumb,
} from "@/components/seo/json-ld";

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
        {/* Roles as data, each anchored to the card it describes. */}
        <JsonLd
          data={collectionPageJsonLd({
            path: "/experience",
            name: "Work history",
            description:
              "Internships and open-source contribution history: production AI/ML work at Ideaboat and PHAZE_AI, plus merged upstream contributions.",
            items: jobs.map((job) => ({
              name: `${job.role} at ${job.company}`,
              url: `${ORIGIN}/experience#${roleAnchor(job.company)}`,
              description: job.description,
              type: "OrganizationRole",
            })),
          })}
        />
        <PageIntro
          eyebrow="Experience"
          title="Two internships and a public commit history."
          lead={`Production AI/ML work at Ideaboat and PHAZE_AI, alongside ${githubClaimFloorsLabel()} pull requests merged into codebases I don't own.`}
        >
        </PageIntro>

        {/* --------------------------------------------------------- timeline */}
        <PageSection meta="Most recent first" title="Career timeline">
          <CareerTimeline jobs={jobs} />
        </PageSection>

        {/* ------------------------------------------------------ impact strip */}
        <PageSection title="Open source impact">
          <OpenSourceImpact items={impactMetrics} />
        </PageSection>

        {/* ----------------------------------------------------- hackathon tie */}
        <PageSection
          meta={<RailLink href="/hackathons">All {hackathons.length}</RailLink>}
          title="Hackathons"
        >
          <HackathonSpotlight
            blurb="Solo finalist out of 2000+ teams at Autonomous Hacks 2026, building an autonomous AI system end-to-end in 48 hours."
            finals={finals}
            total={hackathons.length}
          />
        </PageSection>

        <CtaBand
          body="Agents, document search, a full-stack AI app or a cost review. Tell me what it needs to do and I'll reply within one working day."
          title="Have an AI feature to build or fix?"
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
