'use client';

import React, { useMemo } from 'react';
import { ChatProvider } from '@/components/provider/ChatProvider';
import { HomeIcon, NavigationIcon, ShieldAlert, UserIcon } from 'lucide-react';
import NavigationArea from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { NeighborhoodSelect } from '@/components/home/NeighborhoodSelect';
import { Chat } from '@/components/chat/Chat';
import UrgentFeed from '@/components/urgent/UrgentFeed';
import { HomeColumnPanel } from '@/components/home/HomeColumnPanel';
import { AppLogo } from '@/components/common/logo/AppLogo';
import { HeaderNavIsland } from '@/components/common/navbar/desktop/Navbar.desktop';
import { DesktopIsland } from '@/components/home/Island.desktop';
import { ProfileIslandDesktop } from '@/components/home/ProfileIsland.desktop';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { usePathname } from 'next/navigation';

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
  const feedScrollRef = useScrollRestoration<HTMLDivElement>();
  const pathName = usePathname();
  const paths = pathName.split('/');

  const showUrgent = useMemo(() => paths[paths.length - 1] !== 'urgent', [paths]);
  const showChat = useMemo(
    () => paths[paths.length - 1] !== 'chat',
    [paths]
  );


  return (
    <ChatProvider>
      <div className="fixed inset-0 bg-background overflow-hidden">
        <div className="h-dvh max-w-[1512px] mx-auto p-3 flex justify-center gap-10">
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

          <HomeColumnPanel className="flex-[2] min-w-0 min-w-[512px]">
            <HomeColumnPanel.Header>
              <HeaderNavIsland />
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body
              ref={feedScrollRef}
              className="flex-1 overflow-y-scroll h-full flex flex-col"
            >
              {children}
            </HomeColumnPanel.Body>
          </HomeColumnPanel>

          <HomeColumnPanel className="flex-1 max-w-[456px] flex-shrink-1">
            <HomeColumnPanel.Header>
              <ProfileIslandDesktop />
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body>
              {showUrgent && <UrgentIsland />}
            </HomeColumnPanel.Body>
            <HomeColumnPanel.Footer className="flex-1">
              {showChat && <ChatIsland />}
            </HomeColumnPanel.Footer>
          </HomeColumnPanel>
        </div>
      </div>
    </ChatProvider>
  );
};
