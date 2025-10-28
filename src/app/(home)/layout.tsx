import React from "react";
import {DesktopAdapter, MobileAdapter, TabletAdapter} from "@/components/common/ResponsiveSwitch";
import {Children} from "@/app/layout";
import {MobileLayout} from "@/app/(home)/mobile-layout";
import {DesktopLayout} from "@/app/(home)/desktop-layout";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {cookies} from "next/headers";
import {dehydrate} from "@tanstack/query-core";
import {User} from "@/components/provider/AuthProvider"
import {AuthService} from "@/service/auth-service";

export default async function HomeLayout({children}: Children) {
    const c = await cookies();
    const authToken = c.get('auth-token')?.value ?? "";

    const qc = new QueryClient();
    await qc.prefetchQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const {joinedApartments, ...dto} = await AuthService.nextGetUserInfo(authToken);
            return {...dto, joinedApartments, selectedApartment: joinedApartments[0]} as User;
        }
    })
    return (
        <HydrationBoundary state={dehydrate(qc)}>
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
        </HydrationBoundary>
    )
}
