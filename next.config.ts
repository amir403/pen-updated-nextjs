import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Check application code independently of the Sites/Cloudflare toolchain.
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
  experimental: {
    // Admin uploads pass through server actions (Laravel accepts files up to 10 MB).
    serverActions: { bodySizeLimit: "11mb" },
  },
};

export default nextConfig;
