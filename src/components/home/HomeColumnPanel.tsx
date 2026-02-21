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
    <div className={cn('flex flex-col h-screen bg-background', className)}>
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
        'flex justify-center items-center w-full h-[5rem]',
        className
      )}
    >
      {children}
    </div>
  );
};

const HomeColumnPanelBody = ({
  className,
  children,
}: HomeColumnPanelBodyProps) => {
  return (
    <div className={cn('w-full flex-1 pb-4 min-h-0', className)}>
      {children}
    </div>
  );
};

export const HomeColumnPanel = Object.assign(HomeColumnPanelRoot, {
  Header: HomeColumnPanelHeader,
  Body: HomeColumnPanelBody,
});
