'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { useEditThreadOverlay } from '@/components/thread/thread-edit/EditThreadOverlay';

export const EditThreadFormHeader = () => {
  const t = useTranslation();
  const { close } = useEditThreadOverlay();

  return (
    <SheetHeader className="px-3 py-3">
      <SheetDescription className="sr-only">
        {t.thread.editPostDescription}
      </SheetDescription>
      <div className="flex items-center gap-2">
        <div className="w-8" />
        <div className="mr-auto ml-auto">
          <SheetTitle className="urbancare-text-2xl font-semibold text-foreground-primary">
            {t.thread.editPost}
          </SheetTitle>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={close}
          className="h-8 w-8 text-icon [&_svg]:size-7"
          aria-label={t.common.close}
        >
          <X />
        </Button>
      </div>
    </SheetHeader>
  );
};
