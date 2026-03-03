'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import {
  CircleUser,
  HouseIcon,
  Newspaper,
  SendIcon,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  isAbsolute?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: 'post', label: 'პოსტები', icon: HouseIcon },
  { href: 'urgent', label: 'სასწრაფო', icon: ShieldAlert },
  { href: 'chat', label: 'მთავარი', icon: SendIcon },
  { href: '/welcome', label: 'სიახლეები', icon: Newspaper, isAbsolute: true },
  { href: 'profile', label: 'პროფილი', icon: CircleUser },
];

export const HeaderNavIsland = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const [, startTransition] = useTransition();
  const [optimisticIndex, setOptimisticIndex] = useState<number | null>(null);

  const getHref = (item: NavItem) => {
    if (item.isAbsolute) return item.href;
    if (!apartmentId) return '/';
    return item.href
      ? `/apartment/${apartmentId}/${item.href}`
      : `/apartment/${apartmentId}`;
  };

  const isActive = (item: NavItem) => {
    const href = getHref(item);
    if (item.isAbsolute || item.href === '') return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const actualActiveIndex = NAV_ITEMS.findIndex((item) => isActive(item));

  const activeIndex = optimisticIndex ?? actualActiveIndex;

  if (optimisticIndex !== null && actualActiveIndex === optimisticIndex) {
    setOptimisticIndex(null);
  }

  const handleNavigation = (index: number, href: string) => {
    setOptimisticIndex(index);

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <nav className="flex items-center gap-1 bg-surface rounded-2xl px-3 shadow-sm shadow-shadow/5 h-14 transition-all">
      {NAV_ITEMS.map((item, index) => {
        const href = getHref(item);
        const active = index === activeIndex;

        return (
          <button
            key={item.href}
            onClick={() => handleNavigation(index, href)}
            className={cn(
              'relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200',
              active
                ? 'text-primary'
                : 'text-foreground-secondary lg:hover:text-foreground-primary lg:hover:bg-surface-variant/60 lg:active:scale-95',
            )}
          >
            {active && (
              <motion.div
                layoutId="desktop-nav-indicator"
                className="absolute inset-0 bg-surface-variant rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <item.icon
              className={cn(
                'relative z-10 w-4 h-4',
                active ? 'text-primary' : '',
              )}
            />
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
