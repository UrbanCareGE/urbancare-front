'use client';

import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card} from "@/components/ui/card";
import {Image, MessageSquarePlus, Smile} from "lucide-react";
import {useAuth} from "@/components/provider/AuthProvider";
import {getClientFileUrl} from "@/lib/api-client";
import {cn} from "@/lib/utils";

export type StartThreadFormProps = {
    className?: string;
}

export function StartThreadForm({className}: StartThreadFormProps) {
    const {user} = useAuth();

    if (!user) {

    }

    return (
        <Card
            className={cn("shadow-lg border-slate-200 bg-slate-50 transition-all duration-300 p-1", className)}>
            <div className="flex gap-3 items-start p-3">
                <Avatar className="cursor-pointer w-12 h-12 rounded-full">
                    <AvatarImage src={getClientFileUrl(user?.profileImageId)} alt="@shadcn"
                                 className={'object-cover'}/>
                    <AvatarFallback>{user?.name + ' ' + user?.surname[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div
                        className="bg-slate-50 rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-100 transition-colors">
                        What&apos;s on your mind?
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-100 p-3">
                <button
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image className="w-5 h-5"/>
                    <span className="hidden sm:inline">Photo</span>
                </button>
                <button
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Smile className="w-5 h-5"/>
                    <span className="hidden sm:inline">Emoji</span>
                </button>
                <button
                    className="flex items-center gap-2 text-primary transition-colors text-sm font-semibold ml-auto"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <MessageSquarePlus className="w-5 h-5"/>
                    Post
                </button>
            </div>
        </Card>
    );
}