"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { LinkPending } from "@/components/primitives/LinkPending";
import { CommandPaletteTrigger } from "@/components/shell/command-palette";
import { HeaderMenu } from "@/components/shell/header-menu";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import { SPRING } from "@/lib/motion";
import { site } from "@/lib/site-data";

/** Primary desktop destinations. Everything else lives in the index menu. */
const desktopNav = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/writing", label: "Writing" },
  { href: "/open-source", label: "Open Source" },
  { href: "/about", label: "About" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Fixed top bar. Phones get the compact profile bar + index menu (the bottom
 * tab bar handles primary nav). From `md` up it becomes a full site header:
 * inline links with a gliding active pill, the index menu, and a CTA.
 *
 * Gains a hairline once the page scrolls, and carries a reading-progress rule.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  // Motion value subscription: React only re-renders when the boolean flips.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  const pill = hovered ?? desktopNav.find((i) => isActive(pathname, i.href))?.href;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 pt-safe transition-[background-color,box-shadow] duration-300",
        scrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-border-hairline)]"
          : "bg-surface/0",
      )}
    >
      <div className="shell-container h-16 md:h-[4.5rem] flex items-center justify-between gap-4">
        {/* ------------------------------------------------------------ brand */}
        <Link
          aria-label={`${site.name}, home`}
          className="flex items-center gap-space-sm min-w-0 group"
          href="/"
        >
          <span className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-label-section text-label-section font-semibold shrink-0 transition-transform duration-300 group-hover:bg-primary">
            {site.initials}
          </span>
          <span className="flex flex-col min-w-0">
            <span className="font-headline-md text-headline-md text-text-primary truncate tracking-tight">
              {site.name}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted truncate xl:hidden">
              {site.role}
            </span>
          </span>
        </Link>

        {/* ----------------------------------------------------- desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-surface-card/60 border border-border-hairline backdrop-blur-md"
          onMouseLeave={() => setHovered(null)}
        >
          {desktopNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full font-body-sm text-body-sm font-medium transition-colors duration-200",
                  active ? "text-on-primary" : "text-text-secondary hover:text-text-primary",
                  hovered && hovered !== item.href && active && "text-text-primary",
                )}
                href={item.href}
                key={item.href}
                onMouseEnter={() => setHovered(item.href)}
              >
                {pill === item.href && (
                  <motion.span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 rounded-full",
                      active && (!hovered || hovered === item.href)
                        ? "bg-primary"
                        : "bg-surface-container",
                    )}
                    layoutId="nav-pill"
                    transition={reduce ? { duration: 0 } : SPRING}
                  />
                )}
                <span className="relative">{item.label}</span>
                <LinkPending className="bottom-0.5" />
              </Link>
            );
          })}
        </nav>

        {/* ----------------------------------------------------------- right */}
        <div className="flex items-center gap-2 shrink-0">
          <CommandPaletteTrigger />
          <Link
            className="hidden md:inline-flex items-center gap-1.5 h-10 pl-4 pr-3.5 rounded-full bg-primary text-on-primary font-body-sm text-body-sm font-medium hover:bg-primary-container active:scale-[0.97] transition-all group"
            href="/contact"
          >
            Get in touch
            <Icon
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              name="arrow_forward"
              size={15}
            />
          </Link>
          <HeaderMenu />
          <ThemeToggle />
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute left-0 right-0 bottom-0 h-px origin-left bg-text-primary/40 transition-opacity",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        style={{ scaleX: progress }}
      />
    </header>
  );
}
