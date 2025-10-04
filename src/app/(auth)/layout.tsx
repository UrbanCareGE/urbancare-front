import React from "react";
import Image from "next/image";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="relative flex justify-center items-center h-screen w-full overflow-hidden bg-gray-50">
            <Image
                src="/assets/tbilisi_wallpaper2.png"
                alt="Background"
                fill
                priority
                className="object-cover opacity-50"
            />
            <div className="relative flex w-[1280px] h-[86%] rounded-2xl overflow-hidden bg-white shadow-xl">
                <div className="flex-1 flex flex-col h-full justify-center items-center p-4">
                    <div className={"w-full"}>
                        {children}
                    </div>
                </div>
                <div className="flex-1 flex h-full justify-center items-center p-4">
                    <div className={"w-full h-full bg-primary rounded-2xl"}></div>
                </div>
            </div>
        </div>
    );
}
