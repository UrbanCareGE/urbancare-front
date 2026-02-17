import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ALL_TAGS, ThreadTagConfig } from '@/model/thread.dto';
import { cn } from '@/lib/utils';
import React from 'react';

type ThreadTagValueProps = {
  className?: string;
  onClick: (_: string) => void;
  selectedTags: string[];
};

export const ThreadFeedTagFilter = ({
  className,
  onClick,
  selectedTags,
}: ThreadTagValueProps) => {
  return (
    <Carousel orientation={'horizontal'} opts={{ align: 'start' }}>
      <CarouselContent className={'px-6 -ml-2 gap-1'}>
        {ALL_TAGS.map((tag) => {
          const config = ThreadTagConfig[tag];
          return (
            <CarouselItem
              key={tag}
              onClick={() => onClick(tag)}
              className={cn(
                'basis-auto pl-2 text-center py-1 px-2 rounded-full text-sm font-medium border transition-all',
                selectedTags.includes(tag)
                  ? [config.bg, config.text]
                  : 'bg-surface text-foreground-tertiary hover:border-hover hover:bg-surface-variant'
              )}
            >
              {config.label}
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};
