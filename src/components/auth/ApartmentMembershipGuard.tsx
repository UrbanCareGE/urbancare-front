'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/provider/AuthProvider';

interface ApartmentMembershipGuardProps {
  apartmentId: string;
  children: React.ReactNode;
}

/**
 * Client-side guard for `/apartment/[apartmentId]/...` routes. The backend
 * `ApartmentAccessInterceptor` already rejects API calls for apartments the
 * user doesn't belong to, but the React tree still mounts and tries to fetch
 * data before the API errors arrive. This guard short-circuits early so a
 * user typing a random apartment id into the URL gets redirected to one
 * they actually belong to (or to /landing if they belong to none).
 */
export const ApartmentMembershipGuard = ({
  apartmentId,
  children,
}: ApartmentMembershipGuardProps) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const isMember =
    !!user?.joinedApartments?.some((a) => a.id === apartmentId);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    if (isMember) return;

    const fallback = user?.selectedApartmentId;
    if (fallback && fallback !== apartmentId) {
      router.replace(`/apartment/${fallback}/post`);
    } else {
      router.replace('/landing');
    }
  }, [
    isLoading,
    isAuthenticated,
    isMember,
    user?.selectedApartmentId,
    apartmentId,
    router,
  ]);

  if (isLoading || !isAuthenticated || !isMember) return null;

  return <>{children}</>;
};
