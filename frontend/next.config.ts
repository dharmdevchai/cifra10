import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.*",          // Allows any IP on your local subnet
    "*.trycloudflare.com",    // Allows any random Cloudflare tunnel URL
  ],
};

export default nextConfig;
