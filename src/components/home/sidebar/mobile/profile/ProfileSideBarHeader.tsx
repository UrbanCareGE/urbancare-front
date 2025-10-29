import {Menu} from "lucide-react";
import React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {SideBarProfileHeader} from "@/components/profile/mobile/SideBarProfileHeader";

export const ProfileSideBarHeader = () => {
    return (
        <div className={"flex flex-col w-full h-full gap-1 pb-2"}>
            <div className={"flex justify-between items-center w-full"}>
                <h2 className={`text-2xl font-semibold text-gray-900'}`}>
                    პროფილი
                </h2>
                <SheetPrimitive.Close>
                    <Menu className={"h-8 w-8 stroke-gray-800"}></Menu>
                    <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
            </div>
            <SideBarProfileHeader/>
        </div>
    );
};