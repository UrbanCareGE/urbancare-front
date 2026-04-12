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

export function LoginModeSwitcher({ mode, onSwitchMode }: LoginModeSwitcherProps) {
  const t = useTranslation();

  return (
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
        onClick={() => onSwitchMode('otp')}
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
        onClick={() => onSwitchMode('password')}
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
  );
}
