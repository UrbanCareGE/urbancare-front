'use client';

import { Bookmark } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export const ThreadSaveButton = () => {
  const [saved, setSaved] = useState(false);

  return (
    <button
      onClick={() => setSaved((s) => !s)}
      className="flex w-full items-center gap-3 px-2 py-2 text-urbancare-base rounded-urbancare-lg lg:hover:bg-primary/5 transition-colors duration-150"
    >
      <div
        className={cn(
          'w-8 h-8 rounded-urbancare-lg flex items-center justify-center shrink-0 transition-colors',
          saved ? 'bg-primary/10' : 'bg-surface-container'
        )}
      >
        <Bookmark
          className={cn(
            'w-4 h-4 transition-colors',
            saved ? 'fill-primary text-primary' : 'text-icon'
          )}
        />
      </div>
      <span className={cn('font-medium', saved ? 'text-primary' : 'text-text-primary')}>
        {saved ? 'შენახული' : 'შენახვა'}
      </span>
    </button>
  );
};
