'use client';

import { useEffect, useState } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
  isTouchDevice: boolean;
}

const BREAKPOINTS = {
  // Mobile: 0 - 767px (phones in portrait/landscape)
  mobile: 768,
  // Tablet: 768px - 1023px (tablets, iPad portrait is 768px, landscape ~1024px)
  tablet: 1024,
  // Desktop: 1024px+ (laptops, desktops, large tablets in landscape)
} as const;

function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.mobile) return 'mobile';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
}

function checkTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - msMaxTouchPoints exists on older IE/Edge
    navigator.msMaxTouchPoints > 0
  );
}

function createDeviceInfo(width: number, height: number): DeviceInfo {
  const type = getDeviceType(width);

  return {
    type,
    isMobile: type === 'mobile',
    isTablet: type === 'tablet',
    isDesktop: type === 'desktop',
    width,
    height,
    isPortrait: height > width,
    isLandscape: width >= height,
    isTouchDevice: checkTouchDevice(),
  };
}

const DEFAULT_DEVICE_INFO: DeviceInfo = {
  type: 'desktop',
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  width: 0,
  height: 0,
  isPortrait: false,
  isLandscape: true,
  isTouchDevice: false,
};

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_DEVICE_INFO;
    }
    return createDeviceInfo(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    let rafId: number;

    function handleResize() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setDeviceInfo(createDeviceInfo(window.innerWidth, window.innerHeight));
      });
    }

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
}
