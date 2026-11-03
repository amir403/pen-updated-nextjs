import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Check application code independently of the Sites/Cloudflare toolchain.
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
  experimental: {
    // Admin uploads (up to 10 MB) and volunteer applications (up to five 5 MB documents)
    // pass through server actions.
    serverActions: { bodySizeLimit: "26mb" },
  },
};

export default nextConfig;
