"use client";

import { useEffect } from "react";
import { Icon } from "@/components/icon";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Runs before first paint to set `data-theme` on <html>.
 *
 * Inlined into the document rather than fetched, because a deferred module
 * would arrive *after* the first paint — which is exactly the flash this
 * exists to prevent. Dependency-free and wrapped in try/catch so a
 * storage-blocked browser still ends up with a theme.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

/**
 * Light / dark switch.
 *
 * Deliberately holds no React state. The active theme is already in the DOM as
 * `data-theme`, so the icon is selected by CSS (`dark:` variant) rather than by
 * a client-side conditional. That keeps the button correct in the server HTML,
 * avoids a hydration mismatch against a value the server cannot know, and means
 * the first paint is already right.
 */
export function ThemeToggle({ className }: { className?: string }) {
  /**
   * Follow the OS for as long as the visitor has not chosen explicitly. This
   * only writes to the DOM — there is no state to keep in sync, so a mid-session
   * OS change repaints correctly without re-rendering React.
   */
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage blocked; the OS listener below is still worth having.
    }
    if (stored === "light" || stored === "dark") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange(event: MediaQueryListEvent) {
      document.documentElement.setAttribute(
        "data-theme",
        event.matches ? "dark" : "light",
      );
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next: Theme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode: the toggle still works for this page view.
    }
  }

  return (
    <button
      aria-label="Switch between light and dark theme"
      className={`w-10 h-10 shrink-0 rounded-full bg-surface-card text-text-primary border border-border-hairline flex items-center justify-center hover:bg-surface-subtle active:scale-95 transition-colors ${className ?? ""}`}
      onClick={toggle}
      type="button"
    >
      {/* Sun shows in dark mode (the action), moon in light (the action). */}
      <span
        aria-hidden="true"
        className="hidden dark:flex transition-transform duration-300 dark:rotate-0 rotate-90"
      >
        <Icon name="light_mode" size={18} />
      </span>
      <span
        aria-hidden="true"
        className="flex dark:hidden transition-transform duration-300 dark:-rotate-90 rotate-0"
      >
        <Icon name="dark_mode" size={18} />
      </span>
    </button>
  );
}
