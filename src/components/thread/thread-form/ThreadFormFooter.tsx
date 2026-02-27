'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { Sparkles } from 'lucide-react';
import { SheetFooter } from '@/components/ui/sheet';

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
  return (
    <SheetFooter className="px-6 py-4 mt-auto">
      <div className="space-y-2">
        <Button
          type="submit"
          disabled={isPending || !bodyLength || fileUploading}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 lg:hover:from-primary/90 lg:hover:to-primary lg:hover:-translate-y-0.5 lg:active:translate-y-0 shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              პოსტის შექმნა...
            </div>
          ) : (
            <DrawerClose asChild={true}>
              <div className="flex items-center gap-2 bg-gradient-primary">
                <Sparkles className="w-4 h-4" />
                გამოქვეყნება
              </div>
            </DrawerClose>
          )}
        </Button>
        <p className="text-xs text-center text-foreground-tertiary">
          დარწმუნდით, რომ პოსტი არ არღვევს საზოგადოების წესებს
        </p>
      </div>
    </SheetFooter>
  );
};
