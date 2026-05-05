// components/thread/ThreadCard.tsx
'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ThreadInfoDTO } from '@/model/dto/thread.dto';

interface ThreadContextValue {
  thread: ThreadInfoDTO;
  setThread: React.Dispatch<React.SetStateAction<ThreadInfoDTO>>;
  expanded: boolean;
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
  expanded?: boolean;
}

const ThreadCardRoot = ({
  thread,
  children,
  className,
  expanded = false,
}: ThreadCardRootProps) => {
  const router = useRouter();
  const params = useParams<{ apartmentId: string }>();
  const [threadState, setThreadState] = useState<ThreadInfoDTO>(thread);

  useEffect(() => {
    setThreadState(thread);
  }, [thread]);

  const contextValue = useMemo(
    () => ({ thread: threadState, setThread: setThreadState, expanded }),
    [threadState, expanded]
  );

  // Whole-card navigation. Buttons, anchors, and anything with role="button"
  // (poll options, mention spans, etc.) bring their own handlers, so skip those.
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (expanded || !params?.apartmentId) return;
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"]')) return;
    router.push(`/apartment/${params.apartmentId}/thread/${threadState.id}`);
  };

  return (
    <ThreadContext.Provider value={contextValue}>
      <Card
        onClick={!expanded ? handleCardClick : undefined}
        className={cn(
          'urbancare-rounded-3xl border-none bg-surface p-4 space-y-4',
          'transition-all duration-200',
          !expanded && 'cursor-pointer lg:hover:shadow-md',
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
    <div className={cn('flex items-start justify-start w-full', className)}>
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
