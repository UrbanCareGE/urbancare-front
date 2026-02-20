import React from 'react';

interface ApartmentLayoutProps {
  children: React.ReactNode;
  params: Promise<{ apartmentId: string }>;
}

export default async function ApartmentLayout({
  children,
}: ApartmentLayoutProps) {
  return <>{children}</>;
}
