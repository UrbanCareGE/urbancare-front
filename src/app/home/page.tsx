import Chat from "@/components/chat/Chat";
import {HomeColumnPanel} from "@/components/home/HomeColumnPanel";
import {MasterBarHeader} from "@/components/common/header/MasterBarHeader";
import React from "react";

export default function HomePage() {
    return (
        <HomeColumnPanel className="flex-1">
            <HomeColumnPanel.Header>
                <MasterBarHeader/>
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body>
                <div className={"flex flex-col gap-4 w-full h-full"}>
                    <Chat/>
                </div>
            </HomeColumnPanel.Body>
        </HomeColumnPanel>
    )
}
