'use client';

import React, { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import ThreadCard from '@/components/thread/thread-card/ThreadCard';
import { ThreadCommentsHeader } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentsHeader';
import { ThreadCommentGrid } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentGrid';
import { useThreadDetails } from '@/hooks/query/thread/use-thread-details';
import { useAuth } from '@/components/provider/AuthProvider';
import {
  CommentSortOption,
  ThreadCommentDTO,
} from '@/model/dto/thread.dto';

interface ThreadCommentSectionProps {
  threadId: string;
  className?: string;
}

const likeCount = (comment: ThreadCommentDTO): number =>
  comment.reactions?.items?.[0]?.voteCount ?? 0;

const sortTopLevelComments = (
  comments: ThreadCommentDTO[] | undefined,
  sort: CommentSortOption
): ThreadCommentDTO[] => {
  if (!comments || comments.length === 0) return [];
  const copy = [...comments];
  if (sort === 'POPULAR') {
    copy.sort((a, b) => {
      const diff = likeCount(b) - likeCount(a);
      if (diff !== 0) return diff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } else {
    copy.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  return copy;
};

export const ThreadCommentSection = ({
  threadId,
  className,
}: ThreadCommentSectionProps) => {
  const { user } = useAuth();
  const apartmentId = user?.selectedApartmentId;
  const [commentSort, setCommentSort] = useState<CommentSortOption>('LATEST');
  const { data, isPending, error } = useThreadDetails(apartmentId, threadId);

  const sortedThread = useMemo(() => {
    if (!data) return data;
    return {
      ...data,
      comments: sortTopLevelComments(data.comments, commentSort),
    };
  }, [data, commentSort]);

  if (isPending || error || !sortedThread) return null;

  return (
    <ThreadCard
      thread={sortedThread}
      expanded
      className={cn(
        'p-0 overflow-hidden shadow-sm shadow-shadow/5 ring-1 ring-border/50',
        className
      )}
    >
      <ThreadCard.Header className="px-5 py-3.5 border-b border-border bg-surface-container/30">
        <ThreadCommentsHeader
          commentSort={commentSort}
          onCommentSortChange={setCommentSort}
        />
      </ThreadCard.Header>
      <ThreadCard.Body>
        <ThreadCommentGrid />
      </ThreadCard.Body>
    </ThreadCard>
  );
};
