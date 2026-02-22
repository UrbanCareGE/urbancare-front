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
      'h-9 group flex items-center gap-2 rounded-panel px-1 transition-colors',
      isActive
        ? 'bg-primary-container/60 text-primary'
        : 'hover:bg-surface-variant text-foreground-primary',
      className
    )}
    aria-current={isActive ? 'page' : undefined}
  >
    {navigationItem.icon && (
      <div
        className={cn(
          'flex-shrink-0 p-2 flex justify-center items-center rounded-panel',
          isActive
            ? 'bg-primary-container text-primary-container-foreground'
            : cn(
                'bg-primary-container/50 text-primary-container-foreground',
                navigationItem.className
              )
        )}
      >
        {navigationItem.icon}
      </div>
    )}
    <p
      className={cn(
        'flex-1 text-left truncate leading-tight tracking-wide text-lg',
        isActive ? 'font-semibold' : 'font-normal'
      )}
    >
      {navigationItem.label}
    </p>
    {isActive && (
      <span className="w-1 h-5 rounded-full bg-primary flex-shrink-0 mr-1" />
    )}
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
