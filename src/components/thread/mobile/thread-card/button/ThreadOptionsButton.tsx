import {Button} from "@/components/ui/button";
import {EllipsisVertical} from "lucide-react";
import React from "react";
import {ThreadInfoDTO} from "@/model/thread.dto";

interface ThreadOptionsButtonProps {
    thread: ThreadInfoDTO;
    className?: string
}

export const ThreadOptionsButton = ({thread, className}: ThreadOptionsButtonProps) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-slate-600 hover:text-slate-900"
        >
            <EllipsisVertical className="w-4 h-4"/>
        </Button>
    );
};
