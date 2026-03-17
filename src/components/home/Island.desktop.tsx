import { cn } from '@/lib/utils';
import React from 'react';
import { Card } from '@/components/ui/card';

type IslandProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export const DesktopIsland = ({
                                title,
                                icon,
                                children,
                                className,
                                bodyClassName,

                              }: IslandProps) => (
  <Card
    className={cn(
      'bg-surface border-none overflow-hidden flex flex-col h-full',
      className,
    )}
  >
    <div className="px-4 py-2.5 bg-surface-variant flex items-center gap-2 flex-shrink-0">
      {icon}
      <h3 className="font-semibold text-urbancare-base text-foreground-primary">{title}</h3>
    </div>
    <div className={cn('flex-1', bodyClassName)}>{children}</div>
  </Card>
);
