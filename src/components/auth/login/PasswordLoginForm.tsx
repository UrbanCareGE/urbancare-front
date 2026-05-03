'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { PhoneFormInput } from '@/components/common/input/PhoneFormInput';
import { Button } from '@/components/ui/button';
import { ArrowRight, KeyRound, Loader2 } from 'lucide-react';
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
        className="space-y-4"
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
                  className="h-[52px] urbancare-rounded-xl border-white/[0.06] bg-background urbancare-text-base text-text-primary placeholder:text-text-tertiary lg:hover:border-white/[0.12] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-200"
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
                  icon={<KeyRound className="text-text-tertiary" />}
                  type="password"
                  isPasswordType
                  disabled={isLoggingIn}
                  className="h-[52px] sm:h-[52px] urbancare-rounded-xl border border-white/[0.06] bg-background urbancare-text-base text-text-primary placeholder:text-text-tertiary lg:hover:border-white/[0.12] focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <p className="urbancare-text-sm text-text-tertiary text-center pt-1">
          {t.auth.passwordDescription}
        </p>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoggingIn}
          className="w-full h-[52px] urbancare-rounded-xl bg-primary text-white font-bold urbancare-text-lg flex items-center justify-center gap-2.5 transition-all duration-200 lg:hover:bg-primary-hover active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            boxShadow: '0 14px 30px -10px rgba(45,123,255,0.6)',
          }}
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t.common.wait}
            </>
          ) : (
            <>
              {t.auth.authorization}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
