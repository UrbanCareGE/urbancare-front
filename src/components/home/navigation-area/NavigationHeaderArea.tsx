import React from "react"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {AvatarDemo} from "@/components/common/header/MasterBarHeader";


const NavigationAreaHeaderTrigger = ({
                                         address,
                                         avatarUrl,
                                     }: {
    address: string
    avatarUrl: string
}) => {
    return (
        <div className="flex w-full items-center justify-between gap-2">
            <span className="truncate text-sm font-medium text-gray-700">{address}</span>
            <div className="flex items-center gap-1">
                <Avatar className="h-7 w-7 border">
                    <AvatarImage src={avatarUrl} alt="@user"/>
                    <AvatarFallback>LG</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

//
// Main Component
//
export const NavigationHeaderArea = () => {
    return (
        <div className={"w-full bg-white rounded-md p-4 shadow-md"}>
            <AvatarDemo/>
            {/*<Select>*/}
            {/*    <SelectTrigger className="w-full px-3 py-2 rounded-lg border shadow-sm hover:bg-gray-50">*/}
            {/*        <SelectValue>*/}
            {/*            <NavigationAreaHeaderTrigger*/}
            {/*                address="თბილისი, პოლიტკოვსკაიას 34"*/}
            {/*                avatarUrl="https://github.com/shadcn.png"*/}
            {/*            />*/}
            {/*        </SelectValue>*/}
            {/*    </SelectTrigger>*/}

            {/*    <SelectContent>*/}
            {/*        <SelectGroup>*/}
            {/*            <SelectItem value="tbilisi">*/}
            {/*                თბილისი, პოლიტკოვსკაიას 34*/}
            {/*            </SelectItem>*/}
            {/*            <SelectItem value="batumi">*/}
            {/*                ბათუმი, რუსთაველის 10*/}
            {/*            </SelectItem>*/}
            {/*            <SelectItem value="kutaisi">*/}
            {/*                ქუთაისი, ჭავჭავაძის 5*/}
            {/*            </SelectItem>*/}
            {/*        </SelectGroup>*/}
            {/*    </SelectContent>*/}
            {/*</Select>*/}
        </div>

    )
}