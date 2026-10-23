"use client";

import { motion, useReducedMotion } from "@/lib/motion-client";
import { EASE_IN_OUT } from "@/lib/motion";
import { site } from "@/lib/site-data";
import { cn } from "@/lib/cn";

/**
 * One continuous stroke, so the pen can draw it in a single pass. Two paths
 * would need sequencing and still read as "assembled". Swap this for a traced
 * scan of the real signature: keep it one path, stroked, never filled.
 */
const STROKE =
  "M30 18C26 34 22 52 18 72C19 62 20 54 23 47C32 38 42 30 52 22C44 32 34 40 27 46C34 54 42 62 50 70" +
  "C55 73 59 61 62 50C60 61 62 71 70 70C76 68 80 58 82 50C80 60 80 70 88 70" +
  "C91 70 93 60 94 50C94 57 94 64 94 70C96 58 100 48 106 49C111 50 110 62 113 70" +
  "C118 72 122 61 124 50C124 63 124 79 118 86C112 91 105 84 112 78C122 70 144 62 176 58";

/** Footer sign-off: the name written out, drawn once when it scrolls in. */
export function Signature({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-label={`Signed, ${site.name}`}
      className={cn("h-14 w-[115px] self-start overflow-visible", className)}
      fill="none"
      role="img"
      viewBox="10 10 172 84"
    >
      <motion.path
        d={STROKE}
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.25}
        transition={{
          pathLength: { duration: 2.2, ease: EASE_IN_OUT },
          opacity: { duration: 0.2 },
        }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        whileInView={{ pathLength: 1, opacity: 1 }}
      />
      {/* The j's dot lands last, like a real pen lifting off. */}
      <motion.circle
        cx={127}
        cy={36}
        fill="currentColor"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        r={2}
        transition={{ delay: reduce ? 0 : 2.15, type: "spring", stiffness: 500, damping: 18 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        whileInView={{ scale: 1, opacity: 1 }}
      />
    </svg>
  );
}
