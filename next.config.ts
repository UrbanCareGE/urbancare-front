import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true, // Disable to prevent double animations in dev
    images: {
        loader: 'custom',
        loaderFile: './src/lib/image-loader.ts',
    },
    allowedDevOrigins: ['shanna-unidentical-mechelle.ngrok-free.dev', 'http://192.168.100.5:3000', 'http://localhost:3000']
};

export default nextConfig;