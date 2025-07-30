import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "timzee-demo.myshopify.com",
        port: "",
        pathname: "/cdn/shop/files/**",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/**`,
      }

    ],
  },
  async headers() {
    return [
      {
        source: "/product/:slug",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // }
};

export default nextConfig;
