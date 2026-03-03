'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English',  native: 'English',  flag: '🇬🇧' },
  { code: 'ka', name: 'Georgian', native: 'ქართული',  flag: '🇬🇪' },
  { code: 'ru', name: 'Russian',  native: 'Русский',  flag: '🇷🇺' },
];

interface LanguageSelectorProps {
  compact?: boolean;
}

export default function LanguageSelector({ compact = false }: LanguageSelectorProps) {
  const [selected, setSelected] = useState('en');

  const flagSize  = compact ? 'w-8 h-8 rounded-lg text-lg'  : 'w-10 h-10 rounded-xl text-2xl';
  const rowPad    = compact ? 'gap-2.5 px-2.5 py-2 rounded-xl' : 'gap-3 px-3 py-2.5 rounded-2xl';
  const nameSize  = compact ? 'text-sm'  : 'text-sm';
  const nativeSize = compact ? 'text-[10px]' : 'text-xs';
  const checkSize = compact ? 'w-5 h-5' : 'w-5 h-5';

  return (
    <div className="flex flex-col gap-1 w-full">
      {languages.map((lang) => {
        const isSelected = selected === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setSelected(lang.code)}
            className={cn(
              'group w-full flex items-center border transition-all duration-200 text-left',
              rowPad,
              isSelected
                ? 'bg-primary-container border-primary/30 shadow-sm'
                : 'bg-background border-transparent hover:bg-surface-hover hover:border-border'
            )}
          >
            {/* Flag bubble */}
            <div
              className={cn(
                'flex-shrink-0 flex items-center justify-center bg-surface-container leading-none select-none transition-all duration-200',
                flagSize,
                isSelected && 'bg-primary-container/50'
              )}
            >
              {lang.flag}
            </div>

            {/* Name + native */}
            <div className="flex-1 min-w-0">
              <p className={cn('font-semibold leading-tight', nameSize, isSelected ? 'text-primary' : 'text-text-primary')}>
                {lang.name}
              </p>
              <p className={cn('leading-tight mt-0.5', nativeSize, isSelected ? 'text-primary/60' : 'text-text-secondary')}>
                {lang.native}
              </p>
            </div>

            {/* Active checkmark */}
            <div
              className={cn(
                'rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200',
                checkSize,
                isSelected
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </button>
        );
      })}
    </div>
  );
}
