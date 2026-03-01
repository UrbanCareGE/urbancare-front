import React from 'react';
import { ThreadUpvoteButton } from '@/components/thread/thread-card/thread-preview/action/ThreadUpvoteButton';
import { ThreadPreviewCommentButton } from '@/components/thread/thread-card/thread-preview/action/ThreadCommentButton';
import { ThreadShareButton } from '@/components/thread/thread-card/thread-preview/action/ThreadShareButton';

export const ThreadPreviewActionSection = () => {
  return (
    <div
      className={
        'flex justify-evenly items-center w-full border-t border-border pt-3'
      }
    >
      <ThreadUpvoteButton />
      <ThreadPreviewCommentButton />
      <ThreadShareButton />
    </div>
  );
};
