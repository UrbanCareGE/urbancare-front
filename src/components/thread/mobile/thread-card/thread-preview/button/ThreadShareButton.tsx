import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import React from 'react';
import { ThreadInfoDTO } from '@/model/thread.dto';
import { useThread } from '@/components/thread/mobile/thread-card/ThreadCard';

interface ThreadShareButtonProps {
  className?: string;
}

export const ThreadShareButton = ({ className }: ThreadShareButtonProps) => {
  const { thread } = useThread();

  return (
    <Button className="rounded-full h-9 px-3 transition-all [&_svg]:size-5 text-secondary hover:bg-transparent bg-secondary/10">
      <Share2 className="text-secondary" />
      გაზიარება
    </Button>
  );
};
