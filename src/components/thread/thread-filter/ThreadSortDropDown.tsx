'use client';

import React, { useState } from 'react';
import { ArrowDownWideNarrow, Check, Clock, Flame } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export type ThreadSortOption = 'POPULAR' | 'NEWEST';

interface SortOptionMeta {
  value: ThreadSortOption;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SORT_OPTIONS: SortOptionMeta[] = [
  {
    value: 'NEWEST',
    label: 'უახლესი',
    description: 'ახალი პოსტები პირველ რიგში',
    icon: Clock,
  },
  {
    value: 'POPULAR',
    label: 'პოპულარული',
    description: 'ყველაზე აქტიური განხილვები',
    icon: Flame,
  },
];

interface ThreadSortDropDownProps {
  value?: ThreadSortOption;
  onChange?: (value: ThreadSortOption) => void;
  className?: string;
}

export const ThreadSortDropDown = ({
  value,
  onChange,
  className,
}: ThreadSortDropDownProps) => {
  const [internalValue, setInternalValue] = useState<ThreadSortOption>('NEWEST');
  const selected = value ?? internalValue;
  const isCustom = selected !== 'NEWEST';

  const handleSelect = (option: ThreadSortOption) => {
    if (value === undefined) setInternalValue(option);
    onChange?.(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Sort threads"
          className={cn(
            'group relative inline-flex items-center justify-center w-8 h-8 shrink-0',
            'urbancare-rounded-full text-icon',
            'transition-all duration-200',
            'lg:hover:bg-surface-container lg:hover:text-text-primary',
            'data-[state=open]:bg-primary-container data-[state=open]:text-primary',
            'active:scale-90',
            className
          )}
        >
          <ArrowDownWideNarrow
            className={cn(
              'w-[18px] h-[18px] transition-transform duration-200',
              'group-data-[state=open]:rotate-180'
            )}
          />
          {isCustom && (
            <span
              className={cn(
                'absolute top-1 right-1 w-1.5 h-1.5 urbancare-rounded-full bg-primary',
                'ring-2 ring-surface'
              )}
            />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          'w-64 p-1.5 bg-surface-variant border-border',
          'urbancare-rounded-2xl shadow-lg shadow-shadow/10'
        )}
      >
        <div className="px-2 pt-1.5 pb-2">
          <p className="urbancare-text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            დახარისხება
          </p>
        </div>

        {SORT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = option.value === selected;
          return (
            <DropdownMenuItem
              key={option.value}
              asChild
              onSelect={() => handleSelect(option.value)}
            >
              <button
                type="button"
                className={cn(
                  'flex w-full items-center gap-3 px-2 py-2 urbancare-rounded-xl',
                  'transition-colors duration-150 outline-none',
                  'lg:hover:bg-surface-container focus-visible:bg-surface-container',
                  isActive && 'bg-primary-container/40'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 urbancare-rounded-xl flex items-center justify-center shrink-0',
                    'transition-colors duration-150',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface-container text-icon'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <p
                    className={cn(
                      'urbancare-text-base font-medium leading-tight truncate',
                      isActive ? 'text-primary' : 'text-text-primary'
                    )}
                  >
                    {option.label}
                  </p>
                  <p className="urbancare-text-xs text-text-tertiary truncate mt-0.5">
                    {option.description}
                  </p>
                </div>

                {isActive && (
                  <Check className="w-4 h-4 text-primary shrink-0" />
                )}
              </button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
