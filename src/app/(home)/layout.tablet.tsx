'use client';

import React from 'react';
import { Children } from '@/app/layout';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HeaderMobile } from '@/components/common/header/mobile/Header.mobile';
import { NavbarMobile } from '@/components/common/navbar/mobile/Navbar.mobile';
import useIsVirtualKeyboardOpen from '@/hooks/use-mobile-keyboard';
import { ChatProvider } from '@/components/provider/ChatProvider';

export const LayoutTablet = ({ children }: Children) => {
  const path = usePathname();
  const isKeyboardOpen = useIsVirtualKeyboardOpen();
  const isChatPage = path.match(/\/chat$/);

  return (
    <ChatProvider>
      <main
        className={cn(
          'w-full relative flex-1 flex flex-col min-h-0',
          { 'overflow-hidden': isChatPage },
          { 'scrollbar-hide overflow-y-auto': !isChatPage }
        )}
      >
        <HeaderMobile />
        <div
          className={cn('flex-1 flex flex-col min-h-0', {
            'overflow-y-auto scrollbar-hide': !isChatPage,
          })}
        >
          {children}
        </div>
        {!isKeyboardOpen && <div className={'h-16 shrink-0'} />}
        <NavbarMobile className={'fixed !bottom-0'} />
      </main>
    </ChatProvider>
  );
};
