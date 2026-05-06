import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "166temizlik.az",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "166temizlik.az",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
