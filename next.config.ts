import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  cacheComponents: true,
  partialPrefetching: true,
  agentRules: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
