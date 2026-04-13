'use client';

import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  UrbanCareIcon,
  UrbanCareTextIcon,
} from '@/components/common/logo/AppLogo';
import { useTranslation } from '@/i18n';

interface ConnectionErrorProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export function ConnectionError({ onRetry, isRetrying }: ConnectionErrorProps) {
  const t = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 px-6 text-center max-w-sm">
        <div className="relative">
          <UrbanCareIcon className="opacity-30" />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-urbancare-full bg-error/10 flex items-center justify-center">
            <WifiOff className="w-4 h-4 text-error" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <UrbanCareTextIcon />
          <h2 className="text-urbancare-lg font-semibold leading-tight-georgian text-text-primary">
            {t.common.connectionFailed}
          </h2>
          <p className="text-urbancare-sm leading-relaxed-georgian text-text-muted">
            {t.common.connectionFailedDescription}
          </p>
        </div>

        <Button
          onClick={onRetry}
          disabled={isRetrying}
          className="h-11 px-8 rounded-urbancare-4xl bg-gradient-primary shadow-lg shadow-primary/30 lg:hover:shadow-xl lg:hover:shadow-primary/40 lg:hover:-translate-y-0.5 active:scale-[0.98] transition duration-200 font-semibold relative overflow-hidden disabled:bg-disabled disabled:text-disabled-foreground"
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
          {t.common.tryAgain}
        </Button>
      </div>
    </div>
  );
}
