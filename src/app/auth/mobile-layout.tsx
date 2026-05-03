'use client';

import React from 'react';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-dvh flex flex-col overflow-hidden text-white"
      style={{
        background: `linear-gradient(165deg,
          rgb(var(--color-primary-dark)) 0%,
          rgb(var(--color-primary)) 35%,
          color-mix(in srgb, rgb(var(--color-primary-dark)) 55%, rgb(var(--color-shadow))) 75%,
          color-mix(in srgb, rgb(var(--color-primary-dark)) 25%, rgb(var(--color-shadow))) 100%)`,
      }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -120,
          left: -80,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(92,155,255,0.55) 0%, rgba(45,123,255,0) 60%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -160,
          right: -100,
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(30,95,224,0.65) 0%, rgba(11,24,68,0) 65%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255,255,255,.06) 25%, rgba(255,255,255,.06) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.06) 75%, rgba(255,255,255,.06) 76%, transparent 77%),
            linear-gradient(90deg, transparent 24%, rgba(255,255,255,.06) 25%, rgba(255,255,255,.06) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.06) 75%, rgba(255,255,255,.06) 76%, transparent 77%)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Logo only — top left */}
      <div className="relative z-10 flex items-center gap-2.5 px-5 pt-6">
        <UrbanCareIcon className="w-9 h-9 bg-white/15 shadow-none" />
        <span className="urbancare-text-2xl font-bold text-white tracking-tight">
          UrbanCare
        </span>
      </div>

      {/* Centered form */}
      <main className="relative z-10 flex-1 flex justify-center items-center px-4 py-6">
        {children}
      </main>
    </div>
  );
}
