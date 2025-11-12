import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";
import React from "react";
import {ThreadInfoDTO} from "@/model/thread.dto";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";

interface ThreadShareButtonProps {
    className?: string
}

export const ThreadShareButton = ({className}: ThreadShareButtonProps) => {
    const {thread} = useThread();

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full transition-all [&_svg]:size-6 text-slate-600"
        >
            <Share2 className="w-4 h-4"/>
        </Button>
    );
};
