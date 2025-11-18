// components/chat/Chat.tsx (Simplified)
'use client'

import {Chatbox} from '@talkjs/react';
import {Skeleton} from "@/components/ui/skeleton";
import {useAuth} from "@/components/provider/AuthProvider";
import {useState} from "react";
import {useFetchChat} from "@/hooks/query/use-fetch-chat";

export const Chat = () => {
    const authInfo = useAuth();
    const {user, isLoading, isAuthenticated} = authInfo;
    const {data, isLoading: isFetchingChat} = useFetchChat(authInfo)


    if (isLoading || isFetchingChat) {
        return <Skeleton className="h-full w-full rounded-md flex-1"/>;
    }

    if (!isAuthenticated || !user) {
        return <div>Please login to access chat</div>;
    }

    if (!data) {
        return <div>No chat available</div>;
    }

    // Session is now in ChatProvider, so just render Chatbox
    return (
        <Chatbox
            conversationId={data[0].id}
            style={{width: '100%', height: '100%'}}
            loadingComponent={<Skeleton className="h-full w-full rounded-md flex-1"/>}
        />
    );
};