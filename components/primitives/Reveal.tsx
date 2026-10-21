'use client';

import { motion, useReducedMotion } from "@/lib/motion-client";
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

/*
   A masked, per-word text reveal used to live here. It was removed on
   purpose.

   The per-word clip meant the server HTML shipped the text translated out
   of view, so an unhydrated page showed no heading at all, and a render
   caught mid-animation showed the words sliced through the middle. On the
   home page that was the h1 — the largest text on the site and the string
   most likely to be quoted — and it read as a font rendering test gone
   wrong.

   Use `Reveal` instead: it animates transform only, so the text is present
   and legible in the first paint. If a word-level effect is ever wanted
   again, it has to be built so the server HTML contains the whole heading
   as ordinary text and the motion is layered on top of it after mount.
   */

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
