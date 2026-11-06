"use client";

import { useEffect, useRef, useState } from "react";
import { OPEN_EVENT } from "@/components/shell/command-palette-event";
import type { CommandPalette as CommandPaletteDialog } from "@/components/shell/command-palette";

/**
 * Loads the ⌘K palette on first use instead of shipping it with the document.
 *
 * The palette is mounted in the root layout, so before this it was part of
 * every route's first-load JavaScript — the dialog, its focus trap, the
 * command index and all — despite being reachable only by keyboard or by the
 * header's Search button. Nothing above the fold uses it.
 *
 * The stub below is the only eager cost, and it stays that way: it renders
 * nothing, and pulls the real dialog in the moment the shortcut is pressed or
 * the trigger is clicked. `requestIdleCallback` warms the chunk shortly after
 * load, so the common case — someone reaching for ⌘K — still opens without a
 * round trip.
 *
 * Both entry points ask for the palette *and* for it to be open, so the
 * request is replayed once the dialog has mounted and bound its own listener.
 */
export function LazyCommandPalette() {
  const [Palette, setPalette] = useState<typeof CommandPaletteDialog | null>(
    null,
  );
  /** Set when the palette was asked for by the user rather than by the idle warm-up. */
  const wantsOpen = useRef(false);

  useEffect(() => {
    let cancelled = false;

    function load(open: boolean) {
      if (open) wantsOpen.current = true;
      if (cancelled) return;
      void import("@/components/shell/command-palette").then((mod) => {
        if (!cancelled) setPalette(() => mod.CommandPalette);
      });
    }

    // ⌘K / Ctrl+K. Handled here rather than inside the dialog so the shortcut
    // still works before the dialog's own listener exists.
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        load(true);
      }
    }

    // The header's Search button.
    function onOpen() {
      load(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onOpen);

    // Warm the chunk once the page has fully loaded and the browser is idle,
    // so it never competes with the scripts that hydrate the page. On a slow
    // phone the old 2s idle timeout fired mid-hydration and spent bandwidth
    // the first paint needed. Skipped entirely on Data Saver or 2G/3G: there
    // the palette loads on first use instead, which is one short round trip.
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const constrained =
      connection?.saveData === true ||
      /(^|-)(2g|3g)$/.test(connection?.effectiveType ?? "");

    let idleHandle: number | undefined;
    function warm() {
      idleHandle =
        idleWindow.requestIdleCallback?.(() => load(false), { timeout: 8000 }) ??
        window.setTimeout(() => load(false), 3000);
    }
    if (!constrained) {
      if (document.readyState === "complete") warm();
      else window.addEventListener("load", warm, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener("load", warm);
      if (idleWindow.cancelIdleCallback && idleHandle !== undefined) {
        idleWindow.cancelIdleCallback(idleHandle as number);
      } else if (idleHandle !== undefined) {
        window.clearTimeout(idleHandle);
      }
    };
  }, []);

  // The request that triggered the load was handled by this stub; the dialog
  // binds its own listener only once it is mounted. Replay it, after the
  // commit that mounts it, so opening feels immediate.
  useEffect(() => {
    if (!Palette || !wantsOpen.current) return;
    wantsOpen.current = false;
    const id = window.setTimeout(
      () => window.dispatchEvent(new Event(OPEN_EVENT)),
      0,
    );
    return () => window.clearTimeout(id);
  }, [Palette]);

  return Palette ? <Palette /> : null;
}
