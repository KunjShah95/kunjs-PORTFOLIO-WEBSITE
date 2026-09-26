"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site-data";
import { cn } from "@/lib/cn";

/**
 * Copies the site email. Uses the Clipboard API, falling back to a hidden
 * textarea in non-secure contexts. Confirms for 2s either way: the address
 * is also visible and selectable, so a blocked clipboard is not a dead end.
 */
function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(site.email);
      } else {
        const el = document.createElement("textarea");
        el.value = site.email;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    } catch {
      /* clipboard blocked; the address stays selectable on screen */
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return { copied, copy };
}

/** Icon that swaps copy -> check with a small scale/fade. */
function CopyGlyph({ copied, size = 15 }: { copied: boolean; size?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          animate={{ opacity: 1, scale: 1 }}
          className={cn("absolute inset-0 inline-flex", copied && "text-accent-emerald")}
          exit={{ opacity: 0, scale: 0.6 }}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          key={copied ? "check" : "copy"}
          transition={{ duration: 0.18 }}
        >
          <Icon name={copied ? "check" : "content_copy"} size={size} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Compact email row with a copy button. */
export function CopyEmailRow({ className }: { className?: string }) {
  const { copied, copy } = useCopyEmail();

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 h-11 pl-4 pr-1 rounded-full bg-surface-subtle border border-border-hairline",
        className,
      )}
    >
      <span className="font-label-meta text-label-meta text-text-primary truncate select-all">
        {site.email}
      </span>
      <button
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-surface-card text-text-primary font-body-sm text-body-sm font-medium border border-border-hairline hover:border-text-muted active:scale-95 transition-all shrink-0"
        onClick={copy}
        type="button"
      >
        <CopyGlyph copied={copied} size={14} />
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

/** Standalone copy button used in the contact availability card. */
export function CopyEmailButton({ className }: { className?: string }) {
  const { copied, copy } = useCopyEmail();

  return (
    <button
      aria-label={copied ? "Email copied" : "Copy email address"}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-surface-card text-text-primary border border-border-hairline hover:border-text-muted active:scale-95 transition-all font-body-sm text-body-sm font-medium shrink-0",
        className,
      )}
      onClick={copy}
      type="button"
    >
      <CopyGlyph copied={copied} />
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
