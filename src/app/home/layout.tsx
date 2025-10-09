"use client";

import React, {useState} from "react";
import {HomeColumnPanel} from "@/components/home/HomeColumnPanel";
import {ProfileBarArea} from "@/components/home/profile-bar/ProfileBarArea";
import {NavigationPanel} from "@/components/home/navigation-area/NavigationPanel";
import {MasterBarHeader} from "@/components/common/header/MasterBarHeader";
import {DynamicPanel} from "@/components/home/dynamic-area/DynamicPanel";
import {AppLogo} from "@/components/common/logo/AppLogo";
import {NavigationPanelHeader} from "@/components/home/navigation-area/NavigationPanelHeader";
import {NavigationPanelBody} from "@/components/home/navigation-area/NavigationPanelBody";
import {NavigationPanelFooter} from "@/components/home/navigation-area/NavigationPanelFooter";
import {Sidebar} from "@/components/home/Sidebar";
import {SidebarToggle} from "@/components/home/SidebarToggle";
import {useDevice} from "@/hooks/use-device";

export default function HomeLayout({children}: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {isMobile} = useDevice();

    return (
        <main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-8">
            <Sidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
                <HomeColumnPanel className="w-full h-full">
                    <HomeColumnPanel.Header className="">
                        {!sidebarOpen ? <AppLogo/> : null}
                    </HomeColumnPanel.Header>
                    <HomeColumnPanel.Body>
                        <NavigationPanel>
                            <NavigationPanel.Header
                                className={"p-2 flex justify-center items-center bg-primary"}>
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

            <HomeColumnPanel className="flex-1">
                <HomeColumnPanel.Header>
                    <SidebarToggle onClick={() => setSidebarOpen(true)}/>
                    <MasterBarHeader/>
                </HomeColumnPanel.Header>
                <HomeColumnPanel.Body>
                    {children}
                </HomeColumnPanel.Body>
            </HomeColumnPanel>

            {!isMobile && (
                <HomeColumnPanel className="w-72 big:w-96">
                    <HomeColumnPanel.Header className="justify-end">
                        <ProfileBarArea/>
                    </HomeColumnPanel.Header>
                    <HomeColumnPanel.Body>
                        <DynamicPanel>
                            <DynamicPanel.Header>
                                <div></div>
                            </DynamicPanel.Header>
                            <DynamicPanel.Body>
                                <div></div>
                            </DynamicPanel.Body>
                        </DynamicPanel>
                    </HomeColumnPanel.Body>
                </HomeColumnPanel>
            )}
        </main>
    );
}