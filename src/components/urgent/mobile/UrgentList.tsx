'use client';

import { Leapfrog } from 'ldrs/react';
import { cn, formatTime } from '@/lib/utils';
import { Basic } from '@/app/layout';

import 'ldrs/react/Leapfrog.css';
import { useFetchUrgent } from '@/hooks/query/urgent/use-fetch-urgent';
import {
  ActionButtonProps,
  NewUrgentCard,
  UrgentCardStatus,
} from '@/components/urgent/NewUrgentCard';
import { useResolveUrgent } from '@/hooks/query/urgent/use-resolve-urgent';
import { useParams } from 'next/navigation';
import { OptimisticData } from '@/model/common.dto';
import { UrgentItemDTO } from '@/model/urgent.dto';

const mapUrgentItemToCardProps = (
  item: OptimisticData<UrgentItemDTO>,
  onResolve: (id: string) => void,
  resolvingId: string | null
) => {
  const status: UrgentCardStatus = item.resolved ? 'resolved' : 'urgent';
  const initials =
    `${item.userInfo.name[0] ?? ''}${item.userInfo.surname[0] ?? ''}`.toUpperCase();
  const isResolving = resolvingId === item.id;

  const actions: ActionButtonProps[] = item.resolved
    ? [{ icon: '❤️', label: 'მადლობა', variant: 'success' }]
    : [
        {
          icon: '✓',
          label: 'შესრულებულია',
          pendingLabel: '...იგზავნება',
          variant: 'primary',
          onClick: () => onResolve(item.id),
          isPending: isResolving,
        },
      ];

  return {
    status,
    icon: item.resolved ? '✓' : '🆘',
    label: item.resolved ? 'შესრულებულია' : 'SOS',
    title: `${item.userInfo.name} ${item.userInfo.surname}`,
    message: item.content,
    meta: [{ icon: '⏱️', text: formatTime(item.createdAt.toString()) }],
    responders: [{ initials, color: 'primary' as const }],
    responderText: item.resolved ? 'დაეხმარა' : 'მოითხოვა დახმარება',
    actions,
    isPending: item._isPending,
  };
};

const UrgentList = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const { data, isLoading, isError } = useFetchUrgent();
  const {
    mutate: resolveUrgent,
    variables: resolvingId,
    isPending: isResolving,
  } = useResolveUrgent();

  // Cast to OptimisticUrgentItem[] since cache may contain optimistic items with _isPending flag
  const items = data as OptimisticData<UrgentItemDTO>[] | undefined;

  const handleResolve = (id: string) => {
    if (!apartmentId) return;
    resolveUrgent({ apartmentId, id });
  };

  if (!apartmentId) {
    return (
      <div className="flex items-center justify-center p-4">
        No apartment selected
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3 py-3 px-4">
      {isLoading && <ListLoader />}

      {isError && (
        <div className="flex items-center justify-center p-4 text-red-500">
          Error loading urgent items
        </div>
      )}

      {items &&
        items.length > 0 &&
        items.map((item) => (
          <NewUrgentCard
            key={item.id}
            {...mapUrgentItemToCardProps(
              item,
              handleResolve,
              isResolving ? (resolvingId?.id ?? null) : null
            )}
          />
        ))}
    </ul>
  );
};

const ListLoader = ({ className }: Basic) => {
  return (
    <div
      className={cn(
        'z-60 flex w-full h-14 justify-center items-center fixed top-[70%]',
        className
      )}
    >
      <Leapfrog size="40" speed="1.75" color="#02c2c5" />
    </div>
  );
};

export default UrgentList;
