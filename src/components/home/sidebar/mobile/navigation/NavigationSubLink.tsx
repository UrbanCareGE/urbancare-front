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

// Inner sub-link component
const NavigationSubLinkInner = ({
  fullHref,
  child,
  isActive,
}: {
  fullHref: string;
  child: NavChildItem;
  isActive: boolean;
}) => (
  <Link
    href={fullHref}
    className={
      'h-7 group relative flex items-center gap-9 px-1 border-l hover:bg-surface-variant transition-colors'
    }
  >
    <div
      className={cn(
        'h-full w-1 rounded-full',
        isActive ? 'bg-primary' : 'bg-primary-bg/80'
      )}
    ></div>
    <p className="flex-1 text-foreground-primary text-left truncate leading-tight font-medium text-base">
      {child.label}
    </p>
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

  if (inSheet) {
    return (
      <SheetClose asChild>
        <NavigationSubLinkInner
          fullHref={fullHref}
          child={child}
          isActive={isActive}
        />
      </SheetClose>
    );
  }

  return (
    <NavigationSubLinkInner
      fullHref={fullHref}
      child={child}
      isActive={isActive}
    />
  );
};
