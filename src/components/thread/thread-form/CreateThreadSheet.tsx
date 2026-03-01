import React, { useContext, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface CreateThreadSheetContextValue {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CreateThreadSheetContext = React.createContext<
  CreateThreadSheetContextValue | undefined
>(undefined);

export const useThreadDrawer = () => {
  const context = useContext(CreateThreadSheetContext);
  if (context === undefined) {
    throw new Error('useThreadDrawer must be used within a CreateThreadSheet');
  }
  return context;
};

interface CreateThreadSheetContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CreateThreadSheetContent = ({
  className,
  children,
}: CreateThreadSheetContentProps) => {
  const { isOpen, closeDrawer } = useThreadDrawer();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent
        side="bottom"
        className={cn(
          'flex flex-col h-full w-full bg-background overflow-y-scroll',
          className
        )}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

interface CreateThreadSheetTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export const CreateThreadSheetTrigger = ({
  className,
  children,
}: CreateThreadSheetTriggerProps) => {
  const { openDrawer } = useThreadDrawer();

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

export const CreateThreadSheetRoot = ({
  children,
}: CreateThreadSheetRootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const value: CreateThreadSheetContextValue = {
    isOpen,
    openDrawer: () => setIsOpen(true),
    closeDrawer: () => setIsOpen(false),
  };

  return (
    <CreateThreadSheetContext.Provider value={value}>
      {children}
    </CreateThreadSheetContext.Provider>
  );
};

export const CreateThreadSheet = Object.assign(CreateThreadSheetRoot, {
  Content: CreateThreadSheetContent,
  Trigger: CreateThreadSheetTrigger,
});

export default CreateThreadSheet;
