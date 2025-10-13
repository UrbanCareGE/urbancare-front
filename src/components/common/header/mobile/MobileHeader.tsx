import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {NavigationSideBar} from "@/components/home/sidebar/mobile/NavigationSideBar";
import React from "react";
import {ProfileSideBar} from "@/components/home/sidebar/mobile/NavigationProfileBar";
import {NavigationPanel} from "@/components/home/navigation-panel/NavigationPanel";
import {DynamicPanel} from "@/components/home/dynamic-panel/DynamicPanel";
import {NeighborhoodSelect} from "@/components/home/NeighborhoodSelect";
import {NavigationArea, navigationItems} from "@/components/home/navigation-panel/NavigationArea";
import {AppLogo} from "@/components/common/logo/AppLogo";

export const MobileHeader = () => {
    return (
        <div className={"flex flex-col border-b sticky w-full top-0 z-40 bg-white"}>
            <div className={"h-16 w-full flex items-center px-3 border-b border-gray-200"}>
                <NavigationSideBar>
                    <NavigationPanel>
                        <NavigationPanel.Header className={"gap-2"}>
                            <AppLogo/>
                        </NavigationPanel.Header>
                        <NavigationPanel.Body>
                            <NavigationArea items={navigationItems} />
                        </NavigationPanel.Body>
                        <NavigationPanel.Footer>
                            <NeighborhoodSelect/>
                        </NavigationPanel.Footer>
                    </NavigationPanel>
                </NavigationSideBar>
                <span className={"ml-3 font-semibold text-xl mr-auto"}>URBANCARE</span>
                <ProfileSideBar>
                    <DynamicPanel>
                        <DynamicPanel.Header>
                            <div>Header</div>
                        </DynamicPanel.Header>
                        <DynamicPanel.Body>
                            <div>Body</div>
                        </DynamicPanel.Body>
                        <DynamicPanel.Footer>
                            <div>Footer</div>
                        </DynamicPanel.Footer>
                    </DynamicPanel>
                </ProfileSideBar>
            </div>
            <div className={"px-4"}>
                <Select>
                    <SelectTrigger className={"h-8"}>
                        <div>
                            თბილისი, პ. ქავთარაძის 34გ
                        </div>
                    </SelectTrigger>
                    <SelectContent className={"bg-white"}>
                        <SelectItem key={1} value={"1"}>
                            AAAAA
                        </SelectItem>
                        <SelectItem key={2} value={"2"}>
                            AAAAA
                        </SelectItem>
                        <SelectItem key={3} value={"3"}>
                            AAAAA
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
