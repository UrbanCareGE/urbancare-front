import { X } from 'lucide-react';
import React from 'react';
import { AppLogo } from '@/components/common/logo/AppLogo';
import { SheetClose } from '@/components/ui/sheet';

export const NavSideBarHeader = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <AppLogo />
      <SheetClose asChild>
        <button
          type="button"
          className="p-1.5 rounded-panel bg-surface-container/60 hover:bg-surface-container transition-colors text-foreground-secondary hover:text-foreground-primary"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </SheetClose>
    </div>
  );
};
