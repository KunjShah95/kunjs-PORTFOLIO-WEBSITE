"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * One delegated listener for every `data-track` element, so server
 * components can mark a link as a conversion without becoming client
 * components themselves.
 *
 *   <a data-track="Resume Clicked" data-track-from="hero" href="/kunjshah_cv.pdf">
 *
 * `data-track` is the event name; `data-track-from` says which placement
 * fired it, so hero and footer clicks can be compared. Renders nothing.
 */
export function ClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>("[data-track]");
      const name = el?.dataset.track;
      if (!name) return;
      const from = el.dataset.trackFrom;
      track(name, from ? { from } : undefined);
    }

    // Capture phase: runs before a navigation can unload the page.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
