'use client';

import React, { createContext, useContext, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useDevice } from '@/hooks/use-device';

interface EditThreadOverlayContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const EditThreadOverlayContext = createContext<
  EditThreadOverlayContextType | undefined
>(undefined);

export const useEditThreadOverlay = () => {
  const context = useContext(EditThreadOverlayContext);
  if (!context) {
    throw new Error(
      'useEditThreadOverlay must be used within EditThreadOverlay'
    );
  }
  return context;
};

interface EditThreadOverlayProps {
  children: React.ReactNode;
}

export const EditThreadOverlayRoot = ({ children }: EditThreadOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <EditThreadOverlayContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </EditThreadOverlayContext.Provider>
  );
};

interface EditThreadOverlayTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const EditThreadOverlayTrigger = ({
  children,
  className,
}: EditThreadOverlayTriggerProps) => {
  const { open } = useEditThreadOverlay();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        open();
      }}
      className={className}
    >
      {children}
    </div>
  );
};

interface EditThreadOverlayContentProps {
  children: React.ReactNode;
  className?: string;
}

export const EditThreadOverlayContent = ({
  children,
  className,
}: EditThreadOverlayContentProps) => {
  const { isOpen, close } = useEditThreadOverlay();
  const { isDesktop } = useDevice();

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
        <DialogContent
          className={cn('border-border overflow-y-auto p-0 max-h-[85vh]')}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent
        side="bottom"
        className={cn(
          'flex flex-col h-full w-full bg-surface overflow-y-scroll',
          className
        )}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export const EditThreadOverlay = Object.assign(EditThreadOverlayRoot, {
  Trigger: EditThreadOverlayTrigger,
  Content: EditThreadOverlayContent,
});
