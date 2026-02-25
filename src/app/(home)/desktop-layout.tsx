'use client';

import React from 'react';
import { ChatProvider } from '@/components/provider/ChatProvider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  Bell,
  ChartColumnIncreasingIcon,
  Headset,
  Home,
  Newspaper,
  Settings,
} from 'lucide-react';
import NavigationArea from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { NeighborhoodSelect } from '@/components/home/NeighborhoodSelect';
import { ActiveUserAvatar } from '@/components/common/avatar/ActiveUserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { useAuth } from '@/components/provider/AuthProvider';
import { UrbanCareTextIcon } from '@/components/common/logo/AppLogo';

const HeaderLogo = () => (
  <Link href="/" className="flex items-center">
    <UrbanCareTextIcon className="text-xl" />
  </Link>
);

const headerNavItems = [
  { href: '', label: 'მთავარი', icon: Home },
  { href: 'news', label: 'ფიდი', icon: Newspaper },
  { href: 'finances', label: 'სტატისტიკა', icon: ChartColumnIncreasingIcon },
  { href: 'help', label: 'დახმარება', icon: Headset },
];

const HeaderQuickNav = () => {
  const pathname = usePathname();
  const { apartmentId } = useParams<{ apartmentId: string }>();

  return (
    <nav className="flex items-center gap-1">
      {headerNavItems.map((item) => {
        const fullHref = `/apartment/${apartmentId}/${item.href}`;
        const isActive =
          item.href === ''
            ? pathname === `/apartment/${apartmentId}` ||
              pathname === `/apartment/${apartmentId}/`
            : pathname.startsWith(fullHref);

        return (
          <Link
            key={item.href}
            href={fullHref}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-panel text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary-container text-primary-container-foreground'
                : 'text-foreground-secondary hover:bg-surface-variant'
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const HeaderUserDropdown = () => {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ActiveUserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name} {user?.surname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.phone}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/apartment/${user.selectedApartmentId}/profile`}
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            პარამეტრები
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

const HeaderActions = () => (
  <div className="flex items-center gap-3">
    <button className="p-2 rounded-full hover:bg-surface-variant transition-colors text-foreground-secondary">
      <Bell className="w-5 h-5" />
    </button>
    <HeaderUserDropdown />
  </div>
);

const DesktopHeader = () => (
  <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 flex-shrink-0">
    <HeaderQuickNav />
    <HeaderActions />
  </header>
);

const SidebarHeader = () => (
  <div className="h-16 px-4 flex items-center border-b border-border">
    <HeaderLogo />
  </div>
);

const SidebarNav = () => (
  <div className="flex-1 overflow-y-auto px-3 py-4">
    <NavigationArea inSheet={false} className="w-full flex flex-col gap-1" />
  </div>
);

const SidebarFooter = () => (
  <div className="border-t border-border">
    <NeighborhoodSelect />
  </div>
);

const DesktopSidebar = () => (
  <aside className="w-[280px] h-full bg-surface border-r border-border flex flex-col flex-shrink-0">
    <SidebarHeader />
    <SidebarNav />
    <SidebarFooter />
  </aside>
);

export const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <DesktopSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <DesktopHeader />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto flex flex-col h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ChatProvider>
  );
};
