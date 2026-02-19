'use client';

import React from 'react';
import { getClientFileUrl } from '@/lib/api-client';
import { ThreadImagePreview } from '@/components/thread/thread-card/image-preview/ThreadImagePreview';
import PollDisplay from '@/components/thread/thread-card/poll/PollDisplay';
import { useThread } from '@/components/thread/thread-card/ThreadCard';

interface ThreadCardContentProps {
  className?: string;
}

export const ThreadPreviewContent = ({ className }: ThreadCardContentProps) => {
  const { thread } = useThread();

  return (
    <div className={`flex flex-col gap-3 ${className || ''}`}>
      {thread.title && (
        <h2 className="text-base font-semibold text-[rgb(var(--color-text-primary))] line-clamp-2 leading-snug tracking-tight">
          {thread.title}
        </h2>
      )}

      <p
        className="text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed whitespace-pre-wrap line-clamp-3"
        // onClick={openView}
      >
        {thread.content}
      </p>

      {thread.imageIds && (
        <ThreadImagePreview
          imageLinks={thread.imageIds.map((id) => getClientFileUrl(id))}
        />
      )}

      {thread.poll && <PollDisplay thread={thread} className="mt-3" />}
    </div>
  );
};
