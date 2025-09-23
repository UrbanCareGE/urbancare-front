import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronDown} from "lucide-react";


type ProfileExpandableProps = {
    avatarImageUrl?: string;
    avatarFallBack?: string;
}


export const ProfileExpandable: React.FC<ProfileExpandableProps> = () => {
    return (
        <Popover>
            <PopoverTrigger asChild={true}>
                <Avatar className={"relative cursor-pointer"}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                    <AvatarFallback>LG</AvatarFallback>
                    <div
                        className={"absolute bottom-0 right-0 z-[200] w-5 h-5 flex justify-center items-start rounded-full bg-white"}>
                        <ChevronDown strokeWidth={3} stroke={"black"}/>
                    </div>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className={"w-72 bg-white border drop-shadow-sm text-black"}>
            </PopoverContent>
        </Popover>
    )
}