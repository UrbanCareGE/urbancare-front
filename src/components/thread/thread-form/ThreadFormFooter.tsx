'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/i18n';

interface ThreadFormFooterProps {
  isPending: boolean;
  bodyLength: number;
  fileUploading: boolean;
}

export const ThreadFormFooter = ({
  isPending,
  bodyLength,
  fileUploading,
}: ThreadFormFooterProps) => {
  const t = useTranslation();
  return (
    <footer className="shrink-0 px-3 sm:px-4 py-3 space-y-2">
      <Button
        type="submit"
        disabled={isPending || !bodyLength || fileUploading}
        className="w-full h-12 urbancare-text-base sm:urbancare-text-lg font-semibold urbancare-rounded-lg bg-primary lg:hover:bg-primary-hover lg:active:scale-[0.99] shadow-sm shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent urbancare-rounded-full animate-spin" />
            {t.thread.creatingPost}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {t.common.publish}
          </div>
        )}
      </Button>
      <p className="urbancare-text-xs text-center text-text-tertiary">
        {t.thread.communityRules}
      </p>
    </footer>
  );
};
