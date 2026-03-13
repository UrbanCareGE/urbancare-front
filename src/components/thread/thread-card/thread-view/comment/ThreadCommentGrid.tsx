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
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-12 h-12 rounded-urbancare-full bg-surface-container flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-text-tertiary" />
          </div>
          <div className="text-center">
            <p className="text-urbancare-base font-medium text-text-secondary">
              {t.thread.noCommentsYet}
            </p>
            <p className="text-urbancare-sm text-text-tertiary mt-1">
              {t.thread.beFirstToComment}
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-border/40">
          {thread.comments.map((comment) => (
            <ThreadComment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
