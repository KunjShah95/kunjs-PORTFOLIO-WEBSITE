"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/motion-client";
import { cn } from "@/lib/cn";

/**
 * The hero artifact: a replay of an agent run being checked step by step
 * against the application's own records.
 *
 * It is the one moving thing on the home page, and it shows the job instead
 * of describing it. The agent's claim sits next to what the database says,
 * and the last step is the one where they disagree. The steps are an
 * illustration, labelled as one; the figure in the footer is the real
 * result from the published Walkcast Lab run.
 *
 * Plays once when it scrolls into view. Reduced motion gets the finished
 * trace with no sequencing.
 */
const steps = [
  { action: 'click "Sign in"', state: "session created", ok: true },
  { action: "open /invoices/new", state: "draft row inserted", ok: true },
  { action: "fill amount ₹48,000", state: "amount saved", ok: true },
  { action: 'report "Invoice sent"', state: "status = draft", ok: false },
] as const;

/** Milliseconds between steps. Slow enough to read, short enough to finish. */
const STEP_MS = 650;

export function AgentTrace({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  // steps.length + 1: the verdict row appears after the last step.
  const total = steps.length + 1;
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const timers = Array.from({ length: total }, (_, i) =>
      window.setTimeout(() => setShown(i + 1), 400 + i * STEP_MS),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduce, run, total]);

  const visible = reduce ? total : shown;
  const done = visible >= total;

  return (
    <div className={cn("relative", className)} ref={ref}>
      {/* The one glow on the page, behind the one artifact. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -inset-y-10 -z-10 rounded-full bg-signal/15 blur-[90px]"
      />
      <figure className="relative overflow-hidden rounded-2xl border border-border-hairline bg-surface-card shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_24px_60px_-28px_var(--color-shadow)]">
        <figcaption className="flex items-center justify-between gap-3 border-b border-border-hairline px-4 py-3">
          <span className="eyebrow text-text-muted whitespace-nowrap">Agent run, checked</span>
          <span className="flex items-center gap-1.5 eyebrow text-text-muted whitespace-nowrap">
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                done ? "bg-signal" : "bg-accent-emerald animate-pulse",
              )}
            />
            {done ? "1 failure caught" : "replaying"}
          </span>
        </figcaption>

        <div className="hidden sm:grid grid-cols-[1fr_1fr] gap-x-4 px-4 pt-3 pb-1 eyebrow text-text-muted">
          <span>Agent claims</span>
          <span>Database says</span>
        </div>

        <ol className="flex flex-col px-2 pb-2 font-mono text-[12.5px] leading-5">
          {steps.map((step, i) => {
            const on = i < visible;
            return (
              <li
                className={cn(
                  "grid grid-cols-1 gap-y-0.5 sm:grid-cols-[1fr_1fr] sm:gap-x-4 rounded-lg px-2 py-2 transition-all duration-500",
                  on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
                  !step.ok && on && "bg-signal/10",
                )}
                key={step.action}
              >
                <span className="flex min-w-0 gap-2 text-text-secondary">
                  <span className="text-text-muted tabular-nums">{i + 1}</span>
                  <span className="truncate">{step.action}</span>
                </span>
                <span
                  className={cn(
                    "flex min-w-0 items-center gap-2 pl-4 sm:pl-0",
                    step.ok ? "text-text-primary" : "text-signal-ink font-medium",
                  )}
                >
                  <Mark ok={step.ok} />
                  <span className="truncate">{step.state}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div
          className={cn(
            "border-t border-border-hairline px-4 py-3.5 transition-all duration-500",
            done ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="font-body-sm text-body-sm text-text-primary">
            <span className="font-medium text-signal-ink">False success at step 4.</span>{" "}
            Pinned to the step that caused it and saved as a regression test.
          </p>
        </div>
      </figure>

      <div className="mt-3 flex items-center justify-between gap-3 px-1 font-body-sm text-[12px] leading-5 text-text-muted">
        <span>
          Illustrative run. In the{" "}
          <Link
            className="link-dots hover:text-text-primary"
            href="/projects/walkcast"
          >
            published Walkcast Lab results
          </Link>
          , 3 of 4 agent success claims were false.
        </span>
        {!reduce && (
          <button
            className="shrink-0 rounded-full px-2 py-1 -my-1 hover:text-text-primary transition-colors disabled:opacity-0"
            disabled={!done}
            onClick={() => {
              setShown(0);
              setRun((r) => r + 1);
            }}
            type="button"
          >
            Replay
          </button>
        )}
      </div>
    </div>
  );
}

function Mark({ ok }: { ok: boolean }) {
  return (
    <svg
      aria-label={ok ? "matches" : "does not match"}
      className="shrink-0"
      fill="none"
      height="13"
      role="img"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 16 16"
      width="13"
    >
      {ok ? <path d="M3 8.5l3.2 3L13 4.5" /> : <path d="M4 4l8 8M12 4l-8 8" />}
    </svg>
  );
}
