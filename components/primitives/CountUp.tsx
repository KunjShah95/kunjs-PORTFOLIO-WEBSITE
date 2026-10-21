'use client';

import { animate, useInView, useReducedMotion } from "@/lib/motion-client";
import { useEffect, useLayoutEffect, useRef } from 'react';
import { EASE_OUT } from '@/lib/motion';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Splits "2,000+" → ["", 2000, "+"], "98.7%" → ["", 98.7, "%"], "<100ms" → ["<", 100, "ms"]. */
function parse(value: string) {
  const match = value.match(/^([^\d]*)(\d[\d,]*\.?\d*)(.*)$/);
  if (!match) return null;
  const [, prefix, raw, suffix] = match;
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
  return { prefix, target: Number(raw.replace(/,/g, '')), suffix, decimals, grouped: raw.includes(',') };
}

/**
 * The viewport inset the count-up triggers at, as a rootMargin.
 *
 * `-10% 0px` is two values, so it is 10% on the top and bottom edges and
 * 0% on the left and right. The percentage is of the viewport height, so the
 * trigger band runs from 10% down to 90% of the window.
 */
const TRIGGER_MARGIN = '-10% 0px';
const TRIGGER_INSET = 0.1;

/**
 * True when the element is already inside the trigger band.
 *
 * This has to agree with `useInView` exactly. The count-up zeroes the
 * number before it animates, so if the zeroing and the trigger disagree,
 * the metric sits on "0+" until something happens to it — which is a wrong
 * number, not a missing animation.
 */
function insideBand(element: Element): boolean {
  const box = element.getBoundingClientRect();
  const height = window.innerHeight;
  return box.top < height * (1 - TRIGGER_INSET) && box.bottom > height * TRIGGER_INSET;
}

/**
 * Metric that counts up the first time it scrolls into view. The server
 * renders the final value, so crawlers and no-JS visitors see real numbers.
 *
 * The number is only ever zeroed at the moment the count-up is about to
 * run. Zeroing it on mount — the obvious way to set up a count-up — means a
 * metric sitting just below the fold renders "0+ Systems shipped" and stays
 * there until the visitor scrolls far enough to trigger it.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: TRIGGER_MARGIN });
  const reduce = useReducedMotion();
  const parsed = parse(value);

  const format = (n: number) => {
    if (!parsed) return value;
    const body = parsed.grouped
      ? Math.round(n).toLocaleString('en-US')
      : n.toFixed(parsed.decimals);
    return `${parsed.prefix}${body}${parsed.suffix}`;
  };

  // Zero the number only when the count-up is about to start, so the swap
  // to the counting state is not visible and the animation picks up from zero.
  useIsoLayoutEffect(() => {
    if (!parsed || reduce || !ref.current) return;
    if (insideBand(ref.current)) ref.current.textContent = format(0);
  }, []);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const controls = animate(0, parsed.target, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = format(n);
      },
      // Land on the exact target: the animation's last frame can land a
      // rounding step short of it ("16+" for a target of 17).
      onComplete: () => {
        if (ref.current) ref.current.textContent = format(parsed.target);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span className={className} data-numeric ref={ref}>
      {value}
    </span>
  );
}
