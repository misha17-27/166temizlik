import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ana-sehife",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ru/glavnaya2",
        destination: "/ru/",
        permanent: true,
      },
      {
        source: "/tr/ana-sehife",
        destination: "/tr/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/wp-content/:path*",
        destination: "https://admin.166temizlik.az/wp-content/:path*",
      },
    ];
  },
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
      {
        protocol: "https",
        hostname: "admin.166temizlik.az",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "admin.166temizlik.az",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
