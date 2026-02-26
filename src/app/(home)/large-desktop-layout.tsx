'use client';

import React from 'react';
import { ChatProvider } from '@/components/provider/ChatProvider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  Bell,
  CircleUser,
  HouseIcon,
  MessageSquare,
  Newspaper,
  SendIcon,
  Settings,
  ShieldAlert,
} from 'lucide-react';
import { motion } from 'motion/react';
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
import { Chat } from '@/components/chat/Chat';
import UrgentFeed from '@/components/urgent/UrgentFeed';
import { UrbanCareTextIcon } from '@/components/common/logo/AppLogo';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  isAbsolute?: boolean;
};

const headerNavItems: NavItem[] = [
  { href: 'post', label: 'პოსტები', icon: HouseIcon },
  { href: 'urgent', label: 'სასწრაფო', icon: ShieldAlert },
  { href: '', label: 'მთავარი', icon: SendIcon },
  { href: '/welcome', label: 'სიახლეები', icon: Newspaper, isAbsolute: true },
  { href: 'profile', label: 'პროფილი', icon: CircleUser },
];

// ── Header islands ────────────────────────────────────────────────────────────

const HeaderLogoIsland = () => (
  <div className="relative overflow-hidden bg-surface rounded-2xl px-5 py-2.5 flex items-center flex-shrink-0 shadow-sm shadow-shadow/5">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-tertiary/[0.04] pointer-events-none" />
    <Link href="/" className="flex items-center">
      <UrbanCareTextIcon className="text-xl" />
    </Link>
  </div>
);

const HeaderNavIsland = () => {
  const pathname = usePathname();
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const getHref = (item: NavItem) => {
    if (item.isAbsolute) return item.href;
    if (!apartmentId) return '/';
    return item.href
      ? `/apartment/${apartmentId}/${item.href}`
      : `/apartment/${apartmentId}`;
  };

  const isActive = (item: NavItem) => {
    const href = getHref(item);
    if (item.isAbsolute || item.href === '') return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="flex items-center gap-1 bg-surface rounded-2xl p-1 shadow-sm shadow-shadow/5">
      {headerNavItems.map((item) => {
        const href = getHref(item);
        const active = isActive(item);

        return (
          <Link
            key={item.href}
            href={href}
            className={cn(
              'relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200',
              active
                ? 'text-primary'
                : 'text-foreground-secondary hover:text-foreground-primary'
            )}
          >
            {active && (
              <motion.div
                layoutId="desktop-nav-indicator"
                className="absolute inset-0 bg-surface-variant rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <item.icon
              className={cn('relative z-10 w-4 h-4', active && 'text-primary')}
            />
            <span className="relative z-10">{item.label}</span>
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
        <button className="outline-none">
          <ActiveUserAvatar />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-surface border-border w-72"
        align="end"
        sideOffset={8}
      >
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

const HeaderActionsIsland = () => (
  <div className="flex items-center gap-2 bg-surface rounded-2xl px-3 py-2 shadow-sm shadow-shadow/5 flex-shrink-0">
    <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-surface-variant transition-colors duration-200 text-foreground-secondary hover:text-foreground-primary">
      <Bell className="w-4 h-4" />
    </button>
    <HeaderUserDropdown />
  </div>
);

// Header grid mirrors the content row below: [sidebar col] [main col] [right panel col]
// Nav centered within the main column = centered above the feed
const DesktopHeader = () => (
  <div className="flex-shrink-0 grid grid-cols-[260px_1fr_380px] gap-3 items-center">
    <HeaderLogoIsland />
    <div className="flex justify-center">
      <HeaderNavIsland />
    </div>
    <div className="flex justify-end">
      <HeaderActionsIsland />
    </div>
  </div>
);

// ── Sidebar (nav + footer only — logo lives in the header) ───────────────────

const SidebarNavIsland = () => (
  <div className="flex-1 bg-surface rounded-2xl overflow-hidden flex flex-col min-h-0">
    <div className="flex-1 overflow-y-auto px-3 py-3 scrollbar-hide">
      <NavigationArea inSheet={false} className="w-full flex flex-col gap-1" />
    </div>
  </div>
);

const SidebarFooterIsland = () => (
  <div className="bg-surface rounded-2xl overflow-hidden flex-shrink-0">
    <NeighborhoodSelect />
  </div>
);

const DesktopSidebar = () => (
  <aside className="w-[260px] flex flex-col gap-3 flex-shrink-0 ">
    <SidebarNavIsland />
    <SidebarFooterIsland />
  </aside>
);

// ── Right panel islands ───────────────────────────────────────────────────────

type IslandProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const Island = ({ title, icon, children, className }: IslandProps) => (
  <div
    className={cn(
      'bg-surface rounded-2xl overflow-hidden flex flex-col',
      className
    )}
  >
    <div className="px-4 py-2.5 bg-surface-variant flex items-center gap-2 flex-shrink-0">
      {icon}
      <h3 className="font-semibold text-sm text-foreground-primary">{title}</h3>
    </div>
    <div className="flex-1 overflow-hidden">{children}</div>
  </div>
);

const UrgentIsland = () => (
  <Island
    title="სასწრაფო"
    icon={<ShieldAlert className="w-4 h-4 text-error" />}
    className="max-h-[45%]"
  >
    <div className="overflow-y-auto h-full scrollbar-hide">
      <UrgentFeed />
    </div>
  </Island>
);

const ChatIsland = () => (
  <Island
    title="ჩატი"
    icon={<MessageSquare className="w-4 h-4 text-primary" />}
    className="border border-border flex-1 min-h-[456px]"
  >
    <div className="h-full">
      <Chat />
    </div>
  </Island>
);

const RightPanel = () => (
  <aside className="w-[380px] flex flex-col gap-3 flex-shrink-0">
    <UrgentIsland />
    <ChatIsland />
  </aside>
);

// ── Layout ───────────────────────────────────────────────────────────────────

export const LargeDesktopLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ChatProvider>
      <div className="fixed inset-0 bg-background overflow-hidden">
        <div className="h-full max-w-[1440px] mx-auto flex flex-col p-3 gap-3">
          {/* Full-width header row — nav is truly centered */}
          <DesktopHeader />

          {/* Content row */}
          <div className="flex-1 flex gap-3 overflow-hidden min-h-0">
            <DesktopSidebar />

            <main className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto flex flex-col py-2">
                {children}
              </div>
            </main>

            <RightPanel />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};
