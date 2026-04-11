import { cn } from '@/lib/utils';
import React from 'react';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-urbancare-md bg-surface-container',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
