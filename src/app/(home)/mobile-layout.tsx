import React from "react";
import {Children} from "@/app/layout";
import {MobileHeader} from "@/components/common/header/mobile/MobileHeader";
import {MobileNavBar} from "@/components/common/navbar/mobile/MobileNavBar";

export const MobileLayout = ({children}: Children) => {
    return (
        <main className="flex flex-col w-full h-full ">
            <MobileHeader/>
            <div className="flex flex-1">
                {children}
            </div>
            <MobileNavBar/>
        </main>
    );
};
