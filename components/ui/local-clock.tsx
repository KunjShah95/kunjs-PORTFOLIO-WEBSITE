"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Live local time in the site owner's timezone.
 *
 * A small human signal — the same trick ramx.in, psudokit.in and adityalogs.xyz
 * use — and it also confirms the viewer is looking at a rendered page rather
 * than a build artefact.
 *
 * The clock only starts after mount, because rendering a server-computed time
 * would either mismatch on the client or freeze at build time. Until then the
 * timezone label is shown alone, which is stable across both renders.
 */
export function LocalClock({
  timeZone = "Asia/Kolkata",
  label = "Ahmedabad",
  className,
}: {
  timeZone?: string;
  label?: string;
  className?: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    function tick() {
      setTime(format.format(new Date()));
    }

    tick();

    // Align the first re-tick to the minute boundary, then run on the minute.
    // A plain 60s interval started at mount drifts by up to a second per tick.
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span>{label}</span>
      {time && (
        <>
          <span aria-hidden="true" className="opacity-40">
            &middot;
          </span>
          <time className="tabular-nums" data-numeric suppressHydrationWarning>
            {time}
          </time>
        </>
      )}
      <span className="sr-only">local time, updates every minute</span>
    </span>
  );
}
