'use client';

import React from 'react';
import {Card} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

// Types
export type UrgentCardStatus = 'urgent' | 'in-progress' | 'resolved';

export interface UrgentCardProps {
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
    className?: string;
}

export interface MetaItemProps {
    icon: string;
    text: string;
}

export interface ResponderProps {
    initials: string;
    color: 'primary' | 'secondary' | 'tertiary' | 'muted';
}

export interface ActionButtonProps {
    icon?: string;
    label: string;
    variant: 'primary' | 'secondary' | 'success';
    onClick?: () => void;
}

// Status configuration
const statusConfig = {
    urgent: {
        borderColor: 'border-l-error',
        badgeBg: 'bg-error/10',
        badgeText: 'text-error',
        iconBg: 'bg-error/10',
        labelColor: 'text-error',
        pulseColor: 'bg-error',
        showPulse: true,
        badgeLabel: 'Urgent',
    },
    'in-progress': {
        borderColor: 'border-l-warning',
        badgeBg: 'bg-warning/10',
        badgeText: 'text-warning',
        iconBg: 'bg-warning/10',
        labelColor: 'text-warning',
        pulseColor: 'bg-warning',
        showPulse: true,
        badgeLabel: 'In Progress',
    },
    resolved: {
        borderColor: 'border-l-success',
        badgeBg: 'bg-success/10',
        badgeText: 'text-success',
        iconBg: 'bg-success/10',
        labelColor: 'text-success',
        pulseColor: 'bg-success',
        showPulse: false,
        badgeLabel: 'Resolved',
    },
};

const responderColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    muted: 'bg-surface-container text-text-secondary',
};

// Sub-components
const PulseDot = ({color, className}: { color: string; className?: string }) => (
    <span
        className={cn(
            'w-2 h-2 rounded-full animate-pulse',
            color,
            className
        )}
    />
);

const StatusBadge = ({status, label}: { status: UrgentCardStatus; label?: string }) => {
    const config = statusConfig[status];

    return (
        <Badge
            variant="outline"
            className={cn(
                'gap-1.5 border-0 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide',
                config.badgeBg,
                config.badgeText
            )}
        >
            {config.showPulse && <PulseDot color={config.pulseColor}/>}
            {status === 'resolved' && '✓ '}
            {label || config.badgeLabel}
        </Badge>
    );
};

const MetaItem = ({icon, text}: MetaItemProps) => (
    <div className="flex items-center gap-1.5 text-sm text-text-tertiary">
        <span className="text-sm">{icon}</span>
        <span>{text}</span>
    </div>
);

const AvatarStack = ({responders}: { responders: ResponderProps[] }) => (
    <div className="flex">
        {responders.map((responder, index) => (
            <Avatar
                key={index}
                className={cn(
                    'w-7 h-7 border-2 border-surface text-xs font-semibold text-white',
                    responderColors[responder.color],
                    index > 0 && '-ml-2'
                )}
            >
                <AvatarFallback
                    className={cn(
                        'text-xs font-semibold text-white',
                        responderColors[responder.color]
                    )}
                >
                    {responder.initials}
                </AvatarFallback>
            </Avatar>
        ))}
    </div>
);

const ResolvedBanner = ({message}: { message: string }) => (
    <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg mt-3">
        <span className="text-sm text-success font-medium">{message}</span>
    </div>
);

const UrgentCardIcon = ({icon, status}: { icon: string; status: UrgentCardStatus }) => {
    const config = statusConfig[status];

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

const UrgentCardHeader = ({
    status,
    icon,
    label,
    title,
    badgeLabel,
}: {
    status: UrgentCardStatus;
    icon: string;
    label: string;
    title: string;
    badgeLabel?: string;
}) => {
    const config = statusConfig[status];

    return (
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
                <UrgentCardIcon icon={icon} status={status}/>
                <div>
                    <div className={cn('text-xs font-semibold uppercase tracking-wide', config.labelColor)}>
                        {label}
                    </div>
                    <div className="text-base font-semibold text-text-primary">
                        {title}
                    </div>
                </div>
            </div>
            <StatusBadge status={status} label={badgeLabel}/>
        </div>
    );
};

const UrgentCardContent = ({
    message,
    meta,
    resolvedMessage,
}: {
    message: string;
    meta: MetaItemProps[];
    resolvedMessage?: string;
}) => (
    <div className="mb-4">
        <p className="text-sm text-text-secondary mb-3 leading-relaxed">
            {message}
        </p>
        <div className="flex flex-wrap gap-4">
            {meta.map((item, index) => (
                <MetaItem key={index} icon={item.icon} text={item.text}/>
            ))}
        </div>
        {resolvedMessage && <ResolvedBanner message={resolvedMessage}/>}
    </div>
);

const UrgentCardFooter = ({
    responders,
    responderText,
    actions,
}: {
    responders: ResponderProps[];
    responderText: string;
    actions: ActionButtonProps[];
}) => {
    const buttonVariants = {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-surface-variant border border-border hover:bg-surface-container',
        success: 'bg-success text-white hover:bg-success/90',
    };

    return (
        <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
                <AvatarStack responders={responders}/>
                <span className="text-xs text-text-secondary">{responderText}</span>
            </div>
            <div className="flex gap-2">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        variant="reaction"
                        onClick={action.onClick}
                        className={cn(
                            'h-9 px-4 rounded-lg text-sm font-medium',
                            buttonVariants[action.variant]
                        )}
                    >
                        {action.icon && <span>{action.icon}</span>}
                        {action.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

// Main component
export const NewUrgentCard = ({
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
    className,
}: UrgentCardProps) => {
    const config = statusConfig[status];

    return (
        <Card
            className={cn(
                'relative p-5 border-l-4 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg',
                config.borderColor,
                status === 'resolved' && 'opacity-85',
                className
            )}
        >
            {/* Urgent pulse line at top */}
            {status === 'urgent' && (
                <div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-error to-transparent animate-pulse"
                />
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
            />
        </Card>
    );
};

export default NewUrgentCard;
