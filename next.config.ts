import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
    allowedDevOrigins: ['shanna-unidentical-mechelle.ngrok-free.dev', 'http://192.168.100.5:3000', 'http://localhost:3000']
    /* config options here */
};

export default nextConfig;