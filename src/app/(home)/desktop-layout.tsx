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
import { UrbanCareTextIcon } from '@/components/common/logo/AppLogo';
import { DesktopHeader } from '@/components/common/header/desktop/DesktopHeader';

const SidebarNavIsland = () => (
  <div className="flex-1 bg-surface border border-border rounded-2xl overflow-hidden flex flex-col min-h-0">
    <div className="flex-1 overflow-y-auto px-3 py-3 scrollbar-hide">
      <NavigationArea inSheet={false} className="w-full flex flex-col gap-1" />
    </div>
  </div>
);

const SidebarFooterIsland = () => (
  <div className="bg-surface border border-border rounded-2xl overflow-hidden flex-shrink-0">
    <NeighborhoodSelect />
  </div>
);

const DesktopSidebar = () => (
  <aside className="w-[260px] flex flex-col gap-3 flex-shrink-0">
    <SidebarNavIsland />
    <SidebarFooterIsland />
  </aside>
);

// ── Layout ───────────────────────────────────────────────────────────────────

export const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      <div className="h-screen bg-background overflow-hidden">
        <div className="h-full max-w-[1100px] mx-auto flex flex-col p-3 gap-3">
          <DesktopHeader />

          <div className="flex-1 flex gap-3 overflow-hidden min-h-0">
            <DesktopSidebar />

            <main className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto flex flex-col py-2">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};
