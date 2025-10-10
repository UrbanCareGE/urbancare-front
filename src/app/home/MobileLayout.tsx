import {HomeColumnPanel} from "@/components/home/HomeColumnPanel";
import {MasterBarHeader} from "@/components/common/header/MasterBarHeader";
import React from "react";

export const MobileLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-6">
            {children}
        </main>
    );
};
