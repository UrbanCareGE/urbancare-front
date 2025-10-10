import React from "react";
import {LeftPanel} from "@/app/home/LeftPanel";
import {RightPanel} from "@/app/home/RightPanel";

export const DesktopLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-6">
            <LeftPanel />
            {children}
            <RightPanel />
        </main>
    );
};
