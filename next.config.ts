import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '**',
            }
        ],
        dangerouslyAllowLocalIP: true
    },
    allowedDevOrigins: ['shanna-unidentical-mechelle.ngrok-free.dev', 'http://192.168.100.5:3000', 'http://localhost:3000']
};

export default nextConfig;