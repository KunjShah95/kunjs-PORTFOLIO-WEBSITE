import type { LegalDocument, LegalSection } from "@/lib/legal";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { Reveal } from "@/components/primitives/Reveal";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";
import { site } from "@/lib/site-data";

/**
 * Renderer for the two legal documents.
 *
 * Both pages are long, flat, and structurally identical — numbered sections of
 * prose — so they share one layout instead of two hand-maintained copies. A
 * clause is edited in `lib/legal.ts` and both the page and the table of
 * contents update from the same array.
 *
 * The rail carries a sticky contents list rather than a per-section heading:
 * a legal document has twenty sections, so the section headings have to live
 * inline with the prose where they can be read in context.
 */
export function LegalDoc({ doc, counterpart }: { doc: LegalDocument; counterpart: LegalDocument }) {
  return (
    <>
      <JsonLd data={pageBreadcrumb(doc.title, doc.path)} />
      <PageIntro className="max-w-3xl" title={doc.title} lead={doc.lead}>
        <span className="font-label-meta text-label-meta text-text-muted">
          {doc.effective}
        </span>
      </PageIntro>

      {/* A one-line summary above the fold. Someone arriving from a client
          diligence checklist wants the shape of it, not the whole thing. */}
      <PageSection
        layout="stacked"
        meta={`${doc.sections.length} sections`}
        title="What is covered"
      >
        <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {doc.sections.map((section, i) => (
            <li
              className="flex items-baseline gap-2.5 text-body-sm font-body-sm text-body-sm text-text-secondary"
              key={section.id}
            >
              <span className="font-label-meta text-label-meta text-text-muted tabular-nums shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <a className="link-draw" href={`#${section.id}`}>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* ------------------------------------------------------- the document */}
      <div className="flex flex-col gap-6 md:gap-8 lg:grid lg:grid-cols-12 lg:gap-x-10">
        {/* Sticky contents rail. Hidden on phones: on a document this long the
            summary grid above already covers jumping to a clause. */}
        <nav
          aria-label={`${doc.title} contents`}
          className="hidden lg:col-span-3 lg:block lg:self-start lg:sticky lg:top-28 lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto lg:pr-2"
        >
          <p className="font-label-section text-label-section text-text-muted pb-3 border-b border-border-hairline">
            Contents
          </p>
          <ol className="flex flex-col py-1">
            {doc.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  className="flex items-baseline gap-2.5 py-1.5 font-body-sm text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                  href={`#${section.id}`}
                >
                  <span className="font-label-meta text-label-meta text-text-muted tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-10 md:gap-12 lg:col-span-9 min-w-0">
          {doc.sections.map((section, i) => (
            <LegalClause key={section.id} section={section} order={i + 1} />
          ))}
        </div>
      </div>

      {/* --------------------------------------------------- counterpart link */}
      <Reveal className="border-t border-text-primary pt-8 md:pt-12">
        <Link
          className="group flex items-center gap-4 rounded-2xl bg-surface-card border border-border-hairline lift p-space-md md:p-6"
          href={counterpart.path}
        >
          <span className="min-w-0 flex-1">
            <span className="block font-label-section text-label-section text-text-muted">
              Also read
            </span>
            <span className="font-headline-lg text-headline-lg text-text-primary">
              {counterpart.title}
            </span>
          </span>
          <span className="text-text-muted shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
            <Icon name="arrow_forward" size={20} />
          </span>
        </Link>
      </Reveal>

      <Reveal className="border-t border-border-hairline pt-6 flex flex-col gap-2">
        <p className="font-body-sm text-body-sm text-text-muted max-w-[70ch]">
          Written in plain English so it can actually be read. It is not a
          substitute for advice from a lawyer in your jurisdiction — if any part
          of it matters to a decision you are making, get that part checked.
        </p>
        <a
          className="link-draw font-body-sm text-body-sm text-text-secondary w-fit"
          href={`mailto:${site.email}?subject=${encodeURIComponent(doc.title)} question`}
        >
          Questions about this document — {site.email}
        </a>
      </Reveal>
    </>
  );
}

/** One numbered clause: heading, then its blocks. */
function LegalClause({ section, order }: { section: LegalSection; order: number }) {
  return (
    <section
      aria-labelledby={`${section.id}-title`}
      className="flex flex-col gap-4 scroll-mt-24"
      id={section.id}
    >
      <h2
        className="flex items-baseline gap-3 border-t border-text-primary pt-4"
        id={`${section.id}-title`}
      >
        <span className="font-label-meta text-label-meta text-text-muted tabular-nums shrink-0">
          {String(order).padStart(2, "0")}
        </span>
        <span className="font-headline-lg text-headline-lg text-text-primary">
          {section.title}
        </span>
      </h2>

      <div className="flex flex-col gap-4 max-w-[68ch]">
        {section.blocks.map((block, i) => (
          <Block block={block} key={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * Renders one block.
 *
 * Keyed by index: blocks are literal constants in `lib/legal.ts` with no
 * identity beyond position, and a content string is a worse key than one that
 * is guaranteed unique in a fixed array.
 */
function Block({ block }: { block: LegalSection["blocks"][number] }) {
  switch (block.kind) {
    case "h3":
      return (
        <h3 className="font-headline-md text-headline-md text-text-primary pt-1">
          {block.text}
        </h3>
      );

    case "p":
      return (
        <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
          {block.text}
        </p>
      );

    case "ul":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item) => (
            <li className="flex items-start gap-2.5" key={item}>
              <span className="text-accent-emerald shrink-0 mt-[0.45rem]">
                <Icon name="check" size={13} />
              </span>
              <span className="font-body-md text-body-md text-text-secondary leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li className="flex items-start gap-3" key={item}>
              <span className="font-label-meta text-label-meta text-text-muted tabular-nums shrink-0 mt-[0.1rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body-md text-body-md text-text-secondary leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ol>
      );

    case "note":
      return (
        // A callout inside a clause, not page-level complementary content, so
        // it is a note rather than an <aside> landmark.
        <div
          className="flex flex-col gap-1.5 p-space-md rounded-2xl bg-surface-subtle/70 border border-border-hairline"
          role="note"
        >
          <span className="font-body-sm text-body-sm font-medium text-text-primary">
            {block.title}
          </span>
          <span className="font-body-md text-body-md text-text-secondary">
            {block.text}
          </span>
        </div>
      );
  }
}