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
      {
        source: "/blog/:path*",
        destination: "/bloq/:path*",
        permanent: true,
      },
      {
        source: "/ru/blog/:path*",
        destination: "/ru/bloq/:path*",
        permanent: true,
      },
      {
        source: "/tr/blog/:path*",
        destination: "/tr/bloq/:path*",
        permanent: true,
      },
      {
        source: "/tr/galeri/:path*",
        destination: "/tr/qalereya/:path*",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/bloq",
        permanent: true,
      },
      {
        source: "/ru/category/:path*",
        destination: "/ru/bloq",
        permanent: true,
      },
      {
        source: "/tr/category/:path*",
        destination: "/tr/bloq",
        permanent: true,
      },
      {
        source: "/favicon.ico",
        destination: "https://admin.166temizlik.az/wp-content/uploads/2022/12/fav.png",
        permanent: false,
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
