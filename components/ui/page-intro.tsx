import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";

/**
 * Page header shared by every sub-page: title, then one lead paragraph
 * underneath it. Stacked on every breakpoint so the page opens on a single
 * message instead of two competing columns.
 */
export function PageIntro({
  title,
  lead,
  children,
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  /** Optional slot under the lead, e.g. a count or a source link. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      as="section"
      className={cn("flex flex-col gap-4 md:gap-5 pt-space-xs max-w-3xl", className)}
      y={12}
    >
      <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-text-primary tracking-tight">
        {title}
      </h1>
      {lead && (
        <p className="font-body-lg text-body-lg text-text-secondary max-w-[60ch]">
          {lead}
        </p>
      )}
      {children && <div className="flex items-center gap-3 flex-wrap">{children}</div>}
    </Reveal>
  );
}

/**
 * Titled block.
 * - `rail` (default): on desktop the heading sits in a sticky left rail and
 *   content fills the remaining nine columns.
 * - `stacked`: heading and meta share one ruled row above full-width
 *   content. Used to break the rail rhythm where content wants the width.
 */
export function PageSection({
  title,
  meta,
  children,
  className,
  id,
  layout = "rail",
}: {
  layout?: "rail" | "stacked";
  title: ReactNode;
  /** Secondary line under the title: a count or a "view all" link. */
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  if (layout === "stacked") {
    return (
      <section className={cn("flex flex-col gap-6 md:gap-8 scroll-mt-24", className)} id={id}>
        <div className="flex flex-col gap-1 border-t border-text-primary pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h2 className="font-headline-lg text-headline-lg text-text-primary">{title}</h2>
          {meta && (
            <div className="font-body-sm text-body-sm text-text-muted sm:text-right">{meta}</div>
          )}
        </div>
        <Reveal className="stack-block min-w-0">{children}</Reveal>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "flex flex-col gap-5 md:gap-6 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 scroll-mt-24",
        className,
      )}
      id={id}
    >
      {/* Title and meta sit side by side from `sm` up. Below that they stack:
          a long meta line beside a wrapped heading squeezes both into a narrow
          column and reads as neither. */}
      <div className="flex flex-col gap-1 lg:col-span-3 lg:flex-row lg:items-baseline lg:justify-between lg:gap-3 lg:flex-col lg:justify-start lg:gap-1.5 lg:self-start lg:sticky lg:top-28 lg:border-t lg:border-text-primary lg:pt-4">
        <h2 className="font-headline-lg text-headline-lg text-text-primary">
          {title}
        </h2>
        {meta && (
          <div className="font-body-sm text-body-sm text-text-muted sm:shrink-0">{meta}</div>
        )}
      </div>
      <Reveal className="stack-block min-w-0 lg:col-span-9">
        {children}
      </Reveal>
    </section>
  );
}

/** "View all" style link used in section rails. */
export function RailLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="group -my-3 py-3 inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors"
      href={href}
    >
      <span className="link-draw">{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </Link>
  );
}
