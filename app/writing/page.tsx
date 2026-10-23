import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { FadeImage } from "@/components/primitives/FadeImage";
import { Reveal } from "@/components/primitives/Reveal";
import { buttonStyles } from "@/components/ui/blocks";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { JsonLd, blogJsonLd, pageBreadcrumb } from "@/components/seo/json-ld";
import { site } from "@/lib/site-data";
import {
  ESSAY_CATEGORIES,
  essayCategoryLabel,
  essayDateLabel,
  essaysByDate,
  type Essay,
} from "@/lib/essays";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/writing",
  title: "Writing",
  description:
    "Essays by Kunj Shah on AI engineering, agent systems, retrieval, evaluation, and edge machine learning, served in full on this site.",
  keywords: [
    "AI engineering blog",
    "LLM evaluation articles",
    "AI agent essays",
    "machine learning writing",
    "RAG articles",
    "edge AI blog",
  ],
});

const external = { rel: "noopener noreferrer", target: "_blank" } as const;

export default function WritingPage() {
  const essays = essaysByDate;
  const [featured, ...rest] = essays;

  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Writing", "/writing")} />
        {/* The blog node points at the local article pages, so an engine
            reading the archive finds posts it can actually fetch and quote
            rather than links out to a publication it may not index. */}
        <JsonLd
          data={blogJsonLd(
            essays.map((essay) => ({
              slug: essay.slug,
              title: essay.title,
              date: essay.date,
              excerpt: essay.excerpt,
            })),
          )}
        />

        <PageIntro
          lead="Essays on agents, retrieval, evaluation and edge ML. Written by me, published in full here."
          eyebrow="Writing"
          title="Notes from building AI systems."
        >
          <a className={`${buttonStyles.secondary} group`} href={site.links.medium} {...external}>
            Also on Medium
            <Icon
              className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
              name="arrow_outward"
              size={15}
            />
          </a>
        </PageIntro>

        {!featured ? (
          <EmptyState
            action={
              <a className={buttonStyles.primary} href={site.links.medium} {...external}>
                Read on Medium
              </a>
            }
            body="The archive is empty right now. Every essay is still on Medium."
            icon="edit_note"
            title="No essays to show."
          />
        ) : (
          <div className="flex flex-col gap-12 md:gap-16">
            {/* latest essay, given the room */}
            <Reveal>
              <Link
                className="group grid gap-6 md:gap-10 md:grid-cols-12 md:items-center"
                href={`/writing/${featured.slug}`}
              >
                {featured.image && (
                  <div className="md:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container">
                    <FadeImage
                      alt=""
                      className="object-cover group-hover:scale-[1.02]"
                      fill
                      priority
                      sizes="(min-width: 768px) 640px, 100vw"
                      src={featured.image}
                    />
                  </div>
                )}
                <div className="md:col-span-5 flex flex-col gap-3">
                  <span className="font-body-sm text-body-sm text-text-muted">
                    <time className="font-label-meta text-label-meta text-text-secondary" dateTime={featured.date}>
                      {essayDateLabel(featured.date)}
                    </time>
                    <span className="mx-2 text-border-dotted">/</span>
                    {featured.readMinutes} min read
                  </span>
                  <h2 className="font-headline-lg text-headline-lg md:text-[34px] md:leading-[40px] tracking-tight text-text-primary text-pretty">
                    {featured.title}
                  </h2>
                  <p className="font-body-md text-body-md text-text-secondary">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 pt-2 font-body-sm text-body-sm font-medium text-text-primary">
                    Read the essay
                    <Icon
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      name="arrow_forward"
                      size={15}
                    />
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* categories, as a filter for the list below */}
            <Reveal as="section" aria-label="Essay categories" className="flex flex-wrap items-center gap-2">
              {ESSAY_CATEGORIES.map((category) => {
                const count = essays.filter((essay) => essay.category === category.id).length;
                return (
                  <span
                    className="font-label-meta text-label-meta text-text-muted border border-border-hairline rounded-md px-2 py-1"
                    key={category.id}
                  >
                    {category.label}
                    {category.id !== "all" && (
                      <span className="ml-1.5 text-text-muted">{count}</span>
                    )}
                  </span>
                );
              })}
            </Reveal>

            {/* everything else as a dated index */}
            <Reveal aria-labelledby="all-essays" as="section" className="flex flex-col">
              <div className="flex items-baseline justify-between gap-4 pb-3">
                <h2 className="font-headline-md text-headline-md text-text-primary" id="all-essays">
                  All essays
                </h2>
                <span className="font-body-sm text-body-sm text-text-muted">{essays.length} on this site</span>
              </div>
              <ul className="flex flex-col border-t border-border-hairline">
                {rest.map((essay) => (
                  <EssayRow essay={essay} key={essay.slug} />
                ))}
              </ul>
              <a
                className="group self-start mt-8 -my-2 py-3 inline-flex items-center gap-1.5 font-body-sm text-body-sm font-medium text-text-primary"
                href={site.links.medium}
                {...external}
              >
                <span className="link-draw">The full archive on Medium</span>
                <Icon
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  name="arrow_outward"
                  size={15}
                />
              </a>
            </Reveal>
          </div>
        )}
      </div>
    </PageShell>
  );
}

/** One essay in the index. The title links to the local article page; the
 *  original post is offered beside it rather than instead of it. */
function EssayRow({ essay }: { essay: Essay }) {
  return (
    <li className="border-b border-border-hairline">
      <div className="grid gap-x-8 gap-y-3 py-6 md:py-7 grid-cols-[minmax(0,1fr)_5.5rem] md:grid-cols-[8rem_minmax(0,1fr)_9rem] md:items-center">
        <span className="col-span-2 md:col-span-1 flex md:flex-col gap-x-3 gap-y-1 font-body-sm text-body-sm text-text-muted">
          <time className="font-label-meta font-label-meta text-label-meta text-text-secondary" dateTime={essay.date}>
            {essayDateLabel(essay.date)}
          </time>
          <span>{essay.readMinutes} min read</span>
        </span>
        <span className="flex flex-col gap-1.5 min-w-0">
          <Link
            className="font-headline-md text-headline-md md:font-headline-lg tracking-tight text-text-primary transition-transform duration-300 hover:translate-x-1 w-fit"
            href={`/writing/${essay.slug}`}
          >
            {essay.title}
          </Link>
          <span className="font-body-md text-body-md text-text-secondary line-clamp-2 max-w-[62ch]">
            {essay.excerpt}
          </span>
          <span className="flex flex-wrap items-center gap-2 font-body-sm text-body-sm text-text-muted">
            <span>{essayCategoryLabel(essay.category)}</span>
            <span className="text-border-dotted">·</span>
            <a
              className="link-dots hover:text-text-primary"
              href={essay.mediumUrl}
              {...external}
            >
              Original on Medium
            </a>
          </span>
        </span>
        {essay.image && (
          <Link
            aria-hidden="true"
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container self-start md:self-center"
            href={`/writing/${essay.slug}`}
            tabIndex={-1}
          >
            <FadeImage
              alt=""
              className="object-cover group-hover:scale-[1.04]"
              fill
              sizes="144px"
              src={essay.image}
            />
          </Link>
        )}
      </div>
    </li>
  );
}
