"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * next/image that sits on a skeleton until the bytes arrive, then fades and
 * settles in instead of popping. Parent must be positioned and sized, as with
 * any `fill` image.
 *
 * - `priority` images are never hidden: fading the LCP image would delay LCP.
 * - An image that finished loading before hydration never fires onLoad, so
 *   the ref checks `complete` on mount to avoid staying invisible.
 */
export function FadeImage({ className, alt, priority, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(Boolean(priority));

  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <span aria-hidden="true" className="skeleton absolute inset-0 rounded-none" />}
      <Image
        {...props}
        alt={alt}
        className={cn(
          "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]",
          className,
        )}
        onLoad={() => setLoaded(true)}
        priority={priority}
        ref={ref}
      />
    </>
  );
}
