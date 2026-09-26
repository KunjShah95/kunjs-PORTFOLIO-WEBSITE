import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        // Portrait imported from the live site.
        protocol: "https",
        hostname: "kunjshah.vercel.app",
        pathname: "/profile.png",
      },
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
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
