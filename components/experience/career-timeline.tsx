"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon, type IconName } from "@/components/icon";
import { StatusDot, Tag } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { EASE_OUT, inView, stagger } from "@/lib/motion";
import type { Job } from "@/lib/site-data";

const COMPANY_ICON: Record<string, IconName> = {
  Ideaboat: "architecture",
  PHAZE_AI: "psychology",
  "Open Source": "commit",
};

const item = {
  hidden: { y: 22, x: -6 },
  show: {
    y: 0,
    x: 0,
    transition: { duration: 0.76, ease: EASE_OUT },
  },
};

function TimelineNode({ job, animated }: { job: Job; animated: boolean }) {
  const icon = COMPANY_ICON[job.company] ?? "verified";
  const shell = cn(
    "absolute -left-7 md:-left-9 top-5 w-5 h-5 md:w-7 md:h-7 border border-border-hairline rounded-full bg-surface-card shadow-sm flex items-center justify-center",
    job.live && "border-accent-emerald/45",
  );

  if (!animated) {
    return (
      <span className={shell}>
        <Icon className={job.live ? "text-accent-emerald" : "text-text-muted"} name={icon} size={14} />
      </span>
    );
  }

  return (
    <motion.span className={shell} initial={{ scale: 0.55, y: 10 }} variants={item}>
      <Icon className={job.live ? "text-accent-emerald" : "text-text-muted"} name={icon} size={14} />
      {job.live ? (
        <span className="absolute -top-0.5 -right-0.5">
          <StatusDot className="bg-accent-emerald" ping />
        </span>
      ) : null}
    </motion.span>
  );
}

function SkillTags({ skills, animated }: { skills: readonly string[]; animated: boolean }) {
  if (!animated) {
    return (
      <div className="relative flex flex-wrap gap-1.5 pt-2">
        {skills.map((skill) => (
          <Tag key={skill} tone="container">{skill}</Tag>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="relative flex flex-wrap gap-1.5 pt-2"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.04, delayChildren: 0.14 } },
      }}
    >
      {skills.map((skill) => (
        <motion.span
          key={skill}
          variants={{
            hidden: { y: 10 },
            show: { y: 0, transition: { duration: 0.48, ease: EASE_OUT } },
          }}
        >
          <Tag tone="container">{skill}</Tag>
        </motion.span>
      ))}
    </motion.div>
  );
}

function JobCard({ job, index, animated }: { job: Job; index: number; animated: boolean }) {
  return (
    <div
      className={cn(
        "lift relative bg-surface-card rounded-2xl p-space-md md:p-6 border border-border-hairline space-y-space-xs overflow-hidden",
        "border-l-[3px] border-l-transparent transition-[border-color] duration-500",
        job.live && "border-l-accent-emerald/70",
        animated && "md:group-hover:border-l-accent-emerald/50",
      )}
    >
      {animated ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-emerald/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      ) : null}

      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <span className="flex flex-wrap items-center gap-2 min-w-0">
          <span
            className={cn(
              "font-label-meta text-label-meta uppercase tracking-wide tabular-nums text-text-muted/70 hidden sm:inline",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "font-body-sm text-body-sm",
              job.live ? "text-accent-emerald font-semibold" : "text-text-muted",
            )}
          >
            {job.period}
          </span>
          {job.live ? (
            <span className="inline-flex items-center gap-1.5 font-label-meta text-label-meta uppercase tracking-wide text-accent-emerald">
              <StatusDot className="bg-accent-emerald" ping />
              Active
            </span>
          ) : null}
        </span>
        <Tag tone="subtle">{job.kind}</Tag>
      </div>

      <h3 className="relative font-headline-md text-headline-md text-text-primary">{job.role}</h3>
      <p className="relative font-body-sm text-body-sm text-text-muted">{job.company}</p>
      <p className="relative font-body-sm text-body-sm text-text-secondary pt-1 leading-relaxed">
        {job.description}
      </p>

      <SkillTags animated={animated} skills={job.skills} />
    </div>
  );
}

function JobEntry({ job, index, animated }: { job: Job; index: number; animated: boolean }) {
  const body = (
    <>
      <TimelineNode animated={animated} job={job} />
      <JobCard animated={animated} index={index} job={job} />
    </>
  );

  if (!animated) {
    return (
      <div className="relative group" key={`${job.company}-${job.period}`}>
        {body}
      </div>
    );
  }

  return (
    <motion.article className="group relative" variants={item}>
      {body}
    </motion.article>
  );
}

export function CareerTimeline({ jobs }: { jobs: readonly Job[] }) {
  const reduce = useReducedMotion();
  const active = jobs.filter((j) => j.live).length;
  const animated = !reduce;

  return (
    <div className="flex flex-col gap-6">
      {animated ? (
        <motion.p
          className="font-body-sm text-body-sm text-text-muted max-w-xl"
          initial={{ y: 12 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          viewport={inView}
          whileInView={{ y: 0 }}
        >
          {jobs.length} roles from automation intern to production AI —{" "}
          <span className="text-text-secondary">{active} active now</span>.
        </motion.p>
      ) : (
        <p className="font-body-sm text-body-sm text-text-muted max-w-xl">
          {jobs.length} roles from automation intern to production AI —{" "}
          <span className="text-text-secondary">{active} active now</span>.
        </p>
      )}

      <div className="relative pl-7 md:pl-9">
        <div
          aria-hidden
          className="absolute left-2.5 md:left-3.5 top-3 bottom-3 w-px bg-border-dotted"
        />
        {animated ? (
          <motion.div
            aria-hidden
            className="absolute left-2.5 md:left-3.5 top-3 w-px origin-top bg-gradient-to-b from-accent-emerald/80 via-accent-emerald/25 to-transparent"
            initial={{ scaleY: 0 }}
            style={{ height: "calc(100% - 12px)" }}
            transition={{ duration: 1.15, ease: EASE_OUT }}
            viewport={inView}
            whileInView={{ scaleY: 1 }}
          />
        ) : null}

        {animated ? (
          <motion.div
            className="flex flex-col gap-space-lg"
            initial="hidden"
            variants={stagger(0.14, 0.06)}
            viewport={inView}
            whileInView="show"
          >
            {jobs.map((job, index) => (
              <JobEntry animated index={index} job={job} key={`${job.company}-${job.period}`} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col gap-space-lg">
            {jobs.map((job, index) => (
              <JobEntry
                animated={false}
                index={index}
                job={job}
                key={`${job.company}-${job.period}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
