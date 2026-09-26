import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small secondary label. Sentence case, same family as body text. */
export function SectionLabel({
  children,
  className,
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "secondary" | "primary" | "emerald";
}) {
  const tones = {
    muted: "text-text-muted",
    secondary: "text-text-secondary",
    primary: "text-text-primary",
    emerald: "text-accent-emerald",
  } as const;

  return (
    <span
      className={cn(
        "font-body-sm text-body-sm font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Section header with an optional right-aligned meta slot. */
export function SectionHeader({
  title,
  meta,
  className,
  tone = "muted",
}: {
  title: ReactNode;
  meta?: ReactNode;
  className?: string;
  tone?: "muted" | "secondary" | "primary" | "emerald";
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <SectionLabel tone={tone}>{title}</SectionLabel>
      {meta}
    </div>
  );
}

/** Full-width dotted rule used to separate home-page sections. */
export function DottedDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full my-space-xl border-t border-dotted border-border-dotted",
        className,
      )}
    />
  );
}

/**
 * Labelled rule used on the About page, e.g. `—— 01 / CAREER ——`.
 * Renders as two hairlines with a centered monospace label.
 */
export function LabelledRule({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex items-center justify-between py-2">
      <div className="h-px w-full bg-surface-container-high" />
      <span className="px-3 font-body-sm text-body-sm text-text-muted shrink-0">
        {children}
      </span>
      <div className="h-px w-full bg-surface-container-high" />
    </div>
  );
}

/** Small monospace pill. Used for tech tags and status chips. */
export function Tag({
  children,
  className,
  tone = "subtle",
}: {
  children: ReactNode;
  className?: string;
  tone?: "subtle" | "container" | "pill";
}) {
  const tones = {
    subtle: "bg-surface-container/70 text-text-secondary",
    container: "bg-surface-container text-text-secondary",
    pill: "bg-surface-container/70 text-text-secondary",
  } as const;

  // Sans, not mono: tags are words, not data. Shape is fixed here so every
  // chip on the site matches regardless of what callers pass.
  return (
    <span
      className={cn(
        "inline-flex items-center h-6 px-2 font-body-sm text-[12px] leading-none whitespace-nowrap",
        className,
        "rounded-md",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Small uppercase monospace badge (e.g. `LIVE PRODUCTION`, `ADVISORY • CONTRACT`). */
export function MicroBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-subtle font-label-section text-label-section text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Status dot. Only for real state (availability, live data). Static by
 * default; `ping` adds a soft halo for the one live indicator on a page.
 */
export function StatusDot({
  className,
  ping = false,
}: {
  className?: string;
  ping?: boolean;
}) {
  return (
    <span aria-hidden="true" className="relative inline-flex w-1.5 h-1.5 shrink-0">
      {ping && (
        <span className={cn("absolute inset-0 rounded-full opacity-50 animate-ping", className)} />
      )}
      <span className={cn("relative w-1.5 h-1.5 rounded-full", className)} />
    </span>
  );
}

/** Right-pointing affordance that nudges on hover. */
export function ArrowAffordance({
  className,
  icon = "arrow_forward",
  size = 16,
}: {
  className?: string;
  icon?: "arrow_forward" | "arrow_outward";
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-text-muted shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
        className,
      )}
    >
      <ArrowSvg icon={icon} size={size} />
    </span>
  );
}

function ArrowSvg({
  icon,
  size,
}: {
  icon: "arrow_forward" | "arrow_outward";
  size: number;
}) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
    >
      {icon === "arrow_forward" ? (
        <path d="M4 12h14M12.5 6l6 6-6 6" />
      ) : (
        <path d="M7.5 16.5 16.5 7.5M9.5 7.5h7v7" />
      )}
    </svg>
  );
}
