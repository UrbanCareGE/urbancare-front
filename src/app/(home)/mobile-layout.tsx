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
    // Check if we're on the apartment home page (chat)
    const isApartmentHome = /^\/apartment\/[^/]+$/.test(path);
    return (
        <main className={cn("w-full relative scrollbar-hide", {'flex flex-col h-full': isApartmentHome}, {'min-h-full': !isApartmentHome})}>
            <MobileHeader/>
            {children}
            {!isKeyboardOpen && <div className={"h-16"}/>}
            <MobileNavBar className={"fixed !bottom-0"}/>
        </main>
    );
};
