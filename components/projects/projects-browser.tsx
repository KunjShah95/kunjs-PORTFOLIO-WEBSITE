"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/icon";
import { DemoVideo } from "@/components/projects/demo-video";
import { EmptyState } from "@/components/ui/empty-state";
import { Tag } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { projectCategories, projects } from "@/lib/site-data";

/** Map a project's category onto a filter bucket. */
function buckets(project: (typeof projects)[number]): string[] {
  const { category, stack } = project;
  const tags: string[] = [];
  const c = category.toLowerCase();
  if (c.includes("agent")) tags.push("agents");
  if (c.includes("vision")) tags.push("vision");
  if (c.includes("full stack") || c.includes("career")) tags.push("fullstack");
  if (c.includes("ml") || c.includes("fairness") || c.includes("core"))
    tags.push("ml");
  if (stack.some((s) => /YOLO|OpenCV|CUDA|TensorRT/i.test(s))) tags.push("vision");
  if (stack.some((s) => /LangGraph|CrewAI|LangChain/i.test(s))) tags.push("agents");
  if (stack.some((s) => /React|Next\.js|FastAPI/i.test(s))) tags.push("fullstack");
  return tags;
}

/**
 * Filterable project archive. Category pills filter the grid, and each card
 * expands a detail panel with the build's challenges and lessons.
 */
