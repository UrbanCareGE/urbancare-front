import {ThreadInfoDTO} from "@/model/thread.dto";
import ThreadCard from "@/components/thread/mobile/thread-card/ThreadCard";
import {ThreadCardHeader} from "@/components/thread/mobile/thread-card/ThreadCardHeader";
import {ThreadCardContent} from "@/components/thread/mobile/thread-card/ThreadCardContent";
import {ThreadVoteButtonGroup} from "@/components/thread/mobile/thread-card/button/ThreadVoteComponenet";
import {ThreadCommentButton} from "@/components/thread/mobile/thread-card/button/ThreadCommentButton";
import {ThreadShareButton} from "@/components/thread/mobile/thread-card/button/ThreadShareButton";

interface ThreadCardPreviewProps {
    thread: ThreadInfoDTO;
}

export const ThreadCardPreview = ({thread}: ThreadCardPreviewProps) => {
    return (
        <ThreadCard thread={thread}>
            <ThreadCard.Header>
                <ThreadCardHeader/>
            </ThreadCard.Header>
            <ThreadCard.Body>
                <ThreadCardContent/>
            </ThreadCard.Body>
            <ThreadCard.Footer>
                <ThreadVoteButtonGroup className={"mr-auto"}/>
                <ThreadCommentButton/>
                <ThreadShareButton/>
            </ThreadCard.Footer>
        </ThreadCard>
    );
};
