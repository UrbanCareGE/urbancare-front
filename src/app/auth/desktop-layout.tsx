'use client';

import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';

/* ──────────────────────────────────────────────────────────────────
 * Skyline panorama — full-width city silhouette anchored to the bottom
 * Project token replacements:
 *   #0E2756 / #0A1F47 / #091B40 / #071737  →  rgb(var(--color-primary-dark))
 *   #FFD27A (window glow)                  →  rgb(var(--color-warning))
 * ──────────────────────────────────────────────────────────────────*/
function HeroSkylineWide() {
  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYEnd slice"
      className="w-full h-[220px]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(var(--color-primary-dark))" stopOpacity="0" />
          <stop offset="1" stopColor="rgb(var(--color-shadow))" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* far layer — silhouettes */}
      <g opacity="0.55">
        {[
          [0, 120, 60, 100], [60, 100, 40, 120], [100, 130, 80, 90],
          [180, 80, 50, 140], [230, 110, 70, 110], [300, 90, 48, 130],
          [348, 120, 62, 100], [410, 70, 44, 150], [454, 105, 76, 115],
          [530, 125, 60, 95], [590, 95, 42, 125], [632, 115, 66, 105],
          [698, 85, 50, 135], [748, 120, 72, 100], [820, 100, 40, 120],
          [860, 130, 60, 90], [920, 110, 70, 110], [990, 90, 50, 130],
          [1040, 120, 60, 100], [1100, 100, 44, 120], [1144, 130, 80, 90],
          [1224, 80, 50, 140], [1274, 110, 70, 110], [1344, 95, 50, 125],
          [1394, 120, 50, 100],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="rgb(var(--color-primary-dark))" />
        ))}
      </g>

      {/* mid layer — buildings with windows */}
      {Array.from({ length: 17 }).map((_, i) => {
        const x = 30 + i * 80;
        const w = 60 + (i % 3) * 6;
        const h = 110 + ((i * 7) % 60);
        const y = 220 - h;
        const cols = Math.floor((w - 12) / 10);
        const rows = Math.floor((h - 16) / 12);
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill="rgb(var(--color-primary-dark))" opacity="0.85" />
            {Array.from({ length: cols }).map((_, c) =>
              Array.from({ length: rows }).map((_, r) => {
                const lit = (c * 7 + r * 3 + i) % 5 < 2;
                return (
                  <rect
                    key={`${c}-${r}`}
                    x={x + 6 + c * 10}
                    y={y + 8 + r * 12}
                    width="6"
                    height="7"
                    rx="0.5"
                    fill={lit ? 'rgb(var(--color-warning))' : 'rgb(var(--color-primary-dark))'}
                    opacity={lit ? 0.85 : 0.6}
                  />
                );
              })
            )}
            <rect x={x + w / 2 - 1.5} y={y - 8} width="3" height="8" fill="rgb(var(--color-primary-dark))" opacity="0.85" />
          </g>
        );
      })}

      {/* tall accent towers */}
      <g>
        <rect x="240" y="40" width="32" height="180" fill="rgb(var(--color-primary-dark))" opacity="0.75" />
        {[48, 58, 68, 78, 100].map((ty, i) => (
          <rect
            key={ty}
            x="246"
            y={ty}
            width="20"
            height="2"
            fill="rgb(var(--color-warning))"
            opacity={i % 2 === 0 ? 0.7 : 0.45}
          />
        ))}

        <rect x="980" y="20" width="36" height="200" fill="rgb(var(--color-primary-dark))" opacity="0.75" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="986"
            y={28 + i * 14}
            width="24"
            height="3"
            fill="rgb(var(--color-warning))"
            opacity={(i * 5) % 3 === 0 ? 0.8 : 0.35}
          />
        ))}
      </g>

      {/* shade bottom */}
      <rect x="0" y="0" width="1440" height="220" fill="url(#skyShade)" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Floating "windows" decoration — deterministic pixel grid
 * ──────────────────────────────────────────────────────────────────*/
