'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { EASE_OUT, inView } from '@/lib/motion';

/* =========================================================================
   Reveal primitives, the only two entrance animations used site-wide.
   Everything else moves in response to state, not on a timer.
   ========================================================================= */

/**
 * Block entrance. Opt-in per element; most content does not need it.
 *
 * The entrance animates `transform` only — never `opacity`. `opacity: 0`
 * would ship the server HTML invisible, so the element is not painted until
 * React hydrates and the in-view observer fires. That is what the home page's
 * largest text block was doing, and it cost ~1.3s of LCP element render delay
 * against a ~13ms TTFB. A translated element is still painted at its final
 * layout position, so LCP is recorded on the first frame instead of after the
 * animation, and the motion reads the same.
 *
 * It also means a visitor with JavaScript disabled or still-failed sees the
 * content offset by `y` rather than not at all.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as: Tag = 'div',
  "aria-labelledby": labelledBy,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
  /** Names a landmark-ish wrapper (e.g. `as="section"`) after its heading. */
  "aria-labelledby"?: string;
}) {
  const reduce = useReducedMotion();
  const M = Tag === 'div' ? motion.div : (motion as never)[String(Tag)];

  if (reduce) {
    const Plain = Tag;
    return (
      <Plain aria-labelledby={labelledBy} className={className}>
        {children}
      </Plain>
    );
  }

  return (
    <M
      aria-labelledby={labelledBy}
      className={className}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={inView}
      transition={{ duration: 0.72, ease: EASE_OUT, delay }}
    >
      {children}
    </M>
  );
}

/**
 * Masked text reveal — each word rises out of its own overflow clip.
 * Text stays in the DOM as real text, so it remains crawlable and selectable.
 */
export function RevealText({
  text,
  as: Tag = 'h2',
  className,
  wordClassName,
  delay = 0,
  each = 0.035,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  each?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) {
    const Plain = Tag;
    return <Plain className={className}>{text}</Plain>;
  }

  const M = (motion as unknown as Record<string, typeof motion.div>)[String(Tag)] ?? motion.p;

  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{ hidden: {}, show: { transition: { staggerChildren: each, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span className="mask" key={`${word}-${i}`} aria-hidden={false}>
          <motion.span
            className={wordClassName}
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 0.78, ease: EASE_OUT } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/** Hairline that draws itself. Used to close a section, never mid-flow. */
export function DrawRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} />;

  return (
    <motion.div
      className={className}
      style={{ originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={inView}
      transition={{ duration: 1.1, ease: EASE_OUT, delay }}
    />
  );
}
