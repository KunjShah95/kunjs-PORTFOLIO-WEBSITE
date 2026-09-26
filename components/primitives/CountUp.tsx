'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
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
 * Metric that counts up the first time it scrolls into view. The server
 * renders the final value, so crawlers and no-JS visitors see real numbers.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const parsed = parse(value);

  const format = (n: number) => {
    if (!parsed) return value;
    const body = parsed.grouped
      ? Math.round(n).toLocaleString('en-US')
      : n.toFixed(parsed.decimals);
    return `${parsed.prefix}${body}${parsed.suffix}`;
  };

  useIsoLayoutEffect(() => {
    if (!parsed || reduce || !ref.current) return;
    ref.current.textContent = format(0);
  }, []);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const controls = animate(0, parsed.target, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = format(n);
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
