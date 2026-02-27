import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ALL_TAGS, ThreadTagConfig } from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';
import React from 'react';

type ThreadTagValueProps = {
  className?: string;
  onClick: (_: string) => void;
  selectedTags: string[];
};

export const TagsFilterMobile = ({
                                   className,
                                   onClick,
                                   selectedTags,
                                 }: ThreadTagValueProps) => {
  return (
    <Carousel
      orientation={'horizontal'}
      opts={{ align: 'start' }}
      className={cn('', className)}
    >
      <CarouselContent className={cn('px-6 -ml-2 gap-1 max-w-2xl')}>
        {ALL_TAGS.map((tag) => {
          const config = ThreadTagConfig[tag];
          return (
            <CarouselItem
              key={tag}
              onClick={() => onClick(tag)}
              className={cn(
                'basis-auto pl-2 text-center py-1 px-2 rounded-full text-sm font-medium transition-all',
                selectedTags.includes(tag)
                  ? [config.bg, config.text]
                  : 'bg-surface text-foreground-tertiary lg:hover:border-hover lg:hover:bg-surface-variant lg:active:scale-95',
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
