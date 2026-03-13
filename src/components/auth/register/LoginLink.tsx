'use client';

import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/i18n';

export const LoginLink = () => {
  const t = useTranslation();
  return (
    <label className={'text-center text-text-secondary'}>
      {t.auth.withExistingAccount}&nbsp;
      <Link href={'/auth/login'} className={'text-primary'}>
        {t.auth.signIn}
      </Link>
    </label>
  );
};
