"use client";

import { useLinkStatus } from "next/link";
import { cn } from "@/lib/cn";

/**
 * Must render inside a <Link>. While that link's navigation is in flight it
 * shows a small pulsing bar, so a tap on a slow connection is acknowledged
 * immediately instead of feeling ignored. The 120ms delay keeps it hidden
 * for instant (prefetched) navigations.
 */
export function LinkPending({ className }: { className?: string }) {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-current transition-opacity duration-200",
        pending ? "opacity-60 animate-pulse delay-[120ms]" : "opacity-0",
        className,
      )}
    />
  );
}
