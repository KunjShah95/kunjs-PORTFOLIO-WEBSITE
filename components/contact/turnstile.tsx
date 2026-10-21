"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/* ==========================================================================
   Cloudflare Turnstile, rendered explicitly.

   The widget is only mounted when a site key is configured, so the form
   works unchanged on a deployment that has never heard of Turnstile. When
   it is configured, the token is required server-side.

   Three details that matter:
   · `response-field` is turned off and the token is kept in React state
     instead, so the value submitted with the form is the one this component
     produced — no duplicate `cf-turnstile-response` inputs, and no
     chance of reading a stale token out of the DOM.
   · The widget is reset whenever the form is submitted, because a Turnstile
     token is single-use: a second submit with the same token is rejected.
   · Rendering is explicit (`turnstile.render`) rather than the implicit
     `cf-turnstile` class, because only the explicit API hands back a widget
     id — and the id is what makes the reset possible.
   ========================================================================== */

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "response-field"?: boolean;
      theme?: "auto" | "light" | "dark";
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** Public site key. Empty means Turnstile is not configured. */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function TurnstileField({
  action = "contact",
  /** Bumping this resets the widget — used after each submission. */
  resetKey,
  onToken,
  className,
}: {
  action?: string;
  /**
   * Anything that changes when the widget should hand out a new token.
   * The parent passes the action's response object, which is a fresh
   * object on every server response.
   */
  resetKey?: unknown;
  onToken: (token: string) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  function render() {
    const container = containerRef.current;
    if (!container || widgetId.current !== null || !window.turnstile) return;
    widgetId.current = window.turnstile.render(container, {
      sitekey: SITE_KEY,
      action,
      theme: "auto",
      // The token is handed to the parent through `onToken` instead of a
      // hidden input, so the submitted value is always the live one.
      "response-field": false,
      callback: (token: string) => onToken(token),
    });
  }

  // Render once the script is available. The script tag below calls
  // `render` through its own `onReady`; this covers the case where the
  // script was already loaded by a previous mount.
  useEffect(() => {
    if (!SITE_KEY) return;
    if (window.turnstile) render();
    // `render` reads refs and `window.turnstile`; neither changes here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset after a submission so the next attempt gets a fresh token.
  useEffect(() => {
    if (widgetId.current === null || !window.turnstile) return;
    window.turnstile.reset(widgetId.current);
    onToken("");
    // `resetKey` is the trigger; `onToken` is stable enough for this purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    return () => {
      if (widgetId.current !== null && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        onReady={() => render()}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div className={cn("min-h-16", className)} ref={containerRef} />
    </>
  );
}
