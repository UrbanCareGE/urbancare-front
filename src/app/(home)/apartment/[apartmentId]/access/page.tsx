'use client';

import React from 'react';
import { Construction } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function AccessPage() {
  const t = useTranslation();

  return (
    <div className="flex-1 w-full p-3 lg:p-0">
      <section className="w-full urbancare-rounded-3xl overflow-hidden border border-warning/30 bg-warning-container/40 shadow-sm shadow-shadow/5">
        <div className="px-4 py-3 bg-warning-container/60 border-b border-warning/30 flex items-center gap-2">
          <div className="w-10 h-10 urbancare-rounded-xl bg-warning/15 text-warning-container-foreground flex items-center justify-center shrink-0">
            <Construction className="w-5 h-5" />
          </div>
          <h3 className="font-semibold urbancare-text-base text-warning-container-foreground leading-tight-georgian">
            {t.access.workInProgressTitle}
          </h3>
        </div>
        <div className="p-4 sm:p-5">
          <p className="urbancare-text-base text-text-secondary leading-relaxed">
            {t.access.workInProgressMessage}
          </p>
        </div>
      </section>
    </div>
  );
}
