import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Check application code independently of the Sites/Cloudflare toolchain.
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
  experimental: {
    // Admin image uploads pass through server actions (Laravel accepts up to 5 MB).
    serverActions: { bodySizeLimit: "6mb" },
  },
};

export default nextConfig;
