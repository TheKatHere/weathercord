import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/settings/:tab*",
        destination: "/"
      }
    ]
  },
};

export default nextConfig;
