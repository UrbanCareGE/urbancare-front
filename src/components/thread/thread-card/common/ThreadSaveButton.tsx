'use client';

import { Bookmark } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

export const ThreadSaveButton = () => {
  const [saved, setSaved] = useState(false);
  const t = useTranslation();

  return (
    <button
      onClick={() => setSaved((s) => !s)}
      className={cn(
        'flex w-full items-center gap-2.5 px-2 py-1 urbancare-text-base urbancare-rounded-lg transition-colors duration-150',
        saved ? 'lg:hover:bg-primary/5' : 'lg:hover:bg-surface-container'
      )}
    >
      <div
        className={cn(
          'w-7 h-7 urbancare-rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150',
          saved ? 'bg-primary/10' : 'bg-surface-container'
        )}
      >
        <Bookmark
          className={cn(
            'w-4 h-4 transition-colors duration-150',
            saved ? 'fill-primary text-primary' : 'text-icon'
          )}
        />
      </div>
      <span
        className={cn(
          'font-medium',
          saved ? 'text-primary' : 'text-text-primary'
        )}
      >
        {saved ? t.thread.saved : t.thread.save}
      </span>
    </button>
  );
};
