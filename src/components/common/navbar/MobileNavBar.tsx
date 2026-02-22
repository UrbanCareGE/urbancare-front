'use client';

import {
  CircleUser,
  HouseIcon,
  LucideIcon,
  Newspaper,
  SendIcon,
  ShieldAlert,
} from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Basic } from '@/app/layout';
import { cn } from '@/lib/utils';
import { useMobileScroll } from '@/hooks/use-mobile-scroll';

interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
  isAbsolute?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { path: 'post', icon: HouseIcon, label: 'Posts' },
  { path: 'urgent', icon: ShieldAlert, label: 'Urgent' },
  { path: '', icon: SendIcon, label: 'Chat' },
  { path: 'news', icon: Newspaper, label: 'News' },
  { path: 'profile', icon: CircleUser, label: 'Profile' },
];

export const MobileNavBar = ({ className }: Basic) => {
  const pathname = usePathname();
  const router = useRouter();
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const [isPending, startTransition] = useTransition();
  const [optimisticIndex, setOptimisticIndex] = useState<number | null>(null);
  const { isVisible } = useMobileScroll();

  const getHref = (item: NavItem) => {
    if (item.isAbsolute) return item.path;
    if (!apartmentId) return '/';
    return item.path
      ? `/apartment/${apartmentId}/${item.path}`
      : `/apartment/${apartmentId}`;
  };

  const isActive = (item: NavItem) => {
    const href = getHref(item);
    return pathname === href;
  };

  const actualActiveIndex = NAV_ITEMS.findIndex((item) => isActive(item));

  const activeIndex = optimisticIndex ?? actualActiveIndex;

  if (optimisticIndex !== null && actualActiveIndex === optimisticIndex) {
    setOptimisticIndex(null);
  }

  const handleNavigation = (index: number, href: string) => {
    // Instant visual feedback
    setOptimisticIndex(index);

    // Navigate in transition (won't block UI)
    startTransition(() => {
      router.push(href);
    });
  };

  const getBackgroundPosition = (index: number) => {
    return `calc((16.66666666% - 10rem / 6 + 2rem) * ${index - 2} + 50% - 1.75rem)`;
  };

  return (
    <footer
      suppressHydrationWarning
      className={cn(
        'fixed bottom-0 left-0 right-0 h-16 w-full flex justify-center items-center shadow-xl bg-surface transition-transform duration-300 ease-in-out z-[40] will-change-transform border-t border-border',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        className
      )}
    >
      <nav className="relative w-full h-full flex justify-evenly items-center rounded-full">
        {/* Animated background indicator */}
        <div
          className={cn(
            'absolute w-14 h-11 bg-primary transition-all duration-300 ease-out rounded-xl',
            { hidden: activeIndex < 0 }
          )}
          style={{
            left: getBackgroundPosition(activeIndex),
            transition: 'left 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)',
          }}
          suppressHydrationWarning
        />

        {/* Navigation items */}
        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isItemActive = index === activeIndex;
          const href = getHref(item);

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(index, href)}
              className="relative z-10 flex items-center justify-center w-8 transition-colors duration-300"
              aria-label={item.label}
            >
              <Icon
                className={cn('transition-colors duration-300 text-icon', {
                  'text-white': isItemActive,
                })}
                size={26}
              />
            </button>
          );
        })}
      </nav>
    </footer>
  );
};
