import Image from "next/image";
import React from "react";

export const AppLogo = () => {
    return (
        <div className="h-14 w-full relative bg-white rounded-full">
            <Image
                src="/assets/urbancare-logo.png"
                alt="UrbanCare Logo"
                fill
                className="object-contain h-16 w-auto"
                priority
            />
        </div>
    );
};