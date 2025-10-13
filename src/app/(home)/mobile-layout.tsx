import React from "react";
import {Children} from "@/app/layout";
import {MobileHeader} from "@/components/common/header/mobile/MobileHeader";
import {MobileNavBar} from "@/components/common/navbar/mobile/MobileNavBar";

export const MobileLayout = ({children}: Children) => {
    return (
        <main className="w-full min-h-full relative">
            <MobileHeader/>
            <div className="w-full">
                {children}
            </div>
            <MobileNavBar/>
        </main>
    );
};
