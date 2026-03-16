'use client';

import React from 'react';
import { ChatProvider } from '@/components/provider/ChatProvider';
import { HomeIcon, NavigationIcon } from 'lucide-react';
import NavigationArea from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { NeighborhoodSelect } from '@/components/home/NeighborhoodSelect';
import { HomeColumnPanel } from '@/components/home/HomeColumnPanel';
import { AppLogo } from '@/components/common/logo/AppLogo';
import { HeaderNavIsland } from '@/components/common/navbar/desktop/Navbar.desktop';
import { DesktopIsland } from '@/components/home/Island.desktop';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { useTranslation } from '@/i18n';

const NeighbourSelectIsland = () => {
  const t = useTranslation();
  return (
    <DesktopIsland
      title={t.nav.neighborhoods}
      icon={<HomeIcon className="w-4 h-4 text-error" />}
      className={'h-full'}
    >
      <div className="overflow-y-auto h-full scrollbar-hide">
        <NeighborhoodSelect />
      </div>
    </DesktopIsland>
  );
};

const NavigationIsland = () => {
  const t = useTranslation();
  return (
    <DesktopIsland
      title={t.nav.navigation}
      icon={<NavigationIcon className="w-4 h-4 text-error" />}
      className={'h-full'}
    >
      <div className="overflow-y-auto h-full scrollbar-hide">
        <NavigationArea
          inSheet={false}
          className="w-full flex flex-col gap-1 p-2"
        />
      </div>
    </DesktopIsland>
  );
};

export const TabletLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      <div className="fixed inset-0 bg-background overflow-hidden">
        <div className="h-dvh max-w-[1512px] mx-auto p-3 flex justify-center gap-8">
          <HomeColumnPanel className="flex-1 max-w-[456px] flex-shrink-1">
            <HomeColumnPanel.Header>
              <AppLogo />
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body className="flex-1">
              <NavigationIsland />
            </HomeColumnPanel.Body>
            <HomeColumnPanel.Footer>
              <NeighbourSelectIsland />
            </HomeColumnPanel.Footer>
          </HomeColumnPanel>

          <HomeColumnPanel className="flex-[2] min-w-[512px]">
            <HomeColumnPanel.Header>
              <HeaderNavIsland />
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body
              className="flex-1 overflow-y-scroll h-full flex flex-col"
            >
              {children}
            </HomeColumnPanel.Body>
          </HomeColumnPanel>
        </div>
      </div>
    </ChatProvider>
  );
};
