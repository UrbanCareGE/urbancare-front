'use client';

import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Image as ImageIconLucid, Upload, Video, X } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  CreateThreadSchemaType,
  ExistingImage,
  FileEntry,
} from '@/components/thread/data/create-thread-schema';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

interface ThreadFileUploadProps {
  control: Control<z.infer<CreateThreadSchemaType>>;
  fileEntries: FileEntry[];
  existingImages?: ExistingImage[];
  totalImages?: number;
  isPending: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  onRemoveExistingImage?: (fileId: string) => void;
}

export const ThreadFileUpload = ({
  control,
  fileEntries,
  existingImages = [],
  totalImages,
  isPending,
  fileInputRef,
  onAddFiles,
  onRemoveFile,
  onRemoveExistingImage,
}: ThreadFileUploadProps) => {
  const t = useTranslation();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragDepthRef = React.useRef(0);
  const combinedCount = totalImages ?? fileEntries.length + existingImages.length;
  const isFull = combinedCount >= 5 || isPending;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAddFiles(Array.from(e.target.files ?? []));
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (isFull) return;
    e.preventDefault();
    dragDepthRef.current += 1;
    setIsDraggingOver(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (isFull) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (isFull) return;
    e.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragDepthRef.current = 0;
    setIsDraggingOver(false);
    if (isFull) return;
    onAddFiles(Array.from(e.dataTransfer.files ?? []));
  };
  return (
    <FormField
      control={control}
      name="files"
      render={() => (
        <FormItem>
          <div className="flex items-center justify-between mb-3">
            <FormLabel className="urbancare-text-base font-medium text-foreground-secondary flex items-center gap-2">
              <ImageIconLucid className="w-4 h-4 text-foreground-disabled" />
              {t.threadForm.mediaFiles}
            </FormLabel>
            <span className="urbancare-text-sm text-foreground-tertiary">
              {t.threadForm.filesCount.replace(
                '{count}',
                String(combinedCount)
              )}
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />

          <div
            className="space-y-3"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isFull}
              className={cn(
                'w-full h-auto border-2 border-dashed border-border transition-all group',
                'lg:hover:border-primary lg:hover:bg-primary/5',
                isDraggingOver && 'border-primary bg-primary/10'
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'w-10 h-10 urbancare-rounded-full bg-surface-container flex items-center justify-center transition-colors',
                    'lg:group-hover:bg-primary/10',
                    isDraggingOver && 'bg-primary/20'
                  )}
                >
                  <Upload
                    className={cn(
                      'w-5 h-5 text-foreground-tertiary transition-colors',
                      'lg:group-hover:text-primary',
                      isDraggingOver && 'text-primary'
                    )}
                  />
                </div>
                <div className="text-center">
                  <p className="urbancare-text-base font-medium text-foreground-secondary">
                    {isDraggingOver
                      ? t.threadForm.dropFilesHere
                      : t.threadForm.uploadPhotoVideo}
                  </p>
                  <p className="urbancare-text-sm text-foreground-tertiary mt-0.5">
                    {t.threadForm.maxFilesHint}
                  </p>
                </div>
              </div>
            </Button>

            {(existingImages.length > 0 || fileEntries.length > 0) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <p className="urbancare-text-sm font-medium text-foreground-tertiary">
                    {t.threadForm.uploadedFiles}
                  </p>
                  {combinedCount > 3 && (
                    <p className="urbancare-text-sm text-foreground-disabled">
                      {t.threadForm.scrollHint}
                    </p>
                  )}
                </div>

                <div className="relative">
                  {combinedCount > 3 && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none urbancare-rounded-l-xl" />
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none urbancare-rounded-r-xl" />
                    </>
                  )}
                  <div className="overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide bg-surface-variant urbancare-rounded-xl p-3">
                    <div className="flex gap-3">
                      {existingImages.map((img, index) => (
                        <div
                          key={img.fileId}
                          className="flex-shrink-0 relative group w-20 h-20"
                        >
                          <div className="absolute inset-0 urbancare-rounded-lg overflow-hidden bg-surface border-2 shadow-sm lg:hover:shadow-md transition-all duration-300 lg:group-hover:scale-105 lg:hover:border-primary/50">
                            {img.contentType.startsWith('image/') ? (
                              <Image
                                src={img.previewUrl}
                                alt={`Existing ${index + 1}`}
                                fill
                                unoptimized
                                sizes="80px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
                                <Video className="w-8 h-8 text-foreground-tertiary" />
                              </div>
                            )}
                            <div className="absolute top-1 left-1 w-5 h-5 bg-primary text-primary-foreground urbancare-text-sm urbancare-rounded-full flex items-center justify-center font-semibold shadow-sm">
                              {index + 1}
                            </div>
                          </div>
                          {onRemoveExistingImage && (
                            <button
                              type="button"
                              onClick={() => onRemoveExistingImage(img.fileId)}
                              className="absolute -top-2 -right-2 p-1.5 bg-error text-error-foreground urbancare-rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-200 lg:hover:bg-error/80 lg:hover:scale-110 shadow-lg z-20"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}

                      {fileEntries.map((file, index) => {
                        if (!file || !file.previewUrl) return null;
                        const numbering = existingImages.length + index + 1;
                        return (
                          <div
                            key={`new-${index}`}
                            className="flex-shrink-0 relative group w-20 h-20"
                          >
                            <div className="absolute inset-0 urbancare-rounded-lg overflow-hidden bg-surface border-2 shadow-sm lg:hover:shadow-md transition-all duration-300 lg:group-hover:scale-105 lg:hover:border-primary/50">
                              {file.file.type.startsWith('image/') ? (
                                <Image
                                  src={file.previewUrl}
                                  alt={`Preview ${numbering}`}
                                  fill
                                  unoptimized
                                  sizes="80px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
                                  <Video className="w-8 h-8 text-foreground-tertiary" />
                                </div>
                              )}

                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-1 left-1 right-1">
                                  <p className="urbancare-text-sm font-medium text-primary-foreground truncate">
                                    {(file.file.size / 1024 / 1024).toFixed(1)}{' '}
                                    MB
                                  </p>
                                </div>
                              </div>

                              <div className="absolute top-1 left-1 w-5 h-5 bg-primary text-primary-foreground urbancare-text-sm urbancare-rounded-full flex items-center justify-center font-semibold shadow-sm">
                                {numbering}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveFile(index)}
                              className="absolute -top-2 -right-2 p-1.5 bg-error text-error-foreground urbancare-rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-200 lg:hover:bg-error/80 lg:hover:scale-110 shadow-lg z-20"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <FormMessage className="urbancare-text-sm" />
        </FormItem>
      )}
    />
  );
};
