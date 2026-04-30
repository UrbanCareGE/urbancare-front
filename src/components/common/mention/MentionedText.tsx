import React from 'react';
import { sliceContentByMentions } from '@/lib/mentions';
import { MentionDTO } from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';

interface MentionedTextProps {
  content: string;
  mentions?: MentionDTO[];
  className?: string;
  mentionClassName?: string;
  onMentionClick?: (mention: MentionDTO) => void;
}

export const MentionedText = ({
  content,
  mentions,
  className,
  mentionClassName,
  onMentionClick,
}: MentionedTextProps) => {
  const segments = sliceContentByMentions(content, mentions ?? []);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.kind === 'text') {
          return <React.Fragment key={index}>{segment.text}</React.Fragment>;
        }
        return (
          <span
            key={index}
            role={onMentionClick ? 'button' : undefined}
            onClick={
              onMentionClick
                ? () => onMentionClick(segment.mention)
                : undefined
            }
            className={cn(
              'font-semibold text-primary',
              onMentionClick && 'cursor-pointer lg:hover:underline',
              mentionClassName
            )}
          >
            {segment.text}
          </span>
        );
      })}
    </span>
  );
};
