'use client'

import {Chatbox, Session} from '@talkjs/react';
import {Skeleton} from "@/components/ui/skeleton";
import {useAuth} from "@/components/provider/AuthProvider";
import {AuthService} from "@/service/auth-service";
import {useEffect, useState} from "react";

export const Chat = () => {
    const {user, isLoading, isAuthenticated} = useAuth();
    const [chatId, setChatId] = useState<string | null>(null);
    const [isFetchingChat, setIsFetchingChat] = useState(false);

    useEffect(() => {
        const fetchChat = async () => {
            if (!user || !user.joinedApartments || user.joinedApartments.length === 0) {
                console.log("No apartments found for user");
                return;
            }

            const apartmentId = user.joinedApartments[0].id;

            if (!apartmentId) {
                console.log("No apartment ID found");
                return;
            }

            console.log("Fetching chat for apartment:", apartmentId);
            setIsFetchingChat(true);

            try {
                const chats = await AuthService.getChatInfo(apartmentId);
                console.log("Chats received:", chats);

                if (chats && chats.length > 0 && chats[0].id) {
                    setChatId(chats[0].id);
                    console.log("Chat ID set:", chats[0].id);
                } else {
                    console.log("No chats found");
                }
            } catch (error) {
                console.error("Failed to fetch chat:", error);
            } finally {
                setIsFetchingChat(false);
            }
        }

        if (user && isAuthenticated) {
            fetchChat();
        }
    }, [user, isAuthenticated])

    console.log("Current state:", { user, isLoading, isAuthenticated, chatId, isFetchingChat });

    if (isLoading || isFetchingChat) {
        return <Skeleton className="h-full w-full rounded-md flex-1"/>;
    }

    if (!isAuthenticated || !user) {
        return <div>Please login to access chat</div>;
    }

    if (!user.joinedApartments || user.joinedApartments.length === 0) {
        return <div>No apartments found. Please join an apartment first.</div>;
    }

    if (!chatId) {
        return <div>No chat available for this apartment.</div>;
    }

    return (
        <Session appId="tblkKdHv" userId={user.id}>
            <Chatbox
                conversationId={chatId}
                style={{width: '100%', height: '100%'}}
                loadingComponent={
                    <Skeleton className="h-full w-full rounded-md flex-1"/>
                }
            />
        </Session>
    );
}

export default Chat;