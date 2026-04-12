'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { PhoneFormInput } from '@/components/common/input/PhoneFormInput';
import { Button } from '@/components/ui/button';
import { Loader2, Smartphone } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { createOtpLoginSchema } from '@/components/auth/login/data/login-form-schema';
import { OtpCountdown } from '@/components/auth/login/OtpCountdown';
import { FormOtpInput } from '@/components/common/input/FormOtpInput';

type OtpFormValues = z.infer<ReturnType<typeof createOtpLoginSchema>>;

interface OtpLoginFormProps {
  form: UseFormReturn<OtpFormValues>;
  onSubmit: (values: OtpFormValues) => void;
  isLoggingIn: boolean;
  otpSent: boolean;
  otpCooldown: boolean;
  onSendOtp: () => void;
  onCooldownComplete: () => void;
}

export function OtpLoginForm({
  form,
  onSubmit,
  isLoggingIn,
  otpSent,
  otpCooldown,
  onSendOtp,
  onCooldownComplete,
}: OtpLoginFormProps) {
  const t = useTranslation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        {/* Phone input with embedded send OTP button */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneFormInput
                  placeholder={t.auth.phone}
                  disabled={isLoggingIn}
                  value={field.value.phone}
                  onChange={field.onChange}
                  className="h-[48px] sm:h-[52px] border-border bg-surface text-urbancare-lg text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200"
                  suffix={
                    <Button
                      type="button"
                      onClick={onSendOtp}
                      disabled={otpCooldown || isLoggingIn}
                      className={cn(
                        'h-auto py-1.5 px-3 rounded-urbancare-lg font-medium text-urbancare-xs transition-all duration-200',
                        otpSent && !otpCooldown
                          ? 'bg-surface-variant border border-border text-primary lg:hover:bg-hover'
                          : 'bg-gradient-primary text-white'
                      )}
                    >
                      {otpCooldown ? (
                        <OtpCountdown onComplete={onCooldownComplete} />
                      ) : otpSent ? (
                        t.auth.resendCode
                      ) : (
                        t.auth.sendCode
                      )}
                    </Button>
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center gap-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormOtpInput
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    disabled={isLoggingIn}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Helper text */}
        <p className="text-urbancare-sm text-text-muted text-center">
          {otpSent ? (
            <span className="text-success flex items-center justify-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              {t.auth.otpSent}
            </span>
          ) : (
            t.auth.otpDescription
          )}
        </p>
        {/* Submit button */}
        <Button
          type="submit"
          disabled={isLoggingIn}
          className="w-full h-[48px] sm:h-[52px] rounded-urbancare-4xl bg-gradient-primary shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] lg:hover:shadow-[0_6px_24px_rgba(var(--color-primary)/0.4)] lg:hover:-translate-y-0.5 lg:active:translate-y-0 active:scale-[0.98] transition-all duration-200 font-semibold relative overflow-hidden disabled:bg-disabled disabled:text-disabled-foreground"
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          {isLoggingIn ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              {t.common.wait}
            </>
          ) : (
            t.auth.verifyAndSignIn
          )}
        </Button>
      </form>
    </Form>
  );
}
