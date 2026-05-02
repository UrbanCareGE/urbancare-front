'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/components/provider/AuthProvider';
import { useCreateThread } from '@/hooks/query/thread/use-create-thread';
import { useEditThread } from '@/hooks/query/thread/use-edit-thread';
import { FileService } from '@/service/file-service';
import { getClientFileUrl } from '@/lib/api-client';
import {
  createThreadSchema,
  ExistingImage,
  FileEntry,
} from '@/components/thread/data/create-thread-schema';
import { CreateThreadFormView } from '@/components/thread/thread-form/CreateThreadFormView';
import { CreateThreadOverlayRoot } from '@/components/thread/thread-form/CreateThreadOverlay';
import { DiscardDraftDialog } from '@/components/thread/thread-form/DiscardDraftDialog';
import { ThreadInfoDTO } from '@/model/dto/thread.dto';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

interface ThreadFormContainerProps {
  editingThread?: ThreadInfoDTO;
  children?: React.ReactNode;
}

export const CreateThreadFormContainer = ({
  editingThread,
  children,
}: ThreadFormContainerProps = {}) => {
  const { user } = useAuth();
  const t = useTranslation();
  const isEdit = !!editingThread;

  const createThread = useCreateThread();
  const editThread = useEditThread();
  const mutation = isEdit ? editThread : createThread;
  const isPending = mutation.isPending;
  const isError = mutation.isError;
  const error = mutation.error as Error | null;

  const [fileUploading, setFileUploading] = useState(false);
  const [tagLimitDialogOpen, setTagLimitDialogOpen] = useState(false);
  const [isPollMode, setIsPollMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialExistingImages: ExistingImage[] = editingThread?.images
    ? editingThread.images.map((img) => ({
        fileId: img.id,
        previewUrl: getClientFileUrl(img.id),
        contentType: img.contentType ?? 'image/*',
      }))
    : [];

  const schema = useMemo(() => createThreadSchema(t), [t]);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: editingThread?.title ?? '',
      body: editingThread?.content ?? '',
      files: [],
      existingImages: initialExistingImages,
      tags: editingThread?.tags ?? [],
      pollOptions: [],
      mentions: editingThread?.mentions ?? [],
    },
  });

  const body = useWatch({ control: form.control, name: 'body' });
  const watchedFiles = useWatch({ control: form.control, name: 'files' });
  const watchedExistingImages = useWatch({
    control: form.control,
    name: 'existingImages',
  });
  const watchedTags = useWatch({ control: form.control, name: 'tags' });
  const watchedPollOptions = useWatch({
    control: form.control,
    name: 'pollOptions',
  });

  const bodyLength = body?.length || 0;
  const fileEntries = watchedFiles || [];
  const existingImages = watchedExistingImages || [];
  const selectedTags = watchedTags || [];
  const pollOptions = watchedPollOptions || [];
  const totalImages = fileEntries.length + existingImages.length;

  const handleAddFiles = async (selectedFiles: File[]) => {
    const accepted = selectedFiles.filter(
      (f) => f.type.startsWith('image/') || f.type.startsWith('video/')
    );
    if (accepted.length === 0) return;

    const currentFiles = form.getValues('files') || [];
    const currentExisting = form.getValues('existingImages') || [];
    const remaining = 5 - (currentFiles.length + currentExisting.length);
    const filesToAdd = accepted.slice(0, Math.max(0, remaining));
    if (filesToAdd.length === 0) return;

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
        return { ...f, fileId: success.value.fileId };
      }
      return f;
    });
    form.setValue('files', updated, { shouldValidate: true, shouldDirty: true });

    setFileUploading(false);
  };

  const handleRemoveFile = (index: number) => {
    const currentFiles = form.getValues('files') || [];
    const fileToRemove = currentFiles[index];
    if (fileToRemove?.previewUrl) URL.revokeObjectURL(fileToRemove.previewUrl);
    form.setValue(
      'files',
      currentFiles.filter((_, i) => i !== index),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const handleRemoveExistingImage = (fileId: string) => {
    const current = form.getValues('existingImages') || [];
    form.setValue(
      'existingImages',
      current.filter((img) => img.fileId !== fileId),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  useEffect(() => {
    return () => {
      const files = form.getValues('files') || [];
      files.forEach((file) => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [form]);

  const isDirty = form.formState.isDirty;
  useEffect(() => {
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
  const skipGuardRef = useRef(false);

  const handleCloseRequest = (): boolean | Promise<boolean> => {
    if (skipGuardRef.current) {
      skipGuardRef.current = false;
      return true;
    }
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
    form.reset({
      title: editingThread?.title ?? '',
      body: editingThread?.content ?? '',
      files: [],
      existingImages: initialExistingImages,
      tags: editingThread?.tags ?? [],
      pollOptions: [],
      mentions: editingThread?.mentions ?? [],
    });
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
        selectedTags.filter((tg) => tg !== tag),
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
    if (!user.selectedApartmentId) {
      console.error('No apartment selected');
      return;
    }

    const newImageIds = values.files
      ?.map((f) => f.fileId)
      .filter((id): id is string => !!id) ?? [];
    const existingImageIds =
      values.existingImages?.map((img) => img.fileId) ?? [];
    const imageIds = isEdit
      ? [...existingImageIds, ...newImageIds]
      : newImageIds;

    const handleSuccess = () => {
      toast.success(isEdit ? t.thread.postUpdated : t.thread.postAdded);
      form.reset({
        title: editingThread?.title ?? '',
        body: editingThread?.content ?? '',
        files: [],
        existingImages: isEdit ? values.existingImages : initialExistingImages,
        tags: editingThread?.tags ?? [],
        pollOptions: [],
        mentions: editingThread?.mentions ?? [],
      });
      setIsPollMode(false);
      skipGuardRef.current = true;
      options?.onSuccess?.();
    };

    const handleError = () => {
      toast.error(t.common.error);
    };

    if (isEdit && editingThread) {
      editThread.mutate(
        {
          apartmentId: user.selectedApartmentId,
          threadId: editingThread.id,
          title: values.title,
          content: values.body,
          imageIds,
          tags: values.tags,
          mentions: values.mentions ?? [],
        },
        { onSuccess: handleSuccess, onError: handleError }
      );
    } else {
      createThread.mutate(
        {
          apartmentId: user.selectedApartmentId,
          title: values.title,
          content: values.body,
          imageIds,
          tags: values.tags,
          poll:
            values.pollOptions != null && values.pollOptions.length > 0
              ? values.pollOptions
              : undefined,
          mentions: values.mentions ?? [],
        },
        { onSuccess: handleSuccess, onError: handleError }
      );
    }
  };

  return (
    <CreateThreadOverlayRoot onCloseRequest={handleCloseRequest}>
      {children}
      <CreateThreadFormView
        mode={isEdit ? 'edit' : 'create'}
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        isDirty={isDirty}
        isError={isError}
        error={error}
        fileUploading={fileUploading}
        isPollMode={isPollMode}
        tagLimitDialogOpen={tagLimitDialogOpen}
        bodyLength={bodyLength}
        fileEntries={fileEntries}
        existingImages={existingImages}
        totalImages={totalImages}
        selectedTags={selectedTags}
        pollOptions={pollOptions}
        fileInputRef={fileInputRef}
        onAddFiles={handleAddFiles}
        onRemoveFile={handleRemoveFile}
        onRemoveExistingImage={handleRemoveExistingImage}
        onTogglePollMode={handleTogglePollMode}
        onPollOptionsChange={handlePollOptionsChange}
        onToggleTag={handleToggleTag}
        onTagLimitDialogChange={setTagLimitDialogOpen}
      />
      <DiscardDraftDialog
        open={discardOpen}
        onOpenChange={handleDiscardOpenChange}
        onDiscard={handleConfirmDiscard}
      />
    </CreateThreadOverlayRoot>
  );
};
