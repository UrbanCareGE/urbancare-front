import React from "react";


export const TabletLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main className="flex w-full h-screen overflow-hidden gap-8 px-6">
            {children}
        </main>
    );
};
