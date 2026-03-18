'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from '@/components/ui/form';
import { AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  usePhoneInput,
  FlagImage,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';

export type PhoneValue = {
  prefix: string;
  phone: string;
};

type PhoneFormInputProps = {
  value?: string | PhoneValue;
  onChange?: (value: PhoneValue) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

const PhoneFormInput = React.forwardRef<HTMLInputElement, PhoneFormInputProps>(
  ({ className, value, onChange, disabled, placeholder, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const message = error ? String(error?.message ?? '') : '';
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const {
      inputValue,
      country,
      setCountry,
      handlePhoneValueChange,
      inputRef,
    } = usePhoneInput({
      defaultCountry: 'ge',
      countries: defaultCountries,
      preferredCountries: ['ge', 'us', 'gb', 'de', 'fr', 'it', 'es', 'tr'],
      forceDialCode: true,
      onChange: (data) => {
        const dialCode = `+${data.country.dialCode}`;
        const localPhone = data.phone.startsWith(dialCode)
          ? data.phone.slice(dialCode.length)
          : data.phone;
        onChange?.({ prefix: dialCode, phone: localPhone });
      },
    });

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref, inputRef]
    );

    const countryList = React.useMemo(
      () =>
        defaultCountries.map((c) => {
          const parsed = parseCountry(c);
          return parsed;
        }),
      []
    );

    const preferredIso2 = ['ge', 'us', 'gb', 'de', 'fr', 'it', 'es', 'tr'];

    const preferred = React.useMemo(
      () => countryList.filter((c) => preferredIso2.includes(c.iso2)),
      [countryList]
    );

    const others = React.useMemo(
      () => countryList.filter((c) => !preferredIso2.includes(c.iso2)),
      [countryList]
    );

    return (
      <div className="relative w-full">
        <div
          className={cn(
            'flex items-center w-full rounded-urbancare-xl border bg-input transition-colors',
            error
              ? 'ring-2 ring-error'
              : 'focus-within:ring-2 focus-within:ring-primary',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          {/* Country selector button */}
          <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                className={cn(
                  'flex items-center gap-1 pl-3 pr-1.5 h-full shrink-0',
                  'text-text-muted transition-colors',
                  'lg:hover:text-text-primary',
                  'focus:outline-none',
                  disabled && 'pointer-events-none'
                )}
              >
                <FlagImage iso2={country.iso2} size="24px" />
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200',
                    dropdownOpen && 'rotate-180'
                  )}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[280px] p-0 max-h-[320px] overflow-hidden"
              align="start"
              sideOffset={8}
            >
              <div className="overflow-y-auto max-h-[320px] overscroll-contain">
                {/* Preferred countries */}
                {preferred.map((c) => (
                  <button
                    key={c.iso2}
                    type="button"
                    className={cn(
                      'flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors',
                      'lg:hover:bg-hover active:bg-hover',
                      country.iso2 === c.iso2 && 'bg-primary-light/20'
                    )}
                    onClick={() => {
                      setCountry(c.iso2);
                      setDropdownOpen(false);
                    }}
                  >
                    <FlagImage iso2={c.iso2} size="20px" />
                    <span className="text-urbancare-base text-text-primary truncate flex-1">
                      {c.name}
                    </span>
                    <span className="text-urbancare-sm text-text-muted shrink-0">
                      +{c.dialCode}
                    </span>
                  </button>
                ))}

                {/* Divider */}
                <div className="h-px bg-border my-1" />

                {/* Other countries */}
                {others.map((c) => (
                  <button
                    key={c.iso2}
                    type="button"
                    className={cn(
                      'flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors',
                      'lg:hover:bg-hover active:bg-hover',
                      country.iso2 === c.iso2 && 'bg-primary-light/20'
                    )}
                    onClick={() => {
                      setCountry(c.iso2);
                      setDropdownOpen(false);
                    }}
                  >
                    <FlagImage iso2={c.iso2} size="20px" />
                    <span className="text-urbancare-base text-text-primary truncate flex-1">
                      {c.name}
                    </span>
                    <span className="text-urbancare-sm text-text-muted shrink-0">
                      +{c.dialCode}
                    </span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Separator */}
          <div className="w-px h-6 bg-border shrink-0" />

          {/* Phone input */}
          <input
            ref={mergedRef}
            type="tel"
            inputMode="tel"
            value={inputValue}
            onChange={handlePhoneValueChange}
            disabled={disabled}
            placeholder={placeholder}
            aria-describedby={formMessageId}
            className={cn(
              'flex-1 h-full bg-transparent py-1 pr-10 pl-3',
              'text-urbancare-base sm:text-urbancare-xl text-text-primary',
              'placeholder:text-text-placeholder',
              'focus:outline-none',
              'caret-black',
              disabled && 'cursor-not-allowed'
            )}
          />

          {/* Error tooltip */}
          <TooltipProvider>
            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <TooltipTrigger
                asChild
                onClick={(e) => {
                  e.preventDefault();
                  setTooltipOpen(!tooltipOpen);
                }}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  setTooltipOpen(!tooltipOpen);
                }}
              >
                <div
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center',
                    !message
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100 cursor-pointer'
                  )}
                >
                  <AlertCircle className="h-5 w-5 text-error" />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="max-w-xs bg-[var(--color-grey-800)] text-white text-urbancare-base text-center p-2"
              >
                {message}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  }
);

PhoneFormInput.displayName = 'PhoneFormInput';

export { PhoneFormInput };
