import { ProfileSideBarGroup } from '@/components/home/sidebar/mobile/profile/ProfieSideBarGroup';
import React from 'react';
import { NavigationLink } from '@/components/home/sidebar/mobile/navigation/NavigationLink';
import {
  HandshakeIcon,
  HeadsetIcon,
  SettingsIcon,
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

const GradientDivider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-4" />
);

export const ProfileSideBarBody = () => {
  return (
    <div className="w-full flex flex-col overflow-scroll">

      <ProfileSideBarGroup className="px-4">
        <ProfileSideBarGroup.Header
          title="ფონი"
          dotClassName="bg-amber-400 shadow-amber-400/50"
        />
        <ProfileSideBarGroup.Content>
          <MobileThemeSelector />
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>

      <GradientDivider />

      <ProfileSideBarGroup className="px-4">
        <ProfileSideBarGroup.Header
          title="ენა"
          dotClassName="bg-primary shadow-primary/50"
        />
        <ProfileSideBarGroup.Content>
          <LanguageSelector />
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>

      <GradientDivider />

      <ProfileSideBarGroup className="px-4">
        <ProfileSideBarGroup.Header
          title="ანგარიში"
          dotClassName="bg-tertiary shadow-tertiary/50"
        />
        <ProfileSideBarGroup.Content>
          {profileItems.map((item) => (
            <SheetClose asChild key={item.href}>
              <NavigationLink
                className="px-0 pr-2"
                navigationItem={item}
                href={item.href}
              />
            </SheetClose>
          ))}
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>

      <GradientDivider />

      <ProfileSideBarGroup className="px-4">
        <ProfileSideBarGroup.Header
          title="ტექნიკური მხარდაჭერა"
          dotClassName="bg-success shadow-success/50"
        />
        <ProfileSideBarGroup.Content>
          {supportItems.map((item) => (
            <SheetClose asChild key={item.href}>
              <NavigationLink
                className="px-0 pr-2"
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
