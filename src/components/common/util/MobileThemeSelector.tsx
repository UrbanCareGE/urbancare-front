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

  /* ── Vertical layout (desktop popover) ──────────────────────────────
     Compact ghost-style rows. Active row: left accent bar + soft
     primary-container tint. Inactive: transparent, hover lifts slightly.
  ───────────────────────────────────────────────────────────────────── */
  if (vertical) {
    return (
      <div className="flex flex-col w-full gap-0.5">
        {themeOptions.map(({ id, icon: Icon, label }) => {
          const isActive = theme === id;
          const isLight = id === 'light';
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTheme(id)}
              className={cn(
                'group relative w-full flex items-center gap-2.5 pl-3 pr-2.5 py-2 rounded-urbancare-lg transition-all duration-200 text-left overflow-hidden',
                isActive
                  ? 'bg-primary-container'
                  : 'bg-transparent hover:bg-surface-container'
              )}
            >
              {/* Left accent bar */}
              <span
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-urbancare-full transition-all duration-200',
                  isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50',
                  isLight ? 'bg-warning' : 'bg-primary'
                )}
              />

              {/* Icon */}
              <div
                className={cn(
                  'w-7 h-7 rounded-urbancare-md flex items-center justify-center flex-shrink-0 transition-all duration-200',
                  isActive
                    ? isLight
                      ? 'bg-warning-container text-warning'
                      : 'bg-primary-container text-primary'
                    : 'bg-surface-container text-text-secondary group-hover:text-text-primary'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-urbancare-base font-medium leading-tight flex-1 min-w-0',
                  isActive
                    ? isLight
                      ? 'text-warning'
                      : 'text-primary'
                    : 'text-text-secondary group-hover:text-text-primary'
                )}
              >
                {label}
              </span>

              {/* Active dot indicator */}
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-urbancare-full flex-shrink-0 transition-all duration-200',
                  isActive
                    ? isLight
                      ? 'bg-warning opacity-100 scale-100'
                      : 'bg-primary opacity-100 scale-100'
                    : 'opacity-0 scale-0'
                )}
              />
            </button>
          );
        })}
      </div>
    );
  }

  /* ── Horizontal layout (mobile sidebar) — segmented control ─────────
     A pill track with a sliding filled thumb. The track is
     bg-surface-container; the active thumb is bg-surface elevated with
     a ring shadow. Labels + icons sit in each segment cell.
  ───────────────────────────────────────────────────────────────────── */
  return (
    <div
      role="group"
      aria-label={t.sidebar.theme}
      className="relative flex w-full h-12 rounded-urbancare-full bg-surface-container p-1 gap-0"
    >
      {/* Sliding thumb — positioned with CSS left % trick */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-urbancare-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'bg-surface shadow-sm shadow-shadow/10',
          theme === 'dark' ? 'left-[calc(50%+2px)]' : 'left-1'
        )}
      />

      {themeOptions.map(({ id, icon: Icon, label }) => {
        const isActive = theme === id;
        const isLight = id === 'light';
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            className={cn(
              'relative z-10 flex-1 flex items-center justify-center gap-1.5 rounded-urbancare-full transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
            )}
          >
            <Icon
              className={cn(
                'w-4 h-4 flex-shrink-0 transition-all duration-200',
                isActive
                  ? isLight
                    ? 'text-warning'
                    : 'text-primary'
                  : 'text-text-muted'
              )}
            />
            <span
              className={cn(
                'text-urbancare-sm font-semibold leading-tight transition-all duration-200',
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
