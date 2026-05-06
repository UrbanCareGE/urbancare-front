'use client';

import { Check, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/provider/MyThemeProvider';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

interface ThemeOption {
  id: string;
  icon: React.ElementType;
  label: string;
}

const getThemeOptions = (
  t: ReturnType<typeof useTranslation>
): ThemeOption[] => [
  { id: 'light', icon: Sun, label: t.theme.light },
  { id: 'dark', icon: Moon, label: t.theme.dark },
];

export const MobileThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslation();
  const themeOptions = getThemeOptions(t);

  return (
    <div className="space-y-0.5">
      {themeOptions.map(({ id, icon: Icon, label }) => {
        const isActive = theme === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            className={cn(
              'flex w-full items-center gap-2.5 p-2 urbancare-rounded-xl text-left',
              'transition-colors duration-150',
              isActive
                ? 'bg-primary/15'
                : 'lg:hover:bg-surface-container'
            )}
          >
            <div
              className={cn(
                'w-7 h-7 urbancare-rounded-lg flex items-center justify-center shrink-0',
                'transition-colors duration-150',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-container text-icon'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span
              className={cn(
                'flex-1 urbancare-text-sm font-semibold leading-tight truncate',
                isActive ? 'text-primary' : 'text-text-primary'
              )}
            >
              {label}
            </span>
            {isActive && (
              <Check
                className="w-4 h-4 text-primary shrink-0"
                strokeWidth={2.5}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
