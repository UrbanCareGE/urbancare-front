'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { SheetFooter } from '@/components/ui/sheet';
import { useTranslation } from '@/i18n';

interface EditThreadFormFooterProps {
  isPending: boolean;
  isDirty: boolean;
  bodyLength: number;
  fileUploading: boolean;
}

export const EditThreadFormFooter = ({
  isPending,
  isDirty,
  bodyLength,
  fileUploading,
}: EditThreadFormFooterProps) => {
  const t = useTranslation();

  return (
    <SheetFooter className="px-6 py-4 mt-auto">
      <div className="space-y-2">
        <Button
          type="submit"
          disabled={isPending || !bodyLength || fileUploading || !isDirty}
          className="w-full h-12 urbancare-text-xl font-semibold bg-gradient-to-r from-primary to-primary/90 lg:hover:from-primary/90 lg:hover:to-primary lg:hover:-translate-y-0.5 lg:active:translate-y-0 shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent urbancare-rounded-full animate-spin" />
              {t.thread.updatingPost}
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gradient-primary">
              <Check className="w-4 h-4" />
              {t.thread.saveChanges}
            </div>
          )}
        </Button>
        <p className="urbancare-text-sm text-center text-foreground-tertiary">
          {t.thread.communityRules}
        </p>
      </div>
    </SheetFooter>
  );
};
