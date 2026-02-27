import Link from 'next/link';
import { UrbanCareTextIcon } from '@/components/common/logo/AppLogo';
import React from 'react';

export const HeaderLogoIsland = () => (
  <div
    className="relative overflow-hidden bg-surface border border-border rounded-2xl px-5 py-2.5 flex items-center flex-shrink-0 shadow-sm shadow-shadow/5">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-tertiary/[0.04] pointer-events-none" />
    <Link href="/" className="flex items-center">
      <UrbanCareTextIcon className="text-xl" />
    </Link>
  </div>
);