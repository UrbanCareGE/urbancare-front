// components/SheetProfileHeader.tsx

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import React from "react";

type SheetProfileHeaderProps = {
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
}

export default function SheetProfileHeader({
                                               firstName,
                                               lastName,
                                               username,
                                               avatarUrl,
                                           }: SheetProfileHeaderProps) {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

    return (
        <div className="flex items-center gap-3 p-4 border-b">
            <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`}/>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
        <span className="font-semibold text-sm">
          {firstName} {lastName}
        </span>
                <span className="text-xs text-muted-foreground">
          @{username}
        </span>
            </div>
        </div>
    );
}