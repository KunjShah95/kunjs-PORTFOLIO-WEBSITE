"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Muted, looping product demo. Nothing downloads until the card nears the
 * viewport, and playback pauses again once it scrolls away. Reduced-motion
 * visitors get the poster plus native controls instead of autoplay. Pass
 * `controls={false}` when the video sits inside a link, so the native
 * controls never nest an interactive element inside the anchor.
 */
export function DemoVideo({
  src,
  title,
  className,
  controls = true,
}: {
  src: string;
  title: string;
  className?: string;
  controls?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <video
      aria-label={`${title} 30-second product demo`}
      className={cn(
        "w-full aspect-[8/5] rounded-xl border border-border-hairline bg-surface-container object-cover object-top",
        className,
      )}
      controls={controls && !!reduce}
      loop
      muted
      playsInline
      poster={`${src}.jpg`}
      preload="none"
      ref={ref}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
