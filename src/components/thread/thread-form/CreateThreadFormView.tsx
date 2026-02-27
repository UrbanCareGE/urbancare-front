'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Form } from '@/components/ui/form';
import {
  createThreadSchema,
  FileEntry,
} from '@/components/thread/data/create-thread-schema';
import { Poll } from '@/components/poll/mobile/Poll';
import CreateThreadSheet from '@/components/thread/thread-form/CreateThreadSheet';
import { CreateThreadButton } from '@/components/thread/thread-form/CreateThreadButton';
import { ThreadTagSelector } from '@/components/thread/thread-form/ThreadTagSelector';
import { ThreadFormHeader } from '@/components/thread/thread-form/ThreadFormHeader';
import { ThreadBodyField } from '@/components/thread/thread-form/ThreadBodyField';
import { ThreadFileUpload } from '@/components/thread/thread-form/ThreadFileUpload';
import { ThreadFormFooter } from '@/components/thread/thread-form/ThreadFormFooter';
import { ThreadTagLimitDialog } from '@/components/thread/thread-form/ThreadTagLimitDialog';

interface CreateThreadFormViewProps {
  form: UseFormReturn<z.infer<typeof createThreadSchema>>;
  onSubmit: (values: z.infer<typeof createThreadSchema>) => void;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  fileUploading: boolean;
  isPollMode: boolean;
  tagLimitDialogOpen: boolean;
  bodyLength: number;
  fileEntries: FileEntry[];
  selectedTags: string[];
  pollOptions: string[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onTogglePollMode: () => void;
  onPollOptionsChange: (options: string[]) => void;
  onToggleTag: (tag: string) => void;
  onTagLimitDialogChange: (open: boolean) => void;
}

export const CreateThreadFormView = ({
  form,
  onSubmit,
  isPending,
  isError,
  error,
  fileUploading,
  isPollMode,
  tagLimitDialogOpen,
  bodyLength,
  fileEntries,
  selectedTags,
  pollOptions,
  fileInputRef,
  onFileChange,
  onRemoveFile,
  onTogglePollMode,
  onPollOptionsChange,
  onToggleTag,
  onTagLimitDialogChange,
}: CreateThreadFormViewProps) => {
  return (
    <CreateThreadSheet>
      <CreateThreadButton />

      <CreateThreadSheet.Content>
        <ThreadFormHeader />

        <Form {...form}>
          <form
            className="flex flex-col flex-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="px-6 py-6 space-y-3">
              <ThreadBodyField
                control={form.control}
                isPending={isPending}
                bodyLength={bodyLength}
              />

              <ThreadTagSelector
                selectedTags={selectedTags}
                onToggleTag={onToggleTag}
              />

              <ThreadFileUpload
                control={form.control}
                fileEntries={fileEntries}
                isPending={isPending}
                fileInputRef={fileInputRef}
                onFileChange={onFileChange}
                onRemoveFile={onRemoveFile}
              />

              <Poll
                pollOptions={pollOptions}
                onPollOptionsChange={onPollOptionsChange}
                isPollMode={isPollMode}
                onPollModeToggle={onTogglePollMode}
                isDisabled={isPending}
              />

              {isError && (
                <div className="rounded-lg bg-error-background border border-error p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-error" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-error">
                        დაფიქსირდა შეცდომა
                      </p>
                      <p className="text-xs text-error mt-1">
                        {error?.message || 'გთხოვთ სცადოთ თავიდან'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ThreadFormFooter
              isPending={isPending}
              bodyLength={bodyLength}
              fileUploading={fileUploading}
            />
          </form>
        </Form>
      </CreateThreadSheet.Content>

      <ThreadTagLimitDialog
        open={tagLimitDialogOpen}
        onOpenChange={onTagLimitDialogChange}
      />
    </CreateThreadSheet>
  );
};
