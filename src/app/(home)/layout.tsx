import React from 'react';
import { DesktopAdapter, MobileAdapter, TabletAdapter } from '@/components/common/layouts/ResponsiveSwitch';
import { Children } from '@/app/layout';
import { MobileLayout } from '@/app/(home)/layout.mobile';
import { LayoutDesktop } from '@/app/(home)/layout.desktop';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';

export default async function HomeLayout({ children }: Children) {
  const qc = new QueryClient();

  // Only prefetch if we have a token - don't block rendering on failure
  // if (authToken) {
  //   try {
  //     await qc.prefetchQuery({
  //       queryKey: ['user'],
  //       queryFn: async () => {
  //         const { joinedApartments, ...dto } =
  //           await AuthService.nextGetUserInfo(authToken);
  //         return {
  //           ...dto,
  //           joinedApartments,
  //           selectedApartment: joinedApartments[0],
  //         } as UserModel;
  //       },
  //     });
  //   } catch {
  //     // Let client-side handle auth errors
  //   }
  // }

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <MobileAdapter>
        <MobileLayout>{children}</MobileLayout>
      </MobileAdapter>

      <TabletAdapter>
        <LayoutDesktop>{children}</LayoutDesktop>
      </TabletAdapter>

      <DesktopAdapter>
        <LayoutDesktop>{children}</LayoutDesktop>
      </DesktopAdapter>
    </HydrationBoundary>
  );
}
