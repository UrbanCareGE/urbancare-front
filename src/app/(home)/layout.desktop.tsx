'use client';

import React from 'react';
import { ChatProvider } from '@/components/provider/ChatProvider';
import {
  BellIcon,
  HomeIcon,
  NavigationIcon,
  ShieldAlert,
  UserIcon,
} from 'lucide-react';
import NavigationArea from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { NeighborhoodSelect } from '@/components/home/NeighborhoodSelect';
import { Chat } from '@/components/chat/Chat';
import UrgentFeed from '@/components/urgent/UrgentFeed';
import { HomeColumnPanel } from '@/components/home/HomeColumnPanel';
import { AppLogo } from '@/components/common/logo/AppLogo';
import { HeaderUserDropdown } from '@/components/common/header/desktop/Header.desktop';
import { HeaderNavIsland } from '@/components/common/navbar/desktop/Navbar.desktop';
import { DesktopIsland } from '@/components/home/Island.desktop';
import { ProfileIslandDesktop } from '@/components/home/ProfileIsland.desktop';

const UrgentIsland = () => (
  <DesktopIsland
    title="სასწრაფო"
    icon={<ShieldAlert className="w-4 h-4 text-error" />}
  >
    <div className="overflow-y-scroll scrollbar-hide">
      <UrgentFeed />
    </div>
  </DesktopIsland>
);

const ChatIsland = () => (
  <DesktopIsland
    title="ჩატი"
    icon={<UserIcon className="w-4 h-4 text-error" />}
    className={'h-full'}
  >
    <div className="overflow-y-auto h-full scrollbar-hide">
      <Chat />
    </div>
  </DesktopIsland>
);

const NeighbourSelectIsland = () => (
  <DesktopIsland
    title="სამეზობლოები"
    icon={<HomeIcon className="w-4 h-4 text-error" />}
    className={'h-full'}
  >
    <div className="overflow-y-auto h-full scrollbar-hide">
      <NeighborhoodSelect />
    </div>
  </DesktopIsland>
);

const NavigationIsland = () => (
  <DesktopIsland
    title="ნავიგაცია"
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

export const LayoutDesktop = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      <div className="fixed inset-0 bg-background overflow-hidden">
        <div className="h-full max-w-[1612px] mx-auto p-3 flex justify-center gap-8">
          <HomeColumnPanel className="flex-1 max-w-[356px]">
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

          <HomeColumnPanel className="flex-2 min-w-0 flex-shrink-0">
            <HomeColumnPanel.Header className={'bg-yellow'}>
              <HeaderNavIsland />
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body className="flex-1 overflow-y-scroll bg-transparent">
              <div className="mx-auto flex flex-col h-full">{children}</div>
            </HomeColumnPanel.Body>
          </HomeColumnPanel>

          <HomeColumnPanel className="flex-1 max-w-[356px]">
            <HomeColumnPanel.Header>
              <ProfileIslandDesktop />
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body>
              <UrgentIsland />
            </HomeColumnPanel.Body>
            <HomeColumnPanel.Footer className="flex-1">
              <ChatIsland />
            </HomeColumnPanel.Footer>
          </HomeColumnPanel>
        </div>
      </div>
    </ChatProvider>
  );
};
