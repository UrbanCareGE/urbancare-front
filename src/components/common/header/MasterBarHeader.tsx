import React from "react";
import {MasterBarNavigation} from "@/components/common/header/MasterBarNavigation";


export const MasterBarHeader = () => {
    return (
        <header className="w-full">
            <div className="flex w-full h-full justify-center items-center">
                <MasterBarNavigation/>
            </div>
        </header>)
};