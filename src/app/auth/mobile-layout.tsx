'use client';

import React from 'react';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';

/* Small skyline strip — anchored to the bottom, narrower than desktop */
function MobileSkyline() {
  return (
    <svg
      viewBox="0 0 480 120"
      preserveAspectRatio="xMidYEnd slice"
      className="w-full h-[120px]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mSkyShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(var(--color-primary-dark))" stopOpacity="0" />
          <stop offset="1" stopColor="rgb(var(--color-shadow))" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Far silhouettes */}
      <g opacity="0.55">
        {[
          [0, 70, 40, 60], [40, 55, 30, 75], [70, 80, 50, 50],
          [120, 50, 32, 80], [152, 65, 44, 65], [196, 45, 30, 85],
          [226, 70, 40, 60], [266, 55, 30, 75], [296, 80, 48, 50],
          [344, 50, 32, 80], [376, 65, 44, 65], [420, 60, 36, 70],
          [456, 80, 24, 50],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="rgb(var(--color-primary-dark))" />
        ))}
      </g>

      {/* Mid layer — buildings with windows */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 20 + i * 50;
        const w = 38 + (i % 3) * 4;
        const h = 60 + ((i * 7) % 35);
        const y = 120 - h;
        const cols = Math.floor((w - 8) / 8);
        const rows = Math.floor((h - 12) / 9);
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill="rgb(var(--color-primary-dark))" opacity="0.85" />
            {Array.from({ length: cols }).map((_, c) =>
              Array.from({ length: rows }).map((_, r) => {
                const lit = (c * 7 + r * 3 + i) % 5 < 2;
                return (
                  <rect
                    key={`${c}-${r}`}
                    x={x + 5 + c * 8}
                    y={y + 6 + r * 9}
                    width="4"
                    height="5"
                    rx="0.5"
                    fill={lit ? 'rgb(var(--color-warning))' : 'rgb(var(--color-primary-dark))'}
                    opacity={lit ? 0.85 : 0.6}
                  />
                );
              })
            )}
          </g>
        );
      })}

      {/* One tall accent tower */}
      <rect x="220" y="20" width="22" height="100" fill="rgb(var(--color-primary-dark))" opacity="0.75" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x="224"
          y={26 + i * 12}
          width="14"
          height="2"
          fill="rgb(var(--color-warning))"
          opacity={i % 2 === 0 ? 0.75 : 0.4}
        />
      ))}

      {/* Bottom shade */}
      <rect x="0" y="0" width="480" height="120" fill="url(#mSkyShade)" />
    </svg>
  );
}

/* Tiny floating-windows pattern — 5×5 deterministic grid */
function MobileFloatingWindows({
  size = 110,
  opacity = 0.18,
  className,
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) {
  const pattern = [
    [1, 0, 1, 0, 1],
    [0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0],
    [0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0],
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 110 110"
      style={{ opacity }}
      aria-hidden="true"
      className={className}
    >
      {pattern.map((row, r) =>
        row.map((lit, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * 22 + 2}
            y={r * 22 + 2}
            width="18"
            height="18"
            rx="2.5"
            fill="#fff"
            opacity={lit ? 0.85 : 0.16}
          />
        ))
      )}
    </svg>
  );
}

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

      {/* One subtle floating-windows decoration */}
      <div className="absolute pointer-events-none" style={{ top: 90, right: -10 }}>
        <MobileFloatingWindows size={120} opacity={0.18} />
      </div>

      {/* Skyline at the bottom */}
      <div className="absolute inset-x-0 bottom-0 opacity-75 pointer-events-none">
        <MobileSkyline />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-[120px] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,24,68,0) 0%, rgba(11,24,68,0.55) 100%)',
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
