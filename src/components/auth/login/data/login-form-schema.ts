import { z } from 'zod';
import type { TranslationKeys } from '@/i18n';

export const createLoginFormSchema = (t: TranslationKeys) =>
  z
    .object({
      phone: z.string().refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
        message: t.authValidation.enterPhone,
      }),
      password: z
        .string()
        .min(6, { message: t.authValidation.passwordMinLength }),
    })
    .refine((data) => true, {
      message: t.authValidation.passwordsMustMatch,
      path: ['confirmPassword'],
    });
