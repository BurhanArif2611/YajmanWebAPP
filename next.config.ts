import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local backend serves uploaded images from localhost:5000 in dev —
    // Next's image optimizer blocks private/loopback IPs by default (SSRF
    // guard), so it needs an explicit opt-in for this dev-only host.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "yajman.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
