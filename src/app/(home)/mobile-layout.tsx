'use client'

import {Children} from "@/app/layout";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {MobileHeader} from "@/components/common/header/mobile/MobileHeader";
import {MobileNavBar} from "@/components/common/navbar/mobile/MobileNavBar";
import React from "react";
import useIsVirtualKeyboardOpen from "@/hooks/use-mobile-keyboard";

export const MobileLayout = ({children}: Children) => {
    const path = usePathname();
    const isKeyboardOpen = useIsVirtualKeyboardOpen();
    return (
        <main className={cn("w-full relative scrollbar-hide", {'flex flex-col h-full': path === '/'}, {'min-h-full': path !== '/'})}>
            <MobileHeader/>
            {children}
            {!isKeyboardOpen && <div className={"h-14"}/>}
            <MobileNavBar className={"fixed !bottom-0"}/>
        </main>
    );
};
