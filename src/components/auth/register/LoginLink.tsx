import Link from 'next/link';
import React from 'react';

export const LoginLink = () => {
  return (
    <label className={'text-center text-gray-500'}>
      არსებული ანგარიშით&nbsp;
      <Link href={'/auth/login'} className={'text-primary'}>
        შესვლა
      </Link>
    </label>
  );
};
