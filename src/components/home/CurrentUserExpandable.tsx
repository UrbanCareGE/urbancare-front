'use client';

import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/components/provider/AuthProvider';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MobileThemeSelector } from '@/components/common/util/MobileThemeSelector';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { useTranslation } from '@/i18n';
import { CurrentUserAvatar } from '@/components/common/avatar/UserAvatar';

export const CurrentUserExpandable = () => {
  const { user, isManager } = useAuth();
  const t = useTranslation();

  const displayName = useMemo(() => `${user.name} ${user.surname}`, [user]);
  const roleLabel = isManager ? t.role.manager : t.role.member;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'min-w-0 flex items-center justify-end gap-3 px-2 py-1.5 rounded-urbancare-xl cursor-pointer',
            'bg-surface border border-transparent',
            'hover:bg-surface-hover hover:border-border',
            'shadow-sm shadow-shadow/5',
            'transition-all duration-200'
          )}
        >
          <CurrentUserAvatar />

          <div className="flex-1 min-w-0 lg:hidden xl:block">
            <p className="text-urbancare-base font-semibold leading-tight text-text-primary truncate">
              {displayName}
            </p>
            <p
              className={cn(
                'text-[12px] leading-[14px] tracking-tight truncate text-text-tertiary',
                isManager && 'text-tertiary'
              )}
            >
              {roleLabel}
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 text-icon transition-transform duration-200 [[data-state=open]_&]:rotate-180 lg:hidden xl:inline" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={6}
        className={cn(
          'w-[var(--radix-popover-trigger-width)] min-w-[250px] p-0 overflow-hidden',
          'bg-surface border border-border',
          'rounded-urbancare-3xl shadow-xl shadow-shadow/10'
        )}
      >
        <div className="p-3 space-y-3">
          {/* Theme section */}
          <div>
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <div className="w-1.5 h-1.5 rounded-urbancare-full bg-warning shadow-sm shadow-warning/50" />
              <p className="text-urbancare-2xs font-bold text-text-secondary uppercase tracking-widest">
                {t.sidebar.theme}
              </p>
            </div>
            <MobileThemeSelector vertical />
          </div>

          {/* Gradient divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-1" />
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};
