import React from "react";
import {DesktopAdapter, MobileAdapter} from "@/components/common/ResponsiveSwitch";
import {Children} from "@/app/layout";
import {MobileLayout} from "@/app/(home)/mobile-layout";
import {DesktopLayout} from "@/app/(home)/desktop-layout";

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