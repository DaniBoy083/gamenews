import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sujeitoprogramador.com",
        pathname: "/next-api/**",
      },
    ],
  },
};

export default nextConfig;
