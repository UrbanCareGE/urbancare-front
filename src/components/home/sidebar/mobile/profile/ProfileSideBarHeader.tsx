import React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {SideBarProfileHeader} from "@/components/profile/mobile/SideBarProfileHeader";
import {X} from "lucide-react";

export const ProfileSideBarHeader = () => {
    return (
        <div className={"flex flex-col w-full h-full gap-1"}>
            <div className={"flex justify-between items-center w-full pt-6"}>
                <h2 className={`text-2xl font-semibold text-gray-900'}`}>
                    პროფილი
                </h2>
                <SheetPrimitive.Close>
                    <X className={"h-8 w-8 stroke-gray-600"}></X>
                </SheetPrimitive.Close>
            </div>
            <SideBarProfileHeader/>
        </div>
    );
};