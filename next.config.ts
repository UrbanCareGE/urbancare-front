import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
  allowedDevOrigins: ['*.ngrok-free.app', 'urbancare.ge', 'www.urbancare.ge'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'X-Forwarded-Host', value: 'urbancare.ge' }],
      },
    ];
  },
};
