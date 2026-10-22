import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { DemoVideo } from "@/components/projects/demo-video";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/primitives/Reveal";
import { AgentTrace } from "@/components/home/agent-trace";
import { HeroBadge } from "@/components/home/hero-badge";
import { FilmStrip } from "@/components/home/film-strip";
import { LocalClock } from "@/components/ui/local-clock";
import { CopyEmailRow } from "@/components/ui/copy-email";
import { ProofLinks } from "@/components/ui/proof-links";
import {
  ContributionGraph,
  ContributionGraphFallback,
} from "@/components/ui/contribution-graph";
import { buttonStyles } from "@/components/ui/blocks";
import { ArrowAffordance } from "@/components/ui/primitives";
import {
  clientFaqs,
  mergedContributions,
  metrics,
  pilotSteps,
  pricingIncludes,
  pricingTiers,
  projects,
  services,
  site,
} from "@/lib/site-data";
import { essayDateLabel, essaysByDate } from "@/lib/essays";
import { getOpenSourceActivity } from "@/lib/github";
import { getContributions } from "@/lib/contributions";
import { JsonLd, webPageJsonLd } from "@/components/seo/json-ld";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/cn";

/** Live GitHub activity is re-fetched at most hourly. */
export const revalidate = 3600;

export const metadata: Metadata = {
  ...pageMeta({
    path: "",
    title: "AI Engineer & Agent Builder in Ahmedabad",
    description:
      "Kunj Shah builds AI agents, document search and full-stack AI apps for founders and small teams in two to four weeks, with the tests that prove they work. Fixed-price pilots from ₹10,000.",
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
    ogTitle: "Kunj Shah | I build the AI feature, then prove it works",
    ogDescription:
      "Agents, document search and full-stack AI apps for founders and small teams, shipped in two to four weeks with the tests that prove they work.",
  }),
  // The root `title.template` only applies to child segments, so the home
  // page would otherwise ship a title without the name in it.
  title: { absolute: "Kunj Shah | AI Engineer & Agent Builder in Ahmedabad" },
};

/** The three case studies given room on the home page. */
const featured = ["walkcast", "onramp", "engineeros"] as const;

