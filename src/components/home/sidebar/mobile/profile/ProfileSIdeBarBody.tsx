import { ProfileSideBarGroup } from '@/components/home/sidebar/mobile/profile/ProfieSideBarGroup';
import React from 'react';
import { NavigationLink } from '@/components/home/sidebar/mobile/navigation/NavigationLink';
import { HandshakeIcon, HeadsetIcon, SettingsIcon } from 'lucide-react';
import { NavItem } from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { SheetClose } from '@/components/ui/sheet';
import LanguageSelector from '@/components/common/util/LanguageSelector';
import { MobileThemeSelector } from '@/components/common/util/MobileThemeSelector';
import { useTranslation } from '@/i18n';

export const getProfileItems = (
  t: ReturnType<typeof useTranslation>
): NavItem[] => [
  {
    href: '/profile',
    label: t.sidebar.settings,
    icon: <SettingsIcon className={'text-primary'} />,
  },
  {
    href: '/privacy',
    label: t.sidebar.privacy,
    icon: <HandshakeIcon className={'text-primary'} />,
  },
];

export const getSupportItems = (
  t: ReturnType<typeof useTranslation>
): NavItem[] => [
  {
    href: '/about',
    label: t.sidebar.aboutUs,
    icon: <HandshakeIcon className={'text-primary'} />,
  },
  {
    href: '/support',
    label: t.sidebar.help,
    icon: <HeadsetIcon className={'text-primary'} />,
  },
  {
    href: '/terms',
    label: t.sidebar.termsAndConditions,
    icon: <HandshakeIcon className={'text-primary'} />,
  },
];

const GradientDivider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-4" />
);

export const ProfileSideBarBody = () => {
  const t = useTranslation();
  const profileItems = getProfileItems(t);
  const supportItems = getSupportItems(t);

  return (
    <div className="w-full flex flex-col overflow-scroll">
      <ProfileSideBarGroup className="px-4">
        <ProfileSideBarGroup.Header
          title={t.sidebar.theme}
          dotClassName="bg-amber-400 shadow-amber-400/50"
        />
        <ProfileSideBarGroup.Content>
          <MobileThemeSelector />
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>

      <GradientDivider />

      <ProfileSideBarGroup className="px-4">
        <ProfileSideBarGroup.Header
          title={t.sidebar.language}
          dotClassName="bg-primary shadow-primary/50"
        />
        <ProfileSideBarGroup.Content>
          <LanguageSelector />
        </ProfileSideBarGroup.Content>
      </ProfileSideBarGroup>

      <GradientDivider />

      <ProfileSideBarGroup className="px-4">
        <ProfileSideBarGroup.Header
          title={t.sidebar.account}
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
          title={t.sidebar.technicalSupport}
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
