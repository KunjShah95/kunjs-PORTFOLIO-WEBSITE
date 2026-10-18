"use client";

import { motion, useReducedMotion } from "@/lib/motion-client";
import { cn } from "@/lib/cn";
import { SPRING } from "@/lib/motion";
import { type RefObject, useCallback, useLayoutEffect, useState } from "react";

type Rect = { x: number; y: number; width: number; height: number };

/**
 * The rounded highlight that sits behind the current item in a nav strip,
 * gliding to a new item when the current one changes.
 *
 * This used to be a `layoutId` pill rendered inside each item, so the
 * projection engine measured and cross-faded between items for us. That engine
 * is the expensive half of Motion's layout features, and it is only here to
 * move one rectangle, so this measures the target item itself and animates
 * `x`/`y`/`width`/`height` directly. The animation is identical; the bundle is
 * far smaller, because `domAnimation` carries no projection runtime.
 *
 * Items opt in with `data-nav-href={href}`, which is what the pill looks up
 * inside `containerRef`. The pill stays mounted and springs between rects,
 * which is what produced the previous cross-item glide.
 */
export function ActiveItemPill({
  className,
  containerRef,
  insetX = 0,
  targetHref,
}: {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  /** Horizontal inset to apply inside the target item, in px. */
  insetX?: number;
  /** `href` of the item the pill should sit behind, or null for none. */
  targetHref: string | null;
}) {
  const reduce = useReducedMotion();
  const [rect, setRect] = useState<Rect | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container || !targetHref) {
      setRect(null);
      return;
    }
    const target = container.querySelector<HTMLElement>(
      `[data-nav-href="${CSS.escape(targetHref)}"]`
    );
    if (!target) {
      setRect(null);
      return;
    }
    const c = container.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    // A zero-size container means the strip is hidden at this breakpoint, so
    // there is nothing to position against.
    if (!c.width || !t.width) {
      setRect(null);
      return;
    }
    setRect({
      // `scrollLeft`/`scrollTop` matter because both nav strips and the filter
      // rails scroll horizontally on narrow screens; without them the pill
      // would drift as soon as the rail was scrolled.
      x: t.left - c.left + insetX + container.scrollLeft,
      y: t.top - c.top + container.scrollTop,
      width: Math.max(0, t.width - insetX * 2),
      height: t.height,
    });
  }, [containerRef, targetHref, insetX]);

  // Re-measure whenever the target changes, and again once webfonts land,
  // because a narrower fallback font moves every item.
  useLayoutEffect(() => {
    measure();
    if (!targetHref) return;
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [measure, targetHref]);

  // Item widths change on resize and when the header/menu swaps breakpoint.
  useLayoutEffect(() => {
    if (!targetHref) return;
    const container = containerRef.current;
    const target = container?.querySelector<HTMLElement>(
      `[data-nav-href="${CSS.escape(targetHref)}"]`
    );
    const observer = new ResizeObserver(measure);
    if (container) observer.observe(container);
    if (target) observer.observe(target);
    window.addEventListener("resize", measure);
    // Rails scroll sideways on narrow screens, so re-place the pill as they do.
    container?.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      container?.removeEventListener("scroll", measure);
    };
  }, [measure, targetHref, containerRef]);

  if (!rect) return null;

  return (
    <motion.span
      animate={{ x: rect.x, y: rect.y, width: rect.width, height: rect.height }}
      aria-hidden="true"
      className={cn("absolute left-0 top-0", className)}
      // The first measured rect is the resting state, not a transition in.
      initial={false}
      transition={reduce ? { duration: 0 } : SPRING}
    />
  );
}
