import { ALL_TAGS, ThreadTagConfig } from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';
import React from 'react';
import { useTranslation } from '@/i18n';

type TagsFilterDesktopProps = {
  className?: string;
  onClick: (_: string) => void;
  onClear?: () => void;
  selectedTags: string[];
};

export const TagsFilterDesktop = ({
  className,
  onClick,
  onClear,
  selectedTags,
}: TagsFilterDesktopProps) => {
  const t = useTranslation();
  return (
    <div className={cn('hidden lg:flex flex-wrap gap-2', className)}>
      {ALL_TAGS.map((tag) => {
        const config = ThreadTagConfig[tag];
        const isSelected = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            onClick={() => onClick(tag)}
            className={cn(
              'py-1 px-3 rounded-urbancare-full text-urbancare-base font-medium transition-all lg:hover:scale-[1.03] lg:active:scale-95',
              isSelected
                ? [config.bg, config.text]
                : 'bg-surface text-foreground-tertiary lg:hover:bg-surface-variant lg:hover:text-foreground-secondary',
            )}
          >
            {t.tags[tag as keyof typeof t.tags]}
          </button>
        );
      })}

      {selectedTags.length > 0 && onClear && (
        <button
          onClick={onClear}
          className="py-1 px-3 rounded-urbancare-full text-urbancare-base font-medium text-foreground-tertiary lg:hover:text-error lg:hover:bg-error/10 transition-all lg:active:scale-95"
        >
          {t.common.clear}
        </button>
      )}
    </div>
  );
};
