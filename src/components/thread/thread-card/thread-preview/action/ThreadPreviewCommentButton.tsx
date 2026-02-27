import { Button } from '@/components/ui/button';
import { MessageCircleMore } from 'lucide-react';
import React from 'react';
import { useThread } from '@/components/thread/thread-card/ThreadCard';

interface ThreadShareButtonProps {
  className?: string;
}

export const ThreadPreviewCommentButton = ({
  className,
}: ThreadShareButtonProps) => {
  const { thread } = useThread();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-icon lg:hover:text-foreground-primary lg:hover:bg-surface-variant lg:active:scale-95"
    >
      <MessageCircleMore className="w-4 h-4" />
    </Button>
  );
};
