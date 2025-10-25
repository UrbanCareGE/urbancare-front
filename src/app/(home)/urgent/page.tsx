'use client'

import React, {Suspense} from "react";
import {UrgentService} from "@/service/urgent-service";
import UrgentCard from "@/app/(home)/urgent/UrgentCard";
import {Leapfrog} from 'ldrs/react'
import 'ldrs/react/Leapfrog.css'
import AddUrgent from "@/app/(home)/urgent/AddUrgent";
import {Basic} from "@/app/layout";
import {cn} from "@/lib/utils";
import {useAuth} from "@/components/provider/AuthProvider";
import {useQuery} from "@tanstack/react-query";


const Page = () => {
    return (
        <div className={"bg-white w-full flex flex-col"}>
            <AddUrgent/>
            <Suspense fallback={<ListLoader/>}>
                <UrgentList/>
            </Suspense>
        </div>
    )
}

const ListLoader = ({className}: Basic) => {
    return (
        <div className={cn("z-60 flex w-full h-14 justify-center items-center fixed top-[70%]", className)}>
            <Leapfrog
                size="40"
                speed="1.75"
                color="#02c2c5"
            />
        </div>
    );
};

const UrgentList = () => {
    const {user, isLoading: isUserLoading} = useAuth();

    const {data, isError, isLoading} = useQuery({
        queryKey: ["urgent_list", user?.selectedApartment?.id],
        queryFn: () => UrgentService.getUrgentList(user?.selectedApartment?.id ?? 'yle'),
        enabled: !!user?.selectedApartment?.id,
        staleTime: 5 * 1000,
    });

    if (isUserLoading) {
        return <ListLoader/>;
    }

    if (!user?.selectedApartment?.id) {
        return (
            <div className="flex items-center justify-center p-4">
                No apartment selected
            </div>
        );
    }

    return (
        <ul className="flex flex-col gap-3 py-3">
            {isLoading && <ListLoader/>}

            {isError && (
                <div className="flex items-center justify-center p-4 text-red-500">
                    Error loading urgent items
                </div>
            )}

            {data?.map((item) => (
                <UrgentCard key={item.id} {...item}/>
            ))}
        </ul>
    );
};
export default Page;


/*
let error = false;
    let data: UrgentItem[] = [];
    try {

        const response = await fetch(`${NEXT_API_URL}/api/secure/urgent/68efd03837b62ea34882f812/list`,
            {
                headers: {
                    Authorization: cook.get('auth-token')?.value ?? 'none'
                }
            }
        )
        if (response.ok) {
            data = await response.json()
            console.log(data);
        }
    } catch (err) {
        console.log(err);
        error = true;
    }
 */
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