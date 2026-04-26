import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileSideBarGroupHeaderProps {
  title: string;
  dotClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

interface ProfileSideBarGroupContentProps {
  className?: string;
  children?: React.ReactNode;
}

interface ProfileSideBarGroupProps {
  className?: string;
  children?: React.ReactNode;
}

export const ProfileSideBarGroupHeader = ({
  title,
  dotClassName,
  className,
}: ProfileSideBarGroupHeaderProps) => {
  return (
    <div className={cn('flex items-center gap-1.5 mb-2', className)}>
      {dotClassName && (
        <div
          className={cn(
            'w-1.5 h-1.5 urbancare-rounded-full shadow-sm',
            dotClassName
          )}
        />
      )}
      <h3 className="urbancare-text-2xs font-bold text-text-secondary uppercase tracking-widest">
        {title}
      </h3>
    </div>
  );
};

export const ProfileSideBarGroupContent = ({
  className,
  children,
}: ProfileSideBarGroupContentProps) => {
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>{children}</div>
  );
};

export const ProfileSideBarGroupRoot = ({
  className,
  children,
}: ProfileSideBarGroupProps) => {
  return <div className={cn('flex flex-col py-3', className)}>{children}</div>;
};

export const ProfileSideBarGroup = Object.assign(ProfileSideBarGroupRoot, {
  Header: ProfileSideBarGroupHeader,
  Content: ProfileSideBarGroupContent,
});
