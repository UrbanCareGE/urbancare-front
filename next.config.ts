import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
  // for dev
  allowedDevOrigins: ['*.ngrok-free.app', 'urbancare.ge'],
  // for production behind reverse proxy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'X-Forwarded-Host', value: 'urbancare.ge' }],
      },
    ];
  },
};
