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

interface ThreadTagLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThreadTagLimitDialog = ({
  open,
  onOpenChange,
}: ThreadTagLimitDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-border">
        <DialogHeader>
          <DialogTitle>თეგების ლიმიტი</DialogTitle>
          <DialogDescription>
            თითოეულ პოსტზე შესაძლებელია მაქსიმუმ 3 თეგის მითითება.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={() => onOpenChange(false)}>
            გასაგებია
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
