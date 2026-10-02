import type { Metadata } from "next";
import { FadeImage } from "@/components/primitives/FadeImage";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { DemoVideo } from "@/components/projects/demo-video";
import { Icon } from "@/components/icon";
import { Reveal, RevealText } from "@/components/primitives/Reveal";
import { CopyEmailRow } from "@/components/ui/copy-email";
import {
  ContributionGraph,
  ContributionGraphFallback,
} from "@/components/ui/contribution-graph";
import { CtaBand, StatStrip, buttonStyles } from "@/components/ui/blocks";
import { PageSection, RailLink } from "@/components/ui/page-intro";
import { ArrowAffordance, StatusDot } from "@/components/ui/primitives";
import {
  homeEssays,
  jobs,
  mergedContributions,
  metrics,
  projects,
  services,
  site,
} from "@/lib/site-data";
import { getOpenSourceActivity, timeAgo } from "@/lib/github";
import { getContributions } from "@/lib/contributions";
import { MEDIUM_PROFILE, formatMonth, getMediumPosts } from "@/lib/medium";
import { pageMeta } from "@/lib/seo";

/** Live GitHub activity is re-fetched at most hourly. */
export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  path: "",
  title: "AI Engineer & Agent Builder in Ahmedabad",
  description:
    "Kunj Shah is an AI engineer in Ahmedabad, India building agents, RAG pipelines and edge computer vision that hold up in production. 17+ shipped systems, 44+ merged open-source PRs.",
  keywords: [
    "AI engineer Ahmedabad",
    "AI engineer India",
    "agent developer",
    "RAG developer India",
    "edge computer vision engineer",
    "freelance AI engineer Ahmedabad",
    "generative AI consultant India",
    "machine learning engineer Gujarat",
  ],
  ogTitle: "Kunj Shah — AI Engineer & Agent Builder, Ahmedabad",
  ogDescription:
    "Production AI systems: autonomous agents, RAG pipelines, edge computer vision, and full-stack AI apps. 17+ shipped systems, 44+ merged open-source PRs.",
});

const [lead, ...others] = projects.slice(0, 4);

