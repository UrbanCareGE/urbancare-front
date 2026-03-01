'use client';

import React from 'react';
import { LoginFormCard } from '@/components/auth/login/LoginFormCard';
import { LoginHeader } from '@/components/auth/login/LoginHeader';
import { LoginFooter } from '@/components/auth/login/LoginFooter';
import DynamicPanel from '@/components/home/dynamic-panel/DynamicPanel';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';
import { Building2, MessageCircle, Vote } from 'lucide-react';

const features = [
  {
    icon: <Building2 className="w-5 h-5" />,
    label: 'სახლის ციფრული მართვა',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'მეზობლებთან კომუნიკაცია',
  },
  {
    icon: <Vote className="w-5 h-5" />,
    label: 'კენჭისყრა და განხილვები',
  },
];

const BuildingIllustration = () => (
  <svg
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-sm mx-auto"
    aria-hidden="true"
  >
    {/* Ground */}
    <line
      x1="0"
      y1="196"
      x2="400"
      y2="196"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="1.5"
    />

    {/* Left building */}
    <rect x="10" y="85" width="88" height="111" rx="5" fill="white" fillOpacity="0.08" />
    <rect x="10" y="74" width="88" height="14" rx="4" fill="white" fillOpacity="0.13" />
    <rect x="24" y="96" width="18" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="52" y="96" width="18" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="68" y="96" width="18" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="24" y="118" width="18" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="52" y="118" width="18" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="68" y="118" width="18" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="24" y="140" width="18" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="52" y="140" width="18" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="68" y="140" width="18" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="24" y="162" width="18" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="52" y="162" width="18" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="68" y="162" width="18" height="13" rx="2" fill="white" fillOpacity="0.2" />

    {/* Center tall building */}
    <rect x="140" y="14" width="120" height="182" rx="7" fill="white" fillOpacity="0.13" />
    <rect x="140" y="4" width="120" height="13" rx="4" fill="white" fillOpacity="0.18" />
    <rect x="157" y="28" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="189" y="28" width="22" height="16" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="221" y="28" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="157" y="54" width="22" height="16" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="189" y="54" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="221" y="54" width="22" height="16" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="157" y="80" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="189" y="80" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="221" y="80" width="22" height="16" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="157" y="106" width="22" height="16" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="189" y="106" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="221" y="106" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="157" y="132" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="189" y="132" width="22" height="16" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="221" y="132" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="157" y="158" width="22" height="16" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="189" y="158" width="22" height="16" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="221" y="158" width="22" height="16" rx="2" fill="white" fillOpacity="0.25" />
    {/* Door */}
    <rect x="185" y="178" width="30" height="18" rx="3" fill="white" fillOpacity="0.22" />

    {/* Right building */}
    <rect x="290" y="54" width="100" height="142" rx="5" fill="white" fillOpacity="0.08" />
    <rect x="290" y="43" width="100" height="14" rx="4" fill="white" fillOpacity="0.13" />
    <rect x="305" y="66" width="19" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="334" y="66" width="19" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="355" y="66" width="19" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="305" y="90" width="19" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="334" y="90" width="19" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="355" y="90" width="19" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="305" y="114" width="19" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="334" y="114" width="19" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="355" y="114" width="19" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="305" y="138" width="19" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="334" y="138" width="19" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="355" y="138" width="19" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="305" y="162" width="19" height="13" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="334" y="162" width="19" height="13" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="355" y="162" width="19" height="13" rx="2" fill="white" fillOpacity="0.2" />

    {/* Stars */}
    <circle cx="75" cy="22" r="1.5" fill="white" fillOpacity="0.4" />
    <circle cx="310" cy="14" r="2" fill="white" fillOpacity="0.3" />
    <circle cx="120" cy="40" r="1" fill="white" fillOpacity="0.5" />
    <circle cx="395" cy="30" r="1.5" fill="white" fillOpacity="0.25" />
    <circle cx="8" cy="48" r="1" fill="white" fillOpacity="0.4" />
  </svg>
);

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[rgb(var(--color-background))]">
      {/* ── Mobile background blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden lg:hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-light rounded-full blur-[80px] opacity-40 animate-blob" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-gradient-secondary-purple rounded-full blur-[80px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-12 right-[10%] w-52 h-52 bg-primary-hover rounded-full blur-[80px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      {/* ── DESKTOP: two-column layout ── */}
      <div className="hidden lg:flex lg:h-screen lg:overflow-hidden">
        {/* LEFT HERO PANEL */}
        <div className="relative flex flex-col w-[56%] overflow-hidden bg-gradient-primary">
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Ambient blobs */}
          <div className="absolute -top-28 -left-28 w-80 h-80 bg-white/5 rounded-full blur-[90px] animate-blob" />
          <div className="absolute top-1/2 -right-20 w-72 h-72 bg-white/5 rounded-full blur-[90px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-[90px] animate-blob animation-delay-4000" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full px-12 xl:px-16 py-10 justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <UrbanCareIcon className="w-11 h-11 bg-white/20 shadow-none" />
              <span className="text-[22px] font-bold text-white tracking-tight">
                UrbanCare
              </span>
            </div>

            {/* Headline + features */}
            <div className="flex-1 flex flex-col justify-center py-10">
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
                კეთილი იყოს შენი დაბრუნება
              </p>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                მოგვიახლოვდი
              </h1>
              <p className="text-white/65 text-[16px] leading-relaxed mb-10 max-w-[380px]">
                გახდი შენი სახლის საზოგადოების ნაწილი — ყველაფერი ერთ ადგილას.
              </p>

              <div className="flex flex-col gap-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                      {f.icon}
                    </div>
                    <span className="text-white/80 text-[15px] font-medium">
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

      {/* ── MOBILE: single-column layout ── */}
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
