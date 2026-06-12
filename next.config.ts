import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Compress output for faster serving
  compress: true,
  // Power header reveals less about the tech stack
  poweredByHeader: false,
  // Strict mode catches issues earlier in dev
  reactStrictMode: true,
  // Suppress turbopack workspace root warning
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
