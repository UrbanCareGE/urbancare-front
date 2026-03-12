// components/chat/Chat.tsx (Simplified)
'use client';

import { Chatbox } from '@talkjs/react';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchChat } from '@/hooks/query/chat/use-fetch-chat';
import { useTheme } from 'next-themes';

export const Chat = () => {
  const { data, isLoading: isFetchingChat } = useFetchChat();
  const { theme } = useTheme();

  if (isFetchingChat) {
    return <Skeleton className="w-full rounded-urbancare-md flex-1 min-h-0" />;
  }

  if (!data) {
    return <div>No chat available</div>;
  }

  const chatTheme = theme === 'dark' ? 'default_dark' : 'default';

  return (
    <Chatbox
      conversationId={data[0].id}
      className="flex-1 min-h-0 h-full"
      style={{ width: '100%', flex: 1 }}
      theme={chatTheme}
      loadingComponent={
        <Skeleton className="h-full w-full rounded-urbancare-md flex-1 scrollbar-hide overflow-y-scroll" />
      }
    />
  );
};
