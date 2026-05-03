'use client';

import { useTranslation } from '@/i18n';

export function LoginHeader() {
  const t = useTranslation();

  return (
    <div className="mb-7">
      <p className="urbancare-text-2xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
        {t.auth.welcome}
      </p>
      <h1
        className="mt-2.5 text-text-primary tracking-tight"
        style={{
          fontFamily: "'Fraunces', 'FiraGO', serif",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}
      >
        {t.auth.enterCode}
      </h1>
      <p className="mt-2 urbancare-text-md text-text-secondary leading-relaxed">
        {t.auth.authorize}
      </p>
    </div>
  );
}
