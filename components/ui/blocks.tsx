import type { ReactNode } from "react";
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
  items: readonly { value: string; label: string }[];
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
      {items.map((item) => (
        <div
          className="flex min-w-0 flex-col gap-1 px-3 py-4 md:px-6 md:py-6 border-b border-border-hairline last:border-b-0 sm:border-b-0 sm:border-r sm:border-border-hairline sm:last:border-r-0"
          key={item.label}
        >
          <CountUp
            className="font-headline-lg text-headline-lg md:text-[36px] md:leading-none tracking-[-0.03em] text-text-primary font-semibold"
            value={item.value}
          />
          <span className="font-body-sm text-body-sm text-text-muted break-words">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Closing call to action. One headline, one line of support, the actions.
 * Deliberately not a coloured box: it closes the page in the page's own
 * surface, separated by a rule.
 */
export function CtaBand({
  title,
  body,
  children,
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      as="section"
      className={cn(
        "border-t border-text-primary pt-8 md:pt-12 grid gap-6 lg:grid-cols-12 lg:gap-x-10 lg:items-end",
        className,
      )}
    >
      <div className="flex flex-col gap-3 lg:col-span-8">
        <h2 className="font-headline-lg text-headline-lg md:text-[40px] md:leading-[44px] tracking-[-0.03em] text-text-primary max-w-2xl">
          {title}
        </h2>
        {body && (
          <p className="font-body-md text-body-md text-text-secondary max-w-[60ch]">
            {body}
          </p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
          {children}
        </div>
      )}
    </Reveal>
  );
}

/**
 * Button styles. Shape rule for the whole site: buttons and filters are
 * full pills, containers are 16px, inner elements 8 to 12px.
 */
export const buttonStyles = {
  primary:
    "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-body-sm text-body-sm font-medium whitespace-nowrap hover:bg-primary-container active:scale-[0.98] transition-all",
  secondary:
    "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-surface-card text-text-primary font-body-sm text-body-sm font-medium whitespace-nowrap border border-border-hairline hover:border-text-muted active:scale-[0.98] transition-all",
  link:
    "inline-flex items-center gap-1.5 font-body-sm text-body-sm font-medium text-text-primary underline decoration-border-dotted underline-offset-4 hover:decoration-text-primary transition-colors",
} as const;
