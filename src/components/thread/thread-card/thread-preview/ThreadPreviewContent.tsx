'use client';

import React from 'react';
import { getClientFileUrl } from '@/lib/api-client';
import { MediaItem, ThreadImagePreview } from '@/components/thread/thread-card/image-preview/ThreadImagePreview';
import PollDisplay from '@/components/thread/thread-card/poll/PollDisplay';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { useRouter } from 'next/navigation';
import { router } from 'next/client';

interface ThreadCardContentProps {
  className?: string;
}

export const ThreadPreviewContent = ({ className }: ThreadCardContentProps) => {
  const { thread } = useThread();
  const router = useRouter();

  return (
    <div
      className={`flex flex-col gap-3 ${className || ''}`}
      onClick={() => {
        router.push(`thread/${thread.id}`);
      }}
    >
      {thread.title && (
        <h2 className="text-base font-semibold text-text-primary line-clamp-2 leading-snug tracking-tight">
          {thread.title}
        </h2>
      )}

      <p
        className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap line-clamp-3"
        // onClick={openView}
      >
        {thread.content}
      </p>

      {thread.imageIds && (
        <ThreadImagePreview
          mediaItems={thread.imageIds.map((id) => {
            return {
              url: getClientFileUrl(id),
              type: 'image',
            } as MediaItem;
          })}
        />
      )}

      {thread.poll && <PollDisplay thread={thread} className="mt-3" />}
    </div>
  );
};
