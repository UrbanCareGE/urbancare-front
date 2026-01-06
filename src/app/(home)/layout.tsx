import React from "react";
import {DesktopAdapter, LargeDesktopAdapter, MobileAdapter, TabletAdapter} from "@/components/common/layouts/ResponsiveSwitch";
import {Children} from "@/app/layout";
import {MobileLayout} from "@/app/(home)/mobile-layout";
import {DesktopLayout} from "@/app/(home)/desktop-layout";
import {LargeDesktopLayout} from "@/app/(home)/large-desktop-layout";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {cookies} from "next/headers";
import {dehydrate} from "@tanstack/query-core";
import {User} from "@/components/provider/AuthProvider"
import {AuthService} from "@/service/auth-service";

export default async function HomeLayout({children}: Children) {
    const c = await cookies();
    const authToken = c.get('auth-token')?.value;

    const qc = new QueryClient();

    // Only prefetch if we have a token - don't block rendering on failure
    if (authToken) {
        try {
            await qc.prefetchQuery({
                queryKey: ['user'],
                queryFn: async () => {
                    const {joinedApartments, ...dto} = await AuthService.nextGetUserInfo(authToken);
                    return {...dto, joinedApartments, selectedApartment: joinedApartments[0]} as User;
                }
            });
        } catch {
            // Let client-side handle auth errors
        }
    }

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

            <LargeDesktopAdapter>
                <LargeDesktopLayout>
                    {children}
                </LargeDesktopLayout>
            </LargeDesktopAdapter>
        </HydrationBoundary>
    )
}
