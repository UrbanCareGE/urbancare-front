import React from 'react';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from '@/i18n';

export const ThreadCommentsHeader = () => {
  const { thread } = useThread();
  const t = useTranslation();
  const { commentCount } = thread;

  return (
    <div className="flex items-center gap-2">
      <MessageCircle className="w-5 h-5 text-text-tertiary" />
      <h2 className="text-urbancare-xl font-semibold text-text-primary">
        {t.thread.comments}
        {commentCount > 0 && (
          <span className="ml-1.5 text-urbancare-base font-normal text-text-tertiary tabular-nums">
            ({commentCount})
          </span>
        )}
      </h2>
    </div>
  );
};
