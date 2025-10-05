import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";

type UserAvatarInfoProps = {
    firstName: string;
    lastName: string;
    username: string;
};

export const UserAvatarInfo = ({firstName, lastName, username}: UserAvatarInfoProps) => {
    return (
        <div className="flex items-center gap-3">
            <Avatar className="cursor-pointer shadow-md">
                <AvatarImage src="https://github.com/shadcn.png" alt={username}/>
                <AvatarFallback>
                    {firstName[0]}
                    {lastName[0]}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-primary">
                  {firstName} {lastName}
                </span>
                <span className="text-xs text-primary font-semibold">@{username}</span>
            </div>
        </div>
    );
};