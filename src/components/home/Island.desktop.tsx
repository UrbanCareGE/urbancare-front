import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { Expand } from 'lucide-react';
import { Card } from '@/components/ui/card';

type IslandProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  href?: string;
  headerExtra?: React.ReactNode;
};

export const DesktopIsland = ({
  title,
  icon,
  children,
  className,
  bodyClassName,
  href,
  headerExtra,
}: IslandProps) => (
  <Card
    className={cn(
      'bg-surface border-none overflow-hidden flex flex-col h-full',
      className
    )}
  >
    <div className="px-4 py-2.5 bg-surface-variant flex items-center gap-2 flex-shrink-0">
      {icon}
      <h3 className="font-semibold urbancare-text-base text-foreground-primary">
        {title}
      </h3>
      {(headerExtra || href) && (
        <div className="ml-auto flex items-center gap-1">
          {headerExtra}
          {href && (
            <Link
              href={href}
              aria-label={`Open ${title}`}
              className="inline-flex items-center justify-center w-7 h-7 urbancare-rounded-full text-foreground-secondary hover:text-foreground-primary hover:bg-surface transition-colors"
            >
              <Expand className="w-4 h-4" strokeWidth={2.75} />
            </Link>
          )}
        </div>
      )}
    </div>
    <div className={cn('flex-1', bodyClassName)}>{children}</div>
  </Card>
);
