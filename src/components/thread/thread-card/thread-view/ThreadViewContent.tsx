import React from 'react';
import { getClientFileUrl } from '@/lib/api-client';
import {
  MediaItem,
  ThreadImagePreview,
} from '@/components/thread/thread-card/image-preview/ThreadImagePreview';
import PollDisplay from '@/components/thread/thread-card/poll/PollDisplay';
import { useThread } from '@/components/thread/thread-card/ThreadCard';

interface ThreadCardContentProps {
  className?: string;
}

export const ThreadViewContent = ({ className }: ThreadCardContentProps) => {
  const { thread } = useThread();
  return (
    <div className={`flex flex-col gap-5 overflow-hidden ${className || ''}`}>
      {thread.title && (
        <h2 className="text-urbancare-xl font-semibold text-text-primary line-clamp-2 leading-snug tracking-tight">
          {thread.title}
        </h2>
      )}

      <p className="text-urbancare-xl text-text-secondary leading-relaxed whitespace-pre-wrap">
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

      {thread.poll && (
        <PollDisplay
          thread={thread}
          className="p-3 mt-4 border border-border rounded-urbancare-panel"
        />
      )}
    </div>
  );
};
