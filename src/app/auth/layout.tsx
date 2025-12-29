import React from "react";
import {DesktopAdapter, MobileAdapter} from "@/components/common/layouts/ResponsiveSwitch";
import MobileLayout from "@/app/auth/mobile-layout";
import DesktopLayout from "@/app/auth/desktop-layout";

export default function HomeLayoutl({children}: { children: React.ReactNode }) {
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