'use client';

import { useEffect, useState } from 'react';

interface OtpCountdownProps {
  onComplete: () => void;
}

export function OtpCountdown({ onComplete }: OtpCountdownProps) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, onComplete]);

  return (
    <span className="tabular-nums text-foreground-primary text-urbancare-sm">
      {String(Math.floor(seconds / 60)).padStart(2, '0')}:
      {String(seconds % 60).padStart(2, '0')}
    </span>
  );
}
