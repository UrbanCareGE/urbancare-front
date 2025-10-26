'use client'

import {UrgentService} from "@/service/urgent-service";
import UrgentCard from "@/app/(home)/urgent/UrgentCard";
import {useAuth} from "@/components/provider/AuthProvider";
import {useQuery} from "@tanstack/react-query";
import {Leapfrog} from "ldrs/react";
import {cn} from "@/lib/utils";
import {Basic} from "@/app/layout";

import 'ldrs/react/Leapfrog.css'


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

export default UrgentList;