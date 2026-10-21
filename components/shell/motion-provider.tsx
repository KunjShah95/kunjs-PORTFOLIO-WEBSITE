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
 * `domAnimation` rather than `domMax`: `domMax` adds the projection runtime,
 * which exists to animate layout and shared-element transitions. The site has
 * none left - every pill that used a `layoutId` now measures its target and
 * animates `x`/`width` directly (see `components/primitives/ActiveItemPill.tsx`)
 * - so loading projection would be paying for an engine nothing calls.
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
