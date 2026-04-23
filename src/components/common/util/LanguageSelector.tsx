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
    <div className="flex flex-col w-full gap-0.5">
      {languages.map(({ code, name, native, Flag }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
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
                'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-urbancare-full bg-primary transition-all duration-200',
                isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
              )}
            />

            {/* Flag */}
            <div
              className={cn(
                'w-7 h-7 rounded-urbancare-md flex items-center justify-center flex-shrink-0 overflow-hidden transition-all duration-200 ring-1',
                isActive
                  ? 'ring-primary/30'
                  : 'ring-border group-hover:ring-border-hover'
              )}
            >
              <Flag className="w-full h-full object-cover" />
            </div>

            {/* Name + native */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-urbancare-base font-medium leading-tight',
                  isActive ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'
                )}
              >
                {native}
              </p>
              <p
                className={cn(
                  'text-urbancare-2xs leading-tight mt-0.5',
                  isActive ? 'text-primary/60' : 'text-text-muted'
                )}
              >
                {name}
              </p>
            </div>

            {/* Active dot indicator */}
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-urbancare-full bg-primary flex-shrink-0 transition-all duration-200',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
