import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ka', name: 'Georgian', native: 'ქართული', flag: '🇬🇪' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
];

export default function LanguageSelector() {
  const [selected, setSelected] = useState('en');

  return (
    <div className="w-full max-w-md bg-surface rounded-3xl overflow-hidden shadow-xl  border-border">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-primary rounded-xl shadow-sm flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary leading-tight">
              თარგმანი
            </h2>
            <p className="text-xs text-text-muted mt-0.5">აირჩიეთ ენა</p>
          </div>
        </div>
      </div>

      <div className="mx-5 border-t border-border" />

      {/* Language List */}
      <div className="px-3 py-3">
        <div className="space-y-1">
          {languages.map((lang) => {
            const isSelected = selected === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setSelected(lang.code)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200',
                  isSelected
                    ? 'bg-primary-container border-primary/25'
                    : 'border-transparent hover:bg-surface-hover'
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="px-4 pb-5 pt-1">
        <Button
          type="submit"
          className="w-full h-11 rounded-2xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          არჩევა
        </Button>
      </div>
    </div>
  );
}
