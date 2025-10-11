import React from "react";
import {DesktopAdapter, MobileAdapter} from "@/components/common/ResponsiveSwitch";
import {MobileLayout} from "@/app/(home)/mobile-layout";
import {DesktopLayout} from "@/app/(home)/desktop-layout";

export default async function HomeLayout({children}: { children: React.ReactNode }) {
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