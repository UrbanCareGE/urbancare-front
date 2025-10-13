import React from "react";

export default function MobileLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full p-8">
            {children}
        </div>
    );
}
