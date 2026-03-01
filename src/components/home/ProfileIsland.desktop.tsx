'use client';

import { motion } from 'motion/react';
import { Bell, Building2, ShieldCheck } from 'lucide-react';
import { HeaderUserDropdown } from '@/components/common/header/desktop/Header.desktop';
import { useAuth } from '@/components/provider/AuthProvider';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export const ProfileIslandDesktop = () => {
  const { user, isManager } = useAuth();

  const displayName = useMemo(() => `${user.name} ${user.surname}`, [user]);
  const apartmentName = user.selectedApartment?.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-full flex items-center gap-2"
    >
      {/* Notification bell */}
      <button
        className={cn(
          'relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
          'bg-surface border border-border',
          'hover:bg-surface-hover hover:border-border-hover',
          'text-icon hover:text-text-primary',
          'transition-all duration-200 shadow-sm active:scale-95'
        )}
      >
        <Bell className="w-4 h-4" />
      </button>

      {/* Profile card */}
      <div
        className={cn(
          'flex-1 min-w-0 flex items-center gap-3 px-2 py-1.5 rounded-xl',
          'bg-surface border border-border',
          'shadow-sm shadow-shadow/5'
        )}
      >
        {/* Avatar + dropdown trigger */}
        <HeaderUserDropdown />

        {/* Name + apartment */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight text-text-primary truncate">
            {displayName}
          </p>
          {apartmentName && (
            <div className="flex items-center gap-1 mt-0.5">
              {isManager ? (
                <ShieldCheck className="w-3 h-3 flex-shrink-0 text-tertiary" />
              ) : (
                <Building2 className="w-3 h-3 flex-shrink-0 text-icon" />
              )}
              <span
                className={cn(
                  'text-[11px] leading-tight truncate',
                  isManager
                    ? 'font-semibold text-tertiary'
                    : 'text-text-secondary'
                )}
              >
                {apartmentName}
              </span>
            </div>
          )}
        </div>

        {/* Manager badge */}
        {isManager && (
          <span
            className={cn(
              'flex-shrink-0 inline-flex px-2 py-0.5 rounded-full',
              'text-[10px] font-bold tracking-wide',
              'bg-tertiary-container text-tertiary-container-foreground'
            )}
          >
            ADM
          </span>
        )}
      </div>
    </motion.div>
  );
};
