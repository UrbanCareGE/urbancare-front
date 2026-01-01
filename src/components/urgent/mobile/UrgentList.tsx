'use client'

import {useAuth} from "@/components/provider/AuthProvider";
import {Leapfrog} from "ldrs/react";
import {cn, formatTime} from "@/lib/utils";
import {Basic} from "@/app/layout";

import 'ldrs/react/Leapfrog.css'
import {useFetchUrgent} from "@/hooks/query/urgent/use-fetch-urgent";
import {NewUrgentCard, UrgentCardStatus, ActionButtonProps} from "@/components/urgent/NewUrgentCard";
import {UrgentItemDTO} from "@/model/urgent.dto";
import {UrgentService} from "@/service/urgent-service";

const mapUrgentItemToCardProps = (item: UrgentItemDTO) => {
    const status: UrgentCardStatus = item.resolved ? 'resolved' : 'urgent';
    const initials = `${item.userInfo.name[0]}${item.userInfo.surname[0]}`.toUpperCase();

    const actions: ActionButtonProps[] = item.resolved
        ? [{icon: '❤️', label: 'მადლობა', variant: 'success'}]
        : [{
            icon: '✓',
            label: 'შესრულებულია',
            variant: 'primary',
            onClick: () => UrgentService.resolve(item.id)
        }];

    return {
        status,
        icon: item.resolved ? '✓' : '🆘',
        label: item.resolved ? 'შესრულებულია' : 'SOS',
        title: `${item.userInfo.name} ${item.userInfo.surname}`,
        message: item.content,
        meta: [
            {icon: '⏱️', text: formatTime(item.createdAt.toString())},
        ],
        responders: [{initials, color: 'primary' as const}],
        responderText: item.resolved ? 'დაეხმარა' : 'მოითხოვა დახმარება',
        actions,
    };
};

const UrgentList = () => {
    const authContext = useAuth();
    const {user} = authContext;
    const {data, isLoading, isError} = useFetchUrgent(authContext)

    if (!user?.selectedApartment?.id) {
        return (
            <div className="flex items-center justify-center p-4">
                No apartment selected
            </div>
        );
    }

    return (
        <ul className="flex flex-col gap-3 py-3 px-4">
            {isLoading && <ListLoader/>}

            {isError && (
                <div className="flex items-center justify-center p-4 text-red-500">
                    Error loading urgent items
                </div>
            )}

            {data && data.length > 0 && data?.map((item) => (
                <NewUrgentCard key={item.id} {...mapUrgentItemToCardProps(item)}/>
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