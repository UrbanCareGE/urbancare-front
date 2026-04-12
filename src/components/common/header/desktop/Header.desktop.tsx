import React from 'react';
import { HeaderNavIsland } from '@/components/common/navbar/desktop/Navbar.desktop';
import Link from 'next/link';
import { Bell, Settings } from 'lucide-react';
import { useAuth } from '@/components/provider/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { useTranslation } from '@/i18n';
import {
  CurrentUserAvatar,
  UserAvatarView,
} from '@/components/common/avatar/UserAvatar';

const HeaderActionsIsland = () => (
  <div className="flex items-center gap-2 bg-surface border border-border rounded-urbancare-3xl px-3 py-2 shadow-sm shadow-shadow/5 flex-shrink-0">
    <button className="w-8 h-8 rounded-urbancare-xl flex items-center justify-center lg:hover:bg-surface-variant transition-colors duration-200 text-foreground-secondary lg:hover:text-foreground-primary lg:active:scale-95">
      <Bell className="w-4 h-4" />
    </button>
    <HeaderUserDropdown />
  </div>
);

export const HeaderDesktop = () => (
  <div className="flex-shrink-0 grid grid-cols-[260px_1fr] gap-3 items-center">
    <div className="relative flex items-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <HeaderNavIsland />
        </div>
      </div>
      <div className="ml-auto">
        <HeaderActionsIsland />
      </div>
    </div>
  </div>
);

export const HeaderUserDropdown = () => {
  const { user } = useAuth();
  const t = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <CurrentUserAvatar />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 bg-surface-variant border-border"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuItem asChild>
          <Link
            href={`/apartment/${user.selectedApartmentId!}/profile`}
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            {t.nav.settings}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2">
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
