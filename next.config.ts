import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ro-tea.hr",
      },
      {
        protocol: "https",
        hostname: "www.ro-tea.hr",
      },
    ],
  },
  turbopack: {
    root,
  },
};

export default nextConfig;
