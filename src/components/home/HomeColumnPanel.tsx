import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HomeColumnPanelProps {
  className?: string;
  children: ReactNode;
}

interface HomeColumnPanelHeaderProps {
  className?: string;
  children: ReactNode;
}

interface HomeColumnPanelBodyProps {
  className?: string;
  children: ReactNode;
}

const HomeColumnPanelRoot = ({ className, children }: HomeColumnPanelProps) => {
  return (
    <div className={cn('flex flex-col h-full bg-background gap-5', className)}>
      {children}
    </div>
  );
};

const HomeColumnPanelHeader = ({
  className,
  children,
}: HomeColumnPanelHeaderProps) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center h-14 flex-shrink-0',
        className
      )}
    >
      {children}
    </div>
  );
};

const HomeColumnPanelBody = React.forwardRef<
  HTMLDivElement,
  HomeColumnPanelBodyProps
>(({ className, children }, ref) => (
  <div ref={ref} className={cn('w-full min-h-0', className)}>
    {children}
  </div>
));
HomeColumnPanelBody.displayName = 'HomeColumnPanelBody';

const HomeColumnPanelFooter = ({
  className,
  children,
}: HomeColumnPanelBodyProps) => {
  return <div className={cn('w-full min-h-0', className)}>{children}</div>;
};

export const HomeColumnPanel = Object.assign(HomeColumnPanelRoot, {
  Header: HomeColumnPanelHeader,
  Body: HomeColumnPanelBody,
  Footer: HomeColumnPanelFooter,
});
