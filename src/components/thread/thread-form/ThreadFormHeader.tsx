import React from 'react';
import { Button } from '@/components/ui/button';
import {
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { useTranslation } from '@/i18n';

export const ThreadFormHeader = () => {
  const t = useTranslation();
  return (
    <SheetHeader className="px-3 py-3">
      <SheetDescription className="sr-only">
        {t.thread.newPostForm}
      </SheetDescription>
      <div className="flex items-center gap-2">
        <div className="w-8" />
        <div className="mr-auto ml-auto">
          <SheetTitle className="urbancare-text-2xl font-semibold text-foreground-primary">
            {t.thread.newPost}
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
