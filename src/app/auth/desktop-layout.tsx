import React from "react";
import Image from "next/image";

export default function DesktopLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="relative flex justify-center items-center h-screen w-full overflow-hidden bg-gray-50">
            <Image
                src="/assets/tbilisi_wallpaper2.png"
                alt="Background"
                fill
                priority
                className="object-cover opacity-50"
            />
            <div className="w-[640px] flex flex-col h-auto justify-center items-center p-8 bg-white z-50 rounded-3xl">
                {children}
            </div>

        </div>
    );
}
