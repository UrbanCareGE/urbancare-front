import React from "react";
import {DesktopLayout} from "@/app/home/DesktopLayout";
import {MobileLayout} from "@/app/home/MobileLayout";
import {headers} from "next/headers";

export default async function HomeLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <MobileAdapter>
                <MobileHeader/>
            </MobileAdapter>
            {children}
            <MobileAdapter>
                <MobileFooter/>
            </MobileAdapter>
        </>
    )
}