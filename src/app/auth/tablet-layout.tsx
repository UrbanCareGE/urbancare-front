'use client';

import React from 'react';
import { useTranslation } from '@/i18n';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';

export default function TabletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslation();

  return (
    <div
      className="relative min-h-dvh flex flex-col overflow-hidden text-white"
      style={{
        background: `linear-gradient(160deg,
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
          top: -160,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(92,155,255,0.55) 0%, rgba(45,123,255,0) 60%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -200,
          right: -120,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(30,95,224,0.7) 0%, rgba(11,24,68,0) 65%)',
          filter: 'blur(28px)',
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
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top: logo + hero copy */}
      <div className="relative z-10 px-10 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-9">
          <UrbanCareIcon className="w-10 h-10 bg-white/15 shadow-none" />
          <span className="urbancare-text-3xl font-bold text-white tracking-tight">
            UrbanCare
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/[0.18] urbancare-text-xs font-bold uppercase tracking-[0.1em] text-white mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7AF1B0]" />
          {t.authPages.yourDistrictAwaits}
        </div>

        <h1
          className="font-bold text-white tracking-tight whitespace-nowrap"
          style={{
            fontFamily: "'Fraunces', 'FiraGO', serif",
            fontSize: 52,
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '-0.035em',
          }}
        >
          {t.authPages.greetingHeadlineFirst}
          {t.authPages.greetingHeadlineSecond}
          <span style={{ color: '#A9C9FF' }}>
            {t.authPages.greetingHeadlineAccent}
          </span>
        </h1>
      </div>

      {/* Form content */}
      <main className="relative z-10 flex-1 flex justify-center items-start px-6 pt-6 pb-10">
        {children}
      </main>
    </div>
  );
}
