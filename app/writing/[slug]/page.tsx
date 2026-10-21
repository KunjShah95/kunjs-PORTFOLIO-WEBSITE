import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shell/page-shell";
import { ArticleBody } from "@/components/writing/article-body";
import { Icon } from "@/components/icon";
import { FadeImage } from "@/components/primitives/FadeImage";
import { Reveal } from "@/components/primitives/Reveal";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { Tag } from "@/components/ui/primitives";
import { JsonLd, blogPostingJsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { ORIGIN } from "@/lib/routes";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site-data";
import {
  essayBySlug,
  essayCategoryLabel,
  essayDateLabel,
  essayDateLong,
  essaysByDate,
} from "@/lib/essays";

/* ==========================================================================
   A single essay, served from this site.

   These pages did not exist before. The archive of eleven essays was a list of
   titles with no bodies behind them, and `/writing/:slug` redirected to the
   index, so there was nothing on this domain for a crawler to read, quote, or
   attribute. Now each post is a real page with the full text, an Article
   schema, and a canonical URL, and the original Medium post is kept as the
   sameAs target.
   ========================================================================== */

/** Every essay is known at build time from the committed archive. */
export function generateStaticParams() {
  return essaysByDate.map((essay) => ({ slug: essay.slug }));
}

/**
 * No other slug exists.
 *
 * The archive used to advertise eleven essays that were never published, and
 * this route redirected every `/writing/:slug` back to the index. Now that
 * the real essays have their own pages, a slug that is not in the archive is
 * a URL that has never had content — so it answers 404 rather than a
 * redirect. Redirecting it to the index produced a 200 with an empty body
 * and a meta refresh, which a crawler reads as a page with nothing on it.
 */
export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/writing/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const essay = essayBySlug(slug);
  if (!essay) return {};

  return pageMeta({
    path: `/writing/${essay.slug}`,
    title: essay.title,
    description: essay.excerpt,
    keywords: [...essay.tags, essayCategoryLabel(essay.category), "AI engineering", "essay"],
    ogTitle: essay.title,
    ogDescription: essay.excerpt,
    type: "article",
    publishedTime: essay.date,
    authors: [{ name: site.name, url: `${ORIGIN}/` }],
    image: {
      url: essay.image ?? `${ORIGIN}/og-image.png`,
      width: 1200,
      height: 630,
      alt: essay.title,
    },
  });
}

const external = { rel: "noopener noreferrer", target: "_blank" } as const;

