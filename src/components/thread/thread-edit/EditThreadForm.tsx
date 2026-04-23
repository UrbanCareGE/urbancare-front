'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/components/provider/AuthProvider';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { useEditThreadOverlay } from '@/components/thread/thread-edit/EditThreadOverlay';
import { FileService } from '@/service/file-service';
import { getClientFileUrl } from '@/lib/api-client';
import {
  editThreadSchema,
  ExistingImage,
} from '@/components/thread/data/edit-thread-schema';
import { FileEntry } from '@/components/thread/data/create-thread-schema';
import { EditThreadFormView } from '@/components/thread/thread-edit/EditThreadFormView';
import { useTranslation } from '@/i18n';

export const EditThreadForm = () => {
  const { thread } = useThread();
  const { user } = useAuth();
  const t = useTranslation();
  const { isOpen, close } = useEditThreadOverlay();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileUploading, setFileUploading] = useState(false);
  const [tagLimitDialogOpen, setTagLimitDialogOpen] = useState(false);

  // Placeholder local state for request lifecycle until API is wired up.
  const [isPending, setIsPending] = useState(false);
  const [isError] = useState(false);
  const [error] = useState<Error | null>(null);

  const schema = useMemo(() => editThreadSchema(t), [t]);

  const initialExistingImages: ExistingImage[] = useMemo(() => {
    if (!thread.images) return [];
    return thread.images.map((img) => ({
      fileId: img.id,
      previewUrl: getClientFileUrl(img.id),
      contentType: img.contentType ?? 'image/*',
    }));
  }, [thread.images]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: thread.title ?? '',
      body: thread.content ?? '',
      files: [],
      existingImages: initialExistingImages,
      tags: thread.tags ?? [],
    },
  });

  // Reset form values whenever the overlay reopens so edits always reflect the
  // latest thread state.
  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: thread.title ?? '',
        body: thread.content ?? '',
        files: [],
        existingImages: initialExistingImages,
        tags: thread.tags ?? [],
      });
    }
  }, [isOpen, thread.id, thread.title, thread.content, thread.tags, initialExistingImages, form]);

  const bodyLength = form.watch('body')?.length || 0;
  const fileEntries = form.watch('files') || [];
  const existingImages = form.watch('existingImages') || [];
  const selectedTags = form.watch('tags') || [];
  const { isDirty } = form.formState;

  const totalImages = fileEntries.length + existingImages.length;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const currentFiles = form.getValues('files') || [];
    const remaining = 5 - totalImages;
    const filesToAdd = selectedFiles.slice(0, Math.max(0, remaining));

    const newEntries: FileEntry[] = filesToAdd.map((file) => ({
      file,
      fileId: null,
      previewUrl: URL.createObjectURL(file),
    }));

    form.setValue('files', [...currentFiles, ...newEntries], {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (fileInputRef.current) fileInputRef.current.value = '';

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

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!user.selectedApartmentId) return;

    // Final payload shape for the future API mutation.
    const payload = {
      apartmentId: user.selectedApartmentId,
      threadId: thread.id,
      title: values.title,
      content: values.body,
      imageIds: [
        ...(values.existingImages?.map((img) => img.fileId) ?? []),
        ...(values.files?.map((f) => f.fileId).filter((id): id is string => !!id) ?? []),
      ],
      tags: values.tags ?? [],
    };

    // TODO: wire up useUpdateThread mutation here.
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsPending(false);

    console.log('Update thread payload:', payload);
    toast.success(t.thread.postUpdated);
    close();
  };

  useEffect(() => {
    return () => {
      const files = form.getValues('files') || [];
      files.forEach((f) => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
    };
  }, [form]);

  return (
    <EditThreadFormView
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      isDirty={isDirty}
      isError={isError}
      error={error}
      fileUploading={fileUploading}
      tagLimitDialogOpen={tagLimitDialogOpen}
      bodyLength={bodyLength}
      fileEntries={fileEntries}
      existingImages={existingImages}
      selectedTags={selectedTags}
      fileInputRef={fileInputRef}
      totalImages={totalImages}
      onFileChange={handleFileChange}
      onRemoveFile={handleRemoveFile}
      onRemoveExistingImage={handleRemoveExistingImage}
      onToggleTag={handleToggleTag}
      onTagLimitDialogChange={setTagLimitDialogOpen}
    />
  );
};
