import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  // Transpile three.js packages for proper tree-shaking
  transpilePackages: ["three"],
};

export default nextConfig;
