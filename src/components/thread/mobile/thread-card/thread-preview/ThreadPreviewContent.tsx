'use client';

import React from 'react';
import { useThread } from '@/components/thread/mobile/thread-card/ThreadCard';
import { usePreviewable } from '@/components/thread/mobile/Previewable';
import { PollDisplay } from '@/components/thread/mobile/thread-card/poll/PollDisplay';
import { ThreadImagePreview } from '@/components/thread/mobile/thread-card/image-preview/ThreadImagePreview';
import { getClientFileUrl } from '@/lib/api-client';

interface ThreadCardContentProps {
  className?: string;
}

export const ThreadPreviewContent = ({ className }: ThreadCardContentProps) => {
  const { thread } = useThread();
  // const { openView } = usePreviewable();

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
