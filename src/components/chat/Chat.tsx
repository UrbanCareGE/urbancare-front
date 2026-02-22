// components/chat/Chat.tsx (Simplified)
'use client';

import { Chatbox } from '@talkjs/react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/components/provider/AuthProvider';
import { useState } from 'react';
import { useFetchChat } from '@/hooks/query/chat/use-fetch-chat';
import { useTheme } from 'next-themes';

export const Chat = () => {
  const { data, isLoading: isFetchingChat } = useFetchChat();
  const { theme } = useTheme();

  if (isFetchingChat) {
    return <Skeleton className="h-full w-full rounded-md flex-1" />;
  }

  if (!data) {
    return <div>No chat available</div>;
  }

  const chatTheme = theme === 'dark' ? 'default_dark' : 'default';

  // Session is now in ChatProvider, so just render Chatbox
  return (
    <Chatbox
      conversationId={data[0].id}
      style={{ width: '100%', height: '100%' }}
      theme={chatTheme}
      loadingComponent={
        <Skeleton className="h-full w-full rounded-md flex-1" />
      }
    />
  );
};
