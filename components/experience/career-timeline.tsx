"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "@/lib/motion-client";
import { Icon, type IconName } from "@/components/icon";
import { StatusDot, Tag } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import type { Job } from "@/lib/site-data";

const COMPANY_ICON: Record<string, IconName> = {
  Ideaboat: "architecture",
  PHAZE_AI: "psychology",
  "Open Source": "commit",
};

/**
 * Horizontal centre of the node column, as a distance from the timeline's left
 * edge. Mobile runs a 1.5rem node column at the very start of the grid; from
 * `lg` the 9rem meta column and 1.5rem gap shift the node column to 180px.
 * The beam is absolutely positioned rather than living in a grid cell, so this
 * offset has to be declared explicitly and kept in step with the grid below.
 */
const BEAM_LEFT = "left-[11.5px] lg:left-[180px]";

/** Rise only — never `opacity`, so the server HTML paints at final position. */
const enter = (delay = 0) => ({
  initial: { y: 18 },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
  whileInView: { y: 0 },
  viewport: { once: true, margin: "-14% 0px -22% 0px" },
});

/* -------------------------------------------------------------------------- */
/*                              duration parsing                              */
/* -------------------------------------------------------------------------- */

const MONTH_INDEX: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/** Parses `Jul 2026` or a bare `2025` into a comparable year/month pair. */
function parsePoint(raw: string): { year: number; month: number } | null {
  const parts = raw.trim().split(/\s+/);
  if (parts.length === 1) {
    const year = Number(parts[0]);
    return Number.isFinite(year) ? { year, month: 0 } : null;
  }
  const month = MONTH_INDEX[parts[0].slice(0, 3).toLowerCase()];
  const year = Number(parts[1]);
  return month === undefined || !Number.isFinite(year) ? null : { year, month };
}

/**
 * `"Dec 2025 - Feb 2026"` becomes `"3 mo"`.
 *
 * Open-ended periods (`Present`, `Now`) deliberately have no length: computing
 * one against the current date would make the server and client renders
 * disagree, and a duration that silently grows every month reads as a bug.
 */
export function spanLabel(period: string): string | null {
  if (/\b(present|now|current|ongoing)\b/i.test(period)) return null;

  const [rawStart, rawEnd] = period.split(/\s*[-–—]\s*/);
  const start = rawStart ? parsePoint(rawStart) : null;
  const end = rawEnd ? parsePoint(rawEnd) : null;
  if (!start || !end) return null;

  // Inclusive of both endpoints: a Dec→Feb internship is three months.
  const months = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (months <= 0) return null;

  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (!years) return `${rest} mo`;
  if (!rest) return years === 1 ? "1 yr" : `${years} yrs`;
  return `${years} yr ${rest} mo`;
}

/* -------------------------------------------------------------------------- */
/*                                   beam                                     */
/* -------------------------------------------------------------------------- */

/**
 * The scroll-linked spine: a static dotted track with an emerald beam laid over
 * it, scaled to reading progress through the timeline, and a glow head riding
 * the beam's tip. The previous version drew the beam once on entry and left it
 * there, which said "animated" without ever relating the line to scroll.
 */
