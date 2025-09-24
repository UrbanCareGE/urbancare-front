import React from "react";
import Image from "next/image";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center h-screen w-full overflow-hidden bg-gray-50">
            <div className="flex w-[1280px] h-[86%] rounded-3xl overflow-hidden bg-white shadow-xl">
                <div className="flex-1 flex h-full justify-center items-center p-1">
                    {children}
                </div>
                <div className="flex-1 flex h-full p-8 bg-primary overflow-hidden">
                    {/*<div className={"absolute aspect-square h-screen rotate-[5deg] bg-primary"}></div>*/}
                </div>
            </div>
        </div>
    );
}
