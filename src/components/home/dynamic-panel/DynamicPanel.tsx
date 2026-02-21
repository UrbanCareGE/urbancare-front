import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

interface DynamicPanelRootProps {
  className?: string;
  children: ReactNode;
}

interface DynamicPanelHeaderProps {
  className?: string;
  children?: ReactNode;
}

interface DynamicPanelBodyProps {
  className?: string;
  children: ReactNode;
}

interface DynamicPanelFooterProps {
  className?: string;
  children: ReactNode;
}

const DynamicPanelRoot = ({ className, children }: DynamicPanelRootProps) => {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
};

const DynamicPanelHeader = ({
  className,
  children,
}: DynamicPanelHeaderProps) => {
  return (
    <div className={cn('w-full h-auto px-4 pb-2', className)}>{children}</div>
  );
};

const DynamicPanelBody = ({ className, children }: DynamicPanelBodyProps) => {
  return (
    <div className={cn('w-full flex-1 px-4 overflow-scroll', className)}>
      {children}
    </div>
  );
};

const DynamicPanelFooter = ({
  className,
  children,
}: DynamicPanelFooterProps) => {
  return <div className={cn('h-auto', className)}>{children}</div>;
};

const DynamicPanelSeparator = () => {
  return <Separator className={'bg-border'} />;
};

export const DynamicPanel = Object.assign(DynamicPanelRoot, {
  Header: DynamicPanelHeader,
  Body: DynamicPanelBody,
  Footer: DynamicPanelFooter,
  Separator: DynamicPanelSeparator,
});

export default DynamicPanel;
