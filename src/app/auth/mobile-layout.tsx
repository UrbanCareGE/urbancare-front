import React from "react";

export default function MobileLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full w-full">
            {children}
        </div>
    );
}