function FloatingWindows({
  size,
  opacity = 0.35,
  className,
}: {
  size: number;
  opacity?: number;
  className?: string;
}) {
  const pattern = [
    [1, 0, 1, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 0, 1],
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      style={{ opacity }}
      aria-hidden="true"
      className={className}
    >
      {pattern.map((row, r) =>
        row.map((lit, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * 30 + 4}
            y={r * 30 + 4}
            width="22"
            height="22"
            rx="3"
            fill="#fff"
            opacity={lit ? 0.85 : 0.16}
          />
        ))
      )}
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Auth desktop layout — A3 fullbleed blue
 * ──────────────────────────────────────────────────────────────────*/
export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslation();

  const stats = useMemo(
    () => [
      { value: '12,400', label: t.authPages.activeMembers },
      { value: '38', label: t.authPages.cities },
      { value: '94%', label: t.authPages.satisfactionRate },
    ],
    [
      t.authPages.activeMembers,
      t.authPages.cities,
      t.authPages.satisfactionRate,
    ]
  );

  // 5 Georgian initials for the avatar trust row
  const trustAvatars = ['ნ', 'გ', 'მ', 'ი', 'თ'];

  return (
    <div
      className="relative min-h-dvh overflow-hidden text-white"
      style={{
        background: `linear-gradient(150deg,
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
          top: -200,
          left: -120,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(92,155,255,0.55) 0%, rgba(45,123,255,0) 60%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -260,
          right: -160,
          width: 760,
          height: 760,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(30,95,224,0.7) 0%, rgba(11,24,68,0) 65%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Floating windows decorations */}
      <div className="absolute pointer-events-none" style={{ top: 110, right: 540 }}>
        <FloatingWindows size={180} opacity={0.32} />
      </div>
      <div className="absolute pointer-events-none" style={{ top: 380, left: 70 }}>
        <FloatingWindows size={130} opacity={0.18} />
      </div>

      {/* Skyline at bottom */}
      <div className="absolute inset-x-0 bottom-0 opacity-85 pointer-events-none">
        <HeroSkylineWide />
      </div>
      {/* Skyline fade overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-[220px] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,24,68,0) 0%, rgba(11,24,68,0.55) 100%)',
        }}
      />

      {/* DESKTOP CONTENT (≥ lg) */}
      <div className="relative z-10 hidden lg:flex lg:flex-col min-h-dvh">
        {/* TOP BAR */}
        <header className="flex items-center justify-between px-14 py-7">
          <div className="flex items-center gap-3">
            <UrbanCareIcon className="w-9 h-9 bg-white/15 shadow-none" />
            <span className="urbancare-text-xl font-bold text-white tracking-tight">
              UrbanCare
            </span>
          </div>

          <nav className="flex items-center gap-7 text-white/[0.78] urbancare-text-sm">
            <span className="cursor-pointer transition-colors lg:hover:text-white">
              {t.authPages.howItWorks}
            </span>
            <span className="cursor-pointer transition-colors lg:hover:text-white">
              {t.authPages.districts}
            </span>
            <span className="cursor-pointer transition-colors lg:hover:text-white">
              {t.authPages.contactUs}
            </span>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.14] urbancare-text-xs font-medium text-white transition-colors lg:hover:bg-white/[0.14]"
            >
              <span>🇬🇪</span>
              <span>KA</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </nav>
        </header>

        {/* MAIN GRID */}
        <div
          className="relative grid flex-1"
          style={{
            gridTemplateColumns: '1fr 540px',
            gap: 56,
            padding: '40px 56px 0 88px',
          }}
        >
          {/* LEFT — hero copy */}
          <div className="pt-[70px]">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/[0.18] urbancare-text-xs font-bold uppercase tracking-[0.1em] text-white mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7AF1B0]" />
              {t.authPages.yourDistrictAwaits}
            </div>

            {/* Massive headline */}
            <h1
              className="font-bold text-white tracking-tight"
              style={{
                fontFamily: "'Fraunces', 'FiraGO', serif",
                fontSize: 92,
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
              }}
            >
              {t.authPages.greetingHeadlineFirst}
              <br />
              {t.authPages.greetingHeadlineSecond}
              <span style={{ color: '#A9C9FF' }}>
                {t.authPages.greetingHeadlineAccent}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-white/[0.82] mt-[30px] max-w-[460px]"
              style={{ fontSize: 17, lineHeight: 1.55 }}
            >
              {t.authPages.verificationSubtitle}
            </p>

            {/* Stat strip */}
            <div className="mt-14 flex gap-14 items-start">
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="text-white"
                    style={{
                      fontFamily: "'Fraunces', 'FiraGO', serif",
                      fontSize: 38,
                      fontWeight: 600,
                      letterSpacing: '-0.025em',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="mt-2 text-white/[0.62] uppercase font-semibold"
                    style={{ fontSize: 11.5, letterSpacing: '0.12em' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Avatar trust row */}
            <div className="mt-11 flex items-center gap-3.5">
              <div className="flex">
                {['#A9C9FF', '#5C9BFF', '#2D7BFF', '#FFD27A', '#7AF1B0'].map(
                  (c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center font-bold"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: c,
                        border: '2.5px solid #1A4ABF',
                        marginLeft: i === 0 ? 0 : -10,
                        fontSize: 12,
                        color: '#0A1F47',
                      }}
                    >
                      {trustAvatars[i]}
                    </div>
                  )
                )}
              </div>
              <div
                className="text-white/[0.78]"
                style={{ fontSize: 13, lineHeight: 1.4 }}
              >
                <span className="text-white font-semibold">312</span>{' '}
                {t.authPages.neighborsJoinedThisWeek}
              </div>
            </div>
          </div>

          {/* RIGHT — auth card slot (children rendered untouched) */}
          <div className="pt-8 flex flex-col">
            {children}
          </div>
        </div>

        {/* Bottom-left keyboard shortcuts hint */}
        <div
          className="absolute bottom-7 left-14 z-10 flex items-center gap-2.5 text-white/[0.55]"
          style={{ fontSize: 11.5 }}
        >
          <span className="font-mono">ESC</span>
          <span>{t.authPages.escExit}</span>
          <span
            className="bg-white/30"
            style={{ width: 3, height: 3, borderRadius: '50%' }}
          />
          <span className="font-mono">↵</span>
          <span>{t.authPages.enterContinue}</span>
        </div>

        {/* Bottom-right copyright */}
        <div
          className="absolute bottom-7 right-14 z-10 text-white/40 font-medium"
          style={{ fontSize: 11, letterSpacing: '0.08em' }}
        >
          UrbanCare © {new Date().getFullYear()} · Tbilisi
        </div>
      </div>
    </div>
  );
}
