'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const themeOptions = [
  { id: 'light', icon: Sun, label: 'ნათელი', desc: 'ღია და სუფთა' },
  { id: 'dark', icon: Moon, label: 'მუქი', desc: 'თავლებისთვის საამო' },
  { id: 'system', icon: Monitor, label: 'სისტემა', desc: 'სისტემური' },
];

export const MobileThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex w-full gap-1 ">
      {themeOptions.map(({ id, icon: Icon, label }) => (
        <Button
          variant={'ghost'}
          key={id}
          onClick={() => setTheme(id)}
          className={`h-auto flex-1 flex items-center justify-center px-2 py-3 rounded-lg transition-all ${
            theme === id
              ? 'bg-primary-container/30 border-2 border-primary'
              : 'bg-surface-variant/50 border-2 border-gray-200'
          }`}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            <Icon
              className={cn('w-6 h-6 text-foreground-primary', {
                'text-yellow-500': id === 'light',
                'text-primary': id === 'dark',
              })}
            />
            <span className="text-center text-base font-base text-gray-800">
              {label}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};
