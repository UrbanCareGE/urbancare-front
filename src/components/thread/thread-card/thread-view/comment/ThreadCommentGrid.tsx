'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ThreadComment } from '@/components/thread/thread-card/thread-view/comment/ThreadComment';
import { useThread } from '@/components/thread/thread-card/ThreadCard';

interface ThreadCommentsProps {
  className?: string;
}

export const ThreadCommentGrid = ({ className }: ThreadCommentsProps) => {
  const { thread } = useThread();

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Comments List */}
      <div>
        {thread.comments.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
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
