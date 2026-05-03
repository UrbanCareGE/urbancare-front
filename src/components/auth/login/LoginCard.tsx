'use client';

import { useCallback, useState } from 'react';
import {
  GenerateOtpDTO,
  LoginDTO,
  LoginWithOtpDTO,
} from '@/model/dto/auth.dto';
import {
  OtpLoginSchema,
  PasswordLoginSchema,
} from '@/components/auth/login/data/login-form-schema';
import { useAuth } from '@/components/provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@/i18n';
import { AnimatePresence, motion } from 'motion/react';
import { useGenerateOtp } from '@/hooks/query/auth/use-otp';
import { LoginHeader } from '@/components/auth/login/LoginHeader';
import {
  type LoginMode,
  LoginModeSwitcher,
} from '@/components/auth/login/LoginModeSwitcher';
import { OtpLoginForm } from '@/components/auth/login/OtpLoginForm';
import { PasswordLoginForm } from '@/components/auth/login/PasswordLoginForm';

export function LoginCard() {
  const {
    mutateAsync,
    isPending,
    isError,
    isSuccess: otpSent,
  } = useGenerateOtp();
  const { logIn, logInWithOtp, isLoggingIn } = useAuth();
  const t = useTranslation();
  const [mode, setMode] = useState<LoginMode>('otp');
  const [otpCooldown, setOtpCooldown] = useState(false);

  const PasswordSchema = PasswordLoginSchema(t);
  const OtpSchema = OtpLoginSchema(t);

  const passwordForm = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      phone: { prefix: '', phone: '' },
      password: '',
    },
  });

  const otpForm = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      phone: { prefix: '', phone: '' },
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
    logIn({
      phone: { prefix: values.phone.prefix, number: values.phone.phone },
      password: values.password,
    } as LoginDTO);
  };

  const onOtpSubmit = (values: z.infer<typeof OtpSchema>) => {
    logInWithOtp({
      phone: { prefix: values.phone.prefix, number: values.phone.phone },
      otp: values.otp,
    } as LoginWithOtpDTO);
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
      phone: { prefix: phone.prefix, number: phone.phone },
    } as GenerateOtpDTO);
  };

  const handleCooldownComplete = useCallback(() => {
    setOtpCooldown(false);
  }, []);

  return (
    <div className="w-full max-w-[420px] animate-slide-up">
      {/* Dark glass card — matches A3 design */}
      <div
        className="relative urbancare-rounded-4xl border border-white/[0.06] bg-surface backdrop-blur-xl"
        style={{
          boxShadow:
            '0 40px 80px -20px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Secured badge (top-right) */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(122,241,176,0.12)] border border-[rgba(122,241,176,0.25)] urbancare-text-2xs font-semibold text-[#7AF1B0] uppercase tracking-[0.06em]">
          <span className="w-1 h-1 rounded-full bg-[#7AF1B0]" />
          {t.auth.secure}
        </div>

        <div className="p-5 sm:p-7">
          <LoginHeader />

          <LoginModeSwitcher mode={mode} onSwitchMode={handleSwitchMode} />

          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              {mode === 'otp' ? (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <OtpLoginForm
                    form={otpForm}
                    onSubmit={onOtpSubmit}
                    isLoggingIn={isLoggingIn}
                    otpSent={otpSent}
                    otpCooldown={otpCooldown}
                    onSendOtp={handleSendOtp}
                    onCooldownComplete={handleCooldownComplete}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <PasswordLoginForm
                    form={passwordForm}
                    onSubmit={onPasswordSubmit}
                    isLoggingIn={isLoggingIn}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
