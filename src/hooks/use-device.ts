'use client';

import { useEffect, useState } from 'react';

export type DeviceType =
  | 'mobile'
  | 'tablet'
  | 'laptop'
  | 'desktop'
  | 'largeDesktop';

export interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  width: number;
  height: number;
}

// Matches Tailwind config
const BREAKPOINTS = {
  sm: 640, // large phones
  md: 768, // tablets
  lg: 1024, // laptops
  xl: 1280, // desktops
  '2xl': 1536, // large desktops
} as const;

function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.sm) return 'mobile';
  if (width < BREAKPOINTS.md) return 'tablet';
  if (width < BREAKPOINTS.lg) return 'laptop';
  if (width < BREAKPOINTS.xl) return 'desktop';
  return 'largeDesktop';
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        type: 'desktop',
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: true,
        isLargeDesktop: false,
        width: 0,
        height: 0,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const type = getDeviceType(width);

    return {
      type,
      isMobile: type === 'mobile',
      isTablet: type === 'tablet',
      isLaptop: type === 'laptop',
      isDesktop: type === 'desktop',
      isLargeDesktop: type === 'largeDesktop',
      width,
      height,
    };
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const type = getDeviceType(width);

        setDeviceInfo({
          type,
          isMobile: type === 'mobile',
          isTablet: type === 'tablet',
          isLaptop: type === 'laptop',
          isDesktop: type === 'desktop',
          isLargeDesktop: type === 'largeDesktop',
          width,
          height,
        });
      }, 100);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceInfo;
}
