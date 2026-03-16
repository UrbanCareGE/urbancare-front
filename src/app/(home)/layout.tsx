import React from 'react';
import {
  DesktopAdapter,
  MobileAdapter,
  TabletAdapter,
} from '@/components/common/layouts/ResponsiveSwitch';
import { Children } from '@/app/layout';
import { MobileLayout } from '@/app/(home)/layout.mobile';
import { LayoutDesktop } from '@/app/(home)/layout.desktop';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';
import { TabletLayout } from '@/app/(home)/tablet-layout';

export default async function HomeLayout({ children }: Children) {
  const qc = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <MobileAdapter>
        <MobileLayout>{children}</MobileLayout>
      </MobileAdapter>

      <TabletAdapter>
        <TabletLayout>{children}</TabletLayout>
      </TabletAdapter>

      <DesktopAdapter>
        <LayoutDesktop>{children}</LayoutDesktop>
      </DesktopAdapter>
    </HydrationBoundary>
  );
}
