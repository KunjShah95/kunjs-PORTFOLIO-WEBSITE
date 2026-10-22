import { useId, type ReactNode } from "react";
import Link from "next/link";
import { CountUp } from "@/components/primitives/CountUp";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";

/**
 * Row of headline numbers separated by hairlines. Numbers count up once on
 * first view, which is the one place motion carries meaning: it draws the
 * eye to the proof.
 *
 * Column count adapts to how many tiles were passed: two or three sit in one
 * row, and four or more drop to a two-column grid on a phone. Past three, a
 * single row is narrower than its own labels and they collide. Cells are
 * `min-w-0` with a wrapping label so nothing can force the row wider than
 * the viewport.
 */
export function StatStrip({
  items,
  tone = "plain",
  className,
}: {
  /** `href` turns a tile into a link to the evidence behind the number. */
  items: readonly { value: string; label: string; href?: string }[];
  tone?: "card" | "plain";
  className?: string;
}) {
  const many = items.length > 3;
  // Phones: one column for a short strip, two once it would crowd.
  const phoneCols = many ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2";
  const wideCols =
    items.length >= 5
      ? "md:grid-cols-5"
      : items.length === 4
        ? "md:grid-cols-4"
        : items.length === 3
          ? "sm:grid-cols-3"
          : "sm:grid-cols-2";

  return (
    <div
      className={cn(
        "grid",
        phoneCols,
        wideCols,
        "border-y border-border-hairline",
        tone === "card" && "rounded-2xl bg-surface-card border",
        className,
      )}
    >
      {items.map((item) => {
        const tile =
          "flex min-w-0 flex-col gap-1 px-3 py-4 md:px-6 md:py-6 border-b border-border-hairline last:border-b-0 sm:border-b-0 sm:border-r sm:border-border-hairline sm:last:border-r-0";
        const content = (
          <>
            <CountUp
              className="font-headline-lg text-headline-lg md:text-[36px] md:leading-none tracking-[-0.03em] text-text-primary font-semibold"
              value={item.value}
            />
            <span className="font-body-sm text-body-sm text-text-muted break-words">
              {item.label}
              {item.href && (
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  &rarr;
                </span>
              )}
            </span>
          </>
        );
        return item.href ? (
          <Link
            className={cn(tile, "group hover:bg-surface-container/50 transition-colors")}
            href={item.href}
            key={item.label}
          >
            {content}
          </Link>
        ) : (
          <div className={tile} key={item.label}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Closing call to action: an inverted panel, the one dark surface on a
 * light page. Every page ends here, so the ask always looks the same and is
 * never mistaken for another section of content.
 */
export function CtaBand({
  title,
  body,
  children,
  footnote,
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
  /** Small line under the actions, e.g. the recruiter path. */
  footnote?: ReactNode;
  className?: string;
}) {
  const headingId = useId();
  return (
    <Reveal
      aria-labelledby={headingId}
      as="section"
      className={cn(
        "theme-ink relative isolate overflow-hidden rounded-3xl bg-surface text-text-primary border border-border-hairline px-6 py-12 md:px-14 md:py-20",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute -z-10 -top-40 left-1/2 -translate-x-1/2 h-80 w-[36rem] rounded-full bg-signal/25 blur-[120px]"
      />
      <div className="flex flex-col items-start gap-6 max-w-3xl">
        <h2
          className="text-[clamp(2rem,1.3rem+2.8vw,3.5rem)] leading-[1.02] tracking-[-0.04em] font-semibold text-balance"
          id={headingId}
        >
          {title}
        </h2>
        {body && (
          <p className="font-body-lg text-body-lg text-text-secondary max-w-[56ch]">
            {body}
          </p>
        )}
        {children && (
          <div className="flex flex-wrap items-center gap-3 pt-2">{children}</div>
        )}
        {footnote && (
          <div className="font-body-sm text-body-sm text-text-muted">{footnote}</div>
        )}
      </div>
    </Reveal>
  );
}

/**
 * Button styles. Shape rule for the whole site: buttons and filters are
 * full pills, containers are 16px, inner elements 8 to 12px.
 */
export const buttonStyles = {
  primary:
    "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-body-sm text-body-sm font-medium whitespace-nowrap shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.2)] hover:bg-primary-container active:scale-[0.98] transition-all",
  secondary:
    "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-surface-card text-text-primary font-body-sm text-body-sm font-medium whitespace-nowrap border border-border-hairline shadow-[0_1px_2px_rgb(0_0_0/0.04)] hover:border-text-muted active:scale-[0.98] transition-all",
  link:
    "inline-flex items-center gap-1.5 min-h-11 -my-1 py-1 font-body-sm text-body-sm font-medium text-text-primary underline decoration-border-dotted underline-offset-4 hover:decoration-text-primary transition-colors",
} as const;
