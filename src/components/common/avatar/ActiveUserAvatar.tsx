import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";

export const ActiveUserAvatar = () => {
    return (
        <div className="relative inline-block outline-none">
            <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white bg-green-400"/>
        </div>
    );
};
