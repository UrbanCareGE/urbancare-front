'use client';

import { useState } from 'react';
import { ArrowRight, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LandingJoinSectionProps {
  onJoin?: (code: string) => void;
}

export function LandingJoinSection({ onJoin }: LandingJoinSectionProps) {
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    onJoin?.(code.trim());
  };

  return (
    <section className="relative z-10 px-4 py-20 md:py-32 overflow-hidden">
      {/* Subtle section background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-tertiary/6 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Hash className="w-3.5 h-3.5" />
          კოდით შესვლა
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          შეუერთდი კორპუსს
        </h2>
        <p className="text-text-secondary text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          მიიღე კოდი ადმინისტრატორისგან და დაუყოვნებლივ შეუერთდი შენს კორპუსს
        </p>

        {/* Join form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          {/* Large code input */}
          <div
            className={cn(
              'relative w-full rounded-2xl transition-all duration-300',
              'bg-surface/80 backdrop-blur-sm',
              'border-2',
              focused
                ? 'border-primary shadow-[0_0_0_4px_rgba(var(--color-primary)/0.12),0_8px_32px_rgba(var(--color-primary)/0.15)]'
                : 'border-border hover:border-primary/40 shadow-sm hover:shadow-md'
            )}
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="XXXXX-XXXXX"
              maxLength={16}
              autoComplete="off"
              spellCheck={false}
              className={cn(
                'w-full bg-transparent text-center',
                'text-3xl md:text-4xl font-bold tracking-[0.25em]',
                'text-text-primary placeholder:text-text-tertiary/50',
                'h-20 md:h-24 px-6',
                'rounded-2xl outline-none',
                'transition-colors duration-200'
              )}
            />
          </div>

          {/* Join button */}
          <Button
            type="submit"
            size="lg"
            disabled={!code.trim()}
            className={cn(
              'h-14 px-10 rounded-2xl text-lg font-semibold',
              'bg-gradient-primary',
              'shadow-[0_4px_20px_rgba(var(--color-primary)/0.35)]',
              'lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)]',
              'lg:hover:-translate-y-0.5 lg:active:translate-y-0',
              'transition-all duration-300',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0'
            )}
          >
            შეუერთდი
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-xs text-text-tertiary">
            კოდი გამოგიგზავნა შენი კორპუსის ადმინისტრატორმა
          </p>
        </form>
      </div>
    </section>
  );
}
