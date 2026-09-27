"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/icon";
import { type Command, type CommandGroup, searchCommands } from "@/lib/commands";
import { EASE_OUT } from "@/lib/motion";

/** Group render order — a fixed spine reads better than alphabetical. */
const GROUP_ORDER: readonly CommandGroup[] = [
  "Navigate",
  "Work",
  "Writing",
  "Actions",
];

function group(commands: Command[]): { group: CommandGroup; items: Command[] }[] {
  return GROUP_ORDER.map((name) => ({
    group: name,
    items: commands.filter((c) => c.group === name),
  })).filter((entry) => entry.items.length > 0);
}

/** Custom event so the header's trigger can open the palette without a provider. */
const OPEN_EVENT = "open-command-palette";

/**
 * ⌘K site search.
 *
 * Mounted once in the root layout and driven entirely by the keyboard, so it
 * works from any page without a per-page trigger. Results are ranked by
 * `searchCommands`; arrows move the selection, Enter follows it, Escape
 * closes and returns focus to wherever the user was.
 *
 * The palette is a dialog: it traps Tab inside itself and locks body scroll
 * while open, so the page behind it cannot be reached by keyboard.
 */
export function CommandPalette() {
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  /** Where focus came from, so Escape can hand it back. */
  const returnFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => searchCommands(query), [query]);
  const sections = useMemo(() => group(results), [results]);

  /** Flat list in visual order, so arrow keys match what the eye sees. */
  const flat = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    returnFocus.current?.focus?.();
  }, []);

  const openPalette = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  // --- global shortcut, plus the header trigger ------------------------
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        openPalette();
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpen() {
      openPalette();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, [openPalette]);

  // --- focus, scroll lock, reset on open -------------------------------
  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // A new result set always starts at the top. Adjusting during render
  // (rather than in an effect) avoids the extra cascading pass, and matches
  // how `HeaderMenu` resets on route change.
  const [lastQuery, setLastQuery] = useState(query);
  if (query !== lastQuery) {
    setLastQuery(query);
    setActive(0);
  }

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  /**
   * Navigation is left to the element itself: `next/link` intercepts internal
   * routes, and external anchors carry `target`/`rel`. We only need to close
   * the dialog, so nothing here touches `location` directly.
   */
  function run() {
    close();
  }

  function onListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      // Let the focused row's own activation happen: focusing the anchor and
      // dispatching a click keeps "Enter follows the highlighted result" true
      // for screen-reader and keyboard users, not just the pointer path.
      const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-row]");
      rows?.[active]?.click();
    } else if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActive(Math.max(0, flat.length - 1));
    }
  }

  /** Keep Tab inside the dialog: input -> results -> wrap. */
  function onDialogKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Tab") return;
    const focusables = listRef.current?.querySelectorAll<HTMLElement>("[data-row]");
    if (!focusables?.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === inputRef.current) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh] pb-8"
            exit={{ opacity: 0 }}
            initial={reduce ? false : { opacity: 0 }}
            onKeyDown={onDialogKeyDown}
            transition={{ duration: 0.18, ease: EASE_OUT }}
          >
            <button
              aria-label="Close search"
              className="absolute inset-0 cursor-default bg-primary/25 backdrop-blur-[2px]"
              onClick={close}
              tabIndex={-1}
              type="button"
            />

            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              aria-label="Site search"
              aria-modal="true"
              className="relative w-full max-w-xl rounded-2xl bg-surface-card border border-border-hairline shadow-[0_24px_60px_-20px_var(--color-shadow)] overflow-hidden flex flex-col max-h-[70vh]"
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
              role="dialog"
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              {/* ---------------------------------------------------- input */}
              <div className="flex items-center gap-3 px-4 border-b border-border-hairline shrink-0">
                <span className="text-text-muted shrink-0">
                  <Icon name="hub" size={18} />
                </span>
                <input
                  aria-label="Search pages, projects, and writing"
                  autoComplete="off"
                  className="flex-1 min-w-0 h-14 bg-transparent font-body-lg text-body-lg text-text-primary placeholder:text-text-muted focus:outline-none"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, projects, writing…"
                  ref={inputRef}
                  spellCheck={false}
                  type="text"
                  value={query}
                />
                <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 rounded border border-border-hairline bg-surface-subtle font-label-meta text-label-meta text-text-muted shrink-0">
                  ESC
                </kbd>
              </div>

              {/* -------------------------------------------------- results */}
              <div
                className="overflow-y-auto no-scrollbar py-1"
                onKeyDown={onListKeyDown}
                ref={listRef}
                role="listbox"
              >
                {flat.length === 0 ? (
                  <p className="px-4 py-8 text-center font-body-sm text-body-sm text-text-muted">
                    Nothing matches “{query}”.
                  </p>
                ) : (
                  sections.map((section) => (
                    <div className="py-1" key={section.group}>
                      <span className="block px-4 pt-2 pb-1 font-label-section text-label-section text-text-muted">
                        {section.group}
                      </span>
                      <ul>
                        {section.items.map((command) => {
                          const index = flat.indexOf(command);
                          const isActive = index === active;
                          const inner = (
                            <>
                              {command.icon ? (
                                <span
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                    isActive
                                      ? "bg-primary text-on-primary"
                                      : "bg-surface-subtle text-text-secondary"
                                  }`}
                                >
                                  <Icon name={command.icon} size={15} />
                                </span>
                              ) : (
                                <span className="w-7 shrink-0" />
                              )}
                              <span className="min-w-0 flex-1 flex flex-col">
                                <span className="font-headline-md text-headline-md text-[15px] leading-6 text-text-primary truncate">
                                  {command.label}
                                </span>
                                {command.detail && (
                                  <span className="font-body-sm text-body-sm text-text-muted truncate">
                                    {command.detail}
                                  </span>
                                )}
                              </span>
                              {isActive && (
                                <span className="text-text-muted shrink-0">
                                  <Icon name="arrow_forward" size={15} />
                                </span>
                              )}
                            </>
                          );

                          const className = `w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors ${
                            isActive ? "bg-surface-container" : "hover:bg-surface-subtle"
                          }`;

                          return (
                            <li key={command.id}>
                              {command.external ? (
                                <a
                                  className={className}
                                  data-active={isActive}
                                  data-row=""
                                  href={command.href}
                                  onClick={run}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  {inner}
                                </a>
                              ) : (
                                <Link
                                  className={className}
                                  data-active={isActive}
                                  data-row=""
                                  href={command.href ?? "/"}
                                  onClick={run}
                                >
                                  {inner}
                                </Link>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                )}
              </div>

              {/* ---------------------------------------------------- footer */}
              <div className="hidden sm:flex items-center gap-4 px-4 py-2 border-t border-border-hairline shrink-0 font-body-sm text-body-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>↵</Kbd>
                  open
                </span>
                <span className="ml-auto">{flat.length} results</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded border border-border-hairline bg-surface-subtle font-label-meta text-label-meta">
      {children}
    </kbd>
  );
}

/**
 * Header affordance for the palette. Rendered inside `SiteHeader` rather than
 * beside the dialog, so it occupies a real slot in the header's right cluster.
 *
 * Hidden below `lg`, where the bottom tab bar already owns navigation and a
 * keyboard shortcut is not a discoverable interaction.
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
