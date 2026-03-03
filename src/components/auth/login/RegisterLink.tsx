import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

type RegisterLinkProps = {
  className?: string;
};

export const RegisterLink = ({ className }: RegisterLinkProps) => {
  return (
    <label className={cn('text-md text-center text-text-secondary', className)}>
      არ გაქვს ანგარიში?&nbsp;-&nbsp;
      <Link href={'/auth/register'} className={'text-primary'}>
        შექმენი
      </Link>
    </label>
  );
};
