'use client';

import { Pencil } from 'lucide-react';
import React from 'react';
import { useTranslation } from '@/i18n';
import { useEditThreadOverlay } from '@/components/thread/thread-edit/EditThreadOverlay';

export const ThreadEditButton = () => {
  const t = useTranslation();
  const { open } = useEditThreadOverlay();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        open();
      }}
      className="flex w-full items-center gap-3 px-2 py-2 text-urbancare-base rounded-urbancare-lg lg:hover:bg-primary/5 transition-colors duration-150"
    >
      <div className="w-8 h-8 rounded-urbancare-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Pencil className="w-4 h-4 text-primary" />
      </div>
      <span className="font-medium text-text-primary">{t.common.edit}</span>
    </button>
  );
};
