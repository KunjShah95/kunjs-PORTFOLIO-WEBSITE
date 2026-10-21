"use client";

import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Per-page engagement, reported once when the visitor leaves the page.
 *
 * Pageviews are the vanity layer. This is the layer under it: what a visitor
 * did before they left, and how long it took. A bounce is only a failure when
 * the visitor left because they could not find the proof fast enough — so the
 * exit event carries time, scroll depth, and whether they actually opened a
 * proof link (resume, GitHub) or a contact CTA.
 *
 *   proof=resume, time=0-10s, depth=0-25%  → found the CV and left. Worked.
 *   proof=none,   time=0-10s, depth=0-25%  → left before finding anything. Failed.
 *
 * One event per page view, bucketed rather than raw, so the dashboard stays a
 * small table instead of a scatter plot.
 */

/** Links that satisfy "show me the proof". */
const PROOF_EVENTS = new Set([
  "Resume Clicked",
  "GitHub Clicked",
  "Project Source Opened",
]);

/** Links that signal "I want to talk to this person". */
const CONTACT_EVENTS = new Set([
  "Contact CTA Clicked",
  "Engagement CTA Clicked",
]);

type Session = {
  path: string;
  startedAt: number;
  /** Furthest scroll position, as a percentage of the scrollable height. */
  depth: number;
  /** Proof links actually opened, not just seen. */
  proof: Set<string>;
  /** Whether a contact CTA was clicked. */
  contact: boolean;
  /** Guards against the same page view being reported twice. */
  sent: boolean;
};

function newSession(path: string): Session {
  return {
    path,
    startedAt: Date.now(),
    depth: 0,
    proof: new Set(),
    contact: false,
    sent: false,
  };
}

/** One row per bucket, not one row per second. */
function timeBucket(seconds: number): string {
  if (seconds < 10) return "0-10s";
  if (seconds < 30) return "10-30s";
  if (seconds < 60) return "30-60s";
  if (seconds < 180) return "1-3m";
  return "3m+";
}

function depthBucket(depth: number): string {
  if (depth < 25) return "0-25%";
  if (depth < 50) return "25-50%";
  if (depth < 75) return "50-75%";
  return "75-100%";
}

/** `none` | `resume` | `code` | `both` — what the visitor actually opened. */
function proofBucket(proof: Set<string>): string {
  const resume = proof.has("Resume Clicked");
  const code =
    proof.has("GitHub Clicked") || proof.has("Project Source Opened");
  if (resume && code) return "both";
  if (resume) return "resume";
  if (code) return "code";
  return "none";
}

export function EngagementTracker() {
  const pathname = usePathname();
  const session = useRef<Session>(newSession(pathname));

  useEffect(() => {
    // A new path is a new page view. The previous session is reported by the
    // effect cleanup below, which runs before this body.
    session.current = newSession(pathname);

    function readDepth() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const percent =
        scrollable > 0
          ? Math.min(100, Math.round((window.scrollY / scrollable) * 100))
          : 100;
      if (percent > session.current.depth) session.current.depth = percent;
    }

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const name = target.closest<HTMLElement>("[data-track]")?.dataset.track;
      if (!name) return;
      if (PROOF_EVENTS.has(name)) session.current.proof.add(name);
      if (CONTACT_EVENTS.has(name)) session.current.contact = true;
    }

    function flush() {
      const current = session.current;
      if (current.sent) return;
      current.sent = true;
      const seconds = Math.round((Date.now() - current.startedAt) / 1000);
      track("Page Exit", {
        path: current.path,
        time: timeBucket(seconds),
        depth: depthBucket(current.depth),
        proof: proofBucket(current.proof),
        contact: current.contact ? "yes" : "no",
      });
    }

    function onVisibilityChange() {
      // Opening the resume in another tab hides this one. That is a terminal
      // moment for this page view, so report it here — otherwise the
      // visitor's time inside the PDF is counted as time on the page.
      if (document.visibilityState === "hidden") flush();
    }

    readDepth();
    window.addEventListener("scroll", readDepth, { passive: true });
    window.addEventListener("resize", readDepth, { passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("click", onClick, true);

    return () => {
      flush();
      window.removeEventListener("scroll", readDepth);
      window.removeEventListener("resize", readDepth);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  return null;
}
