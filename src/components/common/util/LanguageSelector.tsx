import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ka', name: 'Georgian', native: 'ქართული', flag: '🇬🇪' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState('en');

  return (
    <Card className="w-full max-w-md bg-surface rounded-3xl overflow-hidden shadow-xl border-border">
      <div className="p-2">
        {languages.map((lang) => {
          const isSelected = selected === lang.code;
          return (
            <Button
              key={lang.code}
              type="button"
              variant={'outline'}
              onClick={() => setSelected(lang.code)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 h-auto rounded-2xl border transition-all duration-200',
                isSelected
                  ? 'bg-primary-container border-primary/25'
                  : 'bg-transparent border-transparent lg:hover:bg-surface-hover lg:active:scale-[0.98]'
              )}
            >
              <span className="text-2xl leading-none select-none">
                {lang.flag}
              </span>

              <div className="flex-1 text-left">
                <p
                  className={cn(
                    'text-sm font-semibold leading-tight',
                    isSelected ? 'text-primary' : 'text-text-primary'
                  )}
                >
                  {lang.name}
                </p>
                <p
                  className={cn(
                    'text-xs mt-0.5',
                    isSelected ? 'text-primary/70' : 'text-text-muted'
                  )}
                >
                  {lang.native}
                </p>
              </div>

              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
                  isSelected ? 'bg-primary border-primary' : 'border-border'
                )}
              >
                {isSelected && (
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
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
