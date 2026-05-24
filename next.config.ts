import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — produces ./out/ of plain HTML/CSS/JS for Cloudflare Pages.
  output: "export",

  // Static export quirk: Next/Image needs unoptimized: true since there's no Image
  // Optimization server. We'll size images at build time / via CSS instead.
  images: {
    unoptimized: true,
  },

  // Trailing slashes on routes — friendlier for static hosting + matches the
  // "directory of pages" mental model the design implies.
  trailingSlash: true,
};

export default nextConfig;
