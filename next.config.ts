import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1MB; product photos (uploaded as multipart form data)
      // routinely exceed that. 8MB comfortably covers a phone photo.
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
