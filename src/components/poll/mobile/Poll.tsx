'use client';

import React from 'react';
import { Plus, Vote, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

interface PollProps {
  pollOptions: string[];
  onPollOptionsChange: (options: string[]) => void;
  isPollMode: boolean;
  onPollModeToggle: () => void;
  isDisabled?: boolean;
}

const MAX_OPTIONS = 10;

export const Poll = ({
  pollOptions,
  onPollOptionsChange,
  isPollMode,
  onPollModeToggle,
  isDisabled = false,
}: PollProps) => {
  const t = useTranslation();

  const updateOption = (index: number, value: string) => {
    const next = [...pollOptions];
    next[index] = value;
    onPollOptionsChange(next);
  };

  const removeOption = (index: number) => {
    onPollOptionsChange(pollOptions.filter((_, i) => i !== index));
  };

  const addOption = () => {
    if (pollOptions.length >= MAX_OPTIONS) return;
    onPollOptionsChange([...pollOptions, '']);
  };

  if (!isPollMode) {
    return (
      <button
        type="button"
        onClick={onPollModeToggle}
        disabled={isDisabled}
        className={cn(
          'group flex items-center gap-2.5 w-full px-3.5 py-2.5',
          'urbancare-rounded-xl border border-dashed border-border',
          'bg-transparent text-text-secondary',
          'transition-colors duration-150',
          'lg:hover:border-text-tertiary/50 lg:hover:bg-surface-container/30 lg:hover:text-text-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        <Vote className="w-4 h-4" strokeWidth={2.25} />
        <span className="urbancare-text-sm font-medium">{t.poll.poll}</span>
      </button>
    );
  }

  return (
    <div className="urbancare-rounded-2xl border border-border bg-surface-container/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-surface-variant/40">
        <div className="w-7 h-7 urbancare-rounded-lg bg-surface-container text-text-secondary flex items-center justify-center shrink-0">
          <Vote className="w-4 h-4" strokeWidth={2.25} />
        </div>
        <h4 className="flex-1 urbancare-text-sm font-semibold text-text-primary">
          {t.poll.poll}
        </h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onPollModeToggle}
          disabled={isDisabled}
          className="h-7 px-2 urbancare-text-xs font-semibold text-text-tertiary lg:hover:text-error lg:hover:bg-error/5"
        >
          {t.poll.disable}
        </Button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1.5 p-2.5">
        {pollOptions.map((option, index) => (
          <div
            key={index}
            className={cn(
              'group flex items-center gap-2 urbancare-rounded-lg bg-surface',
              'border border-border focus-within:border-text-tertiary/40',
              'transition-colors duration-150'
            )}
          >
            <span className="pl-3 urbancare-text-sm text-text-tertiary tabular-nums shrink-0">
              {index + 1}
            </span>
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={t.poll.optionPlaceholder}
              disabled={isDisabled}
              className={cn(
                'flex-1 min-w-0 py-2 urbancare-text-base text-text-primary',
                'bg-transparent border-none outline-none',
                'placeholder:text-text-tertiary',
                'disabled:opacity-50'
              )}
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              disabled={isDisabled}
              aria-label="Remove option"
              className={cn(
                'shrink-0 mr-1 w-7 h-7 urbancare-rounded-md flex items-center justify-center',
                'text-text-tertiary lg:hover:text-error lg:hover:bg-error/10',
                'transition-colors duration-150',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {pollOptions.length < MAX_OPTIONS && (
          <button
            type="button"
            onClick={addOption}
            disabled={isDisabled}
            className={cn(
              'flex items-center justify-center gap-2 w-full px-3 py-2',
              'urbancare-rounded-lg border border-dashed border-border',
              'urbancare-text-sm font-medium text-text-secondary',
              'transition-colors duration-150',
              'lg:hover:border-text-tertiary/40 lg:hover:bg-surface-container/40 lg:hover:text-text-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <Plus className="w-4 h-4" />
            {t.poll.addOption}
          </button>
        )}
      </div>
    </div>
  );
};
