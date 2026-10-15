import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Check application code independently of the Sites/Cloudflare toolchain.
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
};

export default nextConfig;
