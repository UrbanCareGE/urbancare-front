'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

const getThemeOptions = (t: ReturnType<typeof useTranslation>) => [
  {
    id: 'light',
    icon: Sun,
    label: t.theme.light,
    desc: t.theme.lightDescription,
  },
  {
    id: 'dark',
    icon: Moon,
    label: t.theme.dark,
    desc: t.theme.darkDescription,
  },
  {
    id: 'system',
    icon: Monitor,
    label: t.theme.system,
    desc: t.theme.systemDescription,
  },
];

const iconStyles: Record<
  string,
  { active: string; base: string; icon: string }
> = {
  light: {
    active: 'bg-warning-container',
    base: 'bg-surface-container',
    icon: 'text-warning',
  },
  dark: {
    active: 'bg-primary-container',
    base: 'bg-surface-container',
    icon: 'text-primary',
  },
  system: {
    active: 'bg-tertiary-container/50',
    base: 'bg-surface-container',
    icon: 'text-tertiary',
  },
};

interface MobileThemeSelectorProps {
  vertical?: boolean;
}

export const MobileThemeSelector = ({
  vertical = false,
}: MobileThemeSelectorProps) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslation();
  const themeOptions = getThemeOptions(t);

  /* ── Vertical layout (desktop dropdown) ──────────────────────── */
  if (vertical) {
    return (
      <div className="flex flex-col w-full gap-1">
        {themeOptions.map(({ id, icon: Icon, label, desc }) => {
          const isActive = theme === id;
          const s = iconStyles[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTheme(id)}
              className={cn(
                'group w-full flex items-center gap-2.5 px-2.5 py-2 rounded-urbancare-xl border transition-all duration-200 text-left',
                isActive
                  ? 'bg-primary-container border-primary/30 shadow-sm'
                  : 'bg-primary-container border-border hover:bg-surface-hover hover:border-border'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-urbancare-lg flex items-center justify-center flex-shrink-0 transition-all duration-200',
                  isActive ? s.active : s.base
                )}
              >
                <Icon className={cn('w-4 h-4', s.icon)} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    'text-urbancare-base font-semibold leading-tight',
                    isActive ? 'text-primary' : 'text-text-primary'
                  )}
                >
                  {label}
                </p>
                <p className="text-urbancare-2xs leading-tight text-text-secondary mt-0.5 truncate">
                  {desc}
                </p>
              </div>
              <div
                className={cn(
                  'w-5 h-5 rounded-urbancare-full flex-shrink-0 flex items-center justify-center transition-all duration-200',
                  isActive
                    ? 'bg-primary scale-100 opacity-100'
                    : 'bg-surface-container scale-75 opacity-0'
                )}
              >
                <svg
                  className="w-2.5 h-2.5 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  /* ── Horizontal layout (mobile sidebar) ──────────────────────── */
  return (
    <div className="grid grid-cols-3 gap-1.5 w-full">
      {themeOptions.map(({ id, icon: Icon, label }) => {
        const isActive = theme === id;
        const s = iconStyles[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            className={cn(
              'flex flex-col items-center justify-center gap-2 py-3.5 px-2 rounded-urbancare-xl border transition-all duration-200',
              isActive
                ? 'bg-primary-container border-primary/30 shadow-sm'
                : 'bg-background border-transparent hover:bg-surface-hover hover:border-border'
            )}
          >
            {/* Icon bubble */}
            <div
              className={cn(
                'w-10 h-10 rounded-urbancare-xl flex items-center justify-center transition-all duration-200',
                isActive ? s.active : s.base
              )}
            >
              <Icon className={cn('w-5 h-5', s.icon)} />
            </div>
            <span
              className={cn(
                'text-urbancare-sm font-semibold text-center',
                isActive ? 'text-primary' : 'text-text-primary'
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
