import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
