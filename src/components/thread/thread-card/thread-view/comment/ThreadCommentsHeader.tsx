import React from 'react';
import { useThread } from '@/components/thread/thread-card/ThreadCard';

export const ThreadCommentsHeader = () => {
  const { thread } = useThread();
  const { commentCount } = thread;
  return (
    <h2 className="text-lg font-semibold text-text-primary">
      კომენტარები ({commentCount})
    </h2>
  );
};
