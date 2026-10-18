"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads Motion's animation features once, for the whole tree.
 *
 * Components use the `m` component (aliased to `motion` in
 * `lib/motion-client.ts`) rather than `motion`. `motion` carries the entire
 * engine - projection/layout tracking, the drag and gesture stacks, the
 * standalone animation runtime - even though this site only animates
 * transforms and opacity. `m` instead reads its renderer from this provider,
 * so the bundle only carries the feature bundle we ask for and nothing else.
 *
 * `domMax` rather than `domAnimation`: the header and bottom-bar pills use
 * `layoutId` to slide between items, and layout/projection animations only
 * exist in the `domMax` bundle. If those pills are ever reworked to position
 * themselves with plain `x`/`width` values, this can drop to `domAnimation`
 * and skip the projection runtime entirely.
 *
 * `strict` makes any component that still reaches for `motion` throw instead
 * of silently pulling the full engine back into the bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
