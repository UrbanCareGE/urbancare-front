import { X } from 'lucide-react';
import React from 'react';
import { AppLogo } from '@/components/common/logo/AppLogo';
import { SheetClose } from '@/components/ui/sheet';
import * as SheetPrimitive from '@radix-ui/react-dialog';

export const NavSideBarHeader = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <AppLogo />
      <SheetPrimitive.Close asChild>
        <div className={'bg-surface-container/60 rounded-urbancare-panel my-1 p-1'}>
          <X className={'h-7 w-7 text-foreground-secondary'}></X>
        </div>
      </SheetPrimitive.Close>
    </div>
  );
};
