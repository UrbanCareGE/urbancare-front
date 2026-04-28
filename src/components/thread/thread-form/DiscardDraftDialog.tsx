'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

interface DiscardDraftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDiscard: () => void;
}

export const DiscardDraftDialog = ({
  open,
  onOpenChange,
  onDiscard,
}: DiscardDraftDialogProps) => {
  const t = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md urbancare-rounded-3xl border-border bg-surface">
        <DialogHeader>
          <DialogTitle>{t.thread.discardDraftTitle}</DialogTitle>
          <DialogDescription>{t.thread.discardDraftConfirm}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 sm:flex-none"
          >
            {t.thread.keepEditing}
          </Button>
          <Button
            onClick={() => {
              onDiscard();
              onOpenChange(false);
            }}
            className={cn(
              'flex-1 sm:flex-none bg-error text-white',
              'lg:hover:bg-error-hover'
            )}
          >
            {t.thread.discardDraft}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
