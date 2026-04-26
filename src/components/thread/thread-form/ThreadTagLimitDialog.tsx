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

interface ThreadTagLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThreadTagLimitDialog = ({
  open,
  onOpenChange,
}: ThreadTagLimitDialogProps) => {
  const t = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md urbancare-rounded-3xl border-border">
        <DialogHeader>
          <DialogTitle>{t.threadForm.tagsLimit}</DialogTitle>
          <DialogDescription>{t.threadForm.maxTagsPerPost}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={() => onOpenChange(false)}>
            {t.common.understood}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
