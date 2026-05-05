'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

interface ThemeOption {
  id: string;
  icon: React.ElementType;
  label: string;
}

const getThemeOptions = (t: ReturnType<typeof useTranslation>): ThemeOption[] => [
  { id: 'light', icon: Sun, label: t.theme.light },
  { id: 'dark', icon: Moon, label: t.theme.dark },
];

interface MobileThemeSelectorProps {
  vertical?: boolean;
}

export const MobileThemeSelector = ({ vertical = false }: MobileThemeSelectorProps) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslation();
  const themeOptions = getThemeOptions(t);

  /* Vertical layout (desktop popover): grouped rows matching the project's
     RadioRow pattern — surface-container container, icon chip, label, dot. */
  if (vertical) {
    return (
      <div className="urbancare-rounded-2xl bg-surface-container/60 p-1.5 space-y-1">
        {themeOptions.map(({ id, icon: Icon, label }) => {
          const isActive = theme === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTheme(id)}
              className={cn(
                'flex w-full items-center gap-3 p-2.5 urbancare-rounded-xl',
                'transition-colors duration-150',
                isActive
                  ? 'bg-primary-container/40'
                  : 'lg:hover:bg-surface-container'
              )}
            >
              <div
                className={cn(
                  'w-9 h-9 urbancare-rounded-xl flex items-center justify-center shrink-0',
                  'transition-colors duration-150',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-container text-icon'
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={cn(
                  'flex-1 urbancare-text-base font-medium text-left truncate',
                  isActive ? 'text-primary' : 'text-text-primary'
                )}
              >
                {label}
              </span>
              <span
                className={cn(
                  'relative w-5 h-5 urbancare-rounded-full border-2 shrink-0 transition-colors duration-150',
                  isActive ? 'border-primary bg-primary' : 'border-border'
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 m-auto w-1.5 h-1.5 urbancare-rounded-full bg-primary-foreground" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  /* Horizontal layout (mobile sidebar) — segmented control. */
  return (
    <div
      role="group"
      aria-label={t.sidebar.theme}
      className="relative flex w-full h-12 urbancare-rounded-full bg-surface-container p-1 gap-0"
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-1 bottom-1 w-[calc(50%-4px)] urbancare-rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'bg-surface shadow-sm shadow-shadow/10',
          theme === 'dark' ? 'left-[calc(50%+2px)]' : 'left-1'
        )}
      />

      {themeOptions.map(({ id, icon: Icon, label }) => {
        const isActive = theme === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            className={cn(
              'relative z-10 flex-1 flex items-center justify-center gap-1.5 urbancare-rounded-full transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
            )}
          >
            <Icon
              className={cn(
                'w-4 h-4 flex-shrink-0 transition-all duration-200',
                isActive ? 'text-primary' : 'text-text-muted'
              )}
            />
            <span
              className={cn(
                'urbancare-text-sm font-semibold leading-tight transition-all duration-200',
                isActive ? 'text-text-primary' : 'text-text-muted'
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
