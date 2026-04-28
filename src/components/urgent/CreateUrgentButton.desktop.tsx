'use client';

import { Siren } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';
import { CreateUrgentDialog } from '@/components/urgent/CreateUrgentDialog';

export const CreateUrgentButtonDesktop = () => {
  const t = useTranslation();

  return (
    <div className="px-4 pb-1">
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3',
          'bg-surface urbancare-rounded-panel border border-border',
          'shadow-sm shadow-shadow/5'
        )}
      >
        <div className="flex items-center justify-center w-9 h-9 shrink-0 urbancare-rounded-xl bg-error/10 text-error">
          <Siren className="w-4 h-4" />
        </div>

        <CreateUrgentDialog>
          <button
            type="button"
            className={cn(
              'flex-1 flex items-center h-9 px-4 urbancare-rounded-full',
              'bg-surface-container border border-transparent',
              'urbancare-text-base text-text-tertiary text-left',
              'transition-colors duration-200',
              'lg:hover:bg-surface-hover lg:hover:border-error/20',
              'cursor-pointer'
            )}
          >
            {t.urgent.createUrgent}
          </button>
        </CreateUrgentDialog>
      </div>
    </div>
  );
};
