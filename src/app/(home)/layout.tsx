import React from 'react';
import {
  DesktopAdapter,
  MobileAdapter,
  TabletAdapter,
} from '@/components/common/layouts/ResponsiveSwitch';
import { Children } from '@/app/layout';
import { LayoutMobile } from '@/app/(home)/layout.mobile';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';
import { LayoutTablet } from '@/app/(home)/layout.tablet';
import { LayoutDesktop } from '@/app/(home)/layout.desktop';

export default async function HomeLayout({ children }: Children) {
  const qc = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <MobileAdapter>
        <LayoutMobile>{children}</LayoutMobile>
      </MobileAdapter>

      <TabletAdapter>
        <LayoutTablet>{children}</LayoutTablet>
      </TabletAdapter>

      <DesktopAdapter>
        <LayoutDesktop>{children}</LayoutDesktop>
      </DesktopAdapter>
    </HydrationBoundary>
  );
}
