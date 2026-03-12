'use client';

import { Link2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

export const ThreadCopyLinkButton = () => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('ლინკი დაკოპირდა');
  };

  return (
    <button
      onClick={handleCopy}
      className="flex w-full items-center gap-3 px-2 py-2 text-urbancare-base rounded-urbancare-lg lg:hover:bg-surface-container transition-colors duration-150"
    >
      <div className="w-8 h-8 rounded-urbancare-lg bg-surface-container flex items-center justify-center shrink-0">
        <Link2 className="w-4 h-4 text-icon" />
      </div>
      <span className="font-medium text-text-primary">ლინკის კოპირება</span>
    </button>
  );
};
