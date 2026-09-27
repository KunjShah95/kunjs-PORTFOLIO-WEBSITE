"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/icon";
import { EASE_OUT } from "@/lib/motion";
import { indexItems } from "@/lib/site-data";

/**
 * Header overflow menu. The bottom tab bar is capped at five entries, so the
 * pages that don't fit (About, Open Source, Manifesto) are reached here.
 *
 * Closes on route change, outside click, and Escape.
 */
export function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // Close on navigation. Adjusting state during render (rather than in an
  // effect) avoids the extra cascading pass a `useEffect` reset would cause.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        aria-controls="site-index"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Open site index"
        className="w-10 h-10 rounded-full bg-primary text-on-primary md:bg-surface-card md:text-text-primary md:border md:border-border-hairline flex items-center justify-center hover:bg-primary-container md:hover:bg-surface-subtle active:scale-95 transition-all"
        onClick={() => setOpen((v) => !v)}
        ref={buttonRef}
        type="button"
      >
        <span
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <Icon name={open ? "expand_more" : "auto_stories"} size={18} />
        </span>
      </button>

      <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          initial={reduce ? false : { opacity: 0, y: -6, scale: 0.97 }}
          style={{ transformOrigin: "top right" }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="absolute right-0 top-11 z-50 w-[min(20rem,calc(100vw-2.5rem))] rounded-xl bg-surface-card border border-border-hairline shadow-[0_16px_40px_-12px_var(--color-shadow)] overflow-hidden"
          id="site-index"
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-border-hairline">
            <span className="font-body-sm text-body-sm text-text-muted">
              Site Index
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">
              {indexItems.length} sections
            </span>
          </div>
          <ul className="max-h-[min(24rem,60dvh)] overflow-y-auto no-scrollbar py-1">
            {indexItems.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <motion.li
                  animate={{ opacity: 1, x: 0 }}
                  initial={reduce ? false : { opacity: 0, x: 6 }}
                  key={item.href}
                  transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.03 * index }}
                >
                  <Link
                    aria-current={active ? "page" : undefined}
                    className="flex items-start gap-2.5 px-3 py-2 hover:bg-surface-subtle transition-colors group"
                    href={item.href}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        active
                          ? "bg-primary text-on-primary"
                          : "bg-surface-subtle text-text-secondary group-hover:bg-surface-card group-hover:text-text-primary"
                      } transition-colors`}
                    >
                      <Icon name={item.icon} size={15} />
                    </span>
                    <span className="min-w-0 flex flex-col">
                      <span
                        className={`font-headline-md text-headline-md text-[15px] leading-6 ${
                          active ? "text-text-primary" : "text-text-primary/90"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="font-body-sm text-body-sm text-text-muted leading-tight">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
