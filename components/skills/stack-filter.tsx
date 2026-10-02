"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/icon";
import { Tag } from "@/components/ui/primitives";
import {
  type StackCategory,
  stackCategories,
  stackInventory,
} from "@/lib/site-data";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Full inventory with discipline filters.
 *
 * Tabs are a real radio group: arrow keys move between them, so the control
 * is usable without a pointer. Rows are filtered, not re-ordered, so the
 * reading order stays stable as the selection changes.
 */
export function StackFilter() {
  const [active, setActive] = useState<StackCategory>("all");
  const reduce = useReducedMotion();

  const rows = useMemo(
    () =>
      active === "all"
        ? stackInventory
        : stackInventory.filter((row) => row.category === active),
    [active],
  );

  const counts = useMemo(() => {
    const map = new Map<StackCategory, number>([["all", stackInventory.length]]);
    for (const row of stackInventory) {
      map.set(row.category, (map.get(row.category) ?? 0) + 1);
    }
    return map;
  }, []);

  /** Left/right move between tabs, matching the radio-group pattern. */
  function onKeyDown(event: React.KeyboardEvent) {
    const index = stackCategories.findIndex((c) => c.id === active);
    if (index === -1) return;

    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % stackCategories.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + stackCategories.length) % stackCategories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stackCategories.length - 1;
    else return;

    event.preventDefault();
    const id = stackCategories[next].id;
    setActive(id);
    document.getElementById(`stack-tab-${id}`)?.focus();
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        aria-label="Filter stack by discipline"
        className="-mx-1 flex gap-1.5 overflow-x-auto no-scrollbar px-1 pb-1"
        onKeyDown={onKeyDown}
        role="radiogroup"
      >
        {stackCategories.map((category) => {
          const selected = category.id === active;
          return (
            <button
              aria-checked={selected}
              className={cn(
                "relative inline-flex items-center gap-1.5 h-11 px-3.5 rounded-full font-body-sm text-body-sm whitespace-nowrap transition-colors",
                selected
                  ? "text-on-primary"
                  : "bg-surface-card text-text-secondary border border-border-hairline hover:text-text-primary",
              )}
              id={`stack-tab-${category.id}`}
              key={category.id}
              onClick={() => setActive(category.id)}
              role="radio"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {selected && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-primary"
                  layoutId="stack-filter-pill"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative">{category.label}</span>
              <span
                className={cn(
                  "relative font-label-meta text-label-meta",
                  selected ? "text-on-primary/70" : "text-text-muted",
                )}
              >
                {counts.get(category.id) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col border-t border-border-hairline"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        key={active}
        transition={{ duration: 0.34, ease: EASE_OUT }}
      >
        {rows.map((row) => (
          <div
            className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-4 border-b border-border-hairline"
            key={row.title}
          >
            <span className="flex items-center gap-2 md:w-48 shrink-0">
              <Icon className="text-text-muted" name={row.icon} size={16} />
              <span className="font-headline-md text-headline-md text-text-primary text-[15px]">
                {row.title}
              </span>
            </span>
            <div className="flex flex-wrap gap-1.5 min-w-0">
              {row.items.map((item) => (
                <Tag key={item} tone="subtle">
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
