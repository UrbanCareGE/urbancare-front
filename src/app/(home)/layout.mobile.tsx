'use client';

import React from 'react';
import { Children } from '@/app/layout';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HeaderMobile } from '@/components/common/header/mobile/Header.mobile';
import { NavbarMobile } from '@/components/common/navbar/mobile/Navbar.mobile';
import useIsVirtualKeyboardOpen from '@/hooks/use-mobile-keyboard';
import { ChatProvider } from '@/components/provider/ChatProvider';

export const MobileLayout = ({ children }: Children) => {
  const path = usePathname();
  const isKeyboardOpen = useIsVirtualKeyboardOpen();
  const isApartmentHome = /^\/apartment\/[^/]+$/.test(path);
  return (
    <ChatProvider>
      <main
        className={cn(
          'w-full relative scrollbar-hide',
          { 'flex flex-col h-full': isApartmentHome },
          { 'min-h-full': !isApartmentHome }
        )}
      >
        <HeaderMobile />
        {children}
        {!isKeyboardOpen && <div className={'h-16'} />}
        <NavbarMobile className={'fixed !bottom-0'} />
      </main>
    </ChatProvider>
  );
};
