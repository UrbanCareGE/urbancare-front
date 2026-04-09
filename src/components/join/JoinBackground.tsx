'use client';

import { useDevice } from '@/hooks/use-device';
import { CityscapeSVG } from '@/components/common/icon/CityScape';
import { MobileCityscapeSVG } from '@/components/common/icon/MobileCityScape';

export function JoinBackground() {
  const { isDesktop } = useDevice();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[rgb(var(--color-primary))]">
      {/* Lighter gradient overlay for warmth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(var(--color-primary-dark), 0.4) 0%, transparent 60%),
            linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(var(--color-primary-dark), 0.3) 100%)
          `,
        }}
      />

      {/* Geometric accent shapes */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-white/[0.03] rounded-bl-[140px] sm:rounded-bl-[180px]" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-[rgb(var(--color-primary-dark))]/30 rounded-tr-[100px] sm:rounded-tr-[140px]" />

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

      {/* Cityscape anchored to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {isDesktop ? (
          <CityscapeSVG className="w-full" />
        ) : (
          <MobileCityscapeSVG className="w-full" />
        )}
      </div>

      {/* Bottom fade into slightly darker */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[rgb(var(--color-primary-dark))]/20 to-transparent z-20" />
    </div>
  );
}