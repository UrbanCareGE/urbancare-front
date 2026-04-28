'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/components/provider/AuthProvider';
import { useCreateThread } from '@/hooks/query/thread/use-create-thread';
import { FileService } from '@/service/file-service';
import {
  createThreadSchema,
  FileEntry,
} from '@/components/thread/data/create-thread-schema';
import { CreateThreadFormView } from '@/components/thread/thread-form/CreateThreadFormView';
import { DiscardDraftDialog } from '@/components/thread/thread-form/DiscardDraftDialog';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

export const CreateThreadFormContainer = () => {
  const { user } = useAuth();
  const t = useTranslation();
  const { mutate, isPending, isError, error } = useCreateThread();
  const [fileUploading, setFileUploading] = useState(false);
  const [tagLimitDialogOpen, setTagLimitDialogOpen] = useState(false);
  const [isPollMode, setIsPollMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => createThreadSchema(t), [t]);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      files: [],
      tags: [],
      pollOptions: [],
    },
  });

  const bodyLength = form.watch('body')?.length || 0;
  const fileEntries = form.watch('files') || [];
  const selectedTags = form.watch('tags') || [];
  const pollOptions = form.watch('pollOptions') || [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const currentFiles = form.getValues('files') || [];
    const filesToAdd = selectedFiles.slice(0, 10 - currentFiles.length);

    const newEntries: FileEntry[] = filesToAdd.map((file) => ({
      file,
      fileId: null,
      previewUrl: URL.createObjectURL(file),
    }));

    form.setValue('files', [...currentFiles, ...newEntries], {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setFileUploading(true);

    const results = await Promise.allSettled(
      newEntries.map(async (entry, index) => {
        const result = await FileService.uploadPublicFile(entry.file);
        return { index: currentFiles.length + index, fileId: result.id };
      })
    );

    const latestFiles = form.getValues('files') || [];
    const updated = latestFiles.map((f, i) => {
      const success = results.find(
        (r) => r.status === 'fulfilled' && r.value.index === i
      );
      if (success && success.status === 'fulfilled') {
        return {
          ...f,
          fileId: success.value.fileId,
          status: 'success' as const,
        };
      }
      return f;
    });
    form.setValue('files', updated, { shouldValidate: true, shouldDirty: true });

    setFileUploading(false);
  };

  const handleRemoveFile = (index: number) => {
    const currentFiles = form.getValues('files') || [];
    const fileToRemove = currentFiles[index];

    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }

    form.setValue(
      'files',
      currentFiles.filter((_, i) => i !== index),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  React.useEffect(() => {
    return () => {
      const files = form.getValues('files') || [];
      files.forEach((file) => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [form]);

  const isDirty = form.formState.isDirty;
  React.useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const [discardOpen, setDiscardOpen] = useState(false);
  const discardResolverRef = useRef<((allow: boolean) => void) | null>(null);

  const handleCloseRequest = (): boolean | Promise<boolean> => {
    if (!form.formState.isDirty) return true;
    return new Promise<boolean>((resolve) => {
      discardResolverRef.current = resolve;
      setDiscardOpen(true);
    });
  };

  const handleDiscardOpenChange = (next: boolean) => {
    setDiscardOpen(next);
    if (!next && discardResolverRef.current) {
      discardResolverRef.current(false);
      discardResolverRef.current = null;
    }
  };

  const handleConfirmDiscard = () => {
    const files = form.getValues('files') || [];
    files.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    form.reset();
    setIsPollMode(false);
    if (discardResolverRef.current) {
      discardResolverRef.current(true);
      discardResolverRef.current = null;
    }
  };

  const handleTogglePollMode = () => {
    if (isPollMode) form.setValue('pollOptions', [], { shouldDirty: true });
    setIsPollMode(!isPollMode);
  };

  const handlePollOptionsChange = (options: string[]) => {
    form.setValue('pollOptions', options, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      form.setValue(
        'tags',
        selectedTags.filter((t) => t !== tag),
        { shouldDirty: true }
      );
    } else if (selectedTags.length >= 3) {
      setTagLimitDialogOpen(true);
    } else {
      form.setValue('tags', [...selectedTags, tag], { shouldDirty: true });
    }
  };

  const onSubmit = async (
    values: z.infer<typeof schema>,
    options?: { onSuccess?: () => void }
  ) => {
    if (!user.selectedApartmentId!) {
      console.error('No apartment selected');
      return;
    }

    mutate(
      {
        apartmentId: user.selectedApartmentId!,
        title: values.title,
        content: values.body,
        imageIds: values.files?.map((f) => f.fileId!) ?? [],
        tags: values.tags,
        poll:
          values.pollOptions != null && values.pollOptions.length > 0
            ? values.pollOptions
            : undefined,
      },
      {
        onSuccess: () => {
          toast.success(t.thread.postAdded);
          form.reset();
          setIsPollMode(false);
          options?.onSuccess?.();
        },
        onError: () => {
          toast.error(t.common.error);
        },
      }
    );
  };

  return (
    <>
    <CreateThreadFormView
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      isError={isError}
      error={error as Error | null}
      fileUploading={fileUploading}
      isPollMode={isPollMode}
      tagLimitDialogOpen={tagLimitDialogOpen}
      bodyLength={bodyLength}
      fileEntries={fileEntries}
      selectedTags={selectedTags}
      pollOptions={pollOptions}
      fileInputRef={fileInputRef}
      onFileChange={handleFileChange}
      onRemoveFile={handleRemoveFile}
      onTogglePollMode={handleTogglePollMode}
      onPollOptionsChange={handlePollOptionsChange}
      onToggleTag={handleToggleTag}
      onTagLimitDialogChange={setTagLimitDialogOpen}
      onCloseRequest={handleCloseRequest}
    />
    <DiscardDraftDialog
      open={discardOpen}
      onOpenChange={handleDiscardOpenChange}
      onDiscard={handleConfirmDiscard}
    />
    </>
  );
};
