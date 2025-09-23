import React from "react";
import {TextLogo} from "@/components/common/logo/TextLogo";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronDown} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {IoNotifications} from "react-icons/io5";

export function AvatarDemo() {
    return (
        <div className="flex flex-row flex-wrap items-center gap-4">
            {/*<BellRingIcon width={32} height={32} strokeWidth={2}/>*/}
            <IoNotifications size={28} fill={"black"}/>

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
                <PopoverContent className={"w-64 bg-white border drop-shadow-sm text-black"}>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export const FixedMasterHeader: React.FC = () => {

    return (
        <header className="fixed w-full h-[64px] z-50 bg-white shadow-md">
            <div className="flex w-full h-full items-center justify-between px-6 py-4">
                <TextLogo/>
                <AvatarDemo/>
            </div>
        </header>)
}