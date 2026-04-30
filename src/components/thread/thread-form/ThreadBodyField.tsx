'use client';

import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { FileText } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MentionInput } from '@/components/common/mention/MentionInput';
import { cn } from '@/lib/utils';
import { CreateThreadSchemaType } from '@/components/thread/data/create-thread-schema';
import { MentionDTO } from '@/model/dto/thread.dto';
import { useTranslation } from '@/i18n';

interface ThreadBodyFieldProps {
  form: UseFormReturn<z.infer<CreateThreadSchemaType>>;
  isPending: boolean;
  bodyLength: number;
}

export const ThreadBodyField = ({
  form,
  isPending,
  bodyLength,
}: ThreadBodyFieldProps) => {
  const t = useTranslation();
  const mentions = useWatch({ control: form.control, name: 'mentions' });

  return (
    <FormField
      control={form.control}
      name="body"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between mb-2">
            <FormLabel className="urbancare-text-base font-medium text-foreground-secondary flex items-center gap-2">
              <FileText className="w-4 h-4 text-foreground-disabled" />
              {t.threadForm.textLabel} <span className="text-error">*</span>
            </FormLabel>
            <span
              className={cn(
                'urbancare-text-sm font-medium transition-colors',
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
            <MentionInput
              placeholder={t.threadForm.bodyPlaceholder}
              disabled={isPending}
              maxLength={2000}
              value={field.value}
              onChange={(next) => field.onChange(next)}
              mentions={(mentions ?? []) as MentionDTO[]}
              onMentionsChange={(next) =>
                form.setValue('mentions', next, { shouldDirty: true })
              }
              textareaClassName="min-h-40 resize-none urbancare-text-xl border bg-surface focus:border-primary focus:ring-primary/20 transition-all"
            />
          </FormControl>
          <FormMessage className="urbancare-text-sm" />
        </FormItem>
      )}
    />
  );
};
