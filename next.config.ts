import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['avatar.iran.liara.run', 'lh3.googleusercontent.com'],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
