import React from 'react';
import { ThreadVoteButton } from '@/components/thread/thread-card/thread-preview/action/ThreadVoteButton';
import { ThreadPreviewCommentButton } from '@/components/thread/thread-card/thread-preview/action/ThreadCommentButton';
import { ThreadShareButton } from '@/components/thread/thread-card/thread-preview/action/ThreadShareButton';

export const ThreadPreviewActionSection = () => {
  return (
    <div className={'flex justify-evenly items-center w-full gap-2'}>
      <ThreadVoteButton />
      <ThreadPreviewCommentButton />
      <ThreadShareButton />
    </div>
  );
};
