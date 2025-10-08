import React from "react";
import {HomeColumnPanel} from "@/components/home/HomeColumnPanel";
import {ProfileBarArea} from "@/components/home/profile-bar/ProfileBarArea";
import {NavigationPanel} from "@/components/home/navigation-area/NavigationPanel";
import {MasterBarHeader} from "@/components/common/header/MasterBarHeader";
import {DynamicArea} from "@/components/home/dynamic-area/DynamicArea";
import {NavigationHeader} from "@/components/home/navigation-area/NavigationHeader";
import {NavigationFooter} from "@/components/home/navigation-area/NavigationFooter";
import NavigationBody from "@/components/home/navigation-area/NavigationBody";
import {AppLogo} from "@/components/common/logo/AppLogo";

export default function HomeLayout({children}: { children: React.ReactNode }) {
    return (<main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-8">
            <HomeColumnPanel className="w-72 big:w-80">
                <HomeColumnPanel.Header className="justify-start">
                    <AppLogo/>
                </HomeColumnPanel.Header>
                <HomeColumnPanel.Body>
                    <NavigationPanel>
                        <NavigationPanel.Header>
                            <NavigationHeader/>
                        </NavigationPanel.Header>
                        <NavigationPanel.Body>
                            <NavigationBody/>
                        </NavigationPanel.Body>
                        <NavigationPanel.Footer>
                            <NavigationFooter/>
                        </NavigationPanel.Footer>
                    </NavigationPanel>
                </HomeColumnPanel.Body>
            </HomeColumnPanel>

            <HomeColumnPanel className="flex-1">
                <HomeColumnPanel.Header>
                    <MasterBarHeader/>
                </HomeColumnPanel.Header>
                <HomeColumnPanel.Body>
                    {children}
                </HomeColumnPanel.Body>
            </HomeColumnPanel>

            <HomeColumnPanel className="w-72 big:w-96">
                <HomeColumnPanel.Header className="justify-end">
                    <ProfileBarArea/>
                </HomeColumnPanel.Header>
                <HomeColumnPanel.Body>
                    <DynamicArea/>
                </HomeColumnPanel.Body>
            </HomeColumnPanel>
        </main>
    );
}
