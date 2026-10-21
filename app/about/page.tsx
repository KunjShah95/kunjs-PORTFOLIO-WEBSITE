import type { Metadata } from "next";
import { FadeImage } from "@/components/primitives/FadeImage";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection, RailLink } from "@/components/ui/page-intro";
import { PullQuote } from "@/components/ui/pull-quote";
import { legalDocuments } from "@/lib/legal";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { StatStrip } from "@/components/ui/blocks";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";
import {
  education,
  focusAreas,
  metrics,
  site,
  skillGroups,
} from "@/lib/site-data";

export const metadata: Metadata = pageMeta({
  path: "/about",
  title: "About",
  description: "Kunj Shah is a 22-year-old AI engineer and agent builder in Ahmedabad, India. B.Tech Computer Science at Indus University, specializing in production agents, RAG, and edge computer vision.",
  keywords: ["about Kunj Shah", "AI engineer Ahmedabad", "AI engineer biography", "machine learning engineer India", "AI developer profile"],
});

// Served from `public/` rather than the absolute URL this file was ported
// with. Byte-identical, but a local source lets the image optimizer read it
// off disk instead of making a second request to a remote origin on a cold
// cache — which is what was setting the home page's LCP.
const portrait = {
  src: "/profile.png",
  alt: "Portrait of Kunj Shah, AI engineer and agent builder based in Ahmedabad, India.",
};

/** Quick-fact grid. */
const facts = [
  { icon: "location_on", label: "Location", value: site.locationLong },
  { icon: "psychology", label: "Focus", value: "Agents, RAG & Edge CV" },
  { icon: "hub", label: "Open Source", value: "OWASP, Microsoft, Ollama" },
  { icon: "verified", label: "Status", value: "Available for new work" },
  {
    icon: "architecture",
    label: "Education",
    value: `${education.degree}, ${education.year}`,
  },
  { icon: "verified_user", label: "Also known as", value: "KunjShah95" },
] as const;

