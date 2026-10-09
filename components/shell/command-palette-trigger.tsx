"use client";

import { Icon } from "@/components/icon";
import { OPEN_EVENT } from "@/components/shell/command-palette-event";

/**
 * Header affordance for the palette. Rendered inside `SiteHeader` rather than
 * beside the dialog, so it occupies a real slot in the header's right cluster.
 *
 * Hidden below `lg`, where the bottom tab bar already owns navigation and a
 * keyboard shortcut is not a discoverable interaction.
 *
 * This lives apart from the dialog on purpose. When `SiteHeader` imported the
 * trigger from `command-palette.tsx`, the whole palette — dialog, focus trap,
 * keyboard handling, the whole command index — became part of every route's
 * first-load bundle, because the header is in the root layout. The dialog now
 * loads on demand (see `LazyCommandPalette`); only this button is eager.
 */
export function CommandPaletteTrigger() {
  return (
    <button
      aria-keyshortcuts="Meta+K Control+K"
      className="hidden lg:inline-flex items-center gap-2 h-10 pl-3 pr-2 rounded-full bg-surface-card/60 border border-border-hairline backdrop-blur-md text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      type="button"
    >
      <Icon name="hub" size={15} />
      <span className="font-body-sm text-body-sm">Search</span>
      <span className="inline-flex items-center h-5 px-1.5 rounded border border-border-hairline bg-surface-subtle font-label-meta text-label-meta">
        ⌘K
      </span>
    </button>
  );
}
