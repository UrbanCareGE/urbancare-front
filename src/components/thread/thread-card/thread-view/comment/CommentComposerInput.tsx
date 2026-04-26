'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type CommentComposerInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  inputRef?: React.Ref<HTMLTextAreaElement>;
  className?: string;
};

export const CommentComposerInput = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  autoFocus,
  inputRef,
  className,
}: CommentComposerInputProps) => {
  const hasText = value.trim().length > 0;

  return (
    <div
      className={cn(
        'relative bg-surface-container urbancare-rounded-xl',
        className
      )}
    >
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={1}
        autoFocus={autoFocus}
        className="block w-full bg-transparent urbancare-text-base text-text-primary placeholder:text-text-tertiary outline-none resize-none px-3.5 pr-11"
        style={{
          minHeight: '40px',
          maxHeight: '120px',
          lineHeight: '20px',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
        onInput={(e) => {
          const t = e.target as HTMLTextAreaElement;
          t.style.height = 'auto';
          t.style.height = t.scrollHeight + 'px';
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (hasText) onSubmit();
          }
        }}
      />
      <button
        onClick={onSubmit}
        disabled={!hasText}
        aria-label={placeholder}
        className={cn(
          'absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 urbancare-rounded-lg',
          'flex items-center justify-center transition-all duration-150',
          hasText
            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30 lg:hover:bg-primary-hover lg:active:scale-90'
            : 'bg-transparent text-text-tertiary cursor-not-allowed'
        )}
      >
        <Send className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
};
