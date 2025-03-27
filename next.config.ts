import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d188cc59d2yje5.cloudfront.net",
        pathname: "/images/**", // Adjust if needed
      },
    ],
  },
};

export default nextConfig;
