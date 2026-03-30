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
import { useTranslation } from '@/i18n';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  isAbsolute?: boolean;
};

export const HeaderNavIsland = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const t = useTranslation();

  const NAV_ITEMS: NavItem[] = [
    { href: 'post', label: t.nav.posts, icon: HouseIcon },
    { href: 'urgent', label: t.nav.urgent, icon: ShieldAlert },
    { href: 'chat', label: t.nav.main, icon: SendIcon },
    { href: '/landing', label: t.nav.news, icon: Newspaper, isAbsolute: true },
    { href: 'profile', label: t.nav.profile, icon: CircleUser },
  ];

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
    <nav className="flex items-center gap-1 bg-surface rounded-urbancare-3xl px-3 shadow-sm shadow-shadow/5 h-14 transition-all">
      {NAV_ITEMS.map((item, index) => {
        const href = getHref(item);
        const active = index === activeIndex;

        return (
          <button
            key={item.href}
            onClick={() => handleNavigation(index, href)}
            className={cn(
              'relative flex items-center gap-2 px-3 py-2 rounded-urbancare-xl font-medium transition-colors duration-200',
              active
                ? 'text-primary'
                : 'text-foreground-secondary lg:hover:text-foreground-primary lg:hover:bg-surface-variant/60 lg:active:scale-95',
              'text-urbancare-base xl:text-urbancare-lg'
            )}
          >
            {active && (
              <motion.div
                layoutId="desktop-nav-indicator"
                className="absolute inset-0 bg-surface-variant rounded-urbancare-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <item.icon
              className={cn(
                'relative z-10 w-4 h-4',
                active ? 'text-primary' : ''
              )}
            />
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