export default async function EssayPage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const essay = essayBySlug(slug);

  // Unreachable with `dynamicParams = false`, but the archive lookup is
  // total, so the type still has to be narrowed.
  if (!essay) notFound();

  const path = `/writing/${essay.slug}`;
  const index = essaysByDate.findIndex((entry) => entry.slug === essay.slug);
  const newer = index > 0 ? essaysByDate[index - 1] : null;
  const older = index < essaysByDate.length - 1 ? essaysByDate[index + 1] : null;

  // Same category first, then whatever else is recent — so the "read next"
  // rail always has something in it.
  const related = essaysByDate
    .filter((entry) => entry.slug !== essay.slug)
    .sort((a, b) => {
      const aMatch = a.category === essay.category ? 0 : 1;
      const bMatch = b.category === essay.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 3);

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Writing", path: "/writing" },
          { name: essay.title, path },
        ])}
      />
      <JsonLd
        data={blogPostingJsonLd({
          slug: essay.slug,
          title: essay.title,
          description: essay.excerpt,
          datePublished: essay.date,
          image: essay.image,
          wordCount: essay.wordCount,
          keywords: essay.tags,
          section: essayCategoryLabel(essay.category),
          mediumUrl: essay.mediumUrl,
        })}
      />

      <div className="stack-page">
        {/* ---------------------------------------------------------- header */}
        <Reveal
          aria-labelledby="essay-title"
          as="section"
          className="flex flex-col gap-4 md:gap-5 pt-space-xs max-w-3xl"
          y={12}
        >
          <Link
            className="group -my-3 py-3 inline-flex w-fit items-center gap-1.5 font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors"
            href="/writing"
          >
            <Icon
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
              name="arrow_forward"
              size={14}
            />
            All essays
          </Link>

          <p className="font-body-sm text-body-sm text-text-muted">
            {essayCategoryLabel(essay.category)}
            <span className="mx-1.5 text-border-dotted">/</span>
            <time dateTime={essay.date}>{essayDateLong(essay.date)}</time>
            <span className="mx-1.5 text-border-dotted">/</span>
            {essay.readMinutes} min read
          </p>

          <h1
            className="font-headline-xl-mobile text-headline-xl-mobile text-text-primary tracking-tight text-pretty"
            id="essay-title"
          >
            {essay.title}
          </h1>

          <p className="font-body-lg text-body-lg text-text-secondary max-w-[60ch]">
            {essay.excerpt}
          </p>

          {/* The original is one click away, but this page is the canonical
              copy: it is the one that is crawlable and quotable. */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              className={`${buttonStyles.secondary} group`}
              href={essay.mediumUrl}
              {...external}
            >
              Read the original on Medium
              <Icon
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                name="arrow_outward"
                size={15}
              />
            </a>
            {essay.tags.slice(0, 4).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </Reveal>

        {/* ----------------------------------------------------------- cover */}
        {essay.image && (
          <Reveal className="w-full" y={12}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-container">
              <FadeImage
                alt=""
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                src={essay.image}
              />
            </div>
          </Reveal>
        )}

        {/* ----------------------------------------------------------- body */}
        <Reveal className="mx-auto w-full max-w-[68ch]" y={12}>
          <ArticleBody html={essay.body} />

          <footer className="mt-12 flex flex-col gap-6 border-t border-border-hairline pt-6">
            <p className="font-body-sm text-body-sm text-text-muted">
              {essay.wordCount.toLocaleString("en-US")} words · first published{" "}
              {essayDateLong(essay.date)}
            </p>
            <p className="font-body-sm text-body-sm text-text-secondary">
              <span className="font-medium text-text-primary">{site.name}</span> is an AI engineer
              in {site.location}, building agents, retrieval systems, and edge vision that hold
              up in production.{" "}
              <Link
                className="underline decoration-border-dotted underline-offset-4 hover:text-text-primary"
                href="/about"
              >
                More about the work
              </Link>
              , or{" "}
              <Link
                className="underline decoration-border-dotted underline-offset-4 hover:text-text-primary"
                href="/contact"
              >
                get in touch
              </Link>
              .
            </p>
          </footer>
        </Reveal>

        {/* ------------------------------------------------------ read next */}
        {(newer || older) && (
          <section aria-label="More essays" className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between gap-4 border-t border-text-primary pt-4">
              <h2 className="font-headline-lg text-headline-lg text-text-primary">Read next</h2>
              <Link
                className="font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors"
                href="/writing"
              >
                All essays
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              {[
                { essay: newer, label: "Newer" },
                { essay: older, label: "Older" },
              ].map(
                (entry) =>
                  entry.essay && (
                    <Link
                      className="group flex flex-col gap-2 pt-4 border-t border-border-hairline"
                      href={`/writing/${entry.essay.slug}`}
                      key={entry.label}
                    >
                      <span className="font-label-meta text-label-meta text-text-muted">
                        {entry.label} · {essayDateLabel(entry.essay.date)} · {entry.essay.readMinutes} min
                        read
                      </span>
                      <span className="font-headline-md text-headline-md text-text-primary transition-transform duration-300 group-hover:translate-x-1">
                        {entry.essay.title}
                      </span>
                    </Link>
                  ),
              )}
            </div>
          </section>
        )}

        {/* -------------------------------------------------------- related */}
        {related.length > 0 && (
          <section aria-label="Related essays" className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between gap-4 border-t border-text-primary pt-4">
              <h2 className="font-headline-lg text-headline-lg text-text-primary">More on this</h2>
            </div>
            <ul className="flex flex-col">
              {related.map((entry) => (
                <li className="border-b border-border-hairline" key={entry.slug}>
                  <Link
                    className="group flex flex-col gap-1.5 py-5"
                    href={`/writing/${entry.slug}`}
                  >
                    <span className="font-label-meta text-label-meta text-text-muted">
                      {essayCategoryLabel(entry.category)} · {essayDateLabel(entry.date)} ·{" "}
                      {entry.readMinutes} min read
                    </span>
                    <span className="font-headline-md text-headline-md text-text-primary transition-transform duration-300 group-hover:translate-x-1">
                      {entry.title}
                    </span>
                    <span className="font-body-sm text-body-sm text-text-secondary max-w-[60ch]">
                      {entry.excerpt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <CtaBand
          body="If one of these problems is the one you are trying to solve, say which and I will answer on that directly."
          title="Working on something like this?"
        >
          <Link className={buttonStyles.primary} href="/contact">
            Get in touch
          </Link>
        </CtaBand>
      </div>
    </PageShell>
  );
}
