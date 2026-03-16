'use client';

import React from 'react';
import { LoginFormCard } from '@/components/auth/login/LoginFormCard';
import { LoginHeader } from '@/components/auth/login/LoginHeader';
import { LoginFooter } from '@/components/auth/login/LoginFooter';
import DynamicPanel from '@/components/home/dynamic-panel/DynamicPanel';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';
import { Building2, MessageCircle, Vote } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { BuildingIllustration } from '@/components/common/icon/Building';

export default function LoginPage() {
  const t = useTranslation();

  const features = [
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
  ];

  return (
    <div className="relative min-h-screen bg-[rgb(var(--color-background))]">
      {/* -- Mobile background blobs -- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden lg:hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-light rounded-urbancare-full blur-[80px] opacity-40 animate-blob" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-gradient-secondary-purple rounded-urbancare-full blur-[80px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-12 right-[10%] w-52 h-52 bg-primary-hover rounded-urbancare-full blur-[80px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      {/* -- DESKTOP: two-column layout -- */}
      <div className="hidden lg:flex lg:h-screen lg:overflow-hidden">
        {/* LEFT HERO PANEL */}
        <div className="relative flex flex-col w-[56%] overflow-hidden bg-gradient-primary">
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Ambient blobs */}
          <div className="absolute -top-28 -left-28 w-80 h-80 bg-white/5 rounded-urbancare-full blur-[90px] animate-blob" />
          <div className="absolute top-1/2 -right-20 w-72 h-72 bg-white/5 rounded-urbancare-full blur-[90px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-white/5 rounded-urbancare-full blur-[90px] animate-blob animation-delay-4000" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full px-12 xl:px-16 py-10 justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <UrbanCareIcon className="w-11 h-11 bg-white/20 shadow-none" />
              <span className="text-urbancare-4xl font-bold text-white tracking-tight">
                UrbanCare
              </span>
            </div>

            {/* Headline + features */}
            <div className="flex-1 flex flex-col justify-center py-10">
              <p className="text-white/60 text-urbancare-base font-semibold uppercase tracking-widest mb-3">
                {t.authPages.welcomeBack}
              </p>
              <h1 className="text-urbancare-8xl xl:text-urbancare-9xl font-bold text-white leading-tight mb-4">
                {t.authPages.comeCloser}
              </h1>
              <p className="text-white/65 text-urbancare-xl leading-relaxed mb-10 max-w-[380px]">
                {t.authPages.beCommunityPart}
              </p>

              <div className="flex flex-col gap-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-urbancare-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                      {f.icon}
                    </div>
                    <span className="text-white/80 text-urbancare-lg font-medium">
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Building illustration */}
            <div className="pb-2 opacity-80">
              <BuildingIllustration />
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto bg-[rgb(var(--color-background))] px-10 py-10">
          <div className="w-full max-w-[440px]">
            <LoginFormCard />
          </div>
        </div>
      </div>

      {/* -- MOBILE: single-column layout -- */}
      <DynamicPanel className="lg:hidden relative z-10 min-h-screen px-6 py-6 max-w-md mx-auto">
        <DynamicPanel.Header>
          <LoginHeader />
        </DynamicPanel.Header>
        <DynamicPanel.Body>
          <LoginFormCard />
        </DynamicPanel.Body>
        <DynamicPanel.Footer>
          <LoginFooter />
        </DynamicPanel.Footer>
      </DynamicPanel>
    </div>
  );
}
