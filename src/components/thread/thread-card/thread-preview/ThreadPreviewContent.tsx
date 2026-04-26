'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getClientFileUrl } from '@/lib/api-client';
import {
  MediaItem,
  ThreadImagePreview,
} from '@/components/thread/thread-card/image-preview/ThreadImagePreview';
import PollDisplay from '@/components/thread/thread-card/poll/PollDisplay';
import { useThread } from '@/components/thread/thread-card/ThreadCard';

interface ThreadCardContentProps {
  className?: string;
  expanded?: boolean;
}

export const ThreadPreviewContent = ({
  className,
  expanded,
}: ThreadCardContentProps) => {
  const { thread } = useThread();

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {thread.title && (
        <h2
          className={cn(
            'text-urbancare-2xl font-semibold text-text-primary leading-snug tracking-tight',
            !expanded && 'line-clamp-2'
          )}
        >
          {thread.title}
        </h2>
      )}

      <p
        className={cn(
          'text-urbancare-base text-text-secondary leading-relaxed whitespace-pre-wrap',
          !expanded && 'line-clamp-3'
        )}
      >
        {thread.content}
      </p>

      {thread.images && (
        <ThreadImagePreview
          mediaItems={thread.images.map(({ id, contentType }) => {
            return {
              url: getClientFileUrl(id),
              type: contentType,
            } as MediaItem;
          })}
        />
      )}

      {thread.poll && <PollDisplay thread={thread} className="mt-3" />}
    </div>
  );
};
