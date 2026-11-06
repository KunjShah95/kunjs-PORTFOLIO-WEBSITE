import { ORIGIN } from "@/lib/routes";
import type { Project } from "@/lib/site-data";

/**
 * Facts about each demo recording that Google needs to index it as a video
 * result: how long it runs and when it was published. Measured from the files
 * in public/videos (`ffprobe` duration, first-commit date), so update the entry
 * whenever `scripts/record-demos.mjs` re-records a demo.
 *
 * Each case study (/projects/<slug>) is the video's watch page. The home page
 * and project grid reuse the same files as silent previews, and Search
 * Console reports those as "Video isn't on a watch page", which is expected
 * and harmless once the case study is marked up as the canonical place to
 * watch it (VideoObject JSON-LD plus the video sitemap entries).
 */
const RECORDINGS: Record<string, { seconds: number; uploaded: string }> = {
  "/videos/archmind-ai": { seconds: 30, uploaded: "2026-09-28T07:10:00+05:30" },
  "/videos/archmind-research-agent": { seconds: 29, uploaded: "2026-10-10T22:59:50+05:30" },
  "/videos/engineeros": { seconds: 30, uploaded: "2026-09-28T07:10:00+05:30" },
  "/videos/estate360": { seconds: 30, uploaded: "2026-10-10T22:59:50+05:30" },
  "/videos/lattice": { seconds: 30, uploaded: "2026-10-10T22:59:50+05:30" },
  "/videos/learnai": { seconds: 25, uploaded: "2026-09-28T07:10:00+05:30" },
  "/videos/offerguard-ai": { seconds: 30, uploaded: "2026-09-28T07:10:00+05:30" },
  "/videos/onramp": { seconds: 30, uploaded: "2026-10-10T22:59:50+05:30" },
  "/videos/sentinel-cli": { seconds: 30, uploaded: "2026-09-28T07:10:00+05:30" },
  "/videos/smartflow-ai": { seconds: 30, uploaded: "2026-09-28T07:10:00+05:30" },
};

export type ProjectVideo = {
  /** Case study URL: the page Google should treat as the watch page. */
  watchUrl: string;
  title: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  seconds: number;
  uploaded: string;
};

/** Everything search engines need about a project's demo, or null if it has none. */
export function projectVideo(project: Project): ProjectVideo | null {
  if (!project.video) return null;
  const recording = RECORDINGS[project.video];
  if (!recording) return null;
  return {
    watchUrl: `${ORIGIN}/projects/${project.slug}`,
    title: `${project.title} product demo`,
    description: `A ${recording.seconds}-second walkthrough of ${project.title}. ${project.description}`,
    contentUrl: `${ORIGIN}${project.video}.mp4`,
    // JPEG, not the WebP poster the page shows: it is the one thumbnail
    // format every video consumer (Search, Discover, social cards) accepts.
    thumbnailUrl: `${ORIGIN}${project.video}.jpg`,
    seconds: recording.seconds,
    uploaded: recording.uploaded,
  };
}

/** True when a project has a demo file but no RECORDINGS entry (caught in tests). */
export function hasRecordingFacts(videoPath: string): boolean {
  return videoPath in RECORDINGS;
}

/** schema.org VideoObject for the case study page. */
export function videoObjectJsonLd(video: ProjectVideo): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${video.watchUrl}#demo-video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.uploaded,
    duration: `PT${video.seconds}S`,
    contentUrl: video.contentUrl,
    url: video.watchUrl,
    inLanguage: "en-IN",
    isFamilyFriendly: true,
    author: { "@id": `${ORIGIN}/#person` },
    mainEntityOfPage: { "@id": `${video.watchUrl}#case-study` },
  };
}

/**
 * Next.js writes sitemap video fields into XML without escaping them, so a
 * project description with an `&` would break the whole sitemap.
 */
export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
