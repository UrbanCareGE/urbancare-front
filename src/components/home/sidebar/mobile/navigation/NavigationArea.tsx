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
  navigable?: boolean; // If true with children, parent label navigates and only icon expands accordion
};

// Paths relative to /apartment/[apartmentId]/ - exported for reuse in desktop sidebar
export const getNavigationItems = (apartmentId: string): NavItem[] => [
  {
    href: `/apartment/${apartmentId}/urgent`,
    label: 'სასწრაფო',
    icon: <ShieldAlertIcon />,
    className: 'bg-error-container text-error-container-foreground',
  },
  {
    href: `/apartment/${apartmentId}/post/news`,
    label: 'სიახლეები',
    icon: <MegaphoneIcon />,
    className: 'bg-primary-container/50 text-primary-container-foreground',
  },
  {
    href: `/apartment/${apartmentId}/post/services`,
    label: 'სერვისები',
    icon: <PocketKnifeIcon />,
    className: 'bg-secondary-container/50 text-secondary-container-foreground',
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
    icon: <ClipboardListIcon />,
    className: 'bg-primary-container/50 text-primary-container-foreground',
  },
  {
    href: `/apartment/${apartmentId}/post/maintenance`,
    label: 'მიმდინარე სამუშაოები',
    icon: <PaintRollerIcon />,
    className: 'bg-primary-container/50 text-primary-container-foreground',
  },
  {
    href: `/apartment/${apartmentId}/post/notice`,
    label: 'განცხადებები',
    icon: <ScrollTextIcon />,
    className: 'bg-primary-container/50 text-primary-container-foreground',
    navigable: true,
    children: [
      { href: 'apartment', label: 'ბინა' },
      { href: 'car', label: 'მანქანა' },
      { href: 'parking', label: 'პარკინგი' },
    ],
  },
  {
    href: `/apartment/${apartmentId}/documents`,
    label: 'დოკუმენტები',
    icon: <FileUser />,
    className: 'bg-primary-container/50 text-primary-container-foreground',
  },
  {
    href: `/apartment/${apartmentId}/info`,
    label: 'ინფორმაცია',
    icon: <BookOpenIcon />,
    className: 'bg-primary-container/50 text-primary-container-foreground',
    children: [
      { href: 'contact', label: 'კონტაქტები' },
      { href: 'docs', label: 'წესდება' },
      { href: 'cars', label: 'ავტომობილები' },
    ],
  },
  {
    href: `/apartment/${apartmentId}/finance`,
    label: 'ფინანსები',
    icon: <LandmarkIcon />,
    className: 'bg-primary-container/50 text-primary-container-foreground',
  },
];

type NavigationAreaProps = {
  inSheet?: boolean;
  className?: string;
};

const NavigationArea = ({ inSheet = true, className }: NavigationAreaProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const navigationItems = apartmentId ? getNavigationItems(apartmentId) : [];

  return (
    <nav className={className ?? 'w-full flex flex-col gap-2 py-3'}>
      {navigationItems.map((navigationItem) => {
        if (navigationItem.children && navigationItem.children.length > 0) {
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
    </nav>
  );
};

export default NavigationArea;
