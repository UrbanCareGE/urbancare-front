'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import ThreadCard from '@/components/thread/thread-card/ThreadCard';
import { ThreadCommentsHeader } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentsHeader';
import { ThreadCommentGrid } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentGrid';
import { useThreadDetails } from '@/hooks/query/thread/use-thread-details';
import { useAuth } from '@/components/provider/AuthProvider';

interface ThreadCommentSectionProps {
  threadId: string;
  className?: string;
}

export const ThreadCommentSection = ({
  threadId,
  className,
}: ThreadCommentSectionProps) => {
  const { user } = useAuth();
  const apartmentId = user?.selectedApartmentId;
  const { data, isPending, error } = useThreadDetails(apartmentId, threadId);

  if (isPending || error || !data) return null;

  return (
    <ThreadCard
      thread={data}
      className={cn(
        'p-0 overflow-hidden shadow-sm shadow-shadow/5 ring-1 ring-border/50',
        className
      )}
    >
      <ThreadCard.Header className="px-5 py-3.5 border-b border-border bg-surface-container/30">
        <ThreadCommentsHeader />
      </ThreadCard.Header>
      <ThreadCard.Body>
        <ThreadCommentGrid />
      </ThreadCard.Body>
    </ThreadCard>
  );
};
