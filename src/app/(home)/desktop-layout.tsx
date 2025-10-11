import React from "react";

export const DesktopLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-6">
            {children}
        </main>
    );
};
