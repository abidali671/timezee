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
    ],
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // }
};

export default nextConfig;
