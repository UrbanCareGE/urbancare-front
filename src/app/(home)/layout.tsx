import React from "react";
import {DesktopAdapter, MobileAdapter, TabletAdapter} from "@/components/common/ResponsiveSwitch";
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

            <TabletAdapter>
                <DesktopLayout>
                    {children}
                </DesktopLayout>
            </TabletAdapter>

            <DesktopAdapter>
                <DesktopLayout>
                    {children}
                </DesktopLayout>
            </DesktopAdapter>
        </>
    )
}