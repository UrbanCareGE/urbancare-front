import React from 'react';
import {
  LargeDesktopAdapter,
  MobileAdapter,
  TabletAdapter,
} from '@/components/common/layouts/ResponsiveSwitch';
import MobileLayout from '@/app/auth/mobile-layout';
import DesktopLayout from '@/app/auth/desktop-layout';
import TabletLayout from '@/app/auth/tablet-layout';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileAdapter>
        <MobileLayout>{children}</MobileLayout>
      </MobileAdapter>
      <TabletAdapter>
        <TabletLayout>{children}</TabletLayout>
      </TabletAdapter>
      <LargeDesktopAdapter>
        <DesktopLayout>{children}</DesktopLayout>
      </LargeDesktopAdapter>
    </>
  );
}
