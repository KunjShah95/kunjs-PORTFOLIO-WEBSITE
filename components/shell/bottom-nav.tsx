"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Icon } from "@/components/icon";
import { LinkPending } from "@/components/primitives/LinkPending";
import { cn } from "@/lib/cn";
import { EASE_OUT, SPRING } from "@/lib/motion";
import { navItems } from "@/lib/site-data";

/**
 * Fixed bottom tab bar for phones and tablets; the desktop header takes over
 * from `lg`. Slides away while reading (scrolling down) and returns as soon
 * as the visitor scrolls up, so it never covers content they are reading.
 */
export function BottomNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    const nearBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 24;
    // Always visible near the top and bottom; otherwise follow direction,
    // ignoring sub-4px jitter from momentum scrolling.
    if (y < 120 || nearBottom || y < previous - 4) setHidden(false);
    else if (y > previous + 4) setHidden(true);
  });

  return (
    <motion.nav
      animate={{ y: hidden && !reduce ? "110%" : "0%" }}
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_0_0_var(--color-border-hairline)]"
      initial={false}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <div className="max-w-xl mx-auto h-16 short-screen:h-14 px-1 flex items-center justify-around">
        {navItems.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-12 short-screen:h-11 px-1 rounded-xl transition-[color,transform] duration-200 active:scale-95",
                active ? "text-text-primary" : "text-text-muted hover:text-text-primary",
              )}
              href={item.href}
              key={item.href}
            >
              {active && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-1.5 inset-y-0 rounded-xl bg-surface-container"
                  layoutId="tab-pill"
                  transition={reduce ? { duration: 0 } : SPRING}
                />
              )}
              <span className="relative flex flex-col items-center gap-0.5">
                <Icon name={item.icon} size={20} />
                <span className={cn("text-[11px] leading-tight", active ? "font-semibold" : "font-medium")}>
                  {item.label}
                </span>
              </span>
              <LinkPending className="bottom-1" />
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
