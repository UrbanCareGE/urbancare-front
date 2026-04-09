'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { PhoneFormInput } from '@/components/common/input/PhoneFormInput';
import { Button } from '@/components/ui/button';
import { KeyRound, Loader2, MessageSquare, Smartphone } from 'lucide-react';
import {
  GenerateOtpDTO,
  LoginDTO,
  LoginWithOtpDTO,
} from '@/model/dto/auth.dto';
import {
  createOtpLoginSchema,
  createPasswordLoginSchema,
} from '@/components/auth/login/data/login-form-schema';
import { useAuth } from '@/components/provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/i18n';
import { RegisterLink } from '@/components/auth/login/RegisterLink';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useOtp } from '@/hooks/query/auth/use-otp';

type LoginMode = 'otp' | 'password';

function OtpCountdown({ onComplete }: { onComplete: () => void }) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, onComplete]);

  return (
    <span className="tabular-nums text-foreground-primary text-urbancare-sm">
      {String(Math.floor(seconds / 60)).padStart(2, '0')}:
      {String(seconds % 60).padStart(2, '0')}
    </span>
  );
}

export function LoginCard() {
  const { mutateAsync, isPending, isError, isSuccess: otpSent } = useOtp();
  const { logIn, logInWithOtp, isLoggingIn } = useAuth();
  const t = useTranslation();
  const [mode, setMode] = useState<LoginMode>('otp');
  const [otpCooldown, setOtpCooldown] = useState(false);

  const PasswordSchema = createPasswordLoginSchema(t);
  const OtpSchema = createOtpLoginSchema(t);

  const passwordForm = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      phone: {
        prefix: '',
        phone: '',
      },
      password: '',
    },
  });

  const otpForm = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      phone: {
        prefix: '',
        phone: '',
      },
      otp: '',
    },
  });

  const handleSwitchMode = useCallback(
    (newMode: LoginMode) => {
      if (newMode === mode) return;
      const currentPhone =
        mode === 'password'
          ? passwordForm.getValues('phone')
          : otpForm.getValues('phone');
      setMode(newMode);
      if (newMode === 'password') {
        passwordForm.setValue('phone', currentPhone);
      } else {
        otpForm.setValue('phone', currentPhone);
      }
    },
    [mode, passwordForm, otpForm]
  );

  const onPasswordSubmit = (values: z.infer<typeof PasswordSchema>) => {
    const loginReq: LoginDTO = {
      phone: {
        prefix: values.phone.prefix,
        number: values.phone.phone,
      },
      password: values.password,
    };
    logIn(loginReq);
  };

  const onOtpSubmit = (values: z.infer<typeof OtpSchema>) => {
    const loginReq: LoginWithOtpDTO = {
      phone: {
        prefix: values.phone.prefix,
        number: values.phone.phone,
      },
      otp: values.otp,
    };
    logInWithOtp(loginReq);
  };

  const handleSendOtp = async () => {
    const isValid = await otpForm.trigger('phone');
    if (!isValid) return;

    const phone = otpForm.getValues('phone');
    if (!phone) {
      otpForm.setError('phone', {
        type: 'manual',
        message: t.authValidation.enterPhone,
      });
      return;
    }

    setOtpCooldown(true);
    await mutateAsync({
      phone: {
        prefix: phone.prefix,
        number: phone.phone,
      },
    } as GenerateOtpDTO);
  };

  const handleCooldownComplete = useCallback(() => {
    setOtpCooldown(false);
  }, []);

  return (
    <Card className="border-border-light rounded-urbancare-4xl animate-slide-up bg-background w-full max-w-[492px]">
      <CardContent className="p-5 sm:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-urbancare-4xl sm:text-urbancare-5xl font-bold text-center text-primary mb-1.5 sm:mb-2">
            {t.auth.welcome}
          </h1>
          <p className="text-center text-secondary text-urbancare-lg sm:text-urbancare-xl">
            {t.auth.authorize}
          </p>
        </div>

        <div className="relative flex bg-surface-elevated rounded-urbancare-2xl p-1 mb-6 sm:mb-7 border border-border">
          <motion.div
            className="absolute top-1 bottom-1 rounded-urbancare-xl bg-gradient-primary shadow-[0_2px_8px_rgba(var(--color-primary)/0.25)]"
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              left: mode === 'otp' ? '4px' : '50%',
              right: mode === 'password' ? '4px' : '50%',
            }}
          />

          <button
            type="button"
            onClick={() => handleSwitchMode('otp')}
            className={cn(
              'relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-urbancare-xl text-urbancare-base font-semibold transition-colors duration-200',
              mode === 'otp'
                ? 'text-white'
                : 'text-text-muted lg:hover:text-text-primary'
            )}
          >
            <MessageSquare className="w-4 h-4" />
            {t.auth.loginWithOtp}
          </button>

          <button
            type="button"
            onClick={() => handleSwitchMode('password')}
            className={cn(
              'relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-urbancare-xl text-urbancare-base font-semibold transition-colors duration-200',
              mode === 'password'
                ? 'text-white'
                : 'text-text-muted lg:hover:text-text-primary'
            )}
          >
            <KeyRound className="w-4 h-4" />
            {t.auth.loginWithPassword}
          </button>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          {mode === 'otp' ? (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Phone */}
                  <FormField
                    control={otpForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PhoneFormInput
                            placeholder={t.auth.phone}
                            disabled={isLoggingIn}
                            value={field.value.phone}
                            onChange={field.onChange}
                            className="h-[48px] sm:h-[52px] border-border bg-surface text-urbancare-lg text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus-within:border-primary focus-within:ring-4 focus-within:ring-primary-light transition-all duration-200"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* OTP Input + Send Button */}
                  <div className="flex gap-2">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <FormInput
                              type="text"
                              inputMode="numeric"
                              autoComplete="one-time-code"
                              maxLength={6}
                              disabled={isLoggingIn}
                              className="h-[48px] sm:h-[52px] rounded-urbancare-xl border border-border bg-surface text-urbancare-lg text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200 text-center font-semibold tracking-[0.3em]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpCooldown || isLoggingIn}
                      className={cn(
                        'h-[48px] sm:h-[52px] px-4 rounded-urbancare-xl font-semibold text-urbancare-base transition-all duration-200 shrink-0 min-w-[90px]',
                        otpSent && !otpCooldown
                          ? 'bg-surface border border-border text-primary lg:hover:bg-hover'
                          : 'bg-gradient-primary text-white shadow-[0_2px_8px_rgba(var(--color-primary)/0.2)]'
                      )}
                    >
                      {otpCooldown ? (
                        <OtpCountdown onComplete={handleCooldownComplete} />
                      ) : otpSent ? (
                        t.auth.resendCode
                      ) : (
                        t.auth.sendCode
                      )}
                    </Button>
                  </div>

                  {/* Helper text */}
                  <p className="text-urbancare-sm text-text-muted text-center pt-0.5">
                    {otpSent ? (
                      <span className="text-success flex items-center justify-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" />
                        {t.auth.otpSent}
                      </span>
                    ) : (
                      t.auth.otpDescription
                    )}
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
                      t.auth.verifyAndSignIn
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="password"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Phone */}
                  <FormField
                    control={passwordForm.control}
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
                    control={passwordForm.control}
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

                  {/* Forgot Password */}
                  <div className="flex justify-end pt-0.5">
                    <a
                      href="/auth/recover-password"
                      className="text-urbancare-sm sm:text-urbancare-md font-semibold text-primary lg:hover:text-primary-dark active:text-primary-dark transition-colors"
                    >
                      {t.auth.forgotPassword}
                    </a>
                  </div>

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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Register link - mobile only */}
        <div className="mt-5 sm:mt-6 lg:hidden">
          <RegisterLink className="block text-center" />
        </div>
      </CardContent>
    </Card>
  );
}
