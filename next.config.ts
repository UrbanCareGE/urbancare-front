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
    allowedDevOrigins: ['shanna-unidentical-mechelle.ngrok-free.dev', '192.168.100.3']
    /* config options here */
};

export default nextConfig;
