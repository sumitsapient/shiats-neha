import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
      domains: ["images.unsplash.com", "firebasestorage.googleapis.com"], // ✅ Add your external image domains here
    },
};

export default nextConfig;
