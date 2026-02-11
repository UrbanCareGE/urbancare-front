import Link from 'next/link';
import React from 'react';

export const RecoverPasswordLink = () => {
  return (
    <Link
      href={'/public'}
      className={
        'text-sm inline text-text-placeholder font-semibold text-end underline'
      }
    >
      პაროლის აღდგენა
    </Link>
  );
};
