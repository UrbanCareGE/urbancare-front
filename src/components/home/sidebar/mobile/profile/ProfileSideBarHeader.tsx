import React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { SideBarProfileHeader } from '@/components/profile/mobile/SideBarProfileHeader';
import { X } from 'lucide-react';

export const ProfileSideBarHeader = () => {
  return (
    <div className={'flex justify-between items-start w-full'}>
      <SideBarProfileHeader />
      <SheetPrimitive.Close asChild>
        <div className={'bg-surface-container/60 rounded-panel my-1 p-1'}>
          <X className={'h-7 w-7 text-foreground-secondary'}></X>
        </div>
      </SheetPrimitive.Close>
    </div>
  );
};
