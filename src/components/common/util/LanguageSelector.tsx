'use client';

import { cn } from '@/lib/utils';
import { useLanguage, type Locale } from '@/i18n';

const GeorgianFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 900 600" className={className} aria-hidden="true">
    <rect width="900" height="600" fill="#fff" />
    <rect x="380" width="140" height="600" fill="#FF0000" />
    <rect y="230" width="900" height="140" fill="#FF0000" />
    {/* Top-left cross */}
    <g transform="translate(190,140)">
      <rect x="-15" y="-60" width="30" height="120" fill="#FF0000" />
      <rect x="-60" y="-15" width="120" height="30" fill="#FF0000" />
    </g>
    {/* Top-right cross */}
    <g transform="translate(710,140)">
      <rect x="-15" y="-60" width="30" height="120" fill="#FF0000" />
      <rect x="-60" y="-15" width="120" height="30" fill="#FF0000" />
    </g>
    {/* Bottom-left cross */}
    <g transform="translate(190,460)">
      <rect x="-15" y="-60" width="30" height="120" fill="#FF0000" />
      <rect x="-60" y="-15" width="120" height="30" fill="#FF0000" />
    </g>
    {/* Bottom-right cross */}
    <g transform="translate(710,460)">
      <rect x="-15" y="-60" width="30" height="120" fill="#FF0000" />
      <rect x="-60" y="-15" width="120" height="30" fill="#FF0000" />
    </g>
  </svg>
);

const UKFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
    <clipPath id="uk-clip"><rect width="60" height="30" /></clipPath>
    <g clipPath="url(#uk-clip)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-diag)" />
      <clipPath id="uk-diag">
        <path d="M30,0 L60,0 L60,15 Z M30,30 L0,30 L0,15 Z M0,0 L0,10 L20,15 Z M60,30 L60,20 L40,15 Z" />
      </clipPath>
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

interface LanguageOption {
  code: Locale;
  name: string;
  native: string;
  Flag: React.FC<{ className?: string }>;
}

const languages: LanguageOption[] = [
  { code: 'ka', name: 'Georgian', native: 'ქართული', Flag: GeorgianFlag },
  { code: 'en', name: 'English', native: 'English', Flag: UKFlag },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="urbancare-rounded-2xl bg-surface-container/60 p-1.5 space-y-1">
      {languages.map(({ code, name, native, Flag }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={cn(
              'flex w-full items-center gap-3 p-2.5 urbancare-rounded-xl text-left',
              'transition-colors duration-150',
              isActive
                ? 'bg-primary-container/40'
                : 'lg:hover:bg-surface-container'
            )}
          >
            <div className="w-9 h-9 urbancare-rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
              <Flag className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'urbancare-text-base font-medium leading-tight truncate',
                  isActive ? 'text-primary' : 'text-text-primary'
                )}
              >
                {native}
              </p>
              <p
                className={cn(
                  'urbancare-text-xs leading-tight mt-0.5 truncate',
                  isActive ? 'text-primary/70' : 'text-text-tertiary'
                )}
              >
                {name}
              </p>
            </div>
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