export default async function HomePage() {
  const [activity, posts, contributions] = await Promise.all([
    getOpenSourceActivity(12),
    getMediumPosts(),
    getContributions(),
  ]);
  /** Only merged work counts as a contribution. Open and closed PRs are dropped. */
  const mergedRecent = (activity?.recent ?? [])
    .filter((pr) => pr.state === "merged")
    .slice(0, 5);

  // "Right now": what I'm doing this month, from live sources where possible.
  const job = jobs.find((j) => j.live) ?? jobs[0];
  const essay = posts?.[0];
  const merge = mergedRecent[0];
  const fallbackMerge = mergedContributions[0];

  const proof = [
    { value: metrics[0].value, label: "Systems shipped" },
    {
      value: activity ? String(activity.mergedPullRequests) : metrics[1].value,
      label: "Open-source PRs merged",
    },
    { value: metrics[2].value, label: "Hackathon finals" },
  ];

  return (
    <PageShell>
      <div className="stack-page">
        {/* ------------------------------------------------------------ hero */}
        <div className="flex flex-col gap-12 md:gap-16">
          <section className="grid gap-10 lg:grid-cols-12 lg:gap-x-10 lg:items-center scroll-mt-24" id="about">
            <div className="flex flex-col gap-6 md:gap-7 lg:col-span-8">
              <Reveal y={8}>
                <span className="inline-flex items-center gap-2 font-body-sm text-body-sm text-text-secondary">
                  <StatusDot className="bg-accent-emerald" ping />
                  Taking on new projects
                </span>
              </Reveal>

              <RevealText
                as="h1"
                className="text-[clamp(2.25rem,1.55rem+3vw,3.625rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-text-primary max-w-[18ch] md:max-w-none"
                delay={0.05}
                each={0.045}
                text={site.hero}
              />

              <Reveal delay={0.3}>
                <p className="font-body-lg text-body-lg text-text-secondary max-w-[46ch]">
                  I&apos;m Kunj, an AI engineer in {site.location}. I ship agents,
                  retrieval pipelines and edge vision that keep working after launch.
                </p>
              </Reveal>

              <Reveal className="flex flex-wrap items-center gap-3" delay={0.4}>
                <Link className={`${buttonStyles.primary} group`} href="/contact">
                  Get in touch
                  <Icon
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    name="arrow_forward"
                    size={16}
                  />
                </Link>
                <Link className={buttonStyles.secondary} href="/projects">
                  View projects
                </Link>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-4" delay={0.2}>
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none aspect-[4/5] rounded-2xl overflow-hidden bg-surface-subtle">
                <FadeImage
                  alt="Kunj Shah at a developer conference in Baroda."
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 340px, 320px"
                  src="https://kunjshah.vercel.app/profile.png"
                />
              </div>
            </Reveal>
          </section>

          {/* proof, directly under the hero */}
          <Reveal className="flex flex-col gap-4" delay={0.1}>
            <StatStrip items={proof} tone="plain" />
            <p className="font-body-sm text-body-sm text-text-muted">
              Merged work in OWASP, Microsoft and Ollama repositories.{" "}
              <Link
                className="text-text-secondary underline decoration-border-dotted underline-offset-4 hover:text-text-primary"
                href="/open-source"
              >
                See the pull requests
              </Link>
            </p>
          </Reveal>
        </div>


        {/* ------------------------------------------------------- right now */}
        <PageSection
          layout="stacked"
          meta={<span className="font-label-meta text-label-meta">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</span>}
          title="Right now"
        >
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            <div className="flex flex-col gap-2">
              <span className="font-body-sm text-body-sm text-text-muted">Working on</span>
              <Link className="group flex flex-col gap-1" href="/experience">
                <span className="font-headline-md text-headline-md text-text-primary">
                  <span className="link-draw">{job.role}</span>
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary">
                  {job.company}, since {job.period.split(" - ")[0]}
                </span>
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-body-sm text-body-sm text-text-muted">Last wrote</span>
              <a
                className="group flex flex-col gap-1"
                href={essay?.url ?? MEDIUM_PROFILE}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="font-headline-md text-headline-md text-text-primary">
                  <span className="link-draw">{essay?.title ?? homeEssays[0].title}</span>
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary">
                  {essay ? `On Medium, ${formatMonth(essay.date)}` : "On Medium"}
                </span>
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-body-sm text-body-sm text-text-muted">Last merged</span>
              <a
                className="group flex flex-col gap-1"
                href={merge?.url ?? fallbackMerge.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="font-headline-md text-headline-md text-text-primary">
                  <span className="link-draw">{merge?.title ?? fallbackMerge.title}</span>
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary">
                  {merge ? (
                    <>
                      <span className="font-label-meta text-label-meta">{merge.owner}/{merge.repo}</span>, {timeAgo(merge.date)}
                    </>
                  ) : (
                    fallbackMerge.org
                  )}
                </span>
              </a>
            </div>
          </div>
        </PageSection>

        {/* --------------------------------------------------- selected work */}
        <PageSection
          id="projects"
          meta={<RailLink href="/projects">All {projects.length} projects</RailLink>}
          title="Selected work"
        >
          {/* lead project: the one piece of work given room to breathe */}
          <Link
            className="group lift grid gap-8 md:grid-cols-5 p-6 md:p-10 rounded-2xl bg-surface-card border border-border-hairline"
            href="/projects"
          >
            {lead.video && (
              <DemoVideo
                className="md:col-span-5"
                controls={false}
                src={lead.video}
                title={lead.title}
              />
            )}
            <div className="md:col-span-3 flex flex-col gap-4">
              <span className="font-body-sm text-body-sm text-text-muted">
                {lead.category}, {lead.status}
              </span>
              <h3 className="font-headline-lg text-headline-lg md:text-[32px] md:leading-[38px] tracking-tight text-text-primary">
                {lead.title}
              </h3>
              <p className="font-body-md text-body-md text-text-secondary max-w-[52ch]">
                {lead.description}
              </p>
              <span className="mt-auto pt-2 inline-flex items-center gap-1.5 font-body-sm text-body-sm font-medium text-text-primary">
                Read the case study
                <Icon
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  name="arrow_forward"
                  size={15}
                />
              </span>
            </div>
            <dl className="md:col-span-2 grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-6 md:border-l md:border-border-hairline md:pl-8 md:self-center">
              {lead.metrics.map((m) => (
                <div className="flex flex-col-reverse gap-0.5" key={m.label}>
                  <dt className="font-body-sm text-body-sm text-text-muted">{m.label}</dt>
                  <dd
                    className="font-headline-lg text-headline-lg md:text-[32px] md:leading-none tracking-tight text-text-primary"
                    data-numeric
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Link>

          {/* the rest as an index */}
          <ul className="flex flex-col">
            {others.map((project) => (
              <li className="border-b border-border-hairline" key={project.slug}>
                <Link
                  className="group grid grid-cols-[1fr_auto] md:grid-cols-[9rem_1fr_auto] items-baseline gap-x-6 gap-y-1 py-5"
                  href="/projects"
                >
                  {/* demo thumbnail, or the project glyph when there is no recording */}
                  <span className="hidden md:block row-span-2 self-center">
                    {project.video ? (
                      <DemoVideo
                        className="rounded-lg"
                        controls={false}
                        src={project.video}
                        title={project.title}
                      />
                    ) : (
                      <span className="grid place-items-center w-full aspect-[8/5] rounded-lg border border-border-hairline bg-surface-container text-text-muted">
                        <Icon name={project.icon} size={22} />
                      </span>
                    )}
                  </span>
                  <span className="font-headline-md text-headline-md md:text-headline-lg text-text-primary transition-transform duration-300 group-hover:translate-x-1">
                    {project.title}
                  </span>
                  <span className="font-label-meta text-label-meta text-text-muted" data-numeric>
                    {project.metrics[0].value} {project.metrics[0].label.toLowerCase()}
                  </span>
                  <span className="font-body-sm text-body-sm text-text-secondary max-w-[60ch]">
                    {project.summary}
                  </span>
                  <ArrowAffordance className="justify-self-end" icon="arrow_outward" />
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>

        {/* ------------------------------------------------- open source year */}
        <PageSection
          id="activity"
          layout="stacked"
          meta={
            activity ? (
              <RailLink href="/open-source">All contributions</RailLink>
            ) : null
          }
          title="A year of commits"
        >
          {contributions ? (
            <ContributionGraph contributions={contributions} />
          ) : (
            <ContributionGraphFallback
              href={site.links.github}
              total={String(metrics[1].value)}
            />
          )}
        </PageSection>

        {/* ------------------------------------------------------- services */}
        <PageSection
          id="services"
          meta={<RailLink href="/contact">Rates and process</RailLink>}
          title="How I can help"
        >
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {services.map((service) => (
              <div className="flex flex-col gap-2 pt-5 border-t border-border-hairline" key={service.title}>
                <h3 className="font-headline-md text-headline-md text-text-primary">
                  {service.title}
                </h3>
                <p className="font-body-md text-body-md text-text-secondary max-w-[44ch]">
                  {service.outcome}
                </p>
              </div>
            ))}
          </div>
        </PageSection>

        {/* --------------------------------------------------------- writing */}
        <PageSection
          id="writing"
          layout="stacked"
          meta={<RailLink href="/writing">All essays</RailLink>}
          title="Writing"
        >
          {posts ? (
            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              {posts.slice(1, 4).map((post) => (
                <a
                  className="group flex flex-col gap-4"
                  href={post.url}
                  key={post.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container">
                    {post.image && (
                      <FadeImage
                        alt=""
                        className="object-cover group-hover:scale-[1.03]"
                        fill
                        sizes="(min-width: 768px) 300px, 100vw"
                        src={post.image}
                      />
                    )}
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="font-body-sm text-body-sm text-text-muted">
                      <time className="font-label-meta text-label-meta text-text-secondary" dateTime={post.date}>
                        {formatMonth(post.date)}
                      </time>
                      <span className="mx-2 text-border-dotted">/</span>
                      {post.readMinutes} min read
                    </span>
                    <span className="font-headline-md text-headline-md text-text-primary transition-colors group-hover:text-text-secondary">
                      {post.title}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              {homeEssays.map((essay) => (
                <a
                  className="group flex flex-col gap-3 pt-4 border-t border-border-hairline hover:border-text-primary transition-colors"
                  href={MEDIUM_PROFILE}
                  key={essay.title}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="font-label-meta text-label-meta text-text-muted">{essay.year}</span>
                  <span className="font-headline-md text-headline-md text-text-primary group-hover:underline decoration-border-dotted underline-offset-4">
                    {essay.title}
                  </span>
                </a>
              ))}
            </div>
          )}
        </PageSection>

        <CtaBand
          body="Tell me what you're building and where it breaks. I reply within a day."
          title="Building something with AI that has to work for real users?"
        >
          <Link className={buttonStyles.primary} href="/contact">
            Get in touch
          </Link>
          <CopyEmailRow className="w-full sm:w-auto" />
        </CtaBand>
      </div>
    </PageShell>
  );
}
