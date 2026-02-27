import { Info, Tag } from 'lucide-react';
import React from 'react';
import { useDevice } from '@/hooks/use-device';
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

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-foreground-disabled" />
        <span className="text-sm font-medium text-foreground-secondary">
          გახადეთ პოსტი სპეციფიური
        </span>
        {isMobile ? (
          <Popover>
            <PopoverTrigger>
              <Info className="w-4 h-4 text-foreground-disabled" />
            </PopoverTrigger>
            <PopoverContent className="bg-surface border border-border text-primary-foreground text-center">
              თეგი გაძლევთ საშუალებას თქვენი პოსტი გახდეს უფრო სპეციფიური, თუ
              მიუთითებთ შესაბამის თეგებს, პოსტი გამოჩნდება შესაბამისი ძებნის
              ფილტრების მითითების შემდეგაც
            </PopoverContent>
          </Popover>
        ) : (
          <HoverCard>
            <HoverCardTrigger>
              <Info className="w-4 h-4 text-foreground-disabled" />
            </HoverCardTrigger>
            <HoverCardContent className="bg-surface-variant opacity-100 border border-border">
              აირჩიეთ თეგები თქვენი პოსტისთვის
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
                  'px-3 py-1 rounded-full text-sm font-medium bg-surface text-foreground-tertiary transition-all',
                  'hover:border-hover hover:bg-surface-variant',
                  isTagSelected ? config.bg : undefined,
                  isTagSelected ? config.text : undefined,
                  isTagSelected ? 'hover:opacity-70' : undefined
                )}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
