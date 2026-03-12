'use client';

import { Flag } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

export const ThreadReportButton = () => {
  const handleReport = () => {
    toast.info('პრობლემა მოხსენიებულია');
  };

  return (
    <button
      onClick={handleReport}
      className="flex w-full items-center gap-3 px-2 py-2 text-urbancare-base rounded-urbancare-lg lg:hover:bg-warning/5 transition-colors duration-150"
    >
      <div className="w-8 h-8 rounded-urbancare-lg bg-warning/10 flex items-center justify-center shrink-0">
        <Flag className="w-4 h-4 text-warning" />
      </div>
      <span className="font-medium text-warning">პრობლემის შეტყობინება</span>
    </button>
  );
};
