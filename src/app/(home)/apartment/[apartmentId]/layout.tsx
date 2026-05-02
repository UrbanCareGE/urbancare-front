import React from 'react';
import { ApartmentMembershipGuard } from '@/components/auth/ApartmentMembershipGuard';

interface ApartmentLayoutProps {
  children: React.ReactNode;
  params: Promise<{ apartmentId: string }>;
}

export default async function ApartmentLayout({
  children,
  params,
}: ApartmentLayoutProps) {
  const { apartmentId } = await params;
  return (
    <ApartmentMembershipGuard apartmentId={apartmentId}>
      {children}
    </ApartmentMembershipGuard>
  );
}
