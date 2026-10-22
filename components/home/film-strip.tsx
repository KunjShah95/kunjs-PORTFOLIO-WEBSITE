import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/site-data";

/**
 * "Now showing": every project with a demo reel, as frames on a strip of
 * film sliding past. Each frame is the reel's poster and links to the case
 * study. The list is rendered twice so the loop is seamless; the copy is
 * hidden from assistive tech and the keyboard so nothing is announced or
 * focused twice. Hover pauses the reel; reduced motion freezes it.
 */
export function FilmStrip() {
  const reels = projects.filter((p) => p.video);

  const frames = (copy: boolean) =>
    reels.map((p, i) => (
      <li className="shrink-0" key={`${p.slug}-${copy ? "b" : "a"}`}>
        <Link
          aria-hidden={copy || undefined}
          className="group block w-[260px] md:w-[340px]"
          href={`/projects/${p.slug}`}
          tabIndex={copy ? -1 : undefined}
        >
          <span className="relative block aspect-video overflow-hidden rounded-[4px] bg-[#1a1a18]">
            <Image
              alt={copy ? "" : `${p.title} demo`}
              className="object-cover opacity-80 grayscale-[35%] transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.03]"
              fill
              sizes="340px"
              src={`${p.video}.webp`}
            />
            <span className="absolute left-2 top-2 font-mono text-[10px] tracking-[0.14em] text-[#f2f1ec]/80">
              {String(i + 1).padStart(2, "0")}A
            </span>
          </span>
          <span className="mt-2 flex items-baseline justify-between gap-3 px-0.5">
            <span className="font-body-sm text-body-sm font-medium text-[#f2f1ec]">{p.title}</span>
            <span className="eyebrow text-[#8f8d85] truncate">
              {p.metrics[0].value} {p.metrics[0].label}
            </span>
          </span>
        </Link>
      </li>
    ));

  return (
    <div className="relative overflow-hidden bg-[#050505] py-3">
      <div aria-hidden="true" className="sprockets" />
      <div className="py-4">
        <ul className="reel flex w-max gap-4 px-2">
          {frames(false)}
          {frames(true)}
        </ul>
      </div>
      <div aria-hidden="true" className="sprockets" />
    </div>
  );
}
