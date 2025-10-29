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
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white dark:bg-gray-600">
                    {isDark ? (
                        <Moon className="h-5 w-5 text-blue-400" />
                    ) : (
                        <Sun className="h-5 w-5 text-yellow-500" />
                    )}
                </div>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                        {isDark ? 'მუქი' : 'ნათელი'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isDark ? 'უკეთესი თვალებისთვის' : 'ნათელი და სუფთა'}
                    </p>
                </div>
            </div>
            <Switch
                className={""}
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
        </div>
    );
}