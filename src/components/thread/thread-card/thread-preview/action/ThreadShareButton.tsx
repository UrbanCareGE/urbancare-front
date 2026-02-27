'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

type ShareButtonProps = {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
};

export function ThreadShareButton({
  title = 'Check this out',
  text = '',
  url = typeof window !== 'undefined' ? window.location.href : '',
  className,
}: ShareButtonProps) {
  const [isSupported] = useState(
    () => typeof navigator !== 'undefined' && !!navigator.share
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('გაზიარება ვერ მოხერხდა');
        }
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      toast.success('ლინკი დაკოპირდა');
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="rounded-full h-9 px-3 transition-all [&_svg]:size-5 text-secondary bg-secondary/10 lg:hover:bg-secondary/20 lg:active:scale-95"
    >
      <Share2 className="text-secondary" />
      გაზიარება
    </Button>
  );
}
