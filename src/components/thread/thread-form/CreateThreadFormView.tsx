'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Form } from '@/components/ui/form';
import {
  FileEntry,
  CreateThreadSchemaType,
} from '@/components/thread/data/create-thread-schema';
import { useTranslation } from '@/i18n';
import { Poll } from '@/components/poll/mobile/Poll';
import CreateThreadOverlay, {
  useThreadOverlay,
} from '@/components/thread/thread-form/CreateThreadOverlay';
import { CreateThreadButton } from '@/components/thread/thread-form/CreateThreadButton';
import { ThreadTagSelector } from '@/components/thread/thread-form/ThreadTagSelector';
import { ThreadFormHeader } from '@/components/thread/thread-form/ThreadFormHeader';
import { ThreadBodyField } from '@/components/thread/thread-form/ThreadBodyField';
import { ThreadFileUpload } from '@/components/thread/thread-form/ThreadFileUpload';
import { ThreadFormFooter } from '@/components/thread/thread-form/ThreadFormFooter';
import { ThreadTagLimitDialog } from '@/components/thread/thread-form/ThreadTagLimitDialog';

interface CreateThreadFormViewMobileProps {
  form: UseFormReturn<z.infer<CreateThreadSchemaType>>;
  onSubmit: (
    values: z.infer<CreateThreadSchemaType>,
    options?: { onSuccess?: () => void }
  ) => void;
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
}: CreateThreadFormViewMobileProps) => {
  const t = useTranslation();
  return (
    <CreateThreadOverlay>
      <CreateThreadOverlay.Trigger>
        <CreateThreadButton />
      </CreateThreadOverlay.Trigger>

      <CreateThreadOverlay.Content>
        <ThreadFormHeader />

        <FormBody form={form} onSubmit={onSubmit}>
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 sm:p-4 space-y-3 scrollbar-hide overscroll-x-none touch-pan-y">
            <FormSection>
              <ThreadBodyField
                control={form.control}
                isPending={isPending}
                bodyLength={bodyLength}
              />
            </FormSection>

            <FormSection>
              <ThreadTagSelector
                selectedTags={selectedTags}
                onToggleTag={onToggleTag}
              />
            </FormSection>

            <FormSection>
              <ThreadFileUpload
                control={form.control}
                fileEntries={fileEntries}
                isPending={isPending}
                fileInputRef={fileInputRef}
                onFileChange={onFileChange}
                onRemoveFile={onRemoveFile}
              />
            </FormSection>

            <Poll
              pollOptions={pollOptions}
              onPollOptionsChange={onPollOptionsChange}
              isPollMode={isPollMode}
              onPollModeToggle={onTogglePollMode}
              isDisabled={isPending}
            />

            {isError && (
              <div className="urbancare-rounded-2xl bg-error-background border border-error p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 urbancare-rounded-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-error" />
                  </div>
                  <div className="flex-1">
                    <p className="urbancare-text-base font-medium text-error">
                      {t.common.error}
                    </p>
                    <p className="urbancare-text-sm text-error mt-1">
                      {error?.message || t.common.tryAgain}
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
        </FormBody>
      </CreateThreadOverlay.Content>

      <ThreadTagLimitDialog
        open={tagLimitDialogOpen}
        onOpenChange={onTagLimitDialogChange}
      />
    </CreateThreadOverlay>
  );
};

interface FormBodyProps {
  form: UseFormReturn<z.infer<CreateThreadSchemaType>>;
  onSubmit: (
    values: z.infer<CreateThreadSchemaType>,
    options?: { onSuccess?: () => void }
  ) => void;
  children: React.ReactNode;
}

const FormBody = ({ form, onSubmit, children }: FormBodyProps) => {
  const { closeDrawer } = useThreadOverlay();

  const handleSubmit = (values: z.infer<CreateThreadSchemaType>) => {
    onSubmit(values, { onSuccess: closeDrawer });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col flex-1 min-h-0"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {children}
      </form>
    </Form>
  );
};

const FormSection = ({ children }: { children: React.ReactNode }) => (
  <section className="urbancare-rounded-2xl border border-border bg-surface-container/40 p-3 sm:p-4">
    {children}
  </section>
);
