import React from "react";
import {Button} from "@/components/ui/button";
import {ThumbsDown, ThumbsUp} from "lucide-react";
import {cn} from "@/lib/utils";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {useReactionVote} from "@/hooks/query/thread/use-reaction-vote";
import {useAuth} from "@/components/provider/AuthProvider";

export const ThreadUpvoteButton = ({className}: { className?: string }) => {
    const {thread} = useThread();
    const {user} = useAuth();
    const {mutate, isPending} = useReactionVote();

    const reactions = thread.reactions;
    const likeOption = reactions?.items?.[0];
    const dislikeOption = reactions?.items?.[1];

    const userId = user?.id;
    const apartmentId = user?.selectedApartment?.id;

    const isLiked = likeOption?.voters?.some(voter => voter.id === userId) ?? false;
    const isDisliked = dislikeOption?.voters?.some(voter => voter.id === userId) ?? false;

    const likeCount = likeOption?.voteCount ?? 0;
    const dislikeCount = dislikeOption?.voteCount ?? 0;

    const handleLike = () => {
        if (!reactions || !likeOption || !apartmentId || isPending) return;
        mutate({
            apartmentId,
            reactionId: reactions.id,
            optionId: likeOption.id,
            threadId: thread.id
        });
    };

    const handleDislike = () => {
        if (!reactions || !dislikeOption || !apartmentId || isPending) return;
        mutate({
            apartmentId,
            reactionId: reactions.id,
            optionId: dislikeOption.id,
            threadId: thread.id
        });
    };

    if (!reactions || !likeOption || !dislikeOption) return null;

    return (
        <div className={cn("flex items-center", className)}>
            <Button
                onClick={handleLike}
                disabled={isPending}
                className={cn(
                    "h-9 px-3 rounded-s-full rounded-e-none transition-all [&_svg]:size-5 text-primary bg-primary/10 disabled:bg-primary/10 text-sm",
                    {"bg-primary disabled:bg-primary text-white": isLiked}
                )}
            >
                <ThumbsUp
                    className={cn("w-5 h-5 stroke-primary", {"stroke-white": isLiked})}/>
                {likeCount}
            </Button>
            <Button
                onClick={handleDislike}
                disabled={isPending}
                className={cn(
                    "h-9 px-3 rounded-s-none text-error rounded-e-full transition-all [&_svg]:size-5 bg-error/10 text-sm disabled:bg-error/10 ",
                    {"bg-error text-white disabled:bg-error": isDisliked}
                )}
            >
                {dislikeCount}
                <ThumbsDown className={cn("stroke-error", {"stroke-white": isDisliked})}/>
            </Button>
        </div>
    );
};