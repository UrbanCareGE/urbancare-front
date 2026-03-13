import { z } from 'zod';
import type { TranslationKeys } from '@/i18n';

export const createTagsFilterSchema = (t: TranslationKeys) =>
  z.object({
    tags: z
      .array(z.string())
      .max(3, { message: t.threadValidation.maxTagsSelection }),
  });

export type TagsFilterSchemaType = ReturnType<typeof createTagsFilterSchema>;
