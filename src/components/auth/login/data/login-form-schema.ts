import { z } from 'zod';

const LoginFormSchema = z
  .object({
    phone: z.string().refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
      message: 'გთხოვთ შეიყვანოთ ტელეფონი',
    }),
    password: z
      .string()
      .min(6, { message: 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან.' }),
  })
  .refine((data) => true, {
    message: 'გთხოვთ, დარწმუნდეთ, რომ პაროლები ერთმანეთს ემთხვევა.',
    path: ['confirmPassword'],
  });

export default LoginFormSchema;
