'use client';

import { Leapfrog } from 'ldrs/react';
import { cn, formatTime } from '@/lib/utils';
import { Basic } from '@/app/layout';

import 'ldrs/react/Leapfrog.css';
import { ShieldCheck } from 'lucide-react';
import { useFetchUrgent } from '@/hooks/query/urgent/use-fetch-urgent';
import { UrgentCard, UrgentCardProps } from '@/components/urgent/UrgentCard';
import { useResolveUrgent } from '@/hooks/query/urgent/use-resolve-urgent';
import { useParams } from 'next/navigation';
import { OptimisticData } from '@/model/dto/common.dto';
import { UrgentItemDTO } from '@/model/dto/urgent.dto';
import { useAuth } from '@/components/provider/AuthProvider';
import {
  ActionButtonProps,
  UrgentCardStatus,
} from '@/components/urgent/data/urgent-data';

export const mapUrgentItemToCardProps = (
  item: OptimisticData<UrgentItemDTO>,
  onResolve: (id: string) => void,
  resolvingId: string | null
): UrgentCardProps => {
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
    issuerId: item.userInfo.id,
    isPending: item._isPending,
  };
};

const UrgentEmptyState = () => (
  <div className="flex flex-col items-center justify-center px-5 py-10 gap-5">
    <div className="relative flex items-center justify-center">
      <div className="absolute w-20 h-20 rounded-full bg-success/15 animate-pulse" />
      <div className="absolute w-14 h-14 rounded-full bg-success/20" />
      <div className="relative w-12 h-12 rounded-full bg-success-container flex items-center justify-center shadow-sm">
        <ShieldCheck className="w-6 h-6 text-success" strokeWidth={2} />
      </div>
    </div>

    <div className="flex flex-col items-center gap-1 text-center">
      <p className="font-semibold text-sm text-foreground-primary">
        ყველაფერი კარგადაა
      </p>
      <p className="text-xs text-foreground-secondary leading-relaxed">
        სასწრაფო შეტყობინება არ არის
      </p>
    </div>

    <div className="flex items-center gap-1.5">
      <span className="w-1 h-1 rounded-full bg-success/30" />
      <span className="w-1.5 h-1.5 rounded-full bg-success/50" />
      <span className="w-1 h-1 rounded-full bg-success/30" />
    </div>
  </div>
);

const UrgentFeed = () => {
  const user = useAuth();
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const { data, isLoading, isError } = useFetchUrgent();
  const {
    mutate: resolveUrgent,
    variables: resolvingId,
    isPending: isResolving,
  } = useResolveUrgent();

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
    <ul className="flex flex-col gap-3 py-3 px-4 overflow-y-scroll">
      {isLoading && <ListLoader />}

      {isError && (
        <div className="flex items-center justify-center p-4 text-red-500">
          Error loading urgent items
        </div>
      )}

      {items && items.length === 0 && <UrgentEmptyState />}

      {items &&
        items.length > 0 &&
        items.map((item) => (
          <UrgentCard
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

export default UrgentFeed;
