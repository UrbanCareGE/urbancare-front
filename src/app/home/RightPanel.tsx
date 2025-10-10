import {HomeColumnPanel} from "@/components/home/HomeColumnPanel";
import React from "react";
import {ProfileBarArea} from "@/components/home/profile-bar/ProfileBarArea";
import {DynamicPanel} from "@/components/home/dynamic-area/DynamicPanel";
import UrgentPreview from "@/components/urgent/UrgentPreview";

export const RightPanel = () => {
    return (
        <HomeColumnPanel className={"w-96"}>
            <HomeColumnPanel.Header className="justify-end">
                <ProfileBarArea/>
            </HomeColumnPanel.Header>
            <HomeColumnPanel.Body>
                <DynamicPanel>
                    <DynamicPanel.Header className={"p-0 min-h-0"}>
                        <UrgentPreview/>
                    </DynamicPanel.Header>
                    <DynamicPanel.Body>
                        <div></div>
                    </DynamicPanel.Body>
                </DynamicPanel>
            </HomeColumnPanel.Body>
        </HomeColumnPanel>
    );
};
