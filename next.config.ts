import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true, // Disable to prevent double animations in dev
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '**',
            }
        ],
    },
    allowedDevOrigins: ['shanna-unidentical-mechelle.ngrok-free.dev', 'http://192.168.100.5:3000', 'http://localhost:3000']
};

export default nextConfig;