'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { Image as ImageIconLucid, Upload, Video, X } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  createThreadSchema,
  FileEntry,
} from '@/components/thread/data/create-thread-schema';

interface ThreadFileUploadProps {
  control: Control<z.infer<typeof createThreadSchema>>;
  fileEntries: FileEntry[];
  isPending: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

export const ThreadFileUpload = ({
  control,
  fileEntries,
  isPending,
  fileInputRef,
  onFileChange,
  onRemoveFile,
}: ThreadFileUploadProps) => {
  return (
    <FormField
      control={control}
      name="files"
      render={() => (
        <FormItem>
          <div className="flex items-center justify-between mb-3">
            <FormLabel className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
              <ImageIconLucid className="w-4 h-4 text-foreground-disabled" />
              მედია ფაილები
            </FormLabel>
            <span className="text-xs text-foreground-tertiary">
              {fileEntries.length}/5 ფაილი
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
              disabled={fileEntries.length >= 5 || isPending}
              className="w-full h-auto border-2 border-dashed border-border lg:hover:border-primary lg:hover:bg-primary/5 transition-all group"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-surface-container lg:group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Upload className="w-5 h-5 text-foreground-tertiary lg:group-hover:text-primary transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground-secondary">
                    ფოტოს ან ვიდეოს ატვირთვა
                  </p>
                  <p className="text-xs text-foreground-tertiary mt-0.5">
                    მაქს. 5 ფაილი, თითო 10MB-მდე
                  </p>
                </div>
              </div>
            </Button>

            {fileEntries.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs font-medium text-foreground-tertiary">
                    ატვირთული ფაილები
                  </p>
                  {fileEntries.length > 3 && (
                    <p className="text-xs text-foreground-disabled">
                      ← გადაფურცლეთ →
                    </p>
                  )}
                </div>

                <div className="relative">
                  {fileEntries.length > 3 && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none rounded-l-xl" />
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none rounded-r-xl" />
                    </>
                  )}
                  <div className="overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide bg-surface-variant rounded-xl p-3">
                    <div className="flex gap-3">
                      {fileEntries.map((file, index) => {
                        if (!file || !file.previewUrl) return null;
                        return (
                          <div
                            key={index}
                            className="flex-shrink-0 relative group"
                          >
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface border-2 shadow-sm lg:hover:shadow-md transition-all duration-300 lg:hover:scale-105 lg:hover:border-primary/50 relative">
                              {file.file.type.startsWith('image/') ? (
                                <img
                                  src={file.previewUrl}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
                                  <Video className="w-8 h-8 text-foreground-tertiary" />
                                </div>
                              )}

                              <button
                                type="button"
                                onClick={() => onRemoveFile(index)}
                                className="absolute -top-2 -right-2 p-1.5 bg-error text-error-foreground rounded-full opacity-0 lg:group-hover:opacity-100 transition-all duration-200 lg:hover:bg-error/80 lg:hover:scale-110 shadow-lg z-20"
                              >
                                <X className="w-3 h-3" />
                              </button>

                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-1 left-1 right-1">
                                  <p className="text-xs font-medium text-primary-foreground truncate">
                                    {(file.file.size / 1024 / 1024).toFixed(1)}{' '}
                                    MB
                                  </p>
                                </div>
                              </div>

                              <div className="absolute top-1 left-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold shadow-sm">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
