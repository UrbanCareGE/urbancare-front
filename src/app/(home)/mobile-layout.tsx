'use client'

import {Children} from "@/app/layout";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {MobileHeader} from "@/components/common/header/mobile/MobileHeader";
import {MobileNavBar} from "@/components/common/navbar/mobile/MobileNavBar";
import React from "react";

export const MobileLayout = ({children}: Children) => {
    const path = usePathname();
    return (
        <main className={cn("w-full relative", {'flex flex-col h-full': path === '/'}, {'min-h-full': path !== '/'})}>
            <MobileHeader className={"sticky top-0"}/>
            {children}
            <div className={"h-14 bg-transparent"}/>
            <MobileNavBar className={"fixed !bottom-0"}/>
        </main>
    );
};
