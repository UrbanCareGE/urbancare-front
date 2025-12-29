import React from "react";
import Image from "next/image";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export type TextLogoProps = {
    className?: string;
}

const NavigationAreaHeaderTrigger = ({
                                         address,
                                         avatarUrl,
                                     }: {
    address: string
    avatarUrl: string
}) => {
    return (
        <div className="flex w-full items-center justify-between gap-2 ">
            <div className="flex items-center gap-1">
                <Avatar className="h-6 w-6 border">
                    <AvatarImage src={avatarUrl} alt="@user"/>
                    <AvatarFallback>LG</AvatarFallback>
                </Avatar>
            </div>
            <span className="truncate text-sm font-medium text-gray-700">{address}</span>
        </div>
    )
}

export const TextLogo: React.FC<TextLogoProps> = ({className}) => {
    return (
        <>
            <Image src="/assets/facebook.png" alt="Logo" width={44} height={44}/>
            <Select>
                <SelectTrigger
                    className="w-full ml-4 h-9 px-3 py-2 rounded-lg border shadow-sm hover:bg-gray-50 bg-white">
                    <SelectValue placeholder={"GLOBAL"}>
                        <NavigationAreaHeaderTrigger
                            address="თბილისი, პოლიტკოვსკაიას 34"
                            avatarUrl="https://github.com/shadcn.png"
                        />
                    </SelectValue>
                </SelectTrigger>

                <SelectContent className={"bg-white"}>
                    <SelectGroup>
                        <SelectItem value="tbilisi">
                            თბილისი, პოლიტკოვსკაიას 34
                        </SelectItem>
                        <SelectItem value="batumi">
                            ბათუმი, რუსთაველის 10
                        </SelectItem>
                        <SelectItem value="kutaisi">
                            ქუთაისი, ჭავჭავაძის 5
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}