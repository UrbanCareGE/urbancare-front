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
export const getNavigationGroups = (apartmentId: string): NavGroup[] => [
  {
    // No label for top-level quick-access items
    items: [
      {
        href: `/apartment/${apartmentId}/urgent`,
        label: 'სასწრაფო',
        icon: <ShieldAlertIcon className="w-4 h-4" />,
        className: 'bg-error-container text-error-container-foreground',
      },
      {
        href: `/apartment/${apartmentId}/post/news`,
        label: 'სიახლეები',
        icon: <MegaphoneIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
    ],
  },
  {
    label: 'კომუნიტი',
    items: [
      {
        href: `/apartment/${apartmentId}/post/services`,
        label: 'სერვისები',
        icon: <PocketKnifeIcon className="w-4 h-4" />,
        className: 'bg-secondary-container text-secondary-container-foreground',
        navigable: true,
        children: [
          { href: 'learn', label: 'განათლება' },
          { href: 'sport', label: 'ფიტნესი' },
          { href: 'vet', label: 'ვეტი' },
          { href: 'craft', label: 'ხელობა' },
          { href: 'other', label: 'სხვა' },
        ],
      },
      {
        href: `/apartment/${apartmentId}/post/requests`,
        label: 'მოთხოვნები',
        icon: <ClipboardListIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
      {
        href: `/apartment/${apartmentId}/post/maintenance`,
        label: 'მიმდინარე სამუშაოები',
        icon: <PaintRollerIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
      {
        href: `/apartment/${apartmentId}/post/notice`,
        label: 'განცხადებები',
        icon: <ScrollTextIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
        navigable: true,
        children: [
          { href: 'apartment', label: 'ბინა' },
          { href: 'car', label: 'მანქანა' },
          { href: 'parking', label: 'პარკინგი' },
        ],
      },
    ],
  },
  {
    label: 'შენობა',
    items: [
      {
        href: `/apartment/${apartmentId}/documents`,
        label: 'დოკუმენტები',
        icon: <FileUser className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
      {
        href: `/apartment/${apartmentId}/info`,
        label: 'ინფორმაცია',
        icon: <BookOpenIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
        children: [
          { href: 'contact', label: 'კონტაქტები' },
          { href: 'docs', label: 'წესდება' },
          { href: 'cars', label: 'ავტომობილები' },
        ],
      },
      {
        href: `/apartment/${apartmentId}/finance`,
        label: 'ფინანსები',
        icon: <LandmarkIcon className="w-4 h-4" />,
        className: 'bg-primary-container text-primary-container-foreground',
      },
    ],
  },
];

// Backward-compat flat list
export const getNavigationItems = (apartmentId: string) =>
  getNavigationGroups(apartmentId).flatMap((g) => g.items);

type NavigationAreaProps = {
  inSheet?: boolean;
  className?: string;
};

const NavigationArea = ({ inSheet = true, className }: NavigationAreaProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const groups = apartmentId ? getNavigationGroups(apartmentId) : [];

  return (
    <nav className={cn('w-full flex flex-col', className)}>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className={cn(groupIndex > 0 && 'mt-1')}>
          {/* Section divider between groups */}
          {groupIndex > 0 && (
            <div className="mx-2 border-t border-[rgb(var(--color-border))] mb-1 mt-0" />
          )}

          {/* Section label */}
          {group.label && (
            <p className="px-3 mb-0 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-text-tertiary))]">
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
