'use client'

import React from "react";
import {DesktopAdapter, MobileAdapter} from "@/components/common/ResponsiveSwitch";
import {Children} from "@/app/layout";
import {MobileHeader} from "@/components/common/header/mobile/MobileHeader";
import {MobileNavBar} from "@/components/common/navbar/mobile/MobileNavBar";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export default function HomeLayout({children}: Children) {
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
    const path = usePathname();
    console.log(path)
    return (
        <main className={cn("w-full relative", {'flex flex-col h-full': path === '/'}, {'min-h-full': path !== '/'})}>
            <MobileHeader className={"sticky top-0"}/>
            {children}
            <div className={"h-14 bg-transparent"}/>
            <MobileNavBar className={"fixed bottom-0"}/>
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
