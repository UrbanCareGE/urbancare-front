'use client'

import React from "react";
import {useQuery} from "@tanstack/react-query";
import {UrgentService} from "@/service/urgent-service";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

export default function Page() {
    const {data: urgentItems, isLoading, error} = useQuery({
        queryKey: ["urgentList"],
        queryFn: UrgentService.getApartmentList,
    });

    return (
        <div className={"bg-blue-950 w-full"}>
            <ul className="flex flex-col gap-3 py-3">
                {/*{isLoading && (*/}
                {/*    <div className="flex items-center justify-center p-4 text-gray-500">*/}
                {/*        Loading...*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*{error && (*/}
                {/*    <div className="flex items-center justify-center p-4 text-red-500">*/}
                {/*        Error loading urgent items*/}
                {/*    </div>*/}
                {/*)}*/}
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani2"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani2"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani2"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                <li className={"flex flex-col justify-evenly mx-4 border border-gray-200 rounded-lg"}>
                    <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                        <span>{"miriani miriani"}</span>
                        <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                    </div>
                    <Separator className={"bg-blue-900"}/>
                    <span className="text-sm text-gray-600 px-3 py-2">{"baro lasha she magaro"}</span>
                </li>
                {/*{urgentItems?.map((item) => (*/}
                {/*    <li key={item.id} className={"flex flex-col justify-evenly ml-4 mr-3.5 border border-gray-200 rounded-lg"}>*/}
                {/*        <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">*/}
                {/*            <span>{item.userId}</span>*/}
                {/*            <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>*/}
                {/*        </div>*/}
                {/*        <Separator className={"bg-blue-900"}/>*/}
                {/*        <span className="text-sm text-gray-600 px-3 py-2">{item.content}</span>*/}
                {/*    </li>*/}
                {/*))}*/}
            </ul>
        </div>
    )
}

/*
<main className="flex w-full h-screen overflow-hidden bg-gray-100 gap-8 px-8">
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
                            <DynamicPanel.Header className={"p-0 min-h-0"}>
                                <UrgentPreview/>
                            </DynamicPanel.Header>
                            <DynamicPanel.Body>
                                <div></div>
                            </DynamicPanel.Body>
                        </DynamicPanel>
                    </HomeColumnPanel.Body>
                </HomeColumnPanel>
            )}
        </main>
 */