/** Cross-links to the sections that used to live inside this page. */
const related = [
  {
    href: "/experience",
    icon: "verified",
    title: "Experience",
    body: "Internships at PHAZE_AI and Ideaboat, plus ongoing open-source work.",
  },
  {
    href: "/open-source",
    icon: "commit",
    title: "Open Source",
    body: "60+ merged pull requests and 41 resolved issues across 24 codebases.",
  },
  {
    href: "/manifesto",
    icon: "architecture",
    title: "Manifesto",
    body: "Three non-negotiable principles for running AI in production.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("About", "/about")} />
        <PageIntro
          title="About"
          lead="Building end-to-end AI systems: generative AI applications, autonomous agents and orchestration, computer vision, and full-stack prototypes."
        >
        </PageIntro>

        {/* ---------------------------------------------------- profile dossier */}
        <PageSection title="Profile">
          <div className="bg-surface-card rounded-2xl p-space-md md:p-6 border border-border-hairline flex flex-col sm:flex-row gap-space-md md:gap-6 items-start">
            <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-surface-subtle">
              <FadeImage
                alt={portrait.alt}
                className="object-cover"
                fill
                sizes="(min-width: 640px) 128px, 96px"
                src={portrait.src}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1 justify-center">
              <h2 className="font-headline-md text-headline-md text-text-primary">
                {site.name}, {site.title}
              </h2>
              <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                Based in {site.locationLong} ({site.timezone}). B.Tech Computer
                Science at {education.institution}, specializing in{" "}
                {education.specialization}.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-space-md text-text-secondary font-body-lg text-body-lg max-w-2xl">
            <p>
              I&apos;m Kunj, {site.age}, in {site.location}, and I build the
              unglamorous half of an AI product: the parts that have to keep
              working after the demo ends. Agents that know when to stop,
              retrieval that returns what actually exists, and pipelines that
              are still observable six months later.
            </p>
            <p>
              My core philosophy is simple:{" "}
              <strong className="text-text-primary font-semibold">
                measurable engineering over demos
              </strong>
              . Generative models in production require deterministic boundaries,
              strict schema enforcement, latency budgets, and cost governance,
              not unconstrained reasoning loops.
            </p>
            <p>
              What fuels the work is shipping velocity, weekend hackathons, and
              contributing upstream to the developer tooling I depend on. Five
              hackathon finals, and 60 merged pull requests into projects I don&apos;t
              own.
            </p>
          </div>

          {/* The one opinion, said once. A manifesto page for all three
              principles is too much for this page; one line is enough to
              tell a reader what the work stands for. */}
          <PullQuote />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
            {facts.map((fact) => (
              <div
                className="flex items-start gap-3 pt-4 border-t border-border-hairline"
                key={fact.label}
              >
                <Icon className="text-text-muted shrink-0 mt-0.5" name={fact.icon} size={16} />
                <span className="min-w-0">
                  <span className="font-body-sm text-body-sm text-text-muted block">
                    {fact.label}
                  </span>
                  <span className="font-body-sm text-body-sm text-text-primary font-medium">
                    {fact.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </PageSection>

        {/* ------------------------------------------------------ focus areas */}
        <PageSection layout="stacked" title="Focus areas">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            {focusAreas.map((area) => (
              <div
                className="pt-4 border-t border-text-primary flex flex-col gap-3"
                key={area}
              >
                <span className="font-headline-md text-headline-md text-text-primary">
                  {area}
                </span>
              </div>
            ))}
          </div>
        </PageSection>

        {/* -------------------------------------------------- what i work with */}
        <PageSection
          layout="stacked"
          meta={<RailLink href="/skills">All skills</RailLink>}
          title="Disciplines"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            {skillGroups.map((group) => (
              <div
                className="flex items-start gap-space-sm p-space-md rounded-2xl bg-surface-subtle/70"
                key={group.key}
              >
                <span className="flex flex-col min-w-0">
                  <span className="font-headline-md text-headline-md text-text-primary text-[15px]">
                    {group.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                    {group.description}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </PageSection>

        {/* ------------------------------------------------------ by the numbers */}
        <PageSection title="By the numbers">
          <StatStrip items={metrics} />
        </PageSection>

        {/* ------------------------------------------------- related sections */}
        <PageSection layout="stacked" title="Go deeper">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            {related.map((item) => (
              <Link
                className="group lift p-space-md rounded-2xl bg-surface-card border border-border-hairline flex flex-col gap-3"
                href={item.href}
                key={item.href}
              >
                <span className="flex flex-col gap-0.5">
                  <span className="font-headline-md text-headline-md text-text-primary">
                    {item.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-text-secondary">
                    {item.body}
                  </span>
                </span>
                <span className="flex items-center gap-1 font-body-sm text-body-sm text-text-muted group-hover:text-text-primary transition-colors">
                  Read
                  <Icon
                    className="transition-transform group-hover:translate-x-0.5"
                    name="arrow_forward"
                    size={13}
                  />
                </span>
              </Link>
            ))}
          </div>
        </PageSection>

        <PageSection
          layout="stacked"
          meta="Freelance and contract work"
          title="Terms & privacy"
        >
          <p className="font-body-sm text-body-sm text-text-secondary max-w-2xl">
            Hiring me for a project or retainer? These are the default terms and
            how your data is handled: the same documents linked from Contact and
            the site footer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {legalDocuments.map((doc) => (
              <Link
                className="group lift bg-surface-card rounded-2xl p-space-md md:p-5 border border-border-hairline flex flex-col gap-2 min-w-0"
                href={doc.path}
                key={doc.path}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-surface-subtle text-text-secondary group-hover:bg-surface-container group-hover:text-text-primary transition-colors">
                    <Icon name={doc.icon} size={16} />
                  </span>
                  <span className="font-headline-lg text-headline-lg text-text-primary min-w-0">
                    {doc.title}
                  </span>
                  <span className="ml-auto text-text-muted shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                    <Icon name="arrow_forward" size={18} />
                  </span>
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary">
                  {doc.description}
                </span>
              </Link>
            ))}
          </div>
        </PageSection>

        <SubPageFooter current="/about" />
      </div>
    </PageShell>
  );
}
