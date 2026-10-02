import type { Metadata } from "next";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { FadeImage } from "@/components/primitives/FadeImage";
import { Reveal } from "@/components/primitives/Reveal";
import { buttonStyles } from "@/components/ui/blocks";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { MEDIUM_PROFILE, formatMonth, getMediumPosts } from "@/lib/medium";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

/** New Medium posts appear within the hour. */
export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  path: "/writing",
  title: "Writing",
  description: "Essays by Kunj Shah on AI engineering, LLM evaluation, agents and Python, published on Medium.",
  keywords: ["AI engineering blog", "LLM evaluation articles", "AI agent essays", "machine learning writing"],
});

const external = { rel: "noopener noreferrer", target: "_blank" } as const;

export default async function WritingPage() {
  const posts = await getMediumPosts();
  const [featured, ...rest] = posts ?? [];

  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Writing", "/writing")} />
        <PageIntro
          lead="Essays on AI engineering, evaluation, agents and Python. Published on Medium, collected here."
          title="Writing"
        >
          <a className={`${buttonStyles.secondary} group`} href={MEDIUM_PROFILE} {...external}>
            Follow on Medium
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
              <a className={buttonStyles.primary} href={MEDIUM_PROFILE} {...external}>
                Read on Medium
              </a>
            }
            body="Medium didn't respond just now, so the list can't load. Every essay is still on Medium."
            icon="edit_note"
            title="Essays are unavailable right now."
          />
        ) : (
          <div className="flex flex-col gap-12 md:gap-16">
            {/* latest post, given the room */}
            <Reveal>
              <a
                className="group grid gap-6 md:gap-10 md:grid-cols-12 md:items-center"
                href={featured.url}
                {...external}
              >
                <div className="md:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container">
                  {featured.image && (
                    <FadeImage
                      alt=""
                      className="object-cover group-hover:scale-[1.02]"
                      fill
                      priority
                      sizes="(min-width: 768px) 640px, 100vw"
                      src={featured.image}
                    />
                  )}
                </div>
                <div className="md:col-span-5 flex flex-col gap-3">
                  <span className="font-body-sm text-body-sm text-text-muted">
                    <time className="font-label-meta text-label-meta text-text-secondary" dateTime={featured.date}>
                      {formatMonth(featured.date)}
                    </time>
                    <span className="mx-2 text-border-dotted">/</span>
                    {featured.readMinutes} min read
                  </span>
                  <h2 className="font-headline-lg text-headline-lg md:text-[34px] md:leading-[40px] tracking-tight text-text-primary">
                    {featured.title}
                  </h2>
                  <p className="font-body-md text-body-md text-text-secondary">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 pt-2 font-body-sm text-body-sm font-medium text-text-primary">
                    Read on Medium
                    <Icon
                      className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                      name="arrow_outward"
                      size={15}
                    />
                  </span>
                </div>
              </a>
            </Reveal>

            {/* everything else as a dated index */}
            <Reveal as="section" className="flex flex-col">
              <div className="flex items-baseline justify-between gap-4 pb-3">
                <h2 className="font-headline-md text-headline-md text-text-primary">All essays</h2>
                <span className="font-body-sm text-body-sm text-text-muted">{posts!.length} on Medium</span>
              </div>
              <ul className="flex flex-col border-t border-border-hairline">
                {rest.map((post) => (
                  <li className="border-b border-border-hairline" key={post.url}>
                    <a
                      className="group grid gap-x-8 gap-y-3 py-6 md:py-7 grid-cols-[minmax(0,1fr)_5.5rem] md:grid-cols-[8rem_minmax(0,1fr)_9rem] md:items-center"
                      href={post.url}
                      {...external}
                    >
                      <span className="col-span-2 md:col-span-1 flex md:flex-col gap-x-3 gap-y-1 font-body-sm text-body-sm text-text-muted">
                        <time className="font-label-meta text-label-meta text-text-secondary" dateTime={post.date}>
                          {formatMonth(post.date)}
                        </time>
                        <span>{post.readMinutes} min read</span>
                      </span>
                      <span className="flex flex-col gap-1.5 min-w-0">
                        <span className="font-headline-md text-headline-md md:text-headline-lg tracking-tight text-text-primary transition-colors group-hover:text-text-secondary">
                          {post.title}
                        </span>
                        <span className="font-body-md text-body-md text-text-secondary line-clamp-2 max-w-[62ch]">
                          {post.excerpt}
                        </span>
                        {post.tags.length > 0 && (
                          <span className="font-body-sm text-body-sm text-text-muted">
                            {post.tags.slice(0, 3).join(", ")}
                          </span>
                        )}
                      </span>
                      <span className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container self-start md:self-center">
                        {post.image && (
                          <FadeImage
                            alt=""
                            className="object-cover group-hover:scale-[1.04]"
                            fill
                            sizes="144px"
                            src={post.image}
                          />
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className="group self-start mt-8 -my-2 py-3 inline-flex items-center gap-1.5 font-body-sm text-body-sm font-medium text-text-primary"
                href={MEDIUM_PROFILE}
                {...external}
              >
                <span className="link-draw">Everything else on Medium</span>
                <Icon
                  className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
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
