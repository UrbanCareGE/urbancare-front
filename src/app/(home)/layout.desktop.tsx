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
import { useTranslation } from '@/i18n';
import { CurrentUserExpandable } from '@/components/home/CurrentUserExpandable';

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

export const LayoutDesktop = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      <div className="h-dvh w-full p-3 flex gap-4 items-center">
        <HomeColumnPanel className="flex-1 min-w-0 max-w-[352px]">
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

        <HomeColumnPanel className="flex-1 min-w-0">
          <HomeColumnPanel.Header className={'gap-2'}>
            <div className="w-full grid grid-cols-[auto_1fr_auto] gap-x-3">
              <div className={""}></div>
              <div className={'flex justify-center items-center'}>
                <HeaderNavIsland />
              </div>

              <div className={"flex justify-center items-center"}>
                <CurrentUserExpandable />
              </div>
            </div>
          </HomeColumnPanel.Header>
          <HomeColumnPanel.Body className="flex-1 overflow-y-scroll h-full flex flex-col">
            {children}
          </HomeColumnPanel.Body>
        </HomeColumnPanel>
      </div>
    </ChatProvider>
  );
};
