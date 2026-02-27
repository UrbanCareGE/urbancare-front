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
import { createThreadSchema } from '@/components/thread/data/create-thread-schema';

interface ThreadBodyFieldProps {
  control: Control<z.infer<typeof createThreadSchema>>;
  isPending: boolean;
  bodyLength: number;
}

export const ThreadBodyField = ({
  control,
  isPending,
  bodyLength,
}: ThreadBodyFieldProps) => {
  return (
    <FormField
      control={control}
      name="body"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between mb-2">
            <FormLabel className="text-sm font-medium text-foreground-secondary flex items-center gap-2">
              <FileText className="w-4 h-4 text-foreground-disabled" />
              ტექსტი <span className="text-error">*</span>
            </FormLabel>
            <span
              className={cn(
                'text-xs font-medium transition-colors',
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
              placeholder="რას გააზიარებთ? გაგვიზიარეთ თქვენი აზრები, გამოცდილება ან შეკითხვა..."
              disabled={isPending}
              className="min-h-40 resize-none text-base border bg-surface focus:border-primary focus:ring-primary/20 transition-all"
              maxLength={2000}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
