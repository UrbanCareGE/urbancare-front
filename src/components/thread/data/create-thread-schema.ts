import { z } from 'zod';
import type { TranslationKeys } from '@/i18n';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/heic',
];
export const ACCEPTED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/ogg',
];
export const ACCEPTED_FILE_TYPES = [
  ...ACCEPTED_IMAGE_TYPES,
  ...ACCEPTED_VIDEO_TYPES,
];

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

export type FileEntry = {
  file: File;
  fileId: string | null;
  previewUrl: string;
};

export const createThreadSchema = (t: TranslationKeys) =>
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
    tags: z
      .array(z.string())
      .max(3, { message: t.threadValidation.maxTags })
      .default([])
      .optional(),
    pollOptions: z.array(z.string()).default([]).optional(),
  });

export type CreateThreadSchemaType = ReturnType<typeof createThreadSchema>;
