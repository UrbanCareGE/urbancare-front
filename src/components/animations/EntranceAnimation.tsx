'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface EntranceAnimationProps {
  children: ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  scale?: number;
  delay?: number;
}

const EntranceAnimation: React.FC<EntranceAnimationProps> = ({
  children,
  distance = 80,
  direction = 'vertical',
  reverse = false,
  duration = 1,
  ease = 'power4.out',
  initialOpacity = 0,
  scale = 0.95,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;

    gsap.fromTo(
      el,
      {
        [axis]: offset,
        scale,
        opacity: initialOpacity,
      },
      {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
      }
    );

    return () => {
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    scale,
    delay,
  ]);

  return <div ref={ref}>{children}</div>;
};

export default EntranceAnimation;
