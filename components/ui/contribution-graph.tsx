"use client";

import { useMemo, useState } from "react";
import { type ContributionDay, type Contributions, formatCount } from "@/lib/contributions";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/**
 * Year-long contribution calendar.
 *
 * Renders as a real `<table>` so the grid is announced sensibly and each cell
 * carries its own label, rather than a canvas that a screen reader sees as a
 * single opaque image. Row = weekday, column = week, matching GitHub.
 *
 * The cell grid is static data with no interaction of its own, so it does not
 * need to be a client component except for the hover tooltip.
 */
export function ContributionGraph({
  contributions,
  className,
}: {
  contributions: Contributions;
  className?: string;
}) {
  const [hover, setHover] = useState<ContributionDay | null>(null);

  /** Pad the front so the first column starts on a Monday. */
  const weeks = useMemo(() => {
    if (contributions.days.length === 0) return [];
    const first = new Date(`${contributions.days[0].date}T00:00:00Z`);
    const leading = (first.getUTCDay() + 6) % 7;

    const cells: (ContributionDay | null)[] = [
      ...Array.from({ length: leading }, () => null),
      ...contributions.days,
    ];
    // Pad the tail to whole weeks so the last row is not a ragged edge.
    while (cells.length % 7 !== 0) cells.push(null);

    const out: (ContributionDay | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
    return out;
  }, [contributions.days]);

  if (weeks.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex gap-2">
        {/* Weekday gutter. Hidden on phones, where the grid is already dense. */}
        <div aria-hidden="true" className="hidden sm:flex flex-col gap-[3px] pt-[18px] shrink-0">
          {WEEKDAYS.map((day, i) => (
            <span
              className="h-[10px] w-6 flex items-center font-label-meta text-label-meta text-text-muted"
              key={day}
            >
              {/* GitHub only labels alternate rows. */}
              {i % 2 === 1 ? day : ""}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
          <table
            aria-label={`GitHub contributions over the last year. ${formatCount(contributions.total)} contributions in total.`}
            className="border-separate"
            style={{ borderSpacing: "3px" }}
          >
            <tbody>
              {weeks.map((week, wi) => (
                <tr key={wi}>
                  {week.map((day, di) => (
                    <td className="p-0" key={di}>
                      {day ? (
                        <span
                          aria-label={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                          className={cn(
                            "block h-[10px] w-[10px] rounded-[2px] transition-[transform,outline-color] duration-150",
                            "hover:scale-125 focus-visible:scale-125 outline outline-2 outline-offset-1 outline-transparent",
                          )}
                          data-level={day.level}
                          onBlur={() => setHover(null)}
                          onFocus={() => setHover(day)}
                          onMouseEnter={() => setHover(day)}
                          onMouseLeave={() => setHover(null)}
                          style={{ backgroundColor: `var(--color-contrib-${day.level})` }}
                          tabIndex={0}
                          title={`${day.count} on ${day.date}`}
                        />
                      ) : (
                        <span aria-hidden="true" className="block h-[10px] w-[10px]" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Readout. Fixed height so hovering does not shift the layout. */}
      <div className="flex items-center justify-between gap-4 min-h-5">
        <span
          className="font-label-meta text-label-meta text-text-secondary"
          aria-live="polite"
        >
          {hover
            ? `${formatCount(hover.count)} on ${hover.date}`
            : `${formatCount(contributions.total)} contributions in the last year`}
        </span>

        <span className="flex items-center gap-1.5 shrink-0">
          <span className="font-label-meta text-label-meta text-text-muted">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              className="block h-[9px] w-[9px] rounded-[2px]"
              key={level}
              style={{ backgroundColor: `var(--color-contrib-${level})` }}
            />
          ))}
          <span className="font-label-meta text-label-meta text-text-muted">More</span>
        </span>
      </div>
    </div>
  );
}

/**
 * Shown when the provider is unreachable. Keeps the section's vertical rhythm
 * so the page does not jump, and links out to the profile — the graph is a
 * nicety, the profile is the actual proof.
 */
export function ContributionGraphFallback({
  total,
  href,
}: {
  total: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-border-hairline px-4 py-6">
      <span className="font-body-sm text-body-sm text-text-secondary">
        Contribution calendar is unavailable right now.
      </span>
      <a
        className="font-body-sm text-body-sm text-text-primary underline decoration-border-dotted underline-offset-4 hover:decoration-text-primary w-fit"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        View {total} contributions on GitHub
      </a>
    </div>
  );
}
