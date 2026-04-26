'use client';

import { NavigationLink } from '@/components/home/sidebar/mobile/navigation/NavigationLink';
import {
  BookOpenIcon,
  ClipboardListIcon,
  FileUser,
  LandmarkIcon,
  MegaphoneIcon,
  PaintRollerIcon,
  PocketKnifeIcon,
  ScrollTextIcon,
  ShieldAlertIcon,
} from 'lucide-react';
import React from 'react';
import { NavigationLinkAccordion } from '@/components/home/sidebar/mobile/navigation/NavigationLinkAccordion';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

export type NavChildItem = {
  href: string; // Relative to parent
  label: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  children?: NavChildItem[];
  className?: string;
  navigable?: boolean; // If true with children, parent label navigates and only chevron expands accordion
};

export type NavGroup = {
  label?: string; // Optional section header label
  items: NavItem[];
};

// Grouped navigation — exported for reuse
export const getNavigationGroups = (
  apartmentId: string,
  t: ReturnType<typeof useTranslation>
): NavGroup[] => [
  {
    // No label for top-level quick-access items
    items: [
      {
        href: `/apartment/${apartmentId}/urgent`,
        label: t.nav.urgent,
        icon: <ShieldAlertIcon className="w-4 h-4" />,
        className: 'bg-error-container text-error-container-foreground',
      },
      {
        href: `/apartment/${apartmentId}/post/news`,
        label: t.nav.news,
        icon: <MegaphoneIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
    ],
  },
  {
    label: t.sidebar.community,
    items: [
      {
        href: `/apartment/${apartmentId}/post/services`,
        label: t.sidebar.services,
        icon: <PocketKnifeIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
        navigable: true,
        children: [
          { href: 'learn', label: t.sidebar.education },
          { href: 'sport', label: t.sidebar.fitness },
          { href: 'vet', label: t.sidebar.vet },
          { href: 'craft', label: t.sidebar.craft },
          { href: 'other', label: t.sidebar.other },
        ],
      },
      {
        href: `/apartment/${apartmentId}/post/requests`,
        label: t.sidebar.requests,
        icon: <ClipboardListIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
      {
        href: `/apartment/${apartmentId}/post/maintenance`,
        label: t.sidebar.currentWork,
        icon: <PaintRollerIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
      {
        href: `/apartment/${apartmentId}/post/notice`,
        label: t.sidebar.announcements,
        icon: <ScrollTextIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
        navigable: true,
        children: [
          { href: 'apartment', label: t.sidebar.apartment },
          { href: 'car', label: t.sidebar.car },
          { href: 'parking', label: t.sidebar.parking },
        ],
      },
    ],
  },
  {
    label: t.sidebar.building,
    items: [
      {
        href: `/apartment/${apartmentId}/documents`,
        label: t.sidebar.documents,
        icon: <FileUser className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
      {
        href: `/apartment/${apartmentId}/info`,
        label: t.sidebar.information,
        icon: <BookOpenIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
        children: [
          { href: 'contact', label: t.sidebar.contacts },
          { href: 'docs', label: t.sidebar.rules },
          { href: 'cars', label: t.sidebar.vehicles },
        ],
      },
      {
        href: `/apartment/${apartmentId}/finance`,
        label: t.sidebar.finances,
        icon: <LandmarkIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
    ],
  },
];

// Backward-compat flat list
export const getNavigationItems = (
  apartmentId: string,
  t: ReturnType<typeof useTranslation>
) => getNavigationGroups(apartmentId, t).flatMap((g) => g.items);

type NavigationAreaProps = {
  inSheet?: boolean;
  className?: string;
};

const NavigationArea = ({ inSheet = true, className }: NavigationAreaProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const t = useTranslation();
  const groups = apartmentId ? getNavigationGroups(apartmentId, t) : [];

  return (
    <nav className={cn('w-full flex flex-col', className)}>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className={cn(groupIndex > 0 && 'mt-1')}>
          {/* Section divider between groups */}
          {groupIndex > 0 && (
            <div className="mx-2 border-t border-border mb-1 mt-0" />
          )}

          {/* Section label */}
          {group.label && (
            <p className="px-3 mb-0 text-urbancare-sm font-semibold uppercase tracking-widest text-text-tertiary">
              {group.label}
            </p>
          )}

          {/* Nav items */}
          <div className="flex flex-col gap-0">
            {group.items.map((navigationItem) => {
              if (
                navigationItem.children &&
                navigationItem.children.length > 0
              ) {
                return (
                  <NavigationLinkAccordion
                    key={navigationItem.href}
                    navigationItem={navigationItem}
                    inSheet={inSheet}
                  />
                );
              }
              return (
                <NavigationLink
                  key={navigationItem.href}
                  navigationItem={navigationItem}
                  href={navigationItem.href}
                  inSheet={inSheet}
                />
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default NavigationArea;