export default async function HomePage() {
  const [activity, contributions] = await Promise.all([
    getOpenSourceActivity(12),
    getContributions(),
  ]);
  const mergedCount = activity
    ? String(activity.mergedPullRequests)
    : metrics[1].value;

  const [lead, ...rest] = featured.map(
    (slug) => projects.find((p) => p.slug === slug)!,
  );
  const upstream = mergedContributions.filter((c) => c.caseStudy).slice(0, 2);

  return (
    <PageShell>
      <JsonLd
        data={webPageJsonLd({
          path: "",
          name: "Kunj Shah | AI Engineer & Agent Builder",
          description: `${site.hero} ${site.offer}`,
        })}
      />
      <div className="stack-page">
        {/* ---------------------------------------------------- scene 01 */}
        {/* The opening scene. A full-bleed dark set: letterbox bars that open
            like a curtain, film grain, a spotlight on the badge, and film
            metadata in the bars. Who, what, for whom and the next step are
            still all inside the first screen. */}
        <section
          aria-labelledby="hero-title"
          className="full-bleed theme-ink relative isolate overflow-hidden bg-surface text-text-primary -mt-24 md:-mt-32 lg:-mt-36 min-h-[100svh] flex items-center"
          id="about"
        >
          {/* Set lighting: a warm pool behind the badge, edges falling off. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_45%,rgb(255_140_80/0.16),transparent_55%),radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.75))]" />
          <div aria-hidden="true" className="spotlight-beam absolute -z-10 top-0 right-[4%] h-full w-[46%] hidden lg:block" />
          <div aria-hidden="true" className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <div className="film-grain absolute" />
          </div>

          {/* Letterbox bars, with the local time written on the bottom one. */}
          <div aria-hidden="true" className="letterbox-top absolute inset-x-0 top-0 z-30 bg-black" />
          <div className="letterbox-bottom absolute inset-x-0 bottom-0 z-30 bg-black flex items-center">
            <div className="shell-container flex items-center justify-end gap-4 eyebrow text-[#8f8d85]">
              <LocalClock />
            </div>
          </div>

          <div className="shell-container relative z-10 w-full grid gap-12 lg:grid-cols-12 lg:gap-x-12 lg:items-center pt-28 pb-24 md:pt-28 md:pb-24">
            <div className="flex flex-col gap-7 lg:col-span-7">
              <p className="eyebrow text-text-muted title-card [animation-delay:0.9s]">
                Kunj Shah presents &middot; an applied AI engineer
              </p>

              {/* Plain text in one node, painted on the first frame (it starts
                  blurred, never invisible): this is the LCP element. */}
              <h1
                className="text-[clamp(2.75rem,1.5rem+4.6vw,5rem)] leading-[0.96] font-semibold tracking-[-0.05em] text-text-primary text-balance"
                id="hero-title"
              >
                <span className="title-card block [animation-delay:1.05s]">I build the AI</span>
                <span className="title-card block [animation-delay:1.2s]">feature, then</span>
                <span className="title-card block [animation-delay:1.4s] display-accent text-[1.08em] tracking-[-0.03em] text-signal-ink">
                  prove it works.
                </span>
              </h1>

              <p className="title-card [animation-delay:1.6s] font-body-lg text-body-lg text-text-secondary max-w-[52ch]">
                I&apos;m {site.name}, an AI engineer in Ahmedabad.{" "}
                {site.offer}
              </p>

              <div className="title-card [animation-delay:1.75s] flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    className={`${buttonStyles.primary} group h-12 px-6`}
                    data-track="Contact CTA Clicked"
                    data-track-from="hero"
                    href="/contact#inquiryForm"
                  >
                    Start a project
                    <Icon
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                      name="arrow_forward"
                      size={16}
                    />
                  </Link>
                  <Link
                    className={`${buttonStyles.secondary} h-12 px-6`}
                    data-track="Explore Work Clicked"
                    data-track-from="hero"
                    href="#reel"
                  >
                    Watch the reel
                  </Link>
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 font-body-sm text-body-sm text-text-muted">
                  {["Free 15-minute intro call", "Fixed price, in writing", "You own the code"].map(
                    (line) => (
                      <li className="flex items-center gap-1.5" key={line}>
                        <Check />
                        {line}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            <div className="theme-paper relative lg:col-span-5 flex justify-center pt-12 lg:pt-6">
              <HeroBadge />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- proof */}
        <section aria-label="Track record">
          <dl className="grid grid-cols-2 md:grid-cols-4 border-y border-border-hairline">
            {[
              { value: metrics[0].value, label: "systems shipped", href: "/projects" },
              { value: mergedCount, label: "open-source PRs merged", href: "/open-source" },
              { value: "2", label: "AI/ML internships", href: "/experience" },
              { value: "4", label: "hackathon finals", href: "/hackathons" },
            ].map((item, i) => (
              <Link
                className={cn(
                  "group flex flex-col-reverse gap-1 px-4 py-6 md:px-6 md:py-8 hover:bg-surface-card transition-colors",
                  i % 2 === 0 && "border-r border-border-hairline",
                  i < 2 && "border-b md:border-b-0 border-border-hairline",
                  i === 1 && "md:border-r",
                )}
                href={item.href}
                key={item.label}
              >
                <dt className="font-body-sm text-body-sm text-text-muted">
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    &rarr;
                  </span>
                </dt>
                <dd
                  className="text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none font-semibold tracking-[-0.04em] text-text-primary"
                  data-numeric
                >
                  {item.value}
                </dd>
              </Link>
            ))}
          </dl>
          <p className="mt-4 font-body-sm text-body-sm text-text-muted">
            Code merged upstream at{" "}
            <span className="text-text-primary font-medium">OWASP</span> and{" "}
            <span className="text-text-primary font-medium">Microsoft</span>.
            Every number on this page links to the work behind it.
          </p>
        </section>

        {/* -------------------------------------------------------- services */}
        <section aria-labelledby="services-title" className="flex flex-col gap-10 scroll-mt-24" id="services">
          <SectionHead
            eyebrow="Services"
            id="services-title"
            title={
              <>
                Five problems I get{" "}
                <span className="display-accent">hired to fix.</span>
              </>
            }
          >
            Each one starts with a situation you might recognise, and ends with
            a shipped system you can open and check.
          </SectionHead>

          {/* Bento: the lead service across the full row with its live
              replay, then the other four two by two. Spans always fill the row. */}
          <div className="grid gap-3 md:grid-cols-12">
            {services.map((service, i) => (
              <Reveal
                className={cn(
                  "group relative flex flex-col gap-4 rounded-2xl border border-border-hairline bg-surface-card p-6 md:p-7 transition-colors hover:border-outline-variant",
                  i === 0 ? "md:col-span-12 md:p-10 lg:grid lg:grid-cols-2 lg:gap-x-14 lg:items-center" : "md:col-span-6",
                )}
                delay={i * 0.06}
                key={service.title}
              >
                <div className="flex flex-col gap-4 h-full">
                  <span className="eyebrow text-text-muted">
                    {String(i + 1).padStart(2, "0")} &middot; {service.pill}
                  </span>
                  <p className="font-body-md text-body-md text-text-muted max-w-[40ch]">
                    {service.problem}
                  </p>
                  <h3
                    className={cn(
                      "font-semibold tracking-[-0.025em] text-text-primary text-balance",
                      i === 0 ? "text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.05] tracking-[-0.035em]" : "text-[1.25rem] leading-[1.2]",
                    )}
                  >
                    {service.title}
                  </h3>
                  <p className="font-body-md text-body-md text-text-secondary max-w-[52ch]">
                    {service.deliverable}
                  </p>
                  <p className="mt-auto pt-4 border-t border-border-hairline flex gap-2.5 font-body-sm text-body-sm text-text-primary">
                    <span className="mt-[3px] text-signal-ink">
                      <Check />
                    </span>
                    {service.proof}
                  </p>
                </div>
                {i === 0 && <AgentTrace className="mt-8 lg:mt-0" />}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- scene 03 */}
        {/* Now showing: every demo reel on one strip of film. */}
        <section
          aria-labelledby="reel-title"
          className="full-bleed theme-ink relative isolate overflow-hidden bg-surface py-16 md:py-24 scroll-mt-16"
          id="reel"
        >
          <div aria-hidden="true" className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <div className="film-grain absolute" />
          </div>
          <div className="shell-container flex flex-col items-center gap-4 text-center mb-12">
            <span className="eyebrow text-text-muted">Demo reels</span>
            <h2
              className="text-[clamp(2.5rem,1.4rem+4.4vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-text-primary text-balance"
              id="reel-title"
            >
              Every build has a <span className="display-accent text-signal-ink">reel.</span>
            </h2>
            <p className="font-body-lg text-body-lg text-text-secondary max-w-[52ch]">
              Screen recordings of the real products. Hover to pause the strip,
              or click a frame to read how it was built and tested.
            </p>
          </div>
          <FilmStrip />
        </section>

        {/* ------------------------------------------------------------ work */}
        <section aria-labelledby="work-title" className="flex flex-col gap-10 scroll-mt-24" id="work">
          <SectionHead
            aside={
              <Link className={buttonStyles.link} href="/projects">
                All {projects.length} projects
              </Link>
            }
            eyebrow="Selected work"
            id="work-title"
            title={
              <>
                Shipped, measured, and{" "}
                <span className="display-accent">public.</span>
              </>
            }
          >
            Each case study states what was built, how it was tested and what
            it still gets wrong.
          </SectionHead>

          <Link
            className="group lift grid gap-8 rounded-3xl border border-border-hairline bg-surface-card p-4 md:p-6 lg:grid-cols-12 lg:items-center"
            href={`/projects/${lead.slug}`}
          >
            <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-border-hairline bg-surface-container">
              {lead.video ? (
                <DemoVideo controls={false} src={lead.video} title={lead.title} />
              ) : (
                <WalkcastPoster />
              )}
            </div>
            <div className="lg:col-span-5 flex flex-col gap-5 px-2 pb-2 lg:px-4">
              <span className="eyebrow text-text-muted">
                {lead.category} &middot; {lead.status}
              </span>
              <h3 className="text-[2rem] leading-[1.05] font-semibold tracking-[-0.035em] text-text-primary">
                {lead.title}
              </h3>
              <p className="font-body-md text-body-md text-text-secondary">
                {lead.summary}
              </p>
              <dl className="grid grid-cols-3 gap-4 border-t border-border-hairline pt-5">
                {lead.metrics.map((m) => (
                  <div className="flex flex-col-reverse justify-end gap-1 min-w-0" key={m.label}>
                    <dt className="font-body-sm text-[12px] leading-4 text-text-muted">{m.label}</dt>
                    <dd className="text-[1.75rem] leading-none font-semibold tracking-[-0.03em] text-text-primary" data-numeric>
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="inline-flex items-center gap-1.5 font-body-sm text-body-sm font-medium text-text-primary">
                Read the case study
                <ArrowAffordance className="text-text-primary" />
              </span>
            </div>
          </Link>

          <div className="grid gap-3 md:grid-cols-2">
            {rest.map((project) => (
              <Link
                className="group lift flex flex-col gap-5 rounded-3xl border border-border-hairline bg-surface-card p-4 md:p-5"
                href={`/projects/${project.slug}`}
                key={project.slug}
              >
                {project.video && (
                  <div className="overflow-hidden rounded-2xl border border-border-hairline">
                    <DemoVideo controls={false} src={project.video} title={project.title} />
                  </div>
                )}
                <div className="flex flex-col gap-2 px-1 pb-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[1.375rem] leading-tight font-semibold tracking-[-0.025em] text-text-primary">
                      {project.title}
                    </h3>
                    <span className="eyebrow text-text-muted shrink-0" data-numeric>
                      {project.metrics[0].value} {project.metrics[0].label}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-text-secondary">
                    {project.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- process */}
        <section aria-labelledby="process-title" className="flex flex-col gap-10 scroll-mt-24" id="process">
          <SectionHead
            eyebrow="Process"
            id="process-title"
            title={
              <>
                From first call to handover in{" "}
                <span className="display-accent">two to four weeks.</span>
              </>
            }
          >
            Four steps, the same on every project, so you always know what
            happens next and what it costs.
          </SectionHead>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border-hairline bg-border-hairline md:grid-cols-4">
            {pilotSteps.map((step, i) => (
              <Reveal
                as="li"
                className="flex flex-col gap-3 bg-surface-card p-6"
                delay={i * 0.06}
                key={step.number}
              >
                <span className="flex items-center justify-between eyebrow text-text-muted">
                  <span>{step.number}</span>
                  <span>{step.meta}</span>
                </span>
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.02em] text-text-primary">
                  {step.title}
                </h3>
                <p className="font-body-md text-body-md text-text-secondary">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- pricing */}
        <section aria-labelledby="pricing-title" className="flex flex-col gap-10 scroll-mt-24" id="pricing">
          <SectionHead
            eyebrow="Pricing"
            id="pricing-title"
            title={
              <>
                You know the price{" "}
                <span className="display-accent">before we start.</span>
              </>
            }
          >
            Starting ranges for a first project, in INR. You get an exact,
            fixed quote in writing after the intro call.
          </SectionHead>

          <div className="grid gap-3 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border p-6 md:p-7",
                  tier.featured
                    ? "theme-ink bg-surface text-text-primary border-border-hairline"
                    : "bg-surface-card border-border-hairline",
                )}
                key={tier.name}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-body-md text-body-md font-medium text-text-primary">{tier.name}</span>
                  {tier.featured && (
                    <span className="eyebrow rounded-full bg-signal px-2 py-0.5 text-[#0d0d0c]">
                      Full build
                    </span>
                  )}
                </span>
                <span
                  className="text-[2rem] leading-none font-semibold tracking-[-0.04em] text-text-primary"
                  data-numeric
                >
                  {tier.price}
                </span>
                <p className="font-body-md text-body-md text-text-secondary">{tier.body}</p>
                <Link
                  className={cn(
                    tier.featured ? buttonStyles.primary : buttonStyles.secondary,
                    "mt-auto self-start",
                  )}
                  data-track="Pricing CTA Clicked"
                  data-track-from={tier.name}
                  href="/contact#inquiryForm"
                >
                  Get a fixed quote
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-border-hairline pt-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-body-sm text-body-sm text-text-secondary">
              {pricingIncludes.map((line) => (
                <li className="flex items-center gap-1.5" key={line}>
                  <span className="text-signal-ink">
                    <Check />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <p className="font-body-sm text-body-sm text-text-muted">
              Reviews and debugging ₹1,500/hour &middot; Retainers ₹30,000–75,000/month
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------ open source */}
        <section aria-labelledby="oss-title" className="flex flex-col gap-10 scroll-mt-24" id="activity">
          <SectionHead
            aside={
              <Link className={buttonStyles.link} href="/open-source">
                All contributions
              </Link>
            }
            eyebrow="Open source"
            id="oss-title"
            title={
              <>
                Code other engineers{" "}
                <span className="display-accent">chose to merge.</span>
              </>
            }
          >
            {mergedCount} pull requests merged into projects I don&apos;t own,
            each one reviewed by that project&apos;s maintainers.
          </SectionHead>

          <div className="grid gap-3 md:grid-cols-2">
            {upstream.map((c) => (
              <a
                className="group lift flex flex-col gap-3 rounded-2xl border border-border-hairline bg-surface-card p-6"
                href={c.url}
                key={c.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="eyebrow text-text-muted">{c.org}</span>
                  <ArrowAffordance icon="arrow_outward" />
                </span>
                <p className="font-body-md text-body-md text-text-primary font-medium">
                  {c.title}
                </p>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  {c.caseStudy?.why}
                </p>
                {c.caseStudy?.size && (
                  <span className="mt-auto eyebrow text-text-muted" data-numeric>
                    {c.caseStudy.size}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="rounded-2xl border border-border-hairline bg-surface-card p-5 md:p-7">
            {contributions ? (
              <ContributionGraph contributions={contributions} />
            ) : (
              <ContributionGraphFallback
                href={site.links.github}
                total={String(metrics[1].value)}
              />
            )}
          </div>
        </section>

        {/* -------------------------------------------------------------- faq */}
        <section aria-labelledby="faq-title" className="grid gap-10 lg:grid-cols-12 scroll-mt-24" id="faq">
          <div className="lg:col-span-4">
            <SectionHead align="start" eyebrow="FAQ" id="faq-title" title="Fair questions.">
              The things clients ask before sending the first message.
            </SectionHead>
          </div>
          <div className="lg:col-span-8 border-t border-border-hairline">
            {clientFaqs.map((faq) => (
              <details className="group border-b border-border-hairline" key={faq.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-body-lg text-body-lg font-medium text-text-primary [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border-hairline text-text-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-12 font-body-md text-body-md text-text-secondary max-w-[64ch]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- writing */}
        <section aria-labelledby="writing-title" className="flex flex-col gap-6 scroll-mt-24" id="writing">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="eyebrow text-text-muted" id="writing-title">
              Recent writing
            </h2>
            <Link className={buttonStyles.link} href="/writing">
              All essays
            </Link>
          </div>
          <ul className="border-t border-border-hairline">
            {essaysByDate.slice(0, 3).map((post) => (
              <li className="border-b border-border-hairline" key={post.slug}>
                <Link
                  className="group grid gap-1 py-5 md:grid-cols-12 md:items-baseline md:gap-6"
                  href={`/writing/${post.slug}`}
                >
                  <time
                    className="eyebrow text-text-muted md:col-span-2"
                    dateTime={post.date}
                  >
                    {essayDateLabel(post.date)}
                  </time>
                  <span className="md:col-span-9 font-body-lg text-body-lg font-medium text-text-primary transition-transform duration-300 group-hover:translate-x-1">
                    {post.title}
                  </span>
                  <span className="hidden md:flex md:col-span-1 justify-end">
                    <ArrowAffordance />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------- credits */}
        {/* The ending runs as end credits: who made it, then the ask. */}
        <section
          aria-labelledby="credits-title"
          className="full-bleed theme-ink relative isolate overflow-hidden bg-surface -mb-28 md:-mb-20"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,rgb(255_110_50/0.22),transparent_60%)]" />
          <div aria-hidden="true" className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
            <div className="film-grain absolute" />
          </div>
          <div aria-hidden="true" className="h-[clamp(44px,7vh,72px)] bg-black" />
          <div className="shell-container flex flex-col items-center gap-14 py-24 md:py-32 text-center">
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 max-w-3xl w-full">
              {[
                ["Written, built and tested by", site.name],
                ["Filmed on location in", site.locationLong],
                ["Merged upstream at", "OWASP · Microsoft"],
                ["Shot on", "LangGraph · FastAPI · Next.js · PostgreSQL"],
              ].map(([role, name]) => (
                <div className="flex flex-col gap-1.5" key={role}>
                  <dt className="eyebrow text-text-muted">{role}</dt>
                  <dd className="font-body-lg text-body-lg text-text-primary">{name}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col items-center gap-6 max-w-3xl">
              <span className="eyebrow text-signal-ink">Coming next</span>
              <h2
                className="text-[clamp(2.5rem,1.4rem+4.4vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-text-primary text-balance"
                id="credits-title"
              >
                Your AI feature, the one that{" "}
                <span className="display-accent text-signal-ink">actually works.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-text-secondary max-w-[52ch]">
                Send two or three sentences about it. I reply within one working
                day, and the first 15-minute call is free.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  className={`${buttonStyles.primary} h-12 px-6`}
                  data-track="Contact CTA Clicked"
                  data-track-from="home-cta"
                  href="/contact#inquiryForm"
                >
                  Start a project
                </Link>
                <CopyEmailRow className="w-full sm:w-auto" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-body-sm text-body-sm text-text-muted">
                Hiring full-time instead?
                <ProofLinks from="home-cta" githubHint={`${mergedCount} merged PRs`} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

/**
 * Section opener, centred: mono eyebrow, a heading that makes a claim, and
 * one line that says what the section is about. The "view all" link sits
 * under the line, so the head reads as one centred unit.
 */
function SectionHead({
  eyebrow,
  title,
  id,
  aside,
  align = "center",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  id: string;
  aside?: React.ReactNode;
  align?: "center" | "start";
  children?: React.ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        center ? "items-center text-center mx-auto max-w-4xl" : "items-start max-w-3xl",
      )}
    >
      <span className="eyebrow text-text-muted">{eyebrow}</span>
      <h2
        className="text-[clamp(2.5rem,1.4rem+4.4vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-text-primary text-balance"
        id={id}
      >
        {title}
      </h2>
      {children && (
        <p className="font-body-lg text-body-lg text-text-secondary max-w-[56ch] text-balance">
          {children}
        </p>
      )}
      {aside && <div className="pt-1">{aside}</div>}
    </div>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 16 16"
      width="13"
    >
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

/** Walkcast has no demo recording; its card gets a typeset stand-in. */
function WalkcastPoster() {
  return (
    <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-surface-container">
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div className="relative flex flex-col items-center gap-3 text-center px-6">
        <span className="eyebrow text-text-muted">walkcast lab &middot; replay gate</span>
        <span className="text-[clamp(2.5rem,2rem+3vw,4.5rem)] leading-none font-semibold tracking-[-0.05em] text-text-primary" data-numeric>
          5/5
        </span>
        <span className="font-body-sm text-body-sm text-text-secondary max-w-[30ch]">
          injected faults reproduced, and the fixed agent passed every replay
        </span>
      </div>
    </div>
  );
}
