"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { Icon } from "@/components/icon";
import { buttonStyles } from "@/components/ui/blocks";
import { cn } from "@/lib/cn";
import { subscribeToNotes } from "@/app/writing/actions";
import { initialSubscribeState } from "@/app/writing/subscribe-state";

/**
 * The one thing the writing pages were missing: somewhere for a reader who is
 * not ready to hire to stay in touch. It asks for one field and promises one
 * thing, because a bigger ask here would cost more signups than it collects.
 */
const inputBase =
  "w-full h-12 px-4 rounded-full bg-surface text-text-primary font-body-sm text-body-sm placeholder:text-text-muted border border-border-hairline focus:outline-hidden focus:border-text-primary/25 focus:ring-4 focus:ring-text-primary/5 transition-[border-color,box-shadow] duration-200 aria-invalid:border-error/60";

export function EmailCapture({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(
    subscribeToNotes,
    initialSubscribeState,
  );
  /** Timestamp the field first rendered, for the minimum-fill-time guard. */
  const [renderedAt] = useState(() => Date.now());
  const headingId = useId();
  const reported = useRef<typeof state | null>(null);

  /** Record a completed signup once per server response. */
  useEffect(() => {
    if (state === reported.current) return;
    reported.current = state;
    if (state.status === "success") track("Email Capture Submitted");
  }, [state]);

  const done = state.status === "success";

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "rounded-3xl border border-border-hairline bg-surface-card p-6 md:p-10",
        className,
      )}
    >
      <div className="grid gap-6 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6 flex flex-col gap-2">
          <span className="eyebrow text-text-muted">Field notes</span>
          <h2
            className="text-[1.625rem] md:text-[1.875rem] leading-tight font-semibold tracking-[-0.03em] text-text-primary"
            id={headingId}
          >
            One email when something worth reading ships.
          </h2>
          <p className="font-body-sm text-body-sm text-text-secondary max-w-[44ch]">
            No schedule, no drip, no pitch. Reply &ldquo;stop&rdquo; and you are
            out; the address is never shared.
          </p>
        </div>

        <div className="md:col-span-6">
          {done ? (
            <p className="flex items-start gap-2.5 font-body-md text-body-md text-text-primary">
              <span className="mt-[2px] shrink-0 text-signal-ink">
                <Icon name="check_circle" size={18} />
              </span>
              {state.message}
            </p>
          ) : (
            <form action={formAction} className="flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <label className="sr-only" htmlFor={`${headingId}-email`}>
                  Email address
                </label>
                <input
                  aria-describedby={`${headingId}-status`}
                  aria-invalid={state.status === "error"}
                  autoComplete="email"
                  className={inputBase}
                  id={`${headingId}-email`}
                  inputMode="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  type="email"
                />
                <button
                  className={cn(buttonStyles.primary, "h-12 px-5 shrink-0")}
                  data-track="Email Capture Clicked"
                  disabled={pending}
                  type="submit"
                >
                  {pending ? "Adding…" : "Notify me"}
                </button>
              </div>
              {/* Honeypot and the render clock, both invisible to a person. */}
              <input
                aria-hidden="true"
                autoComplete="off"
                className="hidden"
                name="website"
                tabIndex={-1}
              />
              <input name="rendered_at" type="hidden" value={renderedAt} />
              <p
                aria-live="polite"
                className={cn(
                  "min-h-5 font-body-sm text-body-sm",
                  state.status === "error" ? "text-error" : "text-text-muted",
                )}
                id={`${headingId}-status`}
                role="status"
              >
                {state.message || "Unsubscribe from any email. Never sold or shared."}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
