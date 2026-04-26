import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { UserSnapshotDTO } from '@/model/dto/auth.dto';
import { UserModel } from '@/components/provider/AuthProvider';
import { ApartmentDTO } from '@/model/dto/apartment.dto';

const URBANCARE_TEXT_SIZES = [
  '2xs', 'xs', 'sm', 'md', 'base', 'lg', 'xl',
  '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '10xl',
];
const URBANCARE_ROUNDED_SIZES = [
  'none', 'xs', 'sm', 'md', 'lg', 'xl',
  '2xl', '3xl', '4xl', 'full', 'panel',
];
const ROUNDED_SIDES = ['t', 'b', 'l', 'r', 'tl', 'tr', 'bl', 'br'];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { 'urbancare-text': URBANCARE_TEXT_SIZES },
      ],
      'rounded': [
        { 'urbancare-rounded': URBANCARE_ROUNDED_SIZES },
      ],
      ...Object.fromEntries(
        ROUNDED_SIDES.map((side) => [
          `rounded-${side}`,
          [{ [`urbancare-rounded-${side}`]: URBANCARE_ROUNDED_SIZES }],
        ])
      ),
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export const formatTime = (date: string): string => {
  const now = new Date();
  const posted = new Date(date);
  const diffInMinutes = Math.floor(
    (now.getTime() - posted.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  return `${Math.floor(diffInHours / 24)}d`;
};

export const ExtractUserInitials = (
  user: UserSnapshotDTO | UserModel
): string => {
  let initials = '';
  if (user.name) initials = `${user.name[0]}`;
  if (user.surname) initials += `${user.surname[0]}`;

  return initials.toUpperCase();
};

export const ExctractUserFullName = (
  user: UserSnapshotDTO | UserModel
): string => {
  let fullName = '';
  if (user.name) fullName = `${user.name}`;
  if (user.surname) fullName += `${user.surname}`;

  return fullName;
};

export const getApartmentWithId = (
  apartments: ApartmentDTO[],
  apartmentId?: string
) => {
  if (!apartments || apartments.length === 0) {
    return null;
  }
  if (apartmentId) {
    const apartmentIdx = apartments.findIndex(
      (apartment) => apartment.id === apartmentId
    );
    if (apartmentIdx === -1) return apartments[0];

    return apartments[apartmentIdx];
  }

  return apartments[0];
};
