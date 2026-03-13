import { z } from 'zod';
import type { TranslationKeys } from '@/i18n';

export const createRegisterSchema = (t: TranslationKeys) =>
  z
    .object({
      firstName: z
        .string()
        .min(2, { message: t.authValidation.nameMinLength }),
      lastName: z
        .string()
        .min(2, { message: t.authValidation.surnameMinLength }),
      phone: z.string().refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
        message: t.authValidation.enterPhone,
      }),
      password: z
        .string()
        .min(6, { message: t.authValidation.passwordMinLength }),
      confirmPassword: z.string().min(6, {
        message: t.authValidation.repeatPasswordMinLength,
      }),
      acceptTerms: z.boolean().refine((val) => val === true, {
        message: t.authValidation.agreeToTerms,
      }),
      otp: z.string().refine((val) => !!val, {
        message: t.authValidation.invalidCode,
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.authValidation.passwordsMustMatch,
      path: ['confirmPassword'],
    });
