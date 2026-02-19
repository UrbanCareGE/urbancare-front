// components/thread/ThreadCard.tsx
'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ThreadInfoDTO } from '@/model/thread.dto';

interface ThreadContextValue {
  thread: ThreadInfoDTO;
  setThread: React.Dispatch<React.SetStateAction<ThreadInfoDTO>>;
}

const ThreadContext = React.createContext<ThreadContextValue | undefined>(
  undefined
);

export function useThread() {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error('useThread must be used within a ThreadCard');
  }
  return context;
}

interface ThreadCardRootProps {
  className?: string;
  children: React.ReactNode;
  thread: ThreadInfoDTO;
}

const ThreadCardRoot = ({
  thread,
  children,
  className,
}: ThreadCardRootProps) => {
  const [threadState, setThreadState] = useState<ThreadInfoDTO>(thread);

  useEffect(() => {
    setThreadState(thread);
  }, [thread]);

  const contextValue = useMemo(
    () => ({ thread: threadState, setThread: setThreadState }),
    [threadState]
  );
  return (
    <ThreadContext.Provider value={contextValue}>
      <Card
        className={cn(
          'overflow-hidden rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] p-4 space-y-4',
          'shadow-sm shadow-[rgb(var(--color-shadow)/0.06)]',
          'transition-all duration-200 cursor-pointer',
          'hover:-translate-y-0.5 hover:shadow-md hover:shadow-[rgb(var(--color-shadow)/0.10)] hover:border-[rgb(var(--color-border-medium))]',
          className
        )}
      >
        {children}
      </Card>
    </ThreadContext.Provider>
  );
};

interface ThreadCardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const ThreadCardHeader = ({ className, children }: ThreadCardHeaderProps) => {
  return (
    <div className={cn('flex items-center justify-start w-full', className)}>
      {children}
    </div>
  );
};

interface ThreadCardBodyProps {
  className?: string;
  children: React.ReactNode;
}

const ThreadCardBody = ({ className, children }: ThreadCardBodyProps) => {
  return <div className={cn('w-full', className)}>{children}</div>;
};

interface ThreadCardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const ThreadCardFooter = ({ className, children }: ThreadCardFooterProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full gap-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export const ThreadCard = Object.assign(ThreadCardRoot, {
  Header: ThreadCardHeader,
  Body: ThreadCardBody,
  Footer: ThreadCardFooter,
});

export default ThreadCard;
