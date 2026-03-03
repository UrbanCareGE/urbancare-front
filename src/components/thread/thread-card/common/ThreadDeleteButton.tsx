'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteThread } from '@/hooks/query/thread/use-delete-thread';
import { useThread } from '@/components/thread/thread-card/ThreadCard';

export const ThreadDeleteButton = () => {
  const { thread } = useThread();
  const { mutate, isPending } = useDeleteThread();

  return (
    <button
      onClick={() => mutate(thread.id)}
      disabled={isPending}
      className="flex w-full items-center gap-3 px-2 py-2 text-sm rounded-lg lg:hover:bg-error/5 transition-colors duration-150 disabled:opacity-50"
    >
      <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center shrink-0">
        {isPending ? (
          <Spinner className="w-4 h-4 text-error" />
        ) : (
          <Trash2 className="w-4 h-4 text-error" />
        )}
      </div>
      <span className="font-medium text-error">წაშლა</span>
    </button>
  );
};
