"use client"

import {HomeColumnPanel} from "@/components/home/HomeColumnPanel";
import {AppLogo} from "@/components/common/logo/AppLogo";
import {NavigationPanel} from "@/components/home/navigation-area/NavigationPanel";
import {NavigationPanelHeader} from "@/components/home/navigation-area/NavigationPanelHeader";
import {NavigationPanelBody} from "@/components/home/navigation-area/NavigationPanelBody";
import {NavigationPanelFooter} from "@/components/home/navigation-area/NavigationPanelFooter";
import {Sidebar} from "@/components/home/Sidebar";
import React, {useState} from "react";

export const LeftPanel = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);


    return (
        <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
            <HomeColumnPanel className="w-full h-full">
                <HomeColumnPanel.Header className="">
                    {!sidebarOpen ? <AppLogo/> : null}
                </HomeColumnPanel.Header>
                <HomeColumnPanel.Body>
                    <NavigationPanel>
                        <NavigationPanel.Header
                            className={"p-2 flex justify-center items-center"}>
                            <NavigationPanelHeader/>
                        </NavigationPanel.Header>
                        <NavigationPanel.Body>
                            <NavigationPanelBody/>
                        </NavigationPanel.Body>
                        <NavigationPanel.Footer>
                            <NavigationPanelFooter/>
                        </NavigationPanel.Footer>
                    </NavigationPanel>
                </HomeColumnPanel.Body>
            </HomeColumnPanel>
        </Sidebar>
    );
};
