'use client';

import Link from 'next/link';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { usePathname } from 'next/navigation';
import { SheetClose } from '@/components/ui/sheet';

type NavigationLinkProps = {
  navigationItem: NavItem;
  children?: ReactNode;
  className?: string;
  inSheet?: boolean;
} & ComponentPropsWithoutRef<typeof Link>;

type NavigationLinkInnerProps = Omit<NavigationLinkProps, 'inSheet'> & {
  isActive: boolean;
};

const NavigationLinkInner = forwardRef<HTMLAnchorElement, NavigationLinkInnerProps>(
  ({ navigationItem, className, isActive, ...props }, ref) => (
    <Link
      ref={ref}
      {...props}
      className={cn(
        'group relative flex items-center gap-2.5 rounded-panel px-2 py-1 transition-all duration-150',
        isActive
          ? 'bg-primary-container/50 text-primary'
          : 'text-foreground-primary hover:bg-surface-variant',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Left accent bar */}
      {isActive && (
        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary" />
      )}

      {/* Icon container */}
      {navigationItem.icon && (
        <div
          className={cn(
            'w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg transition-colors duration-150',
            isActive
              ? 'bg-primary-container text-primary-container-foreground'
              : cn('text-primary-container-foreground', navigationItem.className)
          )}
        >
          {navigationItem.icon}
        </div>
      )}

      {/* Label */}
      <p
        className={cn(
          'flex-1 text-left truncate leading-tight tracking-wide',
          isActive ? 'font-semibold' : 'font-medium'
        )}
      >
        {navigationItem.label}
      </p>
    </Link>
  )
);
NavigationLinkInner.displayName = 'NavigationLinkInner';

export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ navigationItem, className, inSheet = true, ...props }, ref) => {
    const pathname = usePathname();

    const isActive =
      pathname === navigationItem.href ||
      (navigationItem.href !== '/' && pathname.startsWith(navigationItem.href));

    // Mobile (in-sheet): taller rows for touch targets
    if (inSheet) {
      return (
        <SheetClose asChild>
          <NavigationLinkInner
            ref={ref}
            navigationItem={navigationItem}
            className={cn('py-1.5 text-xl', className)}
            isActive={isActive}
            {...props}
          />
        </SheetClose>
      );
    }

    return (
      <NavigationLinkInner
        ref={ref}
        navigationItem={navigationItem}
        className={cn('text-lg', className)}
        isActive={isActive}
        {...props}
      />
    );
  }
);

NavigationLink.displayName = 'NavigationLink';
