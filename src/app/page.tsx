'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/provider/AuthProvider';
import { LandingPage } from '@/components/landing/LandingPage';

export default function RootPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user?.joinedApartments?.length) {
      router.replace(`/apartment/${user.selectedApartmentId}`);
    } else {
      router.replace(`/welcome`);
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-dvh bg-background">
        <div className="animate-spin h-8 w-8 border-4 bg-border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-dvh bg-background">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );
}
