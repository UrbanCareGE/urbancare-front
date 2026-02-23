import { ProfileSideBarGroup } from '@/components/home/sidebar/mobile/profile/ProfieSideBarGroup';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { NavigationLink } from '@/components/home/sidebar/mobile/navigation/NavigationLink';
import {
  HandshakeIcon,
  HeadsetIcon,
  Lock,
  SettingsIcon,
  UserPen,
} from 'lucide-react';
import { NavItem } from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { SheetClose } from '@/components/ui/sheet';
import LanguageSelector from '@/components/common/util/LanguageSelector';
import { MobileThemeSelector } from '@/components/common/util/MobileThemeSelector';

export const profileItems: NavItem[] = [
  {
    href: '/profile',
    label: 'პარამეტრები',
    icon: <SettingsIcon className={'text-primary'} />,
  },
  {
    href: '/privacy',
    label: 'კონფიდენციალურობა',
    icon: <HandshakeIcon className={'text-primary'} />,
  },
];

export const supportItems: NavItem[] = [
  {
    href: '/about',
    label: 'ჩვენ შესახებ',
    icon: <HandshakeIcon className={'text-primary'} />,
  },
  {
    href: '/support',
    label: 'დახმარება',
    icon: <HeadsetIcon className={'text-primary'} />,
  },
  {
    href: '/terms',
    label: 'წესები და პირობები',
    icon: <HandshakeIcon className={'text-primary'} />,
  },
];

export const ProfileSideBarBody = () => {
  return (
    <div className={'w-full flex flex-col overflow-scroll'}>
      <ProfileSideBarGroup className={'px-4'}>
        <ProfileSideBarGroup.Header title={'ფონი'} />
        <ProfileSideBarGroup.Content>
          <MobileThemeSelector />
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>
      <Separator className={'bg-border'} />
      <ProfileSideBarGroup className={'px-4'}>
        <ProfileSideBarGroup.Header title={'ენა'} />
        <ProfileSideBarGroup.Content>
          <LanguageSelector />
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>
      <Separator className={'bg-border'} />
      <ProfileSideBarGroup className={'px-4'}>
        <ProfileSideBarGroup.Header title={'ანგარიში'} />
        <ProfileSideBarGroup.Content>
          {profileItems.map((item, index) => (
            <SheetClose asChild key={item.href}>
              <NavigationLink
                className={'px-0 pr-2 mb-2'}
                key={item.href}
                navigationItem={item}
                href={item.href}
              />
            </SheetClose>
          ))}
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>
      <Separator className={'bg-border'} />
      <ProfileSideBarGroup className={'px-4'}>
        <ProfileSideBarGroup.Header title={'ტექნიკური მხარდაჭერა'} />
        <ProfileSideBarGroup.Content>
          {supportItems.map((item, index) => (
            <SheetClose asChild key={item.href}>
              <NavigationLink
                className={'px-0 pr-2 mb-2'}
                key={item.href}
                navigationItem={item}
                href={item.href}
              />
            </SheetClose>
          ))}
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>
    </div>
  );
};
