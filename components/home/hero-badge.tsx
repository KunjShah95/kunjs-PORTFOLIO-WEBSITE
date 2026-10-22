"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "@/lib/motion-client";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site-data";

/**
 * The hero portrait, as the conference badge it was taken wearing.
 *
 * The photo is from DevFest Baroda, lanyard and all, so the portrait hangs
 * on one: a strap, a clip, and an ID card. Three layers of motion, each
 * driven by a separate motion value so they add up rather than fight:
 *
 * 1. Pendulum. The card drops in, overshoots and swings to rest like a
 *    real badge on a strap, then keeps a slow idle sway.
 * 2. Tilt. Over the card, it leans toward the cursor in 3D and a soft
 *    glare follows the pointer across the laminate.
 * 3. Throw. It can be grabbed (mouse or touch) and pulled; the rotation
 *    follows the pull and it springs back on release.
 *
 * Reduced motion drops only the motion nobody asked for (drop-in and idle
 * sway). Tilt and throw are user-driven and stay.
 *
 * The drag is hand-rolled on pointer events: the site loads Motion's
 * `domAnimation` bundle, which has no drag gesture, and pulling in `domMax`
 * for one card is not worth the bytes.
 */
export function HeroBadge({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  /* ---- 1. pendulum ------------------------------------------------- */
  const sway = useMotionValue(0);
  const drop = useMotionValue(0);

  // Layout effect: the card is lifted before the first paint, so it never
  // flashes at rest and then jumps up to start its fall.
  useLayoutEffect(() => {
    if (reduce) return;
    let idle: { stop: () => void } | undefined;
    drop.set(-460);
    sway.set(-14);
    const fall = animate(drop, 0, { type: "spring", stiffness: 90, damping: 13, delay: 0.2 });
    // Underdamped on purpose: it should visibly swing back and forth a few
    // times before it settles, the way a badge does when you let go of it.
    const settle = animate(sway, 0, {
      type: "spring",
      stiffness: 26,
      damping: 2.4,
      restDelta: 0.15,
      delay: 0.35,
      onComplete: () => {
        idle = animate(sway, [0, 2.2, 0, -2.2, 0], {
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        });
      },
    });
    return () => {
      fall.stop();
      settle.stop();
      idle?.stop();
    };
  }, [reduce, drop, sway]);

  /* ---- 2. tilt + glare ----------------------------------------------- */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 18 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(30);
  const glareOpacity = useSpring(0, { stiffness: 160, damping: 22 });
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.55), transparent 55%)`;

  /* ---- 3. throw ---------------------------------------------------- */
  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);
  const pullRotate = useSpring(useTransform(pullX, [-220, 220], [22, -22]), {
    stiffness: 200,
    damping: 12,
    mass: 0.6,
  });
  const rotate = useTransform(() => sway.get() + pullRotate.get());
  const y = useTransform(() => drop.get() + pullY.get());
  const start = useRef<{ px: number; py: number } | null>(null);

  // Resistance grows with distance, like a strap pulling back.
  const elastic = (d: number) => Math.sign(d) * Math.min(Math.abs(d) * 0.55, 260);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = {
      px: e.clientX - pullX.get() / 0.55,
      py: e.clientY - pullY.get() / 0.55,
    };
    tiltX.set(0);
    tiltY.set(0);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    pullX.set(elastic(e.clientX - start.current.px));
    pullY.set(elastic(e.clientY - start.current.py));
  };
  const release = () => {
    if (!start.current) return;
    start.current = null;
    const spring = { type: "spring", stiffness: 240, damping: 9, mass: 0.8 } as const;
    animate(pullX, 0, spring);
    animate(pullY, 0, spring);
  };

  const onCardMove = (e: React.PointerEvent<HTMLElement>) => {
    if (start.current || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    tiltY.set((px - 0.5) * 18);
    tiltX.set((0.5 - py) * 14);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };
  const onCardLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    glareOpacity.set(0);
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <motion.div
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing touch-none select-none"
        onLostPointerCapture={release}
        onPointerCancel={release}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        // Pivot at the top of the strap, so a swing moves the card through
        // an arc instead of spinning it in place.
        style={{ x: pullX, y, rotate, transformOrigin: "50% -60%" }}
      >
        {/* Strap: runs up and fades out before it reaches the header or the
            headline. Woven text, like a real event lanyard. */}
        <div
          aria-hidden="true"
          className="absolute bottom-[calc(100%-6px)] left-1/2 -translate-x-1/2 w-7 h-20 lg:h-36 overflow-hidden rounded-b-sm bg-signal shadow-[inset_-3px_0_0_rgb(0_0_0/0.12),inset_3px_0_0_rgb(255_255_255/0.18)] [mask-image:linear-gradient(to_top,#000_55%,transparent)]"
        >
          <span className="absolute left-1/2 bottom-3 -translate-x-1/2 whitespace-nowrap [writing-mode:vertical-rl] rotate-180 font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-[#0d0d0c]/75">
            {site.name} &middot; AI Engineer &middot; {site.name}
          </span>
        </div>

        {/* Clip */}
        <div aria-hidden="true" className="relative z-10 -mb-3 flex flex-col items-center">
          <div className="h-5 w-9 rounded-t-md bg-gradient-to-b from-[#d9d7d0] to-[#9a978f] shadow-[inset_0_1px_0_rgb(255_255_255/0.7)]" />
          <div className="h-4 w-4 rounded-full border-[3px] border-[#a8a59d] bg-transparent -mt-1" />
        </div>

        {/* Card */}
        <div className="[perspective:900px]">
          <motion.figure
            className="relative w-[248px] sm:w-[280px] rounded-[22px] border border-border-hairline bg-surface-card p-3 shadow-[0_1px_0_rgb(255_255_255/0.7)_inset,0_40px_80px_-30px_rgb(13_13_12/0.45),0_10px_24px_-12px_rgb(13_13_12/0.25)] [transform-style:preserve-3d]"
            onPointerLeave={onCardLeave}
            onPointerMove={onCardMove}
            style={{ rotateX, rotateY }}
          >
            {/* Laminate glare, following the pointer. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 rounded-[22px] mix-blend-soft-light"
              style={{ backgroundImage: glare, opacity: glareOpacity }}
            />

            {/* Punched slot the clip goes through. */}
            <div aria-hidden="true" className="mx-auto mb-3 h-2 w-12 rounded-full bg-surface-container shadow-[inset_0_1px_2px_rgb(0_0_0/0.18)]" />

            <div className="flex items-center justify-between px-1 pb-3">
              <span className="eyebrow text-text-muted">Engineer</span>
              <span className="grid h-6 w-6 place-items-center rounded-md bg-primary font-mono text-[9px] font-semibold text-on-primary">
                {site.initials}
              </span>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-surface-container">
              <Image
                alt={`${site.name} at DevFest Baroda, wearing a conference lanyard.`}
                className="object-cover object-[50%_30%] scale-[1.9] origin-[50%_32%] pointer-events-none"
                draggable={false}
                fill
                priority
                sizes="280px"
                src="/profile.png"
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-[#0d0d0c]/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#f2f1ec] backdrop-blur-sm">
                DevFest Baroda
              </span>
            </div>

            <figcaption className="flex flex-col gap-1 px-1 pt-4">
              <span className="text-[1.625rem] leading-none font-semibold tracking-[-0.04em] text-text-primary">
                {site.name}
              </span>
              <span className="font-body-sm text-body-sm text-text-secondary">
                Agents &middot; Search &middot; Full-stack AI
              </span>
            </figcaption>

            <div className="mt-4 flex items-end justify-between gap-3 border-t border-dashed border-border-dotted px-1 pt-3">
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 font-body-sm text-[12px] text-text-primary">
                  <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-accent-emerald opacity-60 animate-ping" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                  </span>
                  Booking projects
                </span>
                <span className="eyebrow text-text-muted">{site.location}</span>
              </span>
              {/* Decorative barcode. */}
              <span
                aria-hidden="true"
                className="h-7 w-20 opacity-80 [background:repeating-linear-gradient(90deg,var(--color-text-primary)_0_2px,transparent_2px_4px,var(--color-text-primary)_4px_5px,transparent_5px_8px,var(--color-text-primary)_8px_11px,transparent_11px_12px)]"
              />
            </div>
          </motion.figure>
        </div>
      </motion.div>

      <p aria-hidden="true" className="mt-8 hidden md:flex items-center gap-2 text-text-muted">
        <span className="display-accent text-[1.25rem]">go on, give it a pull</span>
        <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 24 24" width="18">
          <path d="M4 18c4-1 8-5 9-12M13 6l-3 2M13 6l2 3" />
        </svg>
      </p>
    </div>
  );
}
