import React from 'react';
import { getClientFileUrl } from '@/lib/api-client';
import {
  MediaItem,
  ThreadImagePreview,
} from '@/components/thread/thread-card/image-preview/ThreadImagePreview';
import PollDisplay from '@/components/thread/thread-card/poll/PollDisplay';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { cn } from '@/lib/utils';

interface ThreadCardContentProps {
  className?: string;
}

export const ThreadViewContent = ({ className }: ThreadCardContentProps) => {
  const { thread } = useThread();

  const hasMedia = !!(thread.images && thread.images.length > 0);
  const hasPoll = !!thread.poll;
  const hasMediaOrPoll = hasMedia || hasPoll;

  return (
    <div className={cn('flex flex-col gap-4 overflow-hidden', className)}>
      <div className="flex flex-col gap-3 max-w-prose">
        {thread.title && (
          <h2 className="text-urbancare-4xl font-bold text-text-primary leading-tight-georgian tracking-tight">
            {thread.title}
          </h2>
        )}

        <p className="text-urbancare-xl text-text-primary leading-relaxed-georgian whitespace-pre-wrap">
          {thread.content}
        </p>
      </div>

      {hasMediaOrPoll && (
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}

      {hasMedia && (
        <div className="rounded-urbancare-2xl overflow-hidden ring-1 ring-border/50">
          <ThreadImagePreview
            mediaItems={thread.images!.map(({ id, contentType }) => {
              return {
                url: getClientFileUrl(id),
                type: contentType,
              } as MediaItem;
            })}
          />
        </div>
      )}

      {hasPoll && (
        <PollDisplay
          thread={thread}
          className="p-3 border border-border rounded-urbancare-3xl bg-surface-container/50"
        />
      )}
    </div>
  );
};
