import { useId, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";

/**
 * Page header shared by every sub-page: title, then one lead paragraph
 * underneath it. Stacked on every breakpoint so the page opens on a single
 * message instead of two competing columns.
 */
export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  /** Mono label above the title: what kind of page this is. */
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Optional slot under the lead, e.g. a count or a source link. */
  children?: ReactNode;
  className?: string;
}) {
  // Every section is named after its heading so agents and screen readers
  // can tell the page's parts apart without reading them.
  const headingId = useId();
  return (
    <Reveal
      aria-labelledby={headingId}
      as="section"
      className={cn("flex flex-col items-center text-center gap-4 md:gap-6 pt-space-xs pb-4 md:pb-8 max-w-4xl mx-auto", className)}
      y={12}
    >
      {eyebrow && <p className="eyebrow text-text-muted">{eyebrow}</p>}
      <h1
        className="font-headline-xl-mobile text-headline-xl-mobile font-semibold text-text-primary text-balance"
        id={headingId}
      >
        {title}
      </h1>
      {lead && (
        <p className="font-body-lg text-body-lg text-text-secondary max-w-[60ch] text-balance">
          {lead}
        </p>
      )}
      {children && <div className="flex items-center justify-center gap-3 flex-wrap">{children}</div>}
    </Reveal>
  );
}

/**
 * Titled block. The heading is centred and set large, with its meta line
 * (a count or a "view all" link) under it, then the content at full width.
 *
 * `layout` is kept for callers; both values render the same centred head.
 */
export function PageSection({
  title,
  meta,
  children,
  className,
  id,
}: {
  layout?: "rail" | "stacked";
  title: ReactNode;
  /** Secondary line under the title: a count or a "view all" link. */
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className={cn("flex flex-col gap-8 md:gap-12 scroll-mt-24", className)}
      id={id}
    >
      <div className="flex min-w-0 flex-col items-center gap-3 text-center">
        <h2
          className="text-[clamp(2rem,1.3rem+2.8vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-text-primary text-balance"
          id={headingId}
        >
          {title}
        </h2>
        {meta && (
          <div className="min-w-0 font-body-md text-body-md text-text-muted">{meta}</div>
        )}
      </div>
      <Reveal className="stack-block min-w-0">{children}</Reveal>
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
