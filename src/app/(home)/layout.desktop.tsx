'use client';

import React, { useMemo } from 'react';
import { ChatProvider } from '@/components/provider/ChatProvider';
import { HomeIcon, NavigationIcon, ShieldAlert, UserIcon } from 'lucide-react';
import NavigationArea from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { NeighborhoodSelect } from '@/components/home/NeighborhoodSelect';
import { Chat } from '@/components/chat/Chat';
import { UrgentFeedCompactContainer, UrgentFeedContainer } from '@/components/urgent/UrgentFeed';
import { HomeColumnPanel } from '@/components/home/HomeColumnPanel';
import { AppLogo } from '@/components/common/logo/AppLogo';
import { HeaderNavIsland } from '@/components/common/navbar/desktop/Navbar.desktop';
import { DesktopIsland } from '@/components/home/Island.desktop';
import { ProfileIslandDesktop } from '@/components/home/ProfileIsland.desktop';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n';

const UrgentIsland = () => {
  const t = useTranslation();
  return (
    <DesktopIsland
      title={t.nav.urgent}
      icon={<ShieldAlert className="w-4 h-4 text-error"/>}
      className={'flex-1'}
      bodyClassName={"overflow-y-scroll"}
    >
     <UrgentFeedCompactContainer/>
    </DesktopIsland>
  );
};

const ChatIsland = () => {
  const t = useTranslation();
  return (
    <DesktopIsland
      title={t.nav.chat}
      icon={<UserIcon className="w-4 h-4 text-error" />}
      className={'mt-auto h-full flex-[2]'}
    >
      <div className="overflow-y-hidden h-full scrollbar-hide">
        <Chat />
      </div>
    </DesktopIsland>
  );
};

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
  const feedScrollRef = useScrollRestoration<HTMLDivElement>();
  const pathName = usePathname();
  const paths = pathName.split('/');

  const showUrgent = useMemo(
    () => paths[paths.length - 1] !== 'urgent',
    [paths],
  );
  const showChat = useMemo(() => paths[paths.length - 1] !== 'chat', [paths]);

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
              ref={feedScrollRef}
              className="flex-1 overflow-y-scroll h-full flex flex-col"
            >
              {children}
            </HomeColumnPanel.Body>
          </HomeColumnPanel>

          <HomeColumnPanel className="flex-1 max-w-[512px] flex-shrink-1">
            <HomeColumnPanel.Header>
              <ProfileIslandDesktop />
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body className={'flex-1 flex flex-col gap-4'}>
              {showUrgent && <UrgentIsland />}
              {showChat && <ChatIsland />}
            </HomeColumnPanel.Body>
          </HomeColumnPanel>
        </div>
      </div>
    </ChatProvider>
  );
};
