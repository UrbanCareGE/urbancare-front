import React, { useContext, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/components/common/layouts/ResponsiveLayout';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from '@/i18n';

interface CreateThreadOverlayContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CreateThreadOverlayContext = React.createContext<
  CreateThreadOverlayContextType | undefined
>(undefined);

export const useThreadOverlay = () => {
  const context = useContext(CreateThreadOverlayContext);
  if (context === undefined) {
    throw new Error('useThreadDrawer must be used within a CreateThreadSheet');
  }
  return context;
};

interface CreateThreadSheetContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CreateThreadOverlayContent = ({
  className,
  children,
}: CreateThreadSheetContentProps) => {
  const { isOpen, closeDrawer } = useThreadOverlay();
  const response = useResponsive();
  const t = useTranslation();

  if (response.isDesktop || response.isLargeDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
        <DialogContent
          className={cn(
            'border-border bg-surface p-0 max-h-[85vh] flex flex-col overflow-hidden gap-0',
            className
          )}
        >
          <DialogTitle className="sr-only">{t.thread.newPost}</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent
        side="bottom"
        className={cn(
          'flex flex-col h-full w-full bg-surface overflow-hidden p-0 gap-0',
          className
        )}
      >
        <SheetTitle className="sr-only">{t.thread.newPost}</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
};

interface CreateThreadSheetTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export const CreateThreadOverlayTrigger = ({
  className,
  children,
}: CreateThreadSheetTriggerProps) => {
  const { openDrawer } = useThreadOverlay();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        openDrawer();
      }}
      className={className}
    >
      {children}
    </div>
  );
};

interface CreateThreadSheetRootProps {
  children: React.ReactNode;
}

export const CreateThreadOverlayRoot = ({
  children,
}: CreateThreadSheetRootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const value: CreateThreadOverlayContextType = {
    isOpen,
    openDrawer: () => setIsOpen(true),
    closeDrawer: () => setIsOpen(false),
  };

  return (
    <CreateThreadOverlayContext.Provider value={value}>
      {children}
    </CreateThreadOverlayContext.Provider>
  );
};

export const CreateThreadOverlay = Object.assign(CreateThreadOverlayRoot, {
  Content: CreateThreadOverlayContent,
  Trigger: CreateThreadOverlayTrigger,
});

export default CreateThreadOverlay;
