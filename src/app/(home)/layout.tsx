import React from "react";
import {DesktopAdapter, MobileAdapter, TabletAdapter} from "@/components/common/ResponsiveSwitch";
import {Children} from "@/app/layout";
import {MobileLayout} from "@/app/(home)/mobile-layout";
import {DesktopLayout} from "@/app/(home)/desktop-layout";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {cookies} from "next/headers";
import {dehydrate} from "@tanstack/query-core";
import {User, UserDTO} from "@/model/auth.dto";

const JAVA_API_URL = process.env.JAVA_API_URL || 'http://localhost:8080';

export default async function HomeLayout({children}: Children) {
    const c = await cookies();
    const header = {
        "Authorization": c.get('auth-token')?.value ?? ""
    }
    const qc = new QueryClient();
    await qc.prefetchQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const {joinedApartments, ...dto} = await fetch(`${JAVA_API_URL}/api/secure/user/me`, {cache: 'no-store', headers: header})
                .then(r => r.json() as Promise<UserDTO>)
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
