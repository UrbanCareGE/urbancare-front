'use client';

import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card} from "@/components/ui/card";
import {useAuth} from "@/components/provider/AuthProvider";
import {getClientFileUrl} from "@/lib/api-client";
import {cn} from "@/lib/utils";

export type StartThreadFormProps = {
    className?: string;
}

export function CreateThreadButton({className}: StartThreadFormProps) {
    const {user} = useAuth();

    return (
        <Card
            className={cn("overflow-hidden shadow-sm border-slate-200 bg-white p-3 space-y-3 transition-all duration-200 cursor-pointer hover:shadow-md hover:border-slate-300", className)}>
            <Avatar className="cursor-pointer w-12 h-12 rounded-full">
                <AvatarImage src={getClientFileUrl(user?.profileImageId)} alt="@shadcn"
                             className={'object-cover'}/>
                <AvatarFallback>{user?.name + ' ' + user?.surname[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div
                    className="rounded-xl px-4 py-3 text-slate-400 transition-colors mr-auto">
                    What&apos;s on your mind?
                </div>
            </div>
        </Card>
    );
}