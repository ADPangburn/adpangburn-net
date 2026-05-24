import type { NextConfig } from "next";
import createMDX from "@next/mdx";

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

  // Treat .md and .mdx alongside .ts/.tsx as page sources for App Router.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
