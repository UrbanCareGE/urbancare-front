'use client';

import React from 'react';
import { RegisterHeader } from '@/components/auth/register/RegisterHeader';
import { RegisterFormCard } from '@/components/auth/register/RegisterFormCard';
import DynamicPanel from '@/components/home/dynamic-panel/DynamicPanel';
import { RegisterFooter } from '@/components/auth/register/RegisterFooter';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';
import { Shield, Smartphone, Users } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-5 h-5" />,
    label: 'შეუერთდი შენი სახლის გუნდს',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    label: 'უსაფრთხო და დაცული',
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    label: 'სწრაფი რეგისტრაცია SMS-ით',
  },
];

const CommunityIllustration = () => (
  <svg
    viewBox="0 0 400 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-sm mx-auto"
    aria-hidden="true"
  >
    {/* Ground */}
    <line
      x1="0"
      y1="176"
      x2="400"
      y2="176"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="1.5"
    />

    {/* Far-left small building */}
    <rect x="0" y="100" width="60" height="76" rx="4" fill="white" fillOpacity="0.06" />
    <rect x="0" y="90" width="60" height="12" rx="3" fill="white" fillOpacity="0.1" />
    <rect x="12" y="108" width="14" height="11" rx="2" fill="white" fillOpacity="0.4" />
    <rect x="34" y="108" width="14" height="11" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="12" y="128" width="14" height="11" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="34" y="128" width="14" height="11" rx="2" fill="white" fillOpacity="0.4" />
    <rect x="12" y="148" width="14" height="11" rx="2" fill="white" fillOpacity="0.4" />
    <rect x="34" y="148" width="14" height="11" rx="2" fill="white" fillOpacity="0.2" />

    {/* Left building */}
    <rect x="76" y="72" width="90" height="104" rx="6" fill="white" fillOpacity="0.09" />
    <rect x="76" y="60" width="90" height="15" rx="4" fill="white" fillOpacity="0.13" />
    <rect x="90" y="83" width="19" height="14" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="118" y="83" width="19" height="14" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="140" y="83" width="19" height="14" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="90" y="107" width="19" height="14" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="118" y="107" width="19" height="14" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="140" y="107" width="19" height="14" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="90" y="131" width="19" height="14" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="118" y="131" width="19" height="14" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="140" y="131" width="19" height="14" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="90" y="155" width="19" height="14" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="118" y="155" width="19" height="14" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="140" y="155" width="19" height="14" rx="2" fill="white" fillOpacity="0.2" />

    {/* Center tall building */}
    <rect x="192" y="10" width="116" height="166" rx="7" fill="white" fillOpacity="0.13" />
    <rect x="192" y="0" width="116" height="13" rx="4" fill="white" fillOpacity="0.18" />
    <rect x="208" y="23" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="239" y="23" width="21" height="15" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="271" y="23" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="208" y="48" width="21" height="15" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="239" y="48" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="271" y="48" width="21" height="15" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="208" y="73" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="239" y="73" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="271" y="73" width="21" height="15" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="208" y="98" width="21" height="15" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="239" y="98" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="271" y="98" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="208" y="123" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="239" y="123" width="21" height="15" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="271" y="123" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="208" y="148" width="21" height="15" rx="2" fill="white" fillOpacity="0.25" />
    <rect x="239" y="148" width="21" height="15" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="271" y="148" width="21" height="15" rx="2" fill="white" fillOpacity="0.25" />
    {/* Door */}
    <rect x="237" y="163" width="26" height="13" rx="3" fill="white" fillOpacity="0.22" />

    {/* Right building */}
    <rect x="328" y="58" width="72" height="118" rx="5" fill="white" fillOpacity="0.08" />
    <rect x="328" y="47" width="72" height="13" rx="4" fill="white" fillOpacity="0.12" />
    <rect x="340" y="70" width="16" height="12" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="364" y="70" width="16" height="12" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="340" y="92" width="16" height="12" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="364" y="92" width="16" height="12" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="340" y="114" width="16" height="12" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="364" y="114" width="16" height="12" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="340" y="136" width="16" height="12" rx="2" fill="white" fillOpacity="0.5" />
    <rect x="364" y="136" width="16" height="12" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="340" y="158" width="16" height="12" rx="2" fill="white" fillOpacity="0.2" />
    <rect x="364" y="158" width="16" height="12" rx="2" fill="white" fillOpacity="0.5" />

    {/* Decorative stars */}
    <circle cx="68" cy="18" r="1.5" fill="white" fillOpacity="0.4" />
    <circle cx="172" cy="10" r="1" fill="white" fillOpacity="0.5" />
    <circle cx="388" cy="28" r="2" fill="white" fillOpacity="0.25" />
    <circle cx="8" cy="38" r="1.5" fill="white" fillOpacity="0.35" />
  </svg>
);

export default function RegisterPage() {
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
        <div className="relative flex flex-col w-[56%] overflow-hidden bg-gradient-to-br from-[rgb(var(--color-secondary))] via-[#5b21b6] to-[rgb(var(--color-primary))]">
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
                ახალი ანგარიში
              </p>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                შეუერთდი ჩვენ
              </h1>
              <p className="text-white/65 text-[16px] leading-relaxed mb-10 max-w-[380px]">
                UrbanCare-ის საზოგადოებას უკვე ათასობით საცხოვრებელი ერთიანდება.
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

            {/* Building / community illustration */}
            <div className="pb-2 opacity-80">
              <CommunityIllustration />
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto bg-[rgb(var(--color-background))] px-10 py-10">
          <div className="w-full max-w-[440px]">
            <RegisterFormCard />
          </div>
        </div>
      </div>

      {/* ── MOBILE: single-column layout ── */}
      <DynamicPanel className="lg:hidden relative z-10 min-h-screen px-6 py-6 max-w-md mx-auto">
        <DynamicPanel.Header>
          <RegisterHeader />
        </DynamicPanel.Header>
        <DynamicPanel.Body>
          <RegisterFormCard />
        </DynamicPanel.Body>
        <DynamicPanel.Footer>
          <RegisterFooter />
        </DynamicPanel.Footer>
      </DynamicPanel>
    </div>
  );
}
