'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

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
    <Button className="h-auto py-1.5 px-3 rounded-urbancare-lg font-medium text-urbancare-base bg-gradient-primary text-white">
      {String(Math.floor(seconds / 60)).padStart(2, '0')}:
      {String(seconds % 60).padStart(2, '0')}
    </Button>
  );
}
