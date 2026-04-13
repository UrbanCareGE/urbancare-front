import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserSnapshotDTO } from '@/model/dto/auth.dto';
import { UserModel } from '@/components/provider/AuthProvider';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const ExtractUserInitials = (user: UserSnapshotDTO | UserModel) : string => {
  let initials = '';
  if (user.name) initials = `${user.name[0]}`;
  if (user.surname) initials += `${user.surname[0]}`;

  return initials.toUpperCase();
};

export const ExctractUserFullName = (user: UserSnapshotDTO | UserModel) : string => {
  let fullName = '';
  if (user.name) fullName = `${user.name}`;
  if (user.surname) fullName += `${user.surname}`;

  return fullName;
};
