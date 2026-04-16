'use client';

import React from 'react';
import { ThreadTagConfig, ThreadTagValue } from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

interface ThreadTagsProps {
  tags?: string[] | null;
  className?: string;
}

interface TagBadgeProps {
  tag: string;
}

const TagBadge = ({ tag }: TagBadgeProps) => {
  const t = useTranslation();
  const config = ThreadTagConfig[tag as ThreadTagValue] || {
    bg: 'bg-surface-container',
    text: 'text-text-secondary',
  };

  const label = t.tags[tag as keyof typeof t.tags] || tag;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 h-6 rounded-urbancare-full text-urbancare-xs font-semibold whitespace-nowrap',
        config.bg,
        config.text
      )}
    >
      {label}
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
