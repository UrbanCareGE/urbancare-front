'use client';

import React, { useMemo } from 'react';
import { HomeIcon, NavigationIcon, Pencil, ShieldAlert, UserIcon } from 'lucide-react';
import { CreateUrgentDialog } from '@/components/urgent/CreateUrgentDialog';
import NavigationArea from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { NeighborhoodSelect } from '@/components/home/NeighborhoodSelect';
import { Chat } from '@/components/chat/Chat';
import { UrgentFeedCompactContainer } from '@/components/urgent/UrgentFeed';
import { HomeColumnPanel } from '@/components/home/HomeColumnPanel';
import { AppLogo } from '@/components/common/logo/AppLogo';
import { HeaderNavIsland } from '@/components/common/navbar/desktop/Navbar.desktop';
import { DesktopIsland } from '@/components/home/Island.desktop';
import { ProfileIslandDesktop } from '@/components/home/ProfileIsland.desktop';
import { useScrollRestoration } from '@/hooks/use-scroll-restoration';
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n';
import { ChatProvider } from '@/components/provider/ChatProvider';

const UrgentIsland = () => {
  const t = useTranslation();
  const { apartmentId } = useParams<{ apartmentId: string }>();
  return (
    <DesktopIsland
      title={t.nav.urgent}
      icon={<ShieldAlert className="w-4 h-4 text-error" />}
      className={'flex-1'}
      bodyClassName={'overflow-y-scroll overflow-x-hidden overscroll-x-none'}
      href={apartmentId ? `/apartment/${apartmentId}/urgent` : undefined}
      headerExtra={
        <CreateUrgentDialog>
          <button
            type="button"
            aria-label={t.urgent.createUrgent}
            className="inline-flex items-center justify-center w-7 h-7 urbancare-rounded-full text-foreground-secondary hover:text-foreground-primary hover:bg-surface transition-colors"
          >
            <Pencil className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </CreateUrgentDialog>
      }
    >
      <UrgentFeedCompactContainer />
    </DesktopIsland>
  );
};

const ChatIsland = () => {
  const t = useTranslation();
  const { apartmentId } = useParams<{ apartmentId: string }>();
  return (
    <DesktopIsland
      title={t.nav.chat}
      icon={<UserIcon className="w-4 h-4 text-tertiary" />}
      className={'mt-auto h-full flex-[2]'}
      href={apartmentId ? `/apartment/${apartmentId}/chat` : undefined}
    >
      <div className="overflow-y-hidden w-full h-full scrollbar-hide">
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
      icon={<HomeIcon className="w-4 h-4 text-primary" />}
      className={'h-full'}
    >
      <div className="overflow-y-auto overflow-x-hidden overscroll-x-none h-full scrollbar-hide">
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
      icon={<NavigationIcon className="w-4 h-4 text-primary" />}
      className={''}
      bodyClassName={'overflow-y-scroll overflow-x-hidden overscroll-x-none'}
    >
      <div className="h-full scrollbar-hide overflow-y-scroll overflow-x-hidden overscroll-x-none">
        <NavigationArea
          inSheet={false}
          className="w-full flex flex-col gap-1 p-2"
        />
      </div>
    </DesktopIsland>
  );
};

export const LayoutDesktop = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const feedScrollRef = useScrollRestoration<HTMLDivElement>();
  const pathName = usePathname();
  const paths = pathName.split('/');

  const showUrgent = useMemo(
    () => paths[paths.length - 1] !== 'urgent',
    [paths]
  );
  const showChat = useMemo(() => paths[paths.length - 1] !== 'chat', [paths]);

  return (
    <ChatProvider>
      <div className="h-dvh mx-auto p-3 max-w-[1920px] w-full flex justify-center gap-8 overflow-hidden">
        <HomeColumnPanel className="flex-1 max-w-[412px] min-w-0">
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

        <HomeColumnPanel className="flex-[2] min-w-0">
          <HomeColumnPanel.Header>
            <HeaderNavIsland />
          </HomeColumnPanel.Header>
          <HomeColumnPanel.Body
            ref={feedScrollRef}
            className="overflow-y-scroll overflow-x-hidden overscroll-x-none flex-1 min-h-0 flex flex-col scrollbar-hide"
          >
            {children}
          </HomeColumnPanel.Body>
        </HomeColumnPanel>

        <HomeColumnPanel className="flex-1 max-w-[612px] min-w-0">
          <HomeColumnPanel.Header>
            <ProfileIslandDesktop />
          </HomeColumnPanel.Header>
          <HomeColumnPanel.Body className={'flex-1 flex flex-col gap-4'}>
            {showUrgent && <UrgentIsland />}
            {showChat && <ChatIsland />}
          </HomeColumnPanel.Body>
        </HomeColumnPanel>
      </div>
    </ChatProvider>
  );
};
