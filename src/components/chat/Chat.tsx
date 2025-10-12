import {Chatbox, Session} from '@talkjs/react';
import {Skeleton} from "@/components/ui/skeleton";

function Chat() {
    return (
        <Session appId="tblkKdHv" userId={"sample_user_alice"}>
            <Chatbox
                conversationId={"sample_conversation"}
                style={{width:'100%', height:'100%'}}
                loadingComponent={
                    <Skeleton className="h-full w-full rounded-md flex-1"/>
                }
            ></Chatbox>
        </Session>
    );
}

export default Chat;