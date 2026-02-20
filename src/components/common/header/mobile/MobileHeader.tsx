import React from 'react';
import { MobileSideBar } from '@/components/home/sidebar/mobile/MobileSideBar';
import { ActiveUserAvatar } from '@/components/common/avatar/ActiveUserAvatar';
import { Menu } from 'lucide-react';
import { ProfileSideBarHeader } from '@/components/home/sidebar/mobile/profile/ProfileSideBarHeader';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { ProfileSideBarBody } from '@/components/home/sidebar/mobile/profile/ProfileSIdeBarBody';
import { NeighborhoodSelect } from '@/components/home/NeighborhoodSelect';
import NavigationArea from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { NavSideBarHeader } from '@/components/home/sidebar/mobile/navigation/NavSideBarHeader';
import { useMobileScroll } from '@/hooks/use-mobile-scroll';
import { cn } from '@/lib/utils';
import { UrbanCareTextIcon } from '@/components/common/logo/AppLogo';

export const MobileHeader = () => {
  const { isVisible } = useMobileScroll();

  return (
    <header
      className={cn(
        'h-[4rem] flex items-center px-3 border-b border-border sticky top-0 bg-surface !z-[20] transition-all duration-500 ease-in-out will-change-transform -translate-y-20',
        {
          'translate-y-0': isVisible,
          'opacity-0': !isVisible,
        }
      )}
    >
      <MobileSideBar side={'left'}>
        <MobileSideBar.Trigger>
          <Menu className={'w-7 h-7 text-icon'} />
        </MobileSideBar.Trigger>
        <MobileSideBar.Content>
          <MobileSideBar.Header>
            <NavSideBarHeader />
          </MobileSideBar.Header>
          <MobileSideBar.Body className={'px-3'}>
            <NavigationArea />
          </MobileSideBar.Body>
          <MobileSideBar.Footer className={'bg-surface-variant'}>
            <NeighborhoodSelect />
          </MobileSideBar.Footer>
        </MobileSideBar.Content>
      </MobileSideBar>
      <UrbanCareTextIcon className={'ml-3 mr-auto'} />
      {/*<span className={"ml-3 font-semibold text-xl text-center mr-auto"}>URBANCARE</span>*/}
      <MobileSideBar side={'right'}>
        <MobileSideBar.Trigger>
          <ActiveUserAvatar />
        </MobileSideBar.Trigger>
        <MobileSideBar.Content>
          <MobileSideBar.Header>
            <ProfileSideBarHeader />
          </MobileSideBar.Header>
          <MobileSideBar.Body>
            <ProfileSideBarBody />
          </MobileSideBar.Body>
          <MobileSideBar.Footer>
            <LogoutButton />
          </MobileSideBar.Footer>
        </MobileSideBar.Content>
      </MobileSideBar>
    </header>
  );
};
