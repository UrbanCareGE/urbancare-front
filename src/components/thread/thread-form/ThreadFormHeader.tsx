import React from 'react';
import { Button } from '@/components/ui/button';
import {
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';

export const ThreadFormHeader = () => {
  return (
    <SheetHeader className="px-3 py-3">
      <SheetDescription className="sr-only">
        ახალი პოსტის შექმნის ფორმა
      </SheetDescription>
      <div className="flex items-center gap-2">
        <div className="w-8" />
        <div className="mr-auto ml-auto">
          <SheetTitle className="text-lg font-semibold text-foreground-primary">
            ახალი პოსტი
          </SheetTitle>
        </div>
        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-icon [&_svg]:size-7"
          >
            <X />
          </Button>
        </SheetClose>
      </div>
    </SheetHeader>
  );
};
