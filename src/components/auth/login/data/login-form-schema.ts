import { z } from 'zod';
import type { TranslationKeys } from '@/i18n';

const phoneSchema = (t: TranslationKeys) =>
  z.object({
    prefix: z.string(),
    phone: z.string().refine((val) => /^\d{5,14}$/.test(val), {
      message: t.authValidation.enterPhone,
    }),
  });

export const PasswordLoginSchema = (t: TranslationKeys) =>
  z.object({
    phone: phoneSchema(t),
    password: z
      .string()
      .min(6, { message: t.authValidation.passwordMinLength }),
  });

export const OtpLoginSchema = (t: TranslationKeys) =>
  z.object({
    phone: phoneSchema(t),
    otp: z.string().min(1, { message: t.authValidation.invalidCode }),
  });
