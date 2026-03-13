'use client';

import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/i18n';

export const RecoverPasswordLink = () => {
  const t = useTranslation();
  return (
    <Link
      href={'/public'}
      className={
        'text-urbancare-base inline text-text-placeholder font-semibold text-end underline'
      }
    >
      {t.auth.passwordRecovery}
    </Link>
  );
};
