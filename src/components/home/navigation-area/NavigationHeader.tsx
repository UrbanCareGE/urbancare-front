import React from "react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

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

export const NavigationHeader = () => {
    return (
        <div className={"w-full h-20 p-4 rounded-panel bg-white"}>
            <Select>
                <SelectTrigger className="w-full px-3 py-2 rounded-lg border shadow-sm hover:bg-gray-50">
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
        </div>

    )
}