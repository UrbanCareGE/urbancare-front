'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { PhoneFormInput } from '@/components/common/input/PhoneFormInput';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Smartphone } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { OtpLoginSchema } from '@/components/auth/login/data/login-form-schema';
import { OtpCountdown } from '@/components/auth/login/OtpCountdown';
import { FormOtpInput } from '@/components/common/input/FormOtpInput';

type OtpFormValues = z.infer<ReturnType<typeof OtpLoginSchema>>;

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
        className="space-y-5"
      >
        {/* Phone input — dark inset row */}
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
                  className="h-[52px] urbancare-rounded-xl border-white/[0.06] bg-background urbancare-text-base text-text-primary placeholder:text-text-tertiary lg:hover:border-white/[0.12] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all duration-200"
                  suffix={
                    <Button
                      type="button"
                      onClick={onSendOtp}
                      disabled={otpCooldown || isLoggingIn}
                      className={cn(
                        'h-auto py-1.5 px-3 urbancare-rounded-lg font-semibold urbancare-text-xs transition-all duration-200',
                        otpSent && !otpCooldown
                          ? 'bg-surface-elevated border border-white/[0.06] text-primary lg:hover:bg-surface-container-high'
                          : 'bg-primary text-white shadow-[0_8px_20px_-6px_rgba(45,123,255,0.55)] lg:hover:bg-primary-hover'
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

        <div className="flex flex-col items-center gap-3">
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
        <p className="urbancare-text-sm text-text-tertiary text-center">
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
              {t.auth.verifyAndSignIn}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
