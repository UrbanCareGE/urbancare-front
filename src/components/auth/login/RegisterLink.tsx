'use client';

import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

type RegisterLinkProps = {
  className?: string;
};

export const RegisterLink = ({ className }: RegisterLinkProps) => {
  const t = useTranslation();
  return (
    <label className={cn('text-md text-center text-text-secondary', className)}>
      {t.auth.noAccountShort}&nbsp;-&nbsp;
      <Link href={'/auth/register'} className={'text-primary'}>
        {t.auth.createShort}
      </Link>
    </label>
  );
};
