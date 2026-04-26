'use client';

import { useState } from 'react';
import { Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateUrgent } from '@/hooks/query/urgent/use-create-urgent';
import { UrgentItemDTO } from '@/model/dto/urgent.dto';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

export const CreateUrgentButtonDesktop = () => {
  const t = useTranslation();
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const onSuccess = (_item: UrgentItemDTO) => {
    setText('');
    setOpen(false);
  };

  const { onSubmit, isPending, isError, error } = useCreateUrgent(onSuccess);

  const handleSend = () => {
    if (!text.trim()) return;
    onSubmit(text);
  };

  return (
    <>
      <div className="px-4 pb-1">
        <div
          className={cn(
            'flex items-center gap-3 px-4 py-3',
            'bg-surface urbancare-rounded-panel border border-border',
            'shadow-sm shadow-shadow/5'
          )}
        >
          <div className="flex items-center justify-center w-9 h-9 shrink-0 urbancare-rounded-xl bg-error/10 text-error">
            <Siren className="w-4 h-4" />
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              'flex-1 flex items-center h-9 px-4 urbancare-rounded-full',
              'bg-surface-container border border-transparent',
              'urbancare-text-base text-text-tertiary text-left',
              'transition-colors duration-200',
              'lg:hover:bg-surface-hover lg:hover:border-error/20',
              'cursor-pointer'
            )}
          >
            {t.urgent.createUrgent}
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setOpen(false)}>
        <DialogContent className="border-border bg-surface max-w-lg p-0">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="urbancare-text-2xl font-semibold leading-tight-georgian text-text-primary flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 urbancare-rounded-lg bg-error/10 text-error">
                <Siren className="w-4 h-4" />
              </span>
              {t.urgent.createUrgent}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 py-4">
            <Textarea
              placeholder={t.urgent.enterText}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isPending}
              className={cn(
                'min-h-28 resize-none',
                'bg-surface-container urbancare-rounded-lg border border-border',
                'focus-visible:ring-error/40 focus-visible:border-error/40',
                'placeholder:text-text-muted text-text-primary urbancare-text-base'
              )}
            />

            {isError && (
              <p className="mt-2 urbancare-text-sm text-error">
                {t.common.error}: {error?.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 px-6 pb-6">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="flex-1 urbancare-rounded-panel border-border text-text-secondary"
            >
              {t.common.cancel}
            </Button>
            <Button
              onClick={handleSend}
              disabled={isPending || !text.trim()}
              className={cn(
                'flex-1 urbancare-rounded-panel',
                'bg-error text-white lg:hover:bg-error-hover',
                'disabled:bg-disabled disabled:text-disabled-foreground'
              )}
            >
              {isPending ? t.common.sending : t.common.send}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
