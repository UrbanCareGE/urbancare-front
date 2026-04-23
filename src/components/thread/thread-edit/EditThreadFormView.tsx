'use client';

import React from 'react';
import { Control, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Form } from '@/components/ui/form';
import {
  EditThreadSchemaType,
  ExistingImage,
} from '@/components/thread/data/edit-thread-schema';
import {
  CreateThreadSchemaType,
  FileEntry,
} from '@/components/thread/data/create-thread-schema';
import { useTranslation } from '@/i18n';
import { ThreadTagSelector } from '@/components/thread/thread-form/ThreadTagSelector';
import { ThreadBodyField } from '@/components/thread/thread-form/ThreadBodyField';
import { ThreadTagLimitDialog } from '@/components/thread/thread-form/ThreadTagLimitDialog';
import { EditThreadFormHeader } from '@/components/thread/thread-edit/EditThreadFormHeader';
import { EditThreadFormFooter } from '@/components/thread/thread-edit/EditThreadFormFooter';
import { EditThreadImageSection } from '@/components/thread/thread-edit/EditThreadImageSection';

interface EditThreadFormViewProps {
  form: UseFormReturn<z.infer<EditThreadSchemaType>>;
  onSubmit: (values: z.infer<EditThreadSchemaType>) => void;
  isPending: boolean;
  isDirty: boolean;
  isError: boolean;
  error: Error | null;
  fileUploading: boolean;
  tagLimitDialogOpen: boolean;
  bodyLength: number;
  fileEntries: FileEntry[];
  existingImages: ExistingImage[];
  selectedTags: string[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  totalImages: number;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onRemoveExistingImage: (fileId: string) => void;
  onToggleTag: (tag: string) => void;
  onTagLimitDialogChange: (open: boolean) => void;
}

export const EditThreadFormView = ({
  form,
  onSubmit,
  isPending,
  isDirty,
  isError,
  error,
  fileUploading,
  tagLimitDialogOpen,
  bodyLength,
  fileEntries,
  existingImages,
  selectedTags,
  fileInputRef,
  totalImages,
  onFileChange,
  onRemoveFile,
  onRemoveExistingImage,
  onToggleTag,
  onTagLimitDialogChange,
}: EditThreadFormViewProps) => {
  const t = useTranslation();

  // The shared ThreadBodyField is typed against the create schema — both schemas
  // share the `body` field, so a structural cast keeps a single source of truth
  // for the styling without duplicating the component.
  const bodyControl = form.control as unknown as Control<
    z.infer<CreateThreadSchemaType>
  >;

  return (
    <>
      <EditThreadFormHeader />

      <Form {...form}>
        <form
          className="flex flex-col flex-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="px-6 py-6 space-y-3">
            <ThreadBodyField
              control={bodyControl}
              isPending={isPending}
              bodyLength={bodyLength}
            />

            <ThreadTagSelector
              selectedTags={selectedTags}
              onToggleTag={onToggleTag}
            />

            <EditThreadImageSection
              fileEntries={fileEntries}
              existingImages={existingImages}
              isPending={isPending}
              fileInputRef={fileInputRef}
              totalImages={totalImages}
              onFileChange={onFileChange}
              onRemoveFile={onRemoveFile}
              onRemoveExistingImage={onRemoveExistingImage}
            />

            {isError && (
              <div className="rounded-urbancare-lg bg-error-background border border-error p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-urbancare-full bg-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-error" />
                  </div>
                  <div className="flex-1">
                    <p className="text-urbancare-base font-medium text-error">
                      {t.common.error}
                    </p>
                    <p className="text-urbancare-sm text-error mt-1">
                      {error?.message || t.common.tryAgain}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <EditThreadFormFooter
            isPending={isPending}
            isDirty={isDirty}
            bodyLength={bodyLength}
            fileUploading={fileUploading}
          />
        </form>
      </Form>

      <ThreadTagLimitDialog
        open={tagLimitDialogOpen}
        onOpenChange={onTagLimitDialogChange}
      />
    </>
  );
};
