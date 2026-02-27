import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import {
  CircleUser,
  HouseIcon,
  Newspaper,
  SendIcon,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  isAbsolute?: boolean;
};

const headerNavItems: NavItem[] = [
  { href: 'post', label: 'პოსტები', icon: HouseIcon },
  { href: 'urgent', label: 'სასწრაფო', icon: ShieldAlert },
  { href: '', label: 'მთავარი', icon: SendIcon },
  { href: '/welcome', label: 'სიახლეები', icon: Newspaper, isAbsolute: true },
  { href: 'profile', label: 'პროფილი', icon: CircleUser },
];

export const HeaderNavIsland = () => {
  const pathname = usePathname();
  const { apartmentId } = useParams<{ apartmentId: string }>();

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

  return (
    <nav className="flex items-center gap-1 bg-surface border border-border rounded-2xl p-1 shadow-sm shadow-shadow/5">
      {headerNavItems.map((item) => {
        const href = getHref(item);
        const active = isActive(item);

        return (
          <Link
            key={item.href}
            href={href}
            className={cn(
              'relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200',
              active
                ? 'text-primary'
                : 'text-foreground-secondary lg:hover:text-foreground-primary lg:hover:bg-surface-variant/60 lg:active:scale-95'
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
                active ? 'text-primary' : ''
              )}
            />
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
