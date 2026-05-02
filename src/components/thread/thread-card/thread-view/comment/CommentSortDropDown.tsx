'use client';

import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { CommentSortOption } from '@/model/dto/thread.dto';
import { useTranslation } from '@/i18n';

interface CommentSortDropDownProps {
  value: CommentSortOption;
  onChange: (value: CommentSortOption) => void;
  className?: string;
}

export const CommentSortDropDown = ({
  value,
  onChange,
  className,
}: CommentSortDropDownProps) => {
  const t = useTranslation();

  const options: { value: CommentSortOption; label: string }[] = [
    { value: 'LATEST', label: t.thread.commentSortLatestLabel },
    { value: 'POPULAR', label: t.thread.commentSortPopularLabel },
  ];

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? options[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t.thread.sortComments}
          className={cn(
            'group inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 urbancare-rounded-full',
            'urbancare-text-sm font-medium text-text-secondary',
            'bg-surface-container/60 border border-border/60',
            'transition-all duration-150',
            'lg:hover:bg-surface-container lg:hover:text-text-primary lg:hover:border-border',
            'data-[state=open]:bg-primary-container/60 data-[state=open]:text-primary data-[state=open]:border-primary/40',
            'shadow-sm shadow-shadow/5',
            className
          )}
        >
          <span className="font-semibold">{selectedLabel}</span>
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 transition-transform duration-200 -mr-0.5',
              'group-data-[state=open]:rotate-180'
            )}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          'min-w-[10rem] p-1 bg-surface-variant border-border',
          'urbancare-rounded-xl shadow-lg shadow-shadow/10'
        )}
      >
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <DropdownMenuItem
              key={option.value}
              className={cn(
                'flex items-center justify-between gap-3 cursor-pointer',
                'urbancare-rounded-lg px-3 py-2 urbancare-text-sm font-medium',
                'transition-colors duration-150',
                'lg:hover:bg-surface-container focus:bg-surface-container',
                isActive ? 'text-primary' : 'text-text-primary'
              )}
              onSelect={() => onChange(option.value)}
            >
              <span>{option.label}</span>
              <Check
                className={cn(
                  'w-3.5 h-3.5 transition-opacity duration-150',
                  isActive ? 'opacity-100 text-primary' : 'opacity-0'
                )}
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
