'use client';

import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Loader } from 'lucide-react';
import { cn, ExtractUserInitials } from '@/lib/utils';
import { getClientFileUrl } from '@/lib/api-client';
import { UserSnapshotDTO } from '@/model/dto/auth.dto';
import {
  UrgentCardStatus,
  urgentStatusConfig,
} from '@/components/urgent/urgent-data';
import { useAuth } from '@/components/provider/AuthProvider';
import { useTranslation } from '@/i18n';

const StatusDot = ({ status }: { status: UrgentCardStatus }) => {
  const color = status === 'resolved' ? 'bg-success' : 'bg-error';
  return (
    <span className="relative inline-flex w-2 h-2">
      <span className={cn('absolute inset-0 urbancare-rounded-full opacity-60 animate-ping', color)} />
      <span className={cn('relative inline-flex w-2 h-2 urbancare-rounded-full', color)} />
    </span>
  );
};

const StatusBand = ({
  status,
  timeText,
}: {
  status: UrgentCardStatus;
  timeText: string;
}) => {
  const config = urgentStatusConfig[status];
  const t = useTranslation();
  const label = status === 'urgent' ? t.urgent.sos : t.urgent.resolved;

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-2.5 border-b',
        config.bandBg,
        config.bandBorder
      )}
    >
      <div className={cn('flex items-center gap-2', config.bandText)}>
        <StatusDot status={status} />
        <span className="urbancare-text-xs font-bold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>
      <div
        className={cn(
          'flex items-center gap-1 urbancare-text-xs font-medium tracking-wide',
          config.bandText
        )}
      >
        <Clock className="w-3 h-3" />
        {timeText}
      </div>
    </div>
  );
};

const UserAvatarLine = ({
  user,
  size = 'md',
}: {
  user: UserSnapshotDTO;
  size?: 'sm' | 'md';
}) => {
  const router = useRouter();
  const params = useParams<{ apartmentId: string }>();
  const initials = ExtractUserInitials(user);

  const goToUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id || !params?.apartmentId) return;
    router.push(`/apartment/${params.apartmentId}/user/${user.id}`);
  };

  return (
    <div
      onClick={goToUser}
      className="flex items-center gap-2.5 min-w-0 cursor-pointer"
    >
      <Avatar
        className={cn(
          'urbancare-rounded-full ring-2 ring-border shrink-0',
          size === 'md' ? 'w-8 h-8' : 'w-6 h-6'
        )}
      >
        <Image
          src={getClientFileUrl(user.profileImageId)}
          alt={`${user.name ?? ''} ${user.surname ?? ''}`}
          fill
          className="object-cover"
        />
        <AvatarFallback className="urbancare-text-xs font-semibold bg-primary-container text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span
        className={cn(
          'font-semibold text-text-primary truncate lg:hover:underline',
          size === 'md' ? 'urbancare-text-sm' : 'urbancare-text-xs'
        )}
      >
        {user.name} {user.surname}
      </span>
    </div>
  );
};

export type UrgentCardProps = {
  status: UrgentCardStatus;
  user: UserSnapshotDTO;
  message: string;
  timeText: string;
  onResolve?: () => void;
  isResolving?: boolean;
  isPending?: boolean;
  className?: string;
};

export const UrgentCard = ({
  status,
  user,
  message,
  timeText,
  onResolve,
  isResolving,
  isPending,
  className,
}: UrgentCardProps) => {
  const { user: currentUser } = useAuth();
  const t = useTranslation();
  const config = urgentStatusConfig[status];
  const canResolve =
    status !== 'resolved' &&
    currentUser.id === user.id &&
    Boolean(onResolve);

  return (
    <Card
      className={cn(
        'overflow-hidden border-none bg-surface',
        'transition-all duration-200 lg:hover:shadow-md',
        status === 'resolved' && 'opacity-90',
        isPending && 'opacity-80 pointer-events-none',
        className
      )}
    >
      <StatusBand status={status} timeText={timeText} />

      <div className="px-4 py-4 space-y-3.5">
        <p
          className={cn(
            'my-1.5 pl-3 border-l-2 urbancare-text-base text-text-primary font-medium leading-relaxed',
            'whitespace-pre-wrap break-words',
            config.accent
          )}
        >
          {message}
        </p>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <UserAvatarLine user={user} />
          {canResolve && (
            <Button
              onClick={onResolve}
              disabled={isResolving}
              className={cn(
                'h-9 px-4 urbancare-rounded-lg gap-1.5',
                'urbancare-text-xs font-bold uppercase tracking-[0.08em]',
                'bg-error/10 text-error border border-error/20',
                'lg:hover:bg-error/15 lg:hover:border-error/35',
                'transition-colors duration-200',
                'disabled:opacity-60 disabled:pointer-events-none'
              )}
            >
              {isResolving ? (
                <>
                  <Loader className="animate-spin w-3.5 h-3.5" strokeWidth={2.5} />
                  {t.urgent.sending}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                  {t.urgent.resolved}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export type UrgentCardCompactProps = {
  status: UrgentCardStatus;
  user: UserSnapshotDTO;
  content: string;
  timeText: string;
  isPending?: boolean;
  className?: string;
  onClick?: () => void;
};

export const UrgentCardCompact = ({
  status,
  user,
  content,
  timeText,
  isPending,
  className,
  onClick,
}: UrgentCardCompactProps) => {
  const router = useRouter();
  const params = useParams<{ apartmentId: string }>();
  const goToUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id || !params?.apartmentId) return;
    router.push(`/apartment/${params.apartmentId}/user/${user.id}`);
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 urbancare-rounded-2xl border-none bg-surface-variant px-3 py-2.5',
        'transition-all duration-200',
        status === 'resolved' && 'opacity-90',
        isPending && 'opacity-80 pointer-events-none',
        onClick && 'cursor-pointer lg:hover:shadow-md',
        className
      )}
    >
      <StatusDot status={status} />
      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
        <p className="urbancare-text-sm font-semibold text-text-primary truncate">
          {content}
        </p>
        <span
          onClick={goToUser}
          className="urbancare-text-xs text-text-tertiary truncate cursor-pointer lg:hover:underline lg:hover:text-text-primary"
        >
          {user.name} {user.surname}
        </span>
      </div>
      <span className="ml-auto urbancare-text-xs text-text-tertiary shrink-0 self-start">
        {timeText}
      </span>
    </Card>
  );
};

export default UrgentCard;
