import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        // Case-study artwork carried over from the design export.
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        // Medium post cover images (see lib/medium.ts).
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
    ],
  },
  // Essays moved to Medium (listed on /writing). The old placeholder essay
  // URLs redirect there so existing links keep working.
  async redirects() {
    return [{ source: "/writing/:slug", destination: "/writing", permanent: true }];
  },
  // `/<page>.md` serves the Markdown twin of a page (see app/markdown). These
  // run after the filesystem, so the real /pricing.md and /services.md win.
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/index.md", destination: "/markdown" },
        { source: "/projects/:slug.md", destination: "/markdown/projects/:slug" },
        { source: "/:page.md", destination: "/markdown/:page" },
      ],
      fallback: [],
    };
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
    // `experimental.inlineCss` was tried here and reverted: it inlines the
    // whole ~66 KiB stylesheet into every document, which took the home page
    // HTML from 123 KiB to 323 KiB. The browser then has to receive and parse
    // all of that before it can paint, which measured worse across the board
    // (FCP 0.9s -> 1.1s, TBT 30ms -> 80ms, perf 90 -> 89). Keeping the
    // stylesheet as a separate 13 KiB-gzip request is the better trade.
  },
};

export default nextConfig;
