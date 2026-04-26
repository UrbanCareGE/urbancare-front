'use client';

import { Flag } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

export const ThreadReportButton = () => {
  const t = useTranslation();
  const handleReport = () => {
    toast.info(t.thread.reportSubmitted);
  };

  return (
    <button
      onClick={handleReport}
      className="flex w-full items-center gap-2.5 px-2 py-1 urbancare-text-base urbancare-rounded-lg lg:hover:bg-warning/5 transition-colors duration-150"
    >
      <div className="w-7 h-7 urbancare-rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
        <Flag className="w-4 h-4 text-warning" />
      </div>
      <span className="font-medium text-warning">{t.thread.reportProblem}</span>
    </button>
  );
};
