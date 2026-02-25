'use client';

import { NavChildItem } from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SheetClose } from '@/components/ui/sheet';

type NavigationSubLinkProps = {
  parentHref: string;
  child: NavChildItem;
  inSheet?: boolean;
};

const NavigationSubLinkInner = ({
  fullHref,
  child,
  isActive,
  textSize,
}: {
  fullHref: string;
  child: NavChildItem;
  isActive: boolean;
  textSize: string;
}) => (
  <Link
    href={fullHref}
    className={cn(
      'group flex items-center gap-2.5 px-2 py-1 rounded-md transition-all duration-150',
      isActive
        ? 'bg-primary-container/40 text-primary'
        : 'text-foreground-secondary hover:bg-surface-variant hover:text-foreground-primary'
    )}
  >
    {/* Dot indicator */}
    <span
      className={cn(
        'w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-150',
        isActive
          ? 'bg-primary scale-125'
          : 'bg-[rgb(var(--color-border-strong))] group-hover:bg-[rgb(var(--color-primary)/0.5)]'
      )}
    />
    <span
      className={cn(
        'flex-1 text-left truncate leading-tight tracking-wide',
        textSize,
        isActive ? 'font-semibold' : 'font-medium'
      )}
    >
      {child.label}
    </span>
  </Link>
);

export const NavigationSubLink = ({
  parentHref,
  child,
  inSheet = true,
}: NavigationSubLinkProps) => {
  const pathname = usePathname();
  const fullHref = `${parentHref}/${child.href}`;
  const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`);
  const textSize = inSheet ? 'text-base' : 'text-[13px]';

  if (inSheet) {
    return (
      <SheetClose asChild>
        <NavigationSubLinkInner
          fullHref={fullHref}
          child={child}
          isActive={isActive}
          textSize={textSize}
        />
      </SheetClose>
    );
  }

  return (
    <NavigationSubLinkInner
      fullHref={fullHref}
      child={child}
      isActive={isActive}
      textSize={textSize}
    />
  );
};
