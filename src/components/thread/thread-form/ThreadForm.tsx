import React, { useContext, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface ThreadFormDrawerContextValue {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ThreadFormSheetContext = React.createContext<
  ThreadFormDrawerContextValue | undefined
>(undefined);

const useThreadDrawer = () => {
  const context = useContext(ThreadFormSheetContext);
  if (context === undefined) {
    throw new Error('useThread must be used within a ThreadCard');
  }
  return context;
};

interface ThreadFormDrawerProps {
  className?: string;
  children: React.ReactNode;
}

export const ThreadFormSheet = ({
  className,
  children,
}: ThreadFormDrawerProps) => {
  const { isOpen, closeDrawer } = useThreadDrawer();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent
        side={'bottom'}
        className={cn(
          'flex flex-col h-full w-full bg-slate-50 overflow-y-scroll',
          className
        )}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

interface ThreadFormTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export const ThreadFormTrigger = ({
  className,
  children,
}: ThreadFormTriggerProps) => {
  const { isOpen, openDrawer } = useThreadDrawer();

  return (
    <Card
      onClick={(e) => {
        e.stopPropagation();
        openDrawer();
      }}
      className={cn(
        'overflow-hidden shadow-sm border-slate-200 bg-white transition-all duration-200 cursor-pointer hover:shadow-md hover:border-slate-300',
        className
      )}
    >
      {children}
    </Card>
  );
};

interface ThreadFormRootProps {
  className?: string;
  children: React.ReactNode;
}

export const ThreadFormRoot = ({
  className,
  children,
}: ThreadFormRootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const drawerValue: ThreadFormDrawerContextValue = {
    isOpen,
    openDrawer: () => setIsOpen(true),
    closeDrawer: () => setIsOpen(false),
  };

  return (
    <ThreadFormSheetContext.Provider value={drawerValue}>
      {children}
    </ThreadFormSheetContext.Provider>
  );
};

export const ThreadForm = Object.assign(ThreadFormRoot, {
  Sheet: ThreadFormSheet,
  Trigger: ThreadFormTrigger,
});

export default ThreadForm;
