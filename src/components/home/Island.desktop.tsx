import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

type IslandProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  href?: string;
};

export const DesktopIsland = ({
  title,
  icon,
  children,
  className,
  bodyClassName,
  href,
}: IslandProps) => (
  <Card
    className={cn(
      'bg-surface border-none overflow-hidden flex flex-col h-full',
      className
    )}
  >
    <div className="px-4 py-2.5 bg-surface-variant flex items-center gap-2 flex-shrink-0">
      {icon}
      <h3 className="font-semibold text-urbancare-base text-foreground-primary">
        {title}
      </h3>
      {href && (
        <Link
          href={href}
          aria-label={`Open ${title}`}
          className="ml-auto inline-flex items-center justify-center w-7 h-7 rounded-urbancare-full text-foreground-secondary hover:text-foreground-primary hover:bg-surface transition-colors"
        >
          <ArrowRight className="w-4 h-4" strokeWidth={2.75} />
        </Link>
      )}
    </div>
    <div className={cn('flex-1', bodyClassName)}>{children}</div>
  </Card>
);
