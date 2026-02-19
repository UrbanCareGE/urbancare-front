import React from 'react';
import { ThreadUpvoteButton } from '@/components/thread/thread-card/thread-preview/button/ThreadUpvoteButton';
import { ThreadPreviewCommentButton } from '@/components/thread/thread-card/thread-preview/button/ThreadCommentButton';
import { ThreadShareButton } from '@/components/thread/thread-card/thread-preview/button/ThreadShareButton';

export const ThreadPreviewActionSection = () => {
  return (
    <div
      className={
        'flex justify-evenly items-center w-full border-t border-[rgb(var(--color-border))] pt-3'
      }
    >
      <ThreadUpvoteButton />
      <ThreadPreviewCommentButton />
      <ThreadShareButton />
    </div>
  );
};
