import {Chatbox, Session} from '@talkjs/react';
import {Skeleton} from "@/components/ui/skeleton";

function Chat() {
    return (
        <Session appId="tblkKdHv" userId={"sample_user_alice"}>
            <Chatbox
                conversationId={"sample_conversation"}

                className={"w-full h-full"}
                loadingComponent={
                    <div className="flex gap-2 bg-opacity-0 w-full h-full">
                        <Skeleton className="h-full w-[30%] rounded-md"/>
                        <Skeleton className="h-full w-[70%] rounded-md"/>
                    </div>
                }
            ></Chatbox>
        </Session>
    );
}

export default Chat;