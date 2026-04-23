'use client';

import React from 'react';
import { Image as ImageIconLucid, Upload, Video, X } from 'lucide-react';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FileEntry } from '@/components/thread/data/create-thread-schema';
import { ExistingImage } from '@/components/thread/data/edit-thread-schema';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

interface EditThreadImageSectionProps {
  fileEntries: FileEntry[];
  existingImages: ExistingImage[];
  isPending: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  totalImages: number;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onRemoveExistingImage: (fileId: string) => void;
}

const MAX_TOTAL = 5;

export const EditThreadImageSection = ({
  fileEntries,
  existingImages,
  isPending,
  fileInputRef,
  totalImages,
  onFileChange,
  onRemoveFile,
  onRemoveExistingImage,
}: EditThreadImageSectionProps) => {
  const t = useTranslation();
  const canAddMore = totalImages < MAX_TOTAL;
  const hasAny = totalImages > 0;

  return (
    <FormItem>
      <div className="flex items-center justify-between mb-3">
        <FormLabel className="text-urbancare-base font-medium text-foreground-secondary flex items-center gap-2">
          <ImageIconLucid className="w-4 h-4 text-foreground-disabled" />
          {t.threadForm.mediaFiles}
        </FormLabel>
        <span className="text-urbancare-sm text-foreground-tertiary tabular-nums">
          {t.threadForm.filesCount.replace('{count}', String(totalImages))}
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={onFileChange}
        className="hidden"
      />

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={!canAddMore || isPending}
          className="w-full h-auto border-2 border-dashed border-border lg:hover:border-primary lg:hover:bg-primary/5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-urbancare-full bg-surface-container lg:group-hover:bg-primary/10 flex items-center justify-center transition-colors">
              <Upload className="w-5 h-5 text-foreground-tertiary lg:group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-urbancare-base font-medium text-foreground-secondary">
                {hasAny
                  ? t.threadForm.addMoreMedia
                  : t.threadForm.uploadPhotoVideo}
              </p>
              <p className="text-urbancare-sm text-foreground-tertiary mt-0.5">
                {t.threadForm.maxFilesHint}
              </p>
            </div>
          </div>
        </Button>

        {hasAny && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <p className="text-urbancare-sm font-medium text-foreground-tertiary">
                {t.threadForm.uploadedFiles}
              </p>
              {totalImages > 3 && (
                <p className="text-urbancare-sm text-foreground-disabled">
                  {t.threadForm.scrollHint}
                </p>
              )}
            </div>

            <div className="relative">
              {totalImages > 3 && (
                <>
                  <div
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none rounded-l-urbancare-xl"
                  />
                  <div
                    aria-hidden
                    className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none rounded-r-urbancare-xl"
                  />
                </>
              )}
              <div className="overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide bg-surface-variant rounded-urbancare-xl p-3">
                <div className="flex gap-3">
                  {existingImages.map((img, index) => {
                    const isVideo = img.contentType?.startsWith('video');
                    return (
                      <MediaThumb
                        key={`existing-${img.fileId}`}
                        index={index + 1}
                        previewUrl={img.previewUrl}
                        isVideo={!!isVideo}
                        onRemove={() => onRemoveExistingImage(img.fileId)}
                      />
                    );
                  })}

                  {fileEntries.map((file, index) => {
                    if (!file?.previewUrl) return null;
                    const isVideo = file.file.type.startsWith('video/');
                    const isUploading = file.fileId === null;
                    return (
                      <MediaThumb
                        key={`new-${index}`}
                        index={existingImages.length + index + 1}
                        previewUrl={file.previewUrl}
                        isVideo={isVideo}
                        isUploading={isUploading}
                        sizeLabel={`${(file.file.size / 1024 / 1024).toFixed(1)} MB`}
                        onRemove={() => onRemoveFile(index)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FormMessage className="text-urbancare-sm" />
    </FormItem>
  );
};

interface MediaThumbProps {
  index: number;
  previewUrl: string;
  isVideo: boolean;
  isUploading?: boolean;
  sizeLabel?: string;
  onRemove: () => void;
}

const MediaThumb = ({
  index,
  previewUrl,
  isVideo,
  isUploading,
  sizeLabel,
  onRemove,
}: MediaThumbProps) => {
  return (
    <div className="flex-shrink-0 relative group w-20 h-20">
      <div
        className={cn(
          'absolute inset-0 rounded-urbancare-lg overflow-hidden bg-surface border-2 border-border shadow-sm transition-all duration-300',
          'lg:hover:shadow-md lg:group-hover:scale-105 lg:hover:border-primary/50'
        )}
      >
        {isVideo ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
            <Video className="w-8 h-8 text-foreground-tertiary" />
          </div>
        ) : (
          <img
            src={previewUrl}
            alt={`Preview ${index}`}
            className="w-full h-full object-cover"
          />
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-urbancare-full animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity">
          {sizeLabel && (
            <div className="absolute bottom-1 left-1 right-1">
              <p className="text-urbancare-sm font-medium text-primary-foreground truncate">
                {sizeLabel}
              </p>
            </div>
          )}
        </div>

        <div className="absolute top-1 left-1 w-5 h-5 bg-primary text-primary-foreground text-urbancare-sm rounded-urbancare-full flex items-center justify-center font-semibold shadow-sm">
          {index}
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className={cn(
          'absolute -top-2 -right-2 p-1.5 bg-error text-error-foreground rounded-urbancare-full',
          'opacity-100 lg:opacity-0 lg:group-hover:opacity-100',
          'transition-all duration-200 lg:hover:bg-error/80 lg:hover:scale-110 shadow-lg z-20'
        )}
        aria-label="Remove media"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
