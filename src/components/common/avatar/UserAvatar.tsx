import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getClientFileUrl} from "@/lib/api-client";
import React from "react";

type UserAvatarProps = {
    profileImageId?: string;
    firstName: string;
    surname: string;
}

export const UserAvatar = ({firstName, surname, profileImageId}: UserAvatarProps) => {
    const initials = `${firstName[0]}${surname[0]}`.toUpperCase();

    return (
        <div className="relative inline-block outline-none">
            <Avatar className="cursor-pointer w-10 h-10 rounded-full">
                <AvatarImage src={getClientFileUrl(profileImageId)} alt="@shadcn" className={'object-cover'}/>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
        </div>
    );
};
