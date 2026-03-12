'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="h-12 flex items-center justify-between px-2 gap-2 rounded-urbancare-panel bg-surface-container">
      <div className="p-1 rounded-urbancare-lg">
        {isDark ? (
          <Moon className="h-5 w-5 text-primary" />
        ) : (
          <Sun className="h-5 w-5 text-warning" />
        )}
      </div>
      <div className={'mr-auto'}>
        <p className="font-medium text-text-primary">
          {isDark ? 'მუქი' : 'ნათელი'}
        </p>
      </div>
      <Switch
        className={''}
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
    </div>
  );
}