function Beam({ animated }: { animated: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.55"],
  });

  // Spring smoothing, not a raw scroll read — a beam that ticks with every
  // scroll delta looks like a progress bar, not a physical line.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
  });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  const headTop = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  return (
    <div aria-hidden className={cn("absolute top-0 bottom-0 w-px", BEAM_LEFT)} ref={ref}>
      <div className="h-full w-full bg-border-dotted" />

      {animated ? (
        <>
          <motion.div
            className="absolute inset-0 origin-top bg-gradient-to-b from-accent-emerald/85 via-accent-emerald/30 to-accent-emerald/5"
            style={{ scaleY }}
          />
          {/* The ring masks the beam where it passes through the head, so it has
              to match the page ground it floats over — `surface`, not the
              light-theme `surface-canvas`, which showed as a bright disc in dark. */}
          <motion.div
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-emerald shadow-[0_0_0_3px_var(--color-surface)]"
            style={{ top: headTop }}
          />
        </>
      ) : (
        <div className="h-full w-full bg-gradient-to-b from-accent-emerald/70 to-transparent" />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   node                                     */
/* -------------------------------------------------------------------------- */

function TimelineNode({ job, animated }: { job: Job; animated: boolean }) {
  const icon = COMPANY_ICON[job.company] ?? "verified";

  // Active roles get a solid emerald node; completed ones stay hollow and
  // muted. The previous build tinted every card's left border emerald on
  // hover, which marked finished roles as if they were still running.
  const shell = cn(
    "relative z-10 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-500",
    job.live
      ? "border-accent-emerald/50 bg-accent-emerald/10"
      : "border-border-dotted bg-surface-card",
  );

  const glyph = (
    <Icon
      className={job.live ? "text-accent-emerald" : "text-text-muted"}
      name={icon}
      size={13}
    />
  );

  if (!animated) {
    return <span className={shell}>{glyph}</span>;
  }

  return (
    <motion.span
      className={shell}
      initial={{ scale: 0.6 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
      viewport={{ once: true, margin: "-14% 0px -22% 0px" }}
      whileInView={{ scale: 1 }}
    >
      {glyph}
      {job.live ? (
        <span className="absolute -right-0.5 -top-0.5">
          <StatusDot className="bg-accent-emerald" ping />
        </span>
      ) : null}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*                              cursor spotlight                              */
/* -------------------------------------------------------------------------- */

/**
 * A faint emerald wash that tracks the pointer inside a card. Opt-in on hover
 * only — on touch there is no pointer to track, so the layer is skipped rather
 * than left sitting at the default position.
 */
function Spotlight({ animated }: { animated: boolean }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, var(--color-accent-emerald), transparent 68%)`;

  const track = (event: ReactPointerEvent<HTMLElement>) => {
    if (!animated || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - box.left);
    y.set(event.clientY - box.top);
  };

  if (!animated) return null;

  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07] focus-within:opacity-[0.07]"
      onPointerMove={track}
      style={{ background }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                   tags                                     */
/* -------------------------------------------------------------------------- */

function SkillTags({ skills, animated }: { skills: readonly string[]; animated: boolean }) {
  if (!animated) {
    return (
      <div className="relative flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <Tag key={skill} tone="container">
            {skill}
          </Tag>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="relative flex flex-wrap gap-1.5"
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.16 } } }}
      viewport={{ once: true, margin: "-14% 0px -22% 0px" }}
      whileInView="show"
    >
      {skills.map((skill) => (
        <motion.span
          key={skill}
          variants={{
            hidden: { y: 8 },
            show: { y: 0, transition: { duration: 0.46, ease: EASE_OUT } },
          }}
        >
          <Tag tone="container">{skill}</Tag>
        </motion.span>
      ))}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  entries                                   */
/* -------------------------------------------------------------------------- */

function JobCard({ job, animated }: { job: Job; animated: boolean }) {
  return (
    <motion.article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border-hairline bg-surface-card p-5 md:p-6",
        "transition-colors duration-500 hover:border-outline-variant",
        job.live && "border-l-2 border-l-accent-emerald/70",
      )}
      {...enter(0.05)}
    >
      <Spotlight animated={animated} />

      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <Tag tone="subtle">{job.kind}</Tag>
        {job.live ? (
          <span className="inline-flex items-center gap-1.5 font-label-meta text-label-meta uppercase tracking-wide text-accent-emerald-ink">
            <StatusDot className="bg-accent-emerald" ping />
            Active
          </span>
        ) : null}
      </div>

      <h3 className="relative mt-3 font-headline-md text-headline-md text-text-primary">
        {job.role}
      </h3>

      <p className="relative mt-0.5 inline-flex items-center gap-1.5 font-body-sm text-body-sm font-medium text-text-secondary">
        {job.company}
      </p>

      <p className="relative mt-2.5 font-body-sm text-body-sm leading-relaxed text-text-secondary">
        {job.description}
      </p>

      <div className="relative mt-4">
        <SkillTags animated={animated} skills={job.skills} />
      </div>
    </motion.article>
  );
}

function JobEntry({
  job,
  index,
  total,
  animated,
}: {
  job: Job;
  index: number;
  total: number;
  animated: boolean;
}) {
  const span = spanLabel(job.period);
  const open = span === null;

  return (
    <li className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 lg:grid-cols-[9rem_1.5rem_minmax(0,1fr)] lg:gap-x-6">
      {/* Meta rail: the period lives out here now rather than inside the card,
          which is what makes this a timeline instead of a stack of cards. */}
      <div className="col-span-2 mb-3 flex items-baseline gap-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:mb-0 lg:flex-col lg:items-end lg:gap-0.5 lg:pt-5 lg:text-right">
        <span className="font-label-meta text-label-meta tabular-nums text-text-secondary">
          {job.period}
        </span>
        {span || open ? (
          <span className="font-label-meta text-label-meta uppercase tracking-wide text-text-muted">
            {span ?? "Ongoing"}
          </span>
        ) : null}
      </div>

      {/* Node column. */}
      <div className="relative col-start-1 row-start-2 lg:col-start-2 lg:row-start-1">
        <span className="absolute left-1/2 top-6">
          <TimelineNode animated={animated} job={job} />
        </span>
      </div>

      {/* Card column. */}
      <div className="col-start-2 row-start-2 min-w-0 lg:col-start-3 lg:row-start-1">
        <JobCard animated={animated} job={job} />
      </div>

      <span className="sr-only">
        {`Entry ${index + 1} of ${total}.`}
      </span>
    </li>
  );
}

/* -------------------------------------------------------------------------- */

export function CareerTimeline({ jobs }: { jobs: readonly Job[] }) {
  const reduce = useReducedMotion();
  const animated = !reduce;
  const active = jobs.filter((j) => j.live).length;

  return (
    <div className="flex flex-col gap-6">
      <motion.p
        className="max-w-xl font-body-sm text-body-sm text-text-muted"
        {...enter()}
      >
        {jobs.length} roles from automation intern to production AI —{" "}
        <span className="text-text-secondary">{active} active now</span>.
      </motion.p>

      <div className="relative">
        <Beam animated={animated} />

        <ol className="relative flex flex-col gap-8 lg:gap-10">
          {jobs.map((job, index) => (
            <JobEntry
              animated={animated}
              index={index}
              job={job}
              key={`${job.company}-${job.period}`}
              total={jobs.length}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}