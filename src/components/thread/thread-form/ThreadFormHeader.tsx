'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThreadOverlay } from '@/components/thread/thread-form/CreateThreadOverlay';
import { useTranslation } from '@/i18n';

export const ThreadFormHeader = () => {
  const t = useTranslation();
  const { closeDrawer } = useThreadOverlay();

  return (
    <header className="shrink-0 px-4 py-3 flex items-center gap-3">
      <h2 className="flex-1 urbancare-text-xl font-semibold text-text-primary leading-tight-georgian truncate">
        {t.thread.newPost}
      </h2>
      <button
        type="button"
        onClick={closeDrawer}
        aria-label={t.common.close}
        className={cn(
          'shrink-0 w-9 h-9 urbancare-rounded-lg',
          'flex items-center justify-center',
          'text-text-secondary lg:hover:text-text-primary lg:hover:bg-surface-hover',
          'transition-colors duration-150'
        )}
      >
        <X className="w-5 h-5" />
      </button>
    </header>
  );
};