export function ProjectsBrowser() {
  const [category, setCategory] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      category === "all"
        ? projects
        : projects.filter((p) => buckets(p).includes(category)),
    [category],
  );

  return (
    <>
      <div
        aria-label="Filter projects"
        className="scroll-fade flex items-center gap-1.5 lg:gap-1 overflow-x-auto py-1 -mx-5 px-5 lg:mx-0 lg:px-1 lg:w-fit lg:rounded-full lg:bg-surface-card lg:border lg:border-border-hairline no-scrollbar"
        role="group"
      >
        {projectCategories.map((cat) => {
          const active = cat.id === category;
          const count =
            cat.id === "all"
              ? projects.length
              : projects.filter((p) => buckets(p).includes(cat.id)).length;
          return (
            <button
              aria-pressed={active}
              className={cn(
                "relative h-11 lg:h-8 px-4 lg:px-3.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-colors duration-200 active:scale-[0.97]",
                active
                  ? "text-on-primary"
                  : "bg-surface-container md:bg-transparent text-text-secondary hover:text-text-primary",
              )}
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              type="button"
            >
              {active && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-primary"
                  layoutId="project-filter"
                  transition={reduce ? { duration: 0 } : SPRING}
                />
              )}
              <span className="relative">
                {cat.label}{" "}
                <span className={active ? "opacity-60" : "text-text-muted"}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.section
        className="grid grid-cols-[minmax(0,1fr)] gap-3 md:gap-4 lg:grid-cols-2 pt-space-lg"
        layout={!reduce}
      >
        <AnimatePresence initial={false} mode="popLayout">
        {visible.map((project) => {
          const isOpen = expanded === project.slug;
          return (
            <motion.article
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col h-full bg-surface-card rounded-2xl p-6 md:p-7 border border-border-hairline hover:border-outline-variant transition-colors duration-300"
              exit={{ opacity: 0, scale: 0.97 }}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              key={project.slug}
              layout={reduce ? false : "position"}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              {project.video && (
                <DemoVideo className="mb-5" src={project.video} title={project.title} />
              )}
              <p className="font-body-sm text-body-sm text-text-muted">
                {project.category}
                <span className="mx-1.5 text-border-dotted">/</span>
                {project.status}
              </p>
              <h2 className="mt-1.5 font-headline-lg text-headline-lg text-text-primary tracking-tight">
                {project.title}
              </h2>

              <dl className="grid grid-cols-3 gap-x-3 gap-y-4 my-5 py-4 border-y border-border-hairline">
                {project.metrics.map((metric) => (
                  <div className="flex flex-col-reverse gap-0.5 min-w-0" key={metric.label}>
                    {/* Labels wrap rather than truncate: at 390px a three-column
                        row leaves ~100px per cell, and a clipped label like
                        "Tenant Isolati…" says less than the full phrase. */}
                    <dt className="font-body-sm text-body-sm text-text-muted text-pretty hyphens-auto">{metric.label}</dt>
                    <dd
                      className={cn(
                        "font-headline-lg text-headline-lg tracking-tight truncate",
                        metric.accent ? "text-accent-emerald" : "text-text-primary",
                      )}
                      data-numeric
                    >
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="font-body-md text-body-md text-text-secondary">
                {project.body}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              <div className="flex items-center gap-1 mt-auto -ml-2 flex-wrap">
                {project.demo && (
                  <a
                    className="group/btn inline-flex items-center gap-1 h-11 px-2 rounded-full font-body-sm text-body-sm font-semibold text-text-primary hover:bg-surface-container active:scale-[0.97] transition-all"
                    href={project.demo}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Live demo
                    <Icon className="transition-transform duration-300 group-hover/btn:-translate-y-px group-hover/btn:translate-x-px" name="arrow_outward" size={15} />
                  </a>
                )}
                {project.github && (
                  <a
                    className="group/btn inline-flex items-center gap-1 h-11 px-2 rounded-full font-body-sm text-body-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-container active:scale-[0.97] transition-all"
                    href={project.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Source
                    <Icon className="transition-transform duration-300 group-hover/btn:-translate-y-px group-hover/btn:translate-x-px" name="arrow_outward" size={15} />
                  </a>
                )}
                <button
                  aria-expanded={isOpen}
                  className="inline-flex items-center gap-1 h-11 px-2 ml-auto rounded-full font-body-sm text-body-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-container active:scale-[0.97] transition-all"
                  onClick={() => setExpanded(isOpen ? null : project.slug)}
                  type="button"
                >
                  {isOpen ? "Hide notes" : "Build notes"}
                  <span className={cn("transition-transform duration-300", isOpen && "rotate-180")}>
                    <Icon name="expand_more" size={16} />
                  </span>
                </button>
              </div>

              <AnimatePresence initial={false}>
              {isOpen && (
              <motion.div
                animate={{ height: "auto", opacity: 1 }}
                className="overflow-hidden"
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: EASE_OUT }}
              >
              <div className="flex flex-col gap-3 mt-3 bg-surface-container-low p-4 rounded-xl">
                {project.challenges && (
                  <div>
                    <span className="font-body-sm text-body-sm text-text-primary">
                      Challenges
                    </span>
                    <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                      {project.challenges}
                    </p>
                  </div>
                )}
                {project.lessons && (
                  <div>
                    <span className="font-body-sm text-body-sm text-text-primary">
                      What I Learned
                    </span>
                    <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                      {project.lessons}
                    </p>
                  </div>
                )}
                {!project.challenges && !project.lessons && (
                  <p className="font-body-sm text-body-sm text-text-secondary">
                    {project.summary}
                  </p>
                )}
              </div>
              </motion.div>
              )}
              </AnimatePresence>
            </motion.article>
          );
        })}
        </AnimatePresence>

        {visible.length === 0 && (
          <EmptyState
            action={
              <button
                className="h-10 px-4 rounded-full bg-primary text-on-primary font-body-sm text-body-sm font-medium hover:bg-primary-container active:scale-[0.98] transition-all"
                onClick={() => setCategory("all")}
                type="button"
              >
                Show all {projects.length} projects
              </button>
            }
            body="Nothing is filed under this category yet. The full archive has everything else."
            className="lg:col-span-2"
            title="No projects here yet."
          />
        )}
      </motion.section>
    </>
  );
}

/** Small live-status strip reused by the projects header. */
export function ShippedStatus() {
  return (
    <span className="font-body-sm text-body-sm text-text-muted">
      {projects.length} systems shipped
    </span>
  );
}

/** Link to a project's source repo, used in compact index rows. */
export function ProjectSourceLink({ href }: { href: string }) {
  return (
    <Link
      aria-label="View source"
      className="text-text-muted hover:text-text-primary transition-colors"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon name="arrow_outward" size={14} />
    </Link>
  );
}
