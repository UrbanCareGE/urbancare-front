'use client';

import { useTranslation } from '@/i18n';

export function LoginHeader() {
  const t = useTranslation();

  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="text-urbancare-4xl sm:text-urbancare-5xl font-bold text-center text-primary mb-1.5 sm:mb-2">
        {t.auth.welcome}
      </h1>
      <p className="text-center text-secondary text-urbancare-lg sm:text-urbancare-xl">
        {t.auth.authorize}
      </p>
    </div>
  );
}
