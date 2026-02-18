import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Disable to prevent double animations in dev
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
  allowedDevOrigins: [
    '*.ngrok-free.app',
    'urbancare.ge',
    'http://localhost:3000',
  ],
};

export default nextConfig;
