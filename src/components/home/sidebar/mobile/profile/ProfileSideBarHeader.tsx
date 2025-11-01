import React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {SideBarProfileHeader} from "@/components/profile/mobile/SideBarProfileHeader";
import {X} from "lucide-react";

export const ProfileSideBarHeader = () => {
    return (
        <div className={"flex justify-between items-start w-full"}>
            <SideBarProfileHeader/>
            <SheetPrimitive.Close>
                <X className={"h-8 w-8 stroke-gray-600 my-2"}></X>
            </SheetPrimitive.Close>
        </div>
    );
};