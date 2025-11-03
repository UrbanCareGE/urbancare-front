'use client'

import UrgentCard from "@/components/urgent/UrgentCard";
import {useAuth} from "@/components/provider/AuthProvider";
import {Leapfrog} from "ldrs/react";
import {cn} from "@/lib/utils";
import {Basic} from "@/app/layout";

import 'ldrs/react/Leapfrog.css'
import {useFetchUrgent} from "@/hooks/query/use-fetch-urgent";


const UrgentList = () => {
    const {user, isLoading: isUserLoading} = useAuth();
    const {data, isLoading, isError} = useFetchUrgent()

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

            {data && data.length > 0 && data?.map((item) => (
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