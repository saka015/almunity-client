import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['avatar.iran.liara.run'],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
