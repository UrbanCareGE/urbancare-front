// components/provider/ChatProvider.tsx
'use client'

import {createContext, useContext, ReactNode} from 'react';
import {Session} from '@talkjs/react';
import {useAuth} from '@/components/provider/AuthProvider';

const ChatContext = createContext(null);

export function ChatProvider({children}: { children: ReactNode }) {
    const {user, isAuthenticated} = useAuth();

    return (
        <>
            {isAuthenticated && user && (
                <Session appId="tblkKdHv" userId={user.id}>
                    {children}
                </Session>
            )}
            {(!isAuthenticated || !user) && children}
        </>
    );
}

export const useChat = () => useContext(ChatContext);