// components/provider/ChatProvider.tsx
'use client';

import { createContext, ReactNode, useContext } from 'react';
import { Session } from '@talkjs/react';
import { useAuth } from '@/components/provider/AuthProvider';

const ChatContext = createContext(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <Session appId="tblkKdHv" userId={user?.id}>
          {children}
        </Session>
      )}
      {!user && children}
    </>
  );
}

export const useChat = () => useContext(ChatContext);
