'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, MapPinOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';
import { UrbanCareIcon, UrbanCareTextIcon } from '@/components/common/logo/AppLogo';

export default function NotFound() {
  const t = useTranslation();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 w-80 h-80 bg-primary/15 urbancare-rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-tertiary/15 urbancare-rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/landing"
          className="flex items-center justify-center gap-2 mb-8 transition-opacity lg:hover:opacity-80"
        >
          <UrbanCareIcon className="w-9 h-9" iconClassName="w-5 h-5" />
          <UrbanCareTextIcon className="urbancare-text-2xl" />
        </Link>

        <div
          className={cn(
            'urbancare-rounded-3xl bg-surface border border-border',
            'shadow-sm shadow-shadow/5',
            'px-6 sm:px-8 py-8 text-center'
          )}
        >
          <div className="mx-auto w-16 h-16 urbancare-rounded-2xl bg-error/10 text-error flex items-center justify-center mb-5">
            <MapPinOff className="w-7 h-7" strokeWidth={2} />
          </div>

          <p className="urbancare-text-xs font-bold uppercase tracking-[0.2em] text-text-tertiary mb-2">
            404
          </p>
          <h1 className="urbancare-text-3xl font-bold text-text-primary leading-tight-georgian mb-2">
            {t.notFound.title}
          </h1>
          <p className="urbancare-text-base text-text-secondary leading-relaxed mb-6">
            {t.notFound.description}
          </p>

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className={cn(
                'inline-flex items-center justify-center gap-2 w-full h-12 px-5',
                'urbancare-rounded-lg bg-primary text-white',
                'urbancare-text-base font-semibold',
                'shadow-sm shadow-primary/20 transition-all',
                'lg:hover:bg-primary-hover lg:active:scale-[0.99]'
              )}
            >
              <Home className="w-4 h-4" strokeWidth={2.5} />
              {t.notFound.backToHome}
            </Link>
            <button
              type="button"
              onClick={() => router.back()}
              className={cn(
                'inline-flex items-center justify-center gap-2 w-full h-12 px-5',
                'urbancare-rounded-lg bg-surface-variant text-text-secondary border border-border',
                'urbancare-text-base font-semibold',
                'transition-all',
                'lg:hover:bg-surface-hover lg:hover:text-text-primary lg:active:scale-[0.99]'
              )}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              {t.common.goBack}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
