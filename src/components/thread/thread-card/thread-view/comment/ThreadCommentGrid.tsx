'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ThreadComment } from '@/components/thread/thread-card/thread-view/comment/ThreadComment';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { ThreadViewCommentButton } from '@/components/thread/thread-card/thread-view/comment/ThreadViewCommentButton';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from '@/i18n';

interface ThreadCommentsProps {
  className?: string;
}

export const ThreadCommentGrid = ({ className }: ThreadCommentsProps) => {
  const { thread } = useThread();
  const t = useTranslation();

  return (
    <div className={cn('flex flex-col', className)}>
      <ThreadViewCommentButton
        thread={thread}
        className="border-t border-border bg-surface lg:border-t-0 lg:bg-transparent hidden lg:flex"
      />

      {thread.comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div
            className={cn(
              'w-16 h-16 urbancare-rounded-full',
              'bg-tertiary-container/50 flex items-center justify-center',
              'animate-float'
            )}
          >
            <MessageCircle className="w-8 h-8 text-tertiary-container-foreground" />
          </div>
          <div className="text-center space-y-1">
            <p className="urbancare-text-base font-semibold text-text-secondary">
              {t.thread.noCommentsYet}
            </p>
            <p className="urbancare-text-sm text-text-tertiary">
              {t.thread.beFirstToComment}
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-border/60">
          {thread.comments.map((comment) => (
            <ThreadComment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
