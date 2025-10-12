import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {NavigationSideBar} from "@/components/home/NavigationSideBar";
import React from "react";
import {ProfileSideBar} from "@/components/home/NavigationProfileBar";

export const MobileHeader = () => {
    return (
        <div className={"flex flex-col border-b"}>
            <div className={"h-16 w-full flex items-center px-3 bg-yellow-400"}>
                <NavigationSideBar>
                    <h3>dawdad</h3>
                </NavigationSideBar>
                <span className={"ml-3 font-semibold text-xl mr-auto"}>URBANCARE</span>
                <ProfileSideBar>
                    <h3>dawdad</h3>
                </ProfileSideBar>
            </div>
            <Select>
                <SelectTrigger className={"h-8 "}>
                    <div>
                        თბილისი, პ. ქავთარაძის 34გ
                    </div>
                </SelectTrigger>
                <SelectContent className={"bg-white"}>
                    <SelectItem key={1} value={"1"}>
                        AAAAA
                    </SelectItem>
                    <SelectItem key={2} value={"2"}>
                        AAAAA
                    </SelectItem>
                    <SelectItem key={3} value={"3"}>
                        AAAAA
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
