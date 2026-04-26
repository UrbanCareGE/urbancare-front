'use client';

import React, { useMemo } from 'react';
import { useTranslation } from '@/i18n';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';
import { Building2, MessageCircle, Shield, Vote } from 'lucide-react';
import { CityscapeSVG } from '@/components/common/icon/CityScape';

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslation();

  const features = useMemo(
    () => [
      {
        icon: <Building2 className="w-5 h-5" />,
        label: t.authPages.digitalManagement,
      },
      {
        icon: <MessageCircle className="w-5 h-5" />,
        label: t.authPages.neighborCommunication,
      },
      {
        icon: <Vote className="w-5 h-5" />,
        label: t.authPages.votingDiscussions,
      },
      {
        icon: <Shield className="w-5 h-5" />,
        label: t.authPages.safeProtected,
      },
    ],
    [
      t.authPages.digitalManagement,
      t.authPages.neighborCommunication,
      t.authPages.votingDiscussions,
      t.authPages.safeProtected,
    ]
  );

  return (
    <div className="relative min-h-dvh bg-background">
      <div className="hidden lg:flex lg:h-dvh lg:overflow-hidden">
        {/* LEFT HERO PANEL */}
        <div className="relative flex flex-col w-[56%] overflow-hidden bg-[rgb(var(--color-primary))]">
          {/* Subtle geometric pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(255,255,255,.04) 25%, rgba(255,255,255,.04) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.04) 75%, rgba(255,255,255,.04) 76%, transparent 77%),
                linear-gradient(90deg, transparent 24%, rgba(255,255,255,.04) 25%, rgba(255,255,255,.04) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.04) 75%, rgba(255,255,255,.04) 76%, transparent 77%)
              `,
              backgroundSize: '56px 56px',
            }}
          />

          {/* Solid accent shapes — no blur, clean geometric */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.03] rounded-bl-[180px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[rgb(var(--color-primary-dark))]/30 rounded-tr-[140px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full px-12 xl:px-16 py-10 justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <UrbanCareIcon className="w-11 h-11 bg-white/15 shadow-none" />
              <span className="urbancare-text-4xl font-bold text-white tracking-tight">
                UrbanCare
              </span>
            </div>

            {/* Headline + features */}
            <div className="flex-1 flex flex-col justify-center py-10">
              <p className="text-white/50 urbancare-text-sm font-bold uppercase tracking-[0.2em] mb-4">
                {t.authPages.welcomeBack}
              </p>
              <h1 className="urbancare-text-8xl xl:urbancare-text-9xl font-bold text-white leading-[1.05] mb-5">
                {t.authPages.comeCloser}
              </h1>
              <p className="text-white/60 urbancare-text-xl leading-relaxed mb-12 max-w-[400px]">
                {t.authPages.beCommunityPart}
              </p>

              {/* Feature pills — solid background, no blur */}
              <div className="flex flex-col gap-2.5">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="w-9 h-9 urbancare-rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      {f.icon}
                    </div>
                    <span className="text-white/75 urbancare-text-base font-medium">
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cityscape illustration — anchored to bottom */}
            <div className="relative -mx-12 xl:-mx-16 -mb-10">
              <CityscapeSVG className="w-full" />
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <main className="flex-1 flex flex-col items-center justify-center overflow-y-auto bg-background px-10 py-10">
          <div className="w-full max-w-[440px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
