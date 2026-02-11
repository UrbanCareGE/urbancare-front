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

// Inner link component (reusable)
const NavigationLinkInner = forwardRef<
  HTMLAnchorElement,
  Omit<NavigationLinkProps, 'inSheet'> & { isActive: boolean }
>(({ navigationItem, className, isActive, ...props }, ref) => (
  <Link
    ref={ref}
    {...props}
    className={cn(
      'h-9 group flex items-center gap-2 rounded-panel px-1',
      'hover:bg-surface-variant transition-colors',
      className
    )}
    aria-current={isActive ? 'page' : undefined}
  >
    {navigationItem.icon && (
      <div
        className={cn(
          'flex-shrink-0 p-2 flex justify-center items-center bg-primary-container/50 text-primary-container-foreground rounded-panel',
          navigationItem.className
        )}
      >
        {navigationItem.icon}
      </div>
    )}
    <p className="flex-1 text-foreground-primary text-left truncate leading-tight tracking-wide font-normal text-lg">
      {navigationItem.label}
    </p>
  </Link>
));
NavigationLinkInner.displayName = 'NavigationLinkInner';

export const NavigationLink = forwardRef<
  HTMLAnchorElement,
  NavigationLinkProps
>(({ navigationItem, className, inSheet = true, ...props }, ref) => {
  const pathname = usePathname();

  const isActive =
    pathname === navigationItem.href ||
    (navigationItem.href !== '/' && pathname.startsWith(navigationItem.href));

  if (inSheet) {
    return (
      <SheetClose asChild>
        <NavigationLinkInner
          ref={ref}
          navigationItem={navigationItem}
          className={className}
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
      className={className}
      isActive={isActive}
      {...props}
    />
  );
});

NavigationLink.displayName = 'NavigationLink';
