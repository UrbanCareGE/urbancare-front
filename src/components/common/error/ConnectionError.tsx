'use client';

import { RefreshCw, WifiOff } from 'lucide-react';
import {
  UrbanCareIcon,
  UrbanCareTextIcon,
} from '@/components/common/logo/AppLogo';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

interface ConnectionErrorProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export function ConnectionError({ onRetry, isRetrying }: ConnectionErrorProps) {
  const t = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background px-6 py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 w-80 h-80 bg-error/10 urbancare-rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 urbancare-rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <UrbanCareIcon className="w-9 h-9" iconClassName="w-5 h-5" />
          <UrbanCareTextIcon className="urbancare-text-2xl" />
        </div>

        <div
          className={cn(
            'urbancare-rounded-3xl bg-surface border border-border',
            'shadow-sm shadow-shadow/5',
            'px-6 sm:px-8 py-8 text-center'
          )}
        >
          <div className="mx-auto w-16 h-16 urbancare-rounded-2xl bg-error/10 text-error flex items-center justify-center mb-5">
            <WifiOff className="w-7 h-7" strokeWidth={2} />
          </div>

          <h2 className="urbancare-text-3xl font-bold text-text-primary leading-tight-georgian mb-2">
            {t.common.connectionFailed}
          </h2>
          <p className="urbancare-text-base text-text-secondary leading-relaxed mb-6">
            {t.common.connectionFailedDescription}
          </p>

          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className={cn(
              'inline-flex items-center justify-center gap-2 w-full h-12 px-5',
              'urbancare-rounded-lg bg-primary text-white',
              'urbancare-text-base font-semibold',
              'shadow-sm shadow-primary/20 transition-all',
              'lg:hover:bg-primary-hover lg:active:scale-[0.99]',
              'disabled:opacity-60 disabled:cursor-not-allowed'
            )}
          >
            <RefreshCw
              className={cn('w-4 h-4', isRetrying && 'animate-spin')}
              strokeWidth={2.5}
            />
            {isRetrying ? t.common.inProgress : t.common.tryAgain}
          </button>
        </div>
      </div>
    </div>
  );
}
