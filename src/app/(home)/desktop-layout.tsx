'use client';

import React from 'react';
import { ChatProvider } from '@/components/provider/ChatProvider';
import NavigationArea from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { NeighborhoodSelect } from '@/components/home/NeighborhoodSelect';
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
              <div className="max-w-4xl mx-auto flex flex-col">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};
