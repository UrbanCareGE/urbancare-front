'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { FileText } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CreateThreadSchemaType } from '@/components/thread/data/create-thread-schema';
import { useTranslation } from '@/i18n';

interface ThreadBodyFieldProps {
  control: Control<z.infer<CreateThreadSchemaType>>;
  isPending: boolean;
  bodyLength: number;
}

export const ThreadBodyField = ({
  control,
  isPending,
  bodyLength,
}: ThreadBodyFieldProps) => {
  const t = useTranslation();
  return (
    <FormField
      control={control}
      name="body"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between mb-2">
            <FormLabel className="text-urbancare-base font-medium text-foreground-secondary flex items-center gap-2">
              <FileText className="w-4 h-4 text-foreground-disabled" />
              {t.threadForm.textLabel} <span className="text-error">*</span>
            </FormLabel>
            <span
              className={cn(
                'text-urbancare-sm font-medium transition-colors',
                bodyLength > 1900
                  ? 'text-error'
                  : bodyLength > 1700
                    ? 'text-warning'
                    : 'text-foreground-disabled'
              )}
            >
              {bodyLength}/2000
            </span>
          </div>
          <FormControl>
            <Textarea
              placeholder={t.threadForm.bodyPlaceholder}
              disabled={isPending}
              className="min-h-40 resize-none text-urbancare-xl border bg-surface focus:border-primary focus:ring-primary/20 transition-all"
              maxLength={2000}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-urbancare-sm" />
        </FormItem>
      )}
    />
  );
};
