'use client';

import React from 'react';
import { ThreadTagConfig, ThreadTagValue } from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';

interface ThreadTagsProps {
  tags?: string[] | null;
  className?: string;
}

interface TagBadgeProps {
  tag: string;
}

const TagBadge = ({ tag }: TagBadgeProps) => {
  const config = ThreadTagConfig[tag as ThreadTagValue] || {
    bg: 'bg-gray-500/20',
    text: 'text-gray-600',
    label: tag,
  };

  return (
    <span
      className={cn(
        'px-2 h-5 rounded-full text-xs font-medium',
        config.bg,
        config.text
      )}
    >
      {config.label}
    </span>
  );
};

export const ThreadTags = ({ tags, className }: ThreadTagsProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {tags.map((tag, index) => (
        <TagBadge key={index} tag={tag} />
      ))}
    </div>
  );
};

export default ThreadTags;
