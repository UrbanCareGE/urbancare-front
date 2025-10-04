import React from "react";
import {TextLogo} from "@/components/common/logo/TextLogo";
import {MasterBarNavigation} from "@/components/common/header/MasterBarNavigation";
import {UserAvatar} from "@/components/common/avatar/UserAvatar";


export const MasterBarHeader: React.FC = () => {

    return (
        <header className="w-full h-20 z-50 bg-gray-100 py-4 px-8">
            <div className="grid grid-cols-3 w-full h-full items-center">
                <div className="flex h-full justify-start items-center">
                    <TextLogo/>
                </div>

                <div className="flex h-full justify-center items-center">
                    <MasterBarNavigation/>
                </div>

                <div className="flex h-full justify-end items-center">
                    <UserAvatar/>
                </div>
            </div>
        </header>)
}