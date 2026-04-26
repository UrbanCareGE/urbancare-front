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
    return <Skeleton className="w-full urbancare-rounded-md flex-1 min-h-0" />;
  }

  if (!data) {
    return <div>No chat available</div>;
  }

  const chatTheme = theme === 'dark' ? 'default_dark' : 'default';

  return (
    // overflow-hidden + negative top clips the TalkJS free-tier "Test Mode" banner area
    <div className="relative flex-1 min-h-0 h-full overflow-hidden urbancare-rounded-xl">
      <Chatbox
        conversationId={data[0].id}
        className="absolute left-0 right-0"
        style={{
          width: '100%',
          top: '-60px',
          height: 'calc(100% + 60px)',
        }}
        theme={chatTheme}
        showChatHeader={false}
        loadingComponent={
          <Skeleton className="h-full w-full urbancare-rounded-md flex-1 scrollbar-hide overflow-y-scroll" />
        }
      />
    </div>
  );
};
