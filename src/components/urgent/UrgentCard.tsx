'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import {
  ActionButtonProps,
  MetaItemProps,
  ResponderProps,
  UrgentCardStatus,
  urgentResponderColors,
  urgentStatusConfig,
} from '@/components/urgent/data/urgent-data';
import { useAuth } from '@/components/provider/AuthProvider';

const PulseDot = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => (
  <span
    className={cn('w-2 h-2 rounded-full animate-pulse', color, className)}
  />
);

const StatusBadge = ({
  status,
  label,
}: {
  status: UrgentCardStatus;
  label?: string;
}) => {
  const config = urgentStatusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn(
        'gap-1.5 border-0 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide',
        config.badgeBg,
        config.badgeText
      )}
    >
      {config.showPulse && <PulseDot color={config.pulseColor} />}
      {status === 'resolved' && '✓ '}
      {label || config.badgeLabel}
    </Badge>
  );
};

const MetaItem = ({ icon, text }: MetaItemProps) => (
  <div className="flex items-center gap-1.5 text-sm text-text-tertiary">
    <span className="text-sm">{icon}</span>
    <span>{text}</span>
  </div>
);

const AvatarStack = ({ responders }: { responders: ResponderProps[] }) => (
  <div className="flex">
    {responders.map((responder, index) => (
      <Avatar
        key={index}
        className={cn(
          'w-7 h-7 border-2 border-border text-xs font-semibold text-white',
          urgentResponderColors[responder.color],
          index > 0 && '-ml-2'
        )}
      >
        <AvatarFallback
          className={cn(
            'text-xs font-semibold text-white',
            urgentResponderColors[responder.color]
          )}
        >
          {responder.initials}
        </AvatarFallback>
      </Avatar>
    ))}
  </div>
);

const ResolvedBanner = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg mt-3">
    <span className="text-sm text-success font-medium">{message}</span>
  </div>
);

const UrgentCardIcon = ({
  icon,
  status,
}: {
  icon: string;
  status: UrgentCardStatus;
}) => {
  const config = urgentStatusConfig[status];

  return (
    <div
      className={cn(
        'w-9 h-9 rounded-xl flex items-center justify-center text-lg',
        config.iconBg
      )}
    >
      {icon}
    </div>
  );
};

type UrgentCardHeaderProps = {
  status: UrgentCardStatus;
  icon: string;
  label: string;
  title: string;
  badgeLabel?: string;
};

const UrgentCardHeader = ({
  status,
  icon,
  label,
  title,
  badgeLabel,
}: UrgentCardHeaderProps) => {
  const config = urgentStatusConfig[status];

  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <UrgentCardIcon icon={icon} status={status} />
        <div>
          <div
            className={cn(
              'text-xs font-semibold uppercase tracking-wide',
              config.labelColor
            )}
          >
            {label}
          </div>
          <div className="text-base font-semibold text-text-primary">
            {title}
          </div>
        </div>
      </div>
      <StatusBadge status={status} label={badgeLabel} />
    </div>
  );
};

type UrgentCardContentProps = {
  message: string;
  meta: MetaItemProps[];
  resolvedMessage?: string;
};

const UrgentCardContent = ({
  message,
  meta,
  resolvedMessage,
}: UrgentCardContentProps) => (
  <div className="mb-4">
    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
      {message}
    </p>
    <div className="flex flex-wrap gap-4">
      {meta.map((item, index) => (
        <MetaItem key={index} icon={item.icon} text={item.text} />
      ))}
    </div>
    {resolvedMessage && <ResolvedBanner message={resolvedMessage} />}
  </div>
);

type UrgentCardFooterProps = {
  responders: ResponderProps[];
  responderText: string;
  actions: ActionButtonProps[];
  issuerId: string;
};

const UrgentCardFooter = ({
  responders,
  responderText,
  actions,
  issuerId,
}: UrgentCardFooterProps) => {
  const { user } = useAuth();
  const buttonVariants = {
    primary: 'bg-primary text-white lg:hover:bg-primary/90',
    secondary: 'bg-primary text-white lg:hover:bg-primary/90',
    success: 'bg-success text-white lg:hover:bg-success/90',
  };

  return (
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <div className="flex items-center gap-2">
        <AvatarStack responders={responders} />
        <span className="text-xs text-text-secondary">{responderText}</span>
      </div>
      <div className="flex gap-2">
        {user.id === issuerId &&
          actions.map((action, index) => (
            <Button
              key={index}
              variant="reaction"
              onClick={action.onClick}
              disabled={action.isPending}
              className={cn(
                'h-9 px-4 rounded-lg text-sm font-medium',
                buttonVariants[action.variant]
              )}
            >
              {action.isPending ? (
                <>
                  <Loader className="animate-spin w-4 h-4" />
                  იგზავნება
                </>
              ) : (
                <>
                  {action.icon && <span>{action.icon}</span>}
                  {action.label}
                </>
              )}
            </Button>
          ))}
      </div>
    </div>
  );
};

export type UrgentCardProps = {
  status: UrgentCardStatus;
  icon: string;
  label: string;
  title: string;
  message: string;
  meta: MetaItemProps[];
  responders: ResponderProps[];
  responderText: string;
  actions: ActionButtonProps[];
  resolvedMessage?: string;
  issuerId: string;
  isPending?: boolean;
  className?: string;
};

export const UrgentCard = ({
  status,
  icon,
  label,
  title,
  message,
  meta,
  responders,
  responderText,
  actions,
  resolvedMessage,
  isPending,
  issuerId,
  className,
}: UrgentCardProps) => {
  const config = urgentStatusConfig[status];
  return (
    <Card
      className={cn(
        'relative p-5 border-l-4 overflow-hidden border-border transition-all lg:hover:-translate-y-0.5 lg:hover:shadow-lg',
        config.borderColor,
        status === 'resolved' && 'opacity-85',
        isPending && 'opacity-80 pointer-events-none',
        className
      )}
    >
      {/* Urgent pulse line at top */}
      {status === 'urgent' && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-error to-transparent animate-pulse" />
      )}

      <UrgentCardHeader
        status={status}
        icon={icon}
        label={label}
        title={title}
      />

      <UrgentCardContent
        message={message}
        meta={meta}
        resolvedMessage={resolvedMessage}
      />

      <UrgentCardFooter
        responders={responders}
        responderText={responderText}
        actions={actions}
        issuerId={issuerId}
      />
    </Card>
  );
};

export default UrgentCard;
