'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from "@/lib/motion-client";
import { EASE_OUT } from '@/lib/motion';

/**
 * Set after the first page has mounted. Lives at module scope, so it survives
 * client-side navigations but is fresh on every full page load.
 */
let hasMounted = false;

/**
 * Re-mounts on every navigation, so each route settles in with the same
 * short fade-and-rise. Kept deliberately small: it should read as continuity,
 * not as a transition.
 *
 * Only client-side navigations animate. The first page of a visit renders
 * with no initial state at all, so the server HTML is visible on the first
 * frame. This used to start every page at `opacity: 0`, which shipped the
 * whole body invisible until ~280 KB of JavaScript had downloaded and
 * hydrated: on a mid-range phone over 4G the header painted at 1.3s and the
 * content not until ~3.5s. Same lesson as `Reveal`: never put `opacity: 0` in
 * server-rendered markup.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  // Read once per mount: false on the server and during hydration of the
  // first page (so both render identically), true for every later route.
  const [animate] = useState(() => hasMounted);

  useEffect(() => {
    hasMounted = true;
  }, []);

  if (reduce || !animate) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
