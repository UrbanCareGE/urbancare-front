import {Children} from "@/app/layout";
import {DesktopAdapter, MobileAdapter} from "@/components/common/ResponsiveSwitch";
import {MobileHeader} from "@/components/common/header/mobile/MobileHeader";
import {MobileNavBar} from "@/components/common/navbar/mobile/MobileNavBar";
import React from "react";

export default function UnstructuredLayout({children}: Children) {
    return (
        <>
            <MobileAdapter>
                <MobileLayout>
                    {children}
                </MobileLayout>
            </MobileAdapter>
            <DesktopAdapter>
                <DesktopLayout>
                    {children}
                </DesktopLayout>
            </DesktopAdapter>
        </>
    )
}


const MobileLayout = ({children}: Children) => {
    return (
        <main className="w-full flex flex-col h-full">
            <MobileHeader/>
            {children}
            <MobileNavBar/>
        </main>
    );
};


const DesktopLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-6">
            {children}
        </main>
    );
};
