'use client';

import { KeyRound, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

export type LoginMode = 'otp' | 'password';

interface LoginModeSwitcherProps {
  mode: LoginMode;
  onSwitchMode: (mode: LoginMode) => void;
}

export function LoginModeSwitcher({
  mode,
  onSwitchMode,
}: LoginModeSwitcherProps) {
  const t = useTranslation();

  return (
    <div className="relative flex bg-background urbancare-rounded-2xl p-1 mb-6 border border-white/[0.06]">
      <motion.div
        className="absolute top-1 bottom-1 urbancare-rounded-xl bg-primary"
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          left: mode === 'otp' ? '4px' : '50%',
          right: mode === 'password' ? '4px' : '50%',
          boxShadow: '0 8px 20px -6px rgba(45,123,255,0.55)',
        }}
      />

      <button
        type="button"
        onClick={() => onSwitchMode('otp')}
        className={cn(
          'relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 urbancare-rounded-xl urbancare-text-base font-semibold transition-colors duration-200',
          mode === 'otp'
            ? 'text-white'
            : 'text-text-tertiary lg:hover:text-text-primary'
        )}
      >
        <MessageSquare className="w-4 h-4" />
        {t.auth.loginWithOtp}
      </button>

      <button
        type="button"
        onClick={() => onSwitchMode('password')}
        className={cn(
          'relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 urbancare-rounded-xl urbancare-text-base font-semibold transition-colors duration-200',
          mode === 'password'
            ? 'text-white'
            : 'text-text-tertiary lg:hover:text-text-primary'
        )}
      >
        <KeyRound className="w-4 h-4" />
        {t.auth.loginWithPassword}
      </button>
    </div>
  );
}
