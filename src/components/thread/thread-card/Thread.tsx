'use client';

import React from 'react';
import { useThreadDetails } from '@/hooks/query/thread/use-thread-details';
import { useParams } from 'next/navigation';
import ThreadCard from '@/components/thread/thread-card/ThreadCard';
import { ThreadPreviewHeader } from '@/components/thread/thread-card/thread-preview/ThreadPreviewHeader';
import { ThreadPreviewContent } from '@/components/thread/thread-card/thread-preview/ThreadPreviewContent';
import { ThreadPreviewActionSection } from '@/components/thread/thread-card/thread-preview/ThreadPreviewActionSection';

interface ThreadPreviewProps {
  threadId: string;
  defaultOpen?: boolean;
  expanded?: boolean;
  className?: string;
}

function ThreadSkeleton() {
  return (
    <div className="bg-surface urbancare-rounded-3xl p-4 space-y-4 animate-pulse">
      <div className="flex gap-3">
        <div className="w-12 h-12 urbancare-rounded-full bg-surface-container shrink-0"></div>
        <div className="flex-1 space-y-2 pt-0.5">
          <div className="h-3.5 bg-surface-container urbancare-rounded-full w-1/3"></div>
          <div className="h-3 bg-surface-container urbancare-rounded-full w-1/5"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-surface-container urbancare-rounded-full w-3/4"></div>
        <div className="h-3 bg-surface-container urbancare-rounded-full w-full"></div>
        <div className="h-3 bg-surface-container urbancare-rounded-full w-5/6"></div>
      </div>
    </div>
  );
}

export const Thread = ({ threadId, expanded, className }: ThreadPreviewProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const { data, isPending, error } = useThreadDetails(apartmentId, threadId);

  if (isPending && !data) {
    return <ThreadSkeleton />;
  }

  if (error) {
    return <></>;
  }

  return (
    <ThreadCard thread={data} className={className}>
      <ThreadCard.Header>
        <ThreadPreviewHeader />
      </ThreadCard.Header>
      <ThreadCard.Body>
        <ThreadPreviewContent expanded={expanded} />
      </ThreadCard.Body>
      <ThreadCard.Footer className={'pt-3 border-t border-border'}>
        <ThreadPreviewActionSection />
      </ThreadCard.Footer>
    </ThreadCard>
  );
};
