import React from "react";
import {HomeColumnPanel} from "@/components/home/HomeColumnPanel";
import {TextLogo} from "@/components/common/logo/TextLogo";
import {ProfileBarArea} from "@/components/home/profile-bar/ProfileBarArea";
import {NavigationArea} from "@/components/home/navigation-area/NavigationArea";
import {MasterBarHeader} from "@/components/common/header/MasterBarHeader";
import {DynamicArea} from "@/components/home/dynamic-area/DynamicArea";

export default function HomeLayout({children}: { children: React.ReactNode }) {
    return (
        <main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-8">
            <HomeColumnPanel
                headerContent={
                    <TextLogo/>
                }
                bodyContent={
                   <NavigationArea/>
                }
                headerClassName={"justify-start"}
                className={"w-72 big:w-80"}
            />
            <HomeColumnPanel
                headerContent={
                    <MasterBarHeader/>
                }
                bodyContent={
                    children
                }
                className={"flex-1"}
                headerClassName={""}
                bodyClassName={""}
            />
            <HomeColumnPanel
                headerContent={
                    <ProfileBarArea/>
                }
                bodyContent={
                   <DynamicArea/>
                }
                headerClassName={"justify-end"}
                bodyClassName={""}
                className={"w-72 big:w-80"}
            />
            {/*<NavigationArea/>*/}
            {/*<div className={"flex-1 justify-center items-center h-full min-w-96"}>*/}
            {/*    {children}*/}
            {/*</div>*/}
            {/*<div className={"h-full w-80 bg-white rounded-panel"}>*/}
            {/*</div>*/}
        </main>
    )
}