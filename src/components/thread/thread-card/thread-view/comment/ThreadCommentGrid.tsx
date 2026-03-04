'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ThreadComment } from '@/components/thread/thread-card/thread-view/comment/ThreadComment';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { ThreadViewCommentButton } from '@/components/thread/thread-card/thread-view/comment/ThreadViewCommentButton';

interface ThreadCommentsProps {
  className?: string;
}

export const ThreadCommentGrid = ({ className }: ThreadCommentsProps) => {
  const { thread } = useThread();

  return (
    <div className={cn('flex flex-col', className)}>
      <ThreadViewCommentButton
        thread={thread}
        className="border-t border-border bg-surface lg:border-t-0 lg:bg-transparent hidden lg:flex"
      />
      {/* Comments List */}
      <div>
        {thread.comments.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            <p>კომენტარები ჯერ არ არის</p>
            <p className="text-sm mt-1">იყავი პირველი ვინც დაწერს კომენტარს</p>
          </div>
        ) : (
          thread.comments.map((comment) => (
            <ThreadComment key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};
