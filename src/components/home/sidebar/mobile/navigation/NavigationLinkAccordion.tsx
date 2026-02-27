'use client';

import { NavItem } from '@/components/home/sidebar/mobile/navigation/NavigationArea';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { NavigationSubLink } from '@/components/home/sidebar/mobile/navigation/NavigationSubLink';
import Link from 'next/link';
import { SheetClose } from '@/components/ui/sheet';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';

type NavigationLinkAccordionProps = {
  navigationItem: NavItem;
  children?: ReactNode;
  className?: string;
  inSheet?: boolean;
};

// Shared icon + label rendering
const NavRowContent = ({
  navigationItem,
  isActive,
}: {
  navigationItem: NavItem;
  isActive: boolean;
}) => (
  <>
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
    <span
      className={cn(
        'flex-1 text-left truncate leading-tight tracking-wide',
        isActive ? 'font-semibold' : 'font-medium'
      )}
    >
      {navigationItem.label}
    </span>
  </>
);

// Animated sub-item list with tree connector
const AccordionChildren = ({
  navigationItem,
  inSheet,
}: {
  navigationItem: NavItem;
  inSheet: boolean;
}) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    className="overflow-hidden"
  >
    {/* Tree connector line + indented children */}
    <div className="ml-5 pl-3 border-l-2 border-border flex flex-col py-0">
      {navigationItem.children?.map((child) => (
        <NavigationSubLink
          key={navigationItem.href + child.href}
          parentHref={navigationItem.href}
          child={child}
          inSheet={inSheet}
        />
      ))}
    </div>
  </motion.div>
);

export const NavigationLinkAccordion = ({
  navigationItem,
  inSheet = true,
}: NavigationLinkAccordionProps) => {
  const pathname = usePathname();
  const { navigable } = navigationItem;

  // Auto-open if a child route is currently active
  const hasActiveChild =
    navigationItem.children?.some((child) => {
      const fullHref = `${navigationItem.href}/${child.href}`;
      return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
    }) ?? false;

  const isParentActive =
    pathname === navigationItem.href ||
    pathname.startsWith(`${navigationItem.href}/`);

  const [isOpen, setIsOpen] = useState(hasActiveChild);

  const rowBase = cn(
    'group relative flex items-center gap-2.5 rounded-panel px-2 transition-all duration-150',
    isParentActive
      ? 'bg-primary-container/50 text-primary'
      : 'text-foreground-primary hover:bg-surface-variant',
    inSheet ? 'py-1.5 text-xl' : 'py-1 text-lg'
  );

  // ── Navigable: Link navigates, chevron action toggles accordion ──
  if (navigable) {
    return (
      <div className="w-full">
        <div className={rowBase}>
          {/* Left accent bar */}
          {isParentActive && (
            <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary pointer-events-none" />
          )}

          {/* Navigating link wraps icon + label */}
          {inSheet ? (
            <SheetClose asChild>
              <Link
                href={navigationItem.href}
                className="flex items-center gap-2.5 flex-1 min-w-0"
              >
                <NavRowContent
                  navigationItem={navigationItem}
                  isActive={isParentActive}
                />
              </Link>
            </SheetClose>
          ) : (
            <Link
              href={navigationItem.href}
              className="flex items-center gap-2.5 flex-1 min-w-0"
            >
              <NavRowContent
                navigationItem={navigationItem}
                isActive={isParentActive}
              />
            </Link>
          )}

          {/* Chevron toggle — separate from link, doesn't close sheet */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-surface-container transition-colors ml-auto"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
            aria-expanded={isOpen}
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 text-icon transition-transform duration-200',
                isOpen && 'rotate-90'
              )}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <AccordionChildren
              navigationItem={navigationItem}
              inSheet={inSheet}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Non-navigable: entire row is a toggle action ──
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(rowBase, 'w-full')}
        aria-expanded={isOpen}
      >
        {/* Left accent bar */}
        {isParentActive && (
          <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary" />
        )}

        <NavRowContent
          navigationItem={navigationItem}
          isActive={isParentActive}
        />

        <ChevronRight
          className={cn(
            'flex-shrink-0 h-4 w-4 text-icon transition-transform duration-200',
            isOpen && 'rotate-90'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <AccordionChildren
            navigationItem={navigationItem}
            inSheet={inSheet}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
