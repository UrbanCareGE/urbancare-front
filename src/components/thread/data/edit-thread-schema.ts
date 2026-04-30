import { z } from 'zod';
import type { TranslationKeys } from '@/i18n';
import { ACCEPTED_FILE_TYPES } from '@/components/thread/data/create-thread-schema';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;

export type ExistingImage = {
  fileId: string;
  previewUrl: string;
  contentType: string;
};

const createFileEntrySchema = (t: TranslationKeys) =>
  z.object({
    file: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: t.threadValidation.fileSizeExceeded,
      })
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
        message: t.threadValidation.onlyImagesAndVideos,
      }),
    fileId: z.string().nullable(),
    previewUrl: z.string(),
  });

export const editThreadSchema = (t: TranslationKeys) =>
  z.object({
    title: z
      .string()
      .min(0, { message: t.threadValidation.titleMinLength })
      .max(100, { message: t.threadValidation.titleMaxLength }),
    body: z
      .string()
      .min(0, { message: t.threadValidation.contentMinLength })
      .max(2000, { message: t.threadValidation.contentMaxLength }),
    files: z
      .array(createFileEntrySchema(t))
      .max(MAX_FILES, t.threadValidation.maxFilesUpload),
    existingImages: z
      .array(
        z.object({
          fileId: z.string(),
          previewUrl: z.string(),
          contentType: z.string(),
        })
      )
      .default([]),
    tags: z
      .array(z.string())
      .max(3, { message: t.threadValidation.maxTags })
      .default([])
      .optional(),
    mentions: z
      .array(
        z.object({
          userId: z.string(),
          fromIndex: z.number().int().min(0),
          toIndex: z.number().int().min(1),
        })
      )
      .max(20)
      .default([]),
  });

export type EditThreadSchemaType = ReturnType<typeof editThreadSchema>;
