import React from 'react';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { useTranslation } from '@/i18n';

export const ThreadPreviewStatsSection = () => {
  const { thread } = useThread();
  const t = useTranslation();
  return (
    <div className="w-full px-4 py-3 flex items-center justify-start text-urbancare-base text-text-secondary border-y border-border">
      <span className="">
        {thread.voteDiff} {t.thread.likes}
      </span>
      <span className="mx-2">·</span>
      <span>
        {thread.commentCount} {t.thread.comment}
      </span>
    </div>
  );
};
