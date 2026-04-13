'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { PhoneFormInput } from '@/components/common/input/PhoneFormInput';
import { Button } from '@/components/ui/button';
import { KeyRound, Loader2, Smartphone } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { PasswordLoginSchema } from '@/components/auth/login/data/login-form-schema';

type PasswordFormValues = z.infer<ReturnType<typeof PasswordLoginSchema>>;

interface PasswordLoginFormProps {
  form: UseFormReturn<PasswordFormValues>;
  onSubmit: (values: PasswordFormValues) => void;
  isLoggingIn: boolean;
}

export function PasswordLoginForm({
  form,
  onSubmit,
  isLoggingIn,
}: PasswordLoginFormProps) {
  const t = useTranslation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4"
      >
        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneFormInput
                  placeholder={t.auth.phone}
                  disabled={isLoggingIn}
                  value={field.value}
                  onChange={field.onChange}
                  className="h-[48px] sm:h-[52px] border-border bg-surface text-urbancare-lg text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus-within:border-primary focus-within:ring-4 focus-within:ring-primary-light transition-all duration-200"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormInput
                  placeholder={t.auth.password}
                  icon={<KeyRound className="text-icon" />}
                  type="password"
                  isPasswordType
                  disabled={isLoggingIn}
                  className="h-[48px] sm:h-[52px] rounded-urbancare-xl border border-border bg-surface text-urbancare-lg text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <p className="text-urbancare-sm text-text-muted text-center pt-0.5">
          {t.auth.passwordDescription}
        </p>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoggingIn}
          className="w-full h-[48px] sm:h-[52px] rounded-urbancare-2xl bg-gradient-primary shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] lg:hover:shadow-[0_6px_24px_rgba(var(--color-primary)/0.4)] lg:hover:-translate-y-0.5 lg:active:translate-y-0 active:scale-[0.98] transition-all duration-200 text-text-primary font-semibold relative overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
          {isLoggingIn ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              {t.common.wait}
            </>
          ) : (
            t.auth.authorization
          )}
        </Button>
      </form>
    </Form>
  );
}
