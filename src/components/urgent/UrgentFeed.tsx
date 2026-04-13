'use client';

import { ExtractUserInitials, formatTime } from '@/lib/utils';
import 'ldrs/react/Leapfrog.css';
import { ShieldCheck } from 'lucide-react';
import { useFetchUrgent } from '@/hooks/query/urgent/use-fetch-urgent';
import {
  UrgentCard,
  UrgentCardCompact,
  UrgentCardProps,
} from '@/components/urgent/UrgentCard';
import { useResolveUrgent } from '@/hooks/query/urgent/use-resolve-urgent';
import { useParams } from 'next/navigation';
import { OptimisticData } from '@/model/dto/common.dto';
import { UrgentItemDTO } from '@/model/dto/urgent.dto';
import {
  ActionButtonProps,
  UrgentCardStatus,
} from '@/components/urgent/urgent-data';
import { TranslationKeys, useTranslation } from '@/i18n';
import { useMemo } from 'react';

export const mapUrgentItemToCardProps = (
  item: OptimisticData<UrgentItemDTO>,
  onResolve: (id: string) => void,
  resolvingId: string | null,
  t: TranslationKeys
): UrgentCardProps => {
  const status: UrgentCardStatus = item.resolved ? 'resolved' : 'urgent';
  const initials = ExtractUserInitials(item.userInfo);
  const isResolving = resolvingId === item.id;

  const actions: ActionButtonProps[] = item.resolved
    ? [{ icon: '❤️', label: t.urgent.thankYou, variant: 'success' }]
    : [
        {
          icon: '✓',
          label: t.urgent.completed,
          pendingLabel: t.urgent.sendingPending,
          variant: 'primary',
          onClick: () => onResolve(item.id),
          isPending: isResolving,
        },
      ];

  return {
    status,
    icon: item.resolved ? '✓' : '🆘',
    label: item.resolved ? t.urgent.completed : t.urgent.sos,
    title: `${item.userInfo.name} ${item.userInfo.surname}`,
    message: item.content,
    meta: [{ icon: '⏱️', text: formatTime(item.createdAt.toString()) }],
    responders: [{ initials, color: 'primary' as const }],
    responderText: item.resolved ? t.urgent.helped : t.urgent.requestedHelp,
    actions,
    issuerId: item.userInfo.id,
    isPending: item._isPending,
  };
};

const UrgentEmptyState = ({ t }: { t: TranslationKeys }) => (
  <div className="flex flex-col items-center justify-center px-5 py-10 gap-5">
    <div className="relative flex items-center justify-center">
      <div className="absolute w-20 h-20 rounded-urbancare-full bg-success/15 animate-pulse" />
      <div className="absolute w-14 h-14 rounded-urbancare-full bg-success/20" />
      <div className="relative w-12 h-12 rounded-urbancare-full bg-success-container flex items-center justify-center shadow-sm">
        <ShieldCheck className="w-6 h-6 text-success" strokeWidth={2} />
      </div>
    </div>

    <div className="flex flex-col items-center gap-1 text-center">
      <p className="font-semibold text-urbancare-base text-foreground-primary">
        {t.urgent.everythingFine}
      </p>
      <p className="text-urbancare-sm text-foreground-secondary leading-relaxed">
        {t.urgent.noUrgentNotifications}
      </p>
    </div>

    <div className="flex items-center gap-1.5">
      <span className="w-1 h-1 rounded-urbancare-full bg-success/30" />
      <span className="w-1.5 h-1.5 rounded-urbancare-full bg-success/50" />
      <span className="w-1 h-1 rounded-urbancare-full bg-success/30" />
    </div>
  </div>
);

export const UrgentFeedContainer = () => {
  const t = useTranslation();
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const { data, isLoading, isError } = useFetchUrgent();
  const {
    mutate: resolveUrgent,
    variables: resolvingId,
    isPending: isResolving,
  } = useResolveUrgent();

  const items = useMemo(
    () => data as OptimisticData<UrgentItemDTO>[] | undefined,
    [data]
  );

  const handleResolve = (id: string) => {
    resolveUrgent({ apartmentId, id });
  };

  return (
    <UrgentFeedView
      isLoading={isLoading}
      isError={isError}
      isResolving={isResolving}
      resolvingId={resolvingId?.id}
      items={items}
      t={t}
      handleResolve={handleResolve}
    />
  );
};

interface UrgentFeedViewProps {
  isLoading: boolean;
  isError: boolean;
  isResolving: boolean;
  resolvingId?: string;
  items: OptimisticData<UrgentItemDTO>[] | undefined;
  t: TranslationKeys;
  handleResolve: (id: string) => void;
}

const UrgentFeedView = ({
  isLoading,
  isError,
  isResolving,
  resolvingId,
  items,
  t,
  handleResolve,
}: UrgentFeedViewProps) => {
  return (
    <ul className="flex flex-col gap-3 py-3 px-4 overflow-y-scroll">
      {/*TODO urgentebis skeletoni*/}
      {isLoading && <div></div>}
      {isError && (
        <div className="flex items-center justify-center p-4 text-error">
          Error loading urgent items
        </div>
      )}
      {items && items.length === 0 && <UrgentEmptyState t={t} />}
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <UrgentCard
            key={item.id}
            {...mapUrgentItemToCardProps(
              item,
              handleResolve,
              isResolving ? (resolvingId ?? null) : null,
              t
            )}
          />
        ))}
    </ul>
  );
};

export const UrgentFeedCompactContainer = ({
  onItemClick,
}: {
  onItemClick?: (id: string) => void;
}) => {
  const t = useTranslation();
  const { data, isLoading, isError } = useFetchUrgent();

  const items = useMemo(
    () => data as OptimisticData<UrgentItemDTO>[] | undefined,
    [data]
  );

  return (
    <UrgentFeedCompactView
      isLoading={isLoading}
      isError={isError}
      items={items}
      t={t}
      onItemClick={onItemClick}
    />
  );
};

interface UrgentFeedCompactViewProps {
  isLoading: boolean;
  isError: boolean;
  items: OptimisticData<UrgentItemDTO>[] | undefined;
  t: TranslationKeys;
  onItemClick?: (id: string) => void;
}

const UrgentFeedCompactView = ({
  isLoading,
  isError,
  items,
  t,
  onItemClick,
}: UrgentFeedCompactViewProps) => {
  return (
    <ul className="flex flex-col gap-2 p-2">
      {isLoading && <div></div>}
      {isError && (
        <div className="flex items-center justify-center p-3 text-urbancare-sm text-error">
          Error loading urgent items
        </div>
      )}
      {items && items.length === 0 && <UrgentEmptyState t={t} />}
      {items &&
        items.length > 0 &&
        items.map((item) => {
          const status: UrgentCardStatus = item.resolved
            ? 'resolved'
            : 'urgent';
          return (
            <UrgentCardCompact
              key={item.id}
              status={status}
              icon={item.resolved ? '✓' : '🆘'}
              label={item.resolved ? t.urgent.completed : t.urgent.sos}
              title={`${item.userInfo.name} ${item.userInfo.surname}`}
              isPending={item._isPending}
              onClick={onItemClick ? () => onItemClick(item.id) : undefined}
            />
          );
        })}
    </ul>
  );
};
