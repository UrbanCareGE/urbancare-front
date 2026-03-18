import React from 'react';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';
import { MobileCityscapeSVG } from '@/components/common/icon/MobileCityScape';

export default function TabletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh flex flex-col bg-background">
      {/* Hero header with solid color + subtle gradient */}
      <div className="relative overflow-hidden bg-[rgb(var(--color-primary))]">
        {/* Subtle darker corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-[rgb(var(--color-primary-dark))]/30 rounded-tr-[80px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%),
              linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Logo + Branding */}
        <div className="relative z-10 flex flex-col items-center pt-12 pb-2 px-8">
          <div className="flex items-center gap-3 mb-1">
            <UrbanCareIcon className="w-11 h-11 bg-white/15 shadow-none" />
            <span className="text-urbancare-4xl font-bold text-white tracking-tight">
              UrbanCare
            </span>
          </div>
        </div>

        {/* Cityscape at bottom of hero */}
        <div className="relative z-10 -mb-px">
          <MobileCityscapeSVG className="w-full max-w-2xl mx-auto" />
        </div>

        {/* Bottom edge fade into background */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-20" />
      </div>

      {/* Form content */}
      <main className="flex-1 flex justify-center items-start px-6 -mt-2 pb-8">
        {children}
      </main>
    </div>
  );
}
