import {AppLogo} from "@/components/common/logo/AppLogo";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {X} from "lucide-react";
import React from "react";

export const NavSideBarHeader = () => {
    return (
        <div className={"w-full flex justify-between items-start"}>
            <AppLogo/>
            <SheetPrimitive.Close asChild>
                <X className={"h-8 w-8 stroke-gray-800 my-2"}></X>
            </SheetPrimitive.Close>
        </div>
    );
};
