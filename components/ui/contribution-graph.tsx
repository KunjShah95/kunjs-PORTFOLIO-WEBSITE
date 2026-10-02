"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { type ContributionDay, type Contributions, formatCount } from "@/lib/contributions";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const WEEKDAYS_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** Month labels closer than this many columns would collide; drop the earlier one. */
const MIN_MONTH_GAP = 3;

type Cell = (ContributionDay & { index: number }) | null;

function parseDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

/** `Tue, Mar 4, 2026` — always UTC so the label matches GitHub's day. */
function formatDay(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function plural(n: number, word: string): string {
  return `${formatCount(n)} ${word}${n === 1 ? "" : "s"}`;
}

/**
 * Derived numbers for the stat strip. Computed from the day list rather than
 * asked of the API, so they always agree with the grid underneath.
 */
function summarize(days: readonly ContributionDay[]) {
  let longest = 0;
  let run = 0;
  let active = 0;
  let best: ContributionDay | null = null;
  const byWeekday = [0, 0, 0, 0, 0, 0, 0];

  for (const day of days) {
    if (day.count > 0) {
      active += 1;
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
    if (!best || day.count > best.count) best = day;
    byWeekday[(parseDate(day.date).getUTCDay() + 6) % 7] += day.count;
  }

  // Current streak may end yesterday: today is still in progress.
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i -= 1;
  for (; i >= 0 && days[i].count > 0; i -= 1) current += 1;

  const peak = Math.max(...byWeekday);
  return { longest, current, active, best, byWeekday, peak };
}

/**
 * Year-long contribution calendar.
 *
 * Laid out as a column-flow CSS grid: 7 rows (Mon–Sun), one column per week,
 * cells square and fluid down to a minimum size, below which the grid scrolls
 * horizontally and starts pinned to the most recent week.
 *
 * Keyboard: the grid is a single tab stop; arrow keys move a roving focus
 * (left/right by week, up/down by day), Home/End jump to the ends.
 */
export function ContributionGraph({
  contributions,
  className,
}: {
  contributions: Contributions;
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number>(contributions.days.length - 1);
  const [visible, setVisible] = useState(false);
  /** Legend hover: spotlight every day at one level. */
  const [hoverLevel, setHoverLevel] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { weeks, months } = useMemo(() => {
    const days = contributions.days;
    if (days.length === 0) return { weeks: [] as Cell[][], months: [] };

    const leading = (parseDate(days[0].date).getUTCDay() + 6) % 7;
    const cells: Cell[] = [
      ...Array.from({ length: leading }, () => null),
      ...days.map((day, index) => ({ ...day, index })),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks: Cell[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    // A month's label sits over the first week holding its 1st day.
    const months: { col: number; label: string }[] = [];
    weeks.forEach((week, col) => {
      const first = week.find((c) => c && c.date.endsWith("-01"));
      if (!first) return;
      const label = MONTHS[parseDate(first.date).getUTCMonth()];
      const prev = months[months.length - 1];
      if (prev && col - prev.col < MIN_MONTH_GAP) months.pop();
      months.push({ col, label });
    });
    if (months.length > 0 && months[0].col >= MIN_MONTH_GAP) {
      // Label the partial month the window opens on, when there is room.
      months.unshift({
        col: 0,
        label: MONTHS[parseDate(days[0].date).getUTCMonth()],
      });
    }

    return { weeks, months };
  }, [contributions.days]);

  const stats = useMemo(() => summarize(contributions.days), [contributions.days]);

  // Pin narrow viewports to the latest weeks: that is the part people look for.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks.length]);

  // Sweep the grid in once, the first time it enters the viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (weeks.length === 0) return null;

  const days = contributions.days;
  const shown = active !== null ? days[active] : null;
  const dimmed = (level: number) => hoverLevel !== null && level !== hoverLevel;

  function move(to: number) {
    const next = Math.max(0, Math.min(days.length - 1, to));
    setFocusIndex(next);
    setActive(next);
    cellRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, number> = {
      ArrowLeft: -7,
      ArrowRight: 7,
      ArrowUp: -1,
      ArrowDown: 1,
    };
    if (event.key in steps) {
      event.preventDefault();
      move(focusIndex + steps[event.key]);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(0);
    } else if (event.key === "End") {
      event.preventDefault();
      move(days.length - 1);
    }
  }

  return (
    <div className={cn("flex flex-col gap-8", className)} ref={rootRef}>
      {/* ------------------------------------------------------ stat strip */}
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border-hairline bg-border-hairline">
        <Stat
          accent
          label="Contributions"
          sub="in the last year"
          value={formatCount(contributions.total)}
        />
        <Stat
          label="Longest streak"
          sub={stats.active > 0 ? `${plural(stats.active, "active day")}` : "no activity yet"}
          value={plural(stats.longest, "day")}
        />
        <Stat
          label="Current streak"
          sub={stats.current > 0 ? "still going" : "starts tomorrow"}
          value={plural(stats.current, "day")}
        />
        <Stat
          label="Best day"
          sub={stats.best ? formatDay(stats.best.date) : "—"}
          value={stats.best ? formatCount(stats.best.count) : "0"}
        />
      </dl>

      {/* ------------------------------------------------------- the grid */}
      <div className="relative rounded-2xl border border-border-hairline bg-surface-card p-4 sm:p-6">
        <div className="flex gap-3">
          {/* Weekday gutter, aligned to the grid rows via the same 7-row template. */}
          <div
            aria-hidden="true"
            className="hidden sm:grid shrink-0 pt-6 contrib-rows"
          >
            {WEEKDAYS.map((day, i) => (
              <span
                className="flex items-center font-label-meta text-[10px] leading-none text-text-muted"
                key={day}
              >
                {i % 2 === 0 ? day : ""}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar" ref={scrollRef}>
            <div
              className="relative min-w-[560px]"
              style={{ "--weeks": weeks.length } as CSSProperties}
            >
              {/* Month row shares the grid's column template. */}
              <div aria-hidden="true" className="contrib-cols h-6">
                {months.map(({ col, label }) => (
                  <span
                    className="font-label-meta text-[10px] leading-none text-text-muted whitespace-nowrap"
                    key={`${col}-${label}`}
                    style={{ gridColumnStart: col + 1 }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div
                aria-label={`GitHub contributions over the last year: ${formatCount(contributions.total)} in total. Use arrow keys to move between days.`}
                className="contrib-grid"
                data-visible={visible || undefined}
                onKeyDown={onKeyDown}
                onMouseLeave={() => setActive(null)}
                role="group"
              >
                {weeks.map((week, wi) =>
                  week.map((cell, di) =>
                    cell ? (
                      <span
                        aria-label={`${plural(cell.count, "contribution")} on ${formatDay(cell.date)}`}
                        className={cn(
                          "contrib-cell",
                          active === cell.index && "is-active",
                          dimmed(cell.level) && "is-dimmed",
                        )}
                        data-level={cell.level}
                        key={cell.date}
                        onBlur={() => setActive(null)}
                        onFocus={() => {
                          setFocusIndex(cell.index);
                          setActive(cell.index);
                        }}
                        onMouseEnter={() => setActive(cell.index)}
                        ref={(el) => {
                          cellRefs.current[cell.index] = el;
                        }}
                        role="img"
                        style={
                          {
                            "--col": wi,
                          } as CSSProperties
                        }
                        tabIndex={cell.index === focusIndex ? 0 : -1}
                      />
                    ) : (
                      <span aria-hidden="true" key={`pad-${wi}-${di}`} />
                    ),
                  ),
                )}
              </div>

              {/* Tooltip, placed from the active cell's grid coordinates. */}
              {shown && (
                <Tooltip
                  count={shown.count}
                  date={shown.date}
                  index={active!}
                  leading={weeks[0].findIndex((c) => c !== null)}
                  weeks={weeks.length}
                />
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ footer + legend */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border-hairline pt-4">
          <WeekdayBars byWeekday={stats.byWeekday} peak={stats.peak} />

          <div
            className="flex items-center gap-1.5 shrink-0"
            onMouseLeave={() => setHoverLevel(null)}
          >
            <span className="font-label-meta text-[11px] text-text-muted mr-1">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                aria-hidden="true"
                className={cn(
                  "block size-3 rounded-[3px] transition-transform duration-150",
                  hoverLevel === level && "scale-125",
                )}
                data-level={level}
                key={level}
                onMouseEnter={() => setHoverLevel(level)}
              />
            ))}
            <span className="font-label-meta text-[11px] text-text-muted ml-1">More</span>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {shown ? `${plural(shown.count, "contribution")} on ${formatDay(shown.date)}` : ""}
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 bg-surface-card px-5 py-4">
      <dt className="font-label-meta text-[11px] uppercase tracking-[0.08em] text-text-muted">
        {label}
      </dt>
      <dd
        className={cn(
          "font-headline-lg text-headline-lg tracking-tight",
          accent ? "text-[var(--color-contrib-3)]" : "text-text-primary",
        )}
        data-numeric
      >
        {value}
      </dd>
      <dd className="font-body-sm text-[12px] text-text-secondary truncate">{sub}</dd>
    </div>
  );
}

/** Seven tiny bars: which weekdays the year's work actually landed on. */
function WeekdayBars({ byWeekday, peak }: { byWeekday: number[]; peak: number }) {
  const busiest = byWeekday.indexOf(peak);
  return (
    <div className="flex items-end gap-3">
      <div aria-hidden="true" className="flex items-end gap-1 h-6">
        {byWeekday.map((value, i) => (
          <span
            className="w-2 rounded-[2px] transition-[height] duration-500"
            key={WEEKDAYS[i]}
            style={{
              height: `${peak > 0 ? Math.max(12, (value / peak) * 100) : 12}%`,
              backgroundColor:
                i === busiest ? "var(--color-contrib-3)" : "var(--color-contrib-1)",
            }}
            title={`${WEEKDAYS[i]}: ${formatCount(value)}`}
          />
        ))}
      </div>
      <span className="font-label-meta text-[11px] text-text-muted">
        {peak > 0 ? (
          <>
            Most active on <span className="text-text-primary">{WEEKDAYS_LONG[busiest]}s</span>
          </>
        ) : (
          "No activity yet"
        )}
      </span>
    </div>
  );
}

function Tooltip({
  index,
  leading,
  weeks,
  count,
  date,
}: {
  index: number;
  leading: number;
  weeks: number;
  count: number;
  date: string;
}) {
  const slot = index + leading;
  const col = Math.floor(slot / 7);
  const row = slot % 7;
  // Percent across the grid; clamp so edge tooltips stay inside the card.
  const x = ((col + 0.5) / weeks) * 100;
  const align = x < 12 ? "0%" : x > 88 ? "-100%" : "-50%";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-10 rounded-lg bg-text-primary px-2.5 py-1.5 shadow-lg whitespace-nowrap"
      style={{
        left: `${x}%`,
        // 24px month row + row offset. The scroller clips vertically, so the
        // top two rows flip the tooltip below the cell instead of above.
        top: `calc(24px + ${row < 2 ? row + 1 : row} * (100% - 24px) / 7)`,
        transform: row < 2 ? `translate(${align}, 6px)` : `translate(${align}, calc(-100% - 6px))`,
      }}
    >
      <span className="font-body-sm text-[12px] font-semibold text-surface-card" data-numeric>
        {count === 0 ? "No contributions" : plural(count, "contribution")}
      </span>
      <span className="font-label-meta text-[11px] text-surface-card/70 ml-2">
        {formatDay(date)}
      </span>
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
        className="-my-2 py-3 font-body-sm text-body-sm text-text-primary underline decoration-border-dotted underline-offset-4 hover:decoration-text-primary w-fit"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        View {total} contributions on GitHub
      </a>
    </div>
  );
}
