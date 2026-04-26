import { Info, Tag } from 'lucide-react';
import React from 'react';
import { useDevice } from '@/hooks/use-device';
import { useTranslation } from '@/i18n';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  ALL_TAGS,
  ThreadTagConfig,
  ThreadTagValue,
} from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';

export type ThreadTagSelectorProps = {
  selectedTags: string[];
  onToggleTag: (tag: ThreadTagValue) => void;
};

export const ThreadTagSelector = ({
  selectedTags,
  onToggleTag,
}: ThreadTagSelectorProps) => {
  const { isMobile } = useDevice();
  const t = useTranslation();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-foreground-disabled" />
        <span className="urbancare-text-base font-medium text-foreground-secondary">
          {t.threadForm.makePostSpecific}
        </span>
        {isMobile ? (
          <Popover>
            <PopoverTrigger>
              <Info className="w-4 h-4 text-foreground-disabled" />
            </PopoverTrigger>
            <PopoverContent className="bg-surface border border-border text-primary-foreground text-center">
              {t.threadForm.tagsDescription}
            </PopoverContent>
          </Popover>
        ) : (
          <HoverCard>
            <HoverCardTrigger>
              <Info className="w-4 h-4 text-foreground-disabled" />
            </HoverCardTrigger>
            <HoverCardContent className="bg-surface-variant opacity-100 border border-border">
              {t.threadForm.selectTags}
            </HoverCardContent>
          </HoverCard>
        )}
      </div>

      {ALL_TAGS.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => {
            const config = ThreadTagConfig[tag];
            const isTagSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                className={cn(
                  'px-3 py-1 urbancare-rounded-lg urbancare-text-base font-medium bg-surface text-foreground-tertiary transition-all',
                  'lg:hover:border-hover lg:hover:bg-surface-variant lg:active:scale-95',
                  isTagSelected ? config.bg : undefined,
                  isTagSelected ? config.text : undefined,
                  isTagSelected
                    ? 'lg:hover:opacity-70 lg:active:scale-95'
                    : undefined
                )}
              >
                {t.tags[tag as keyof typeof t.tags]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
