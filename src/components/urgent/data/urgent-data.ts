// Types
import { OptimisticData } from '@/model/common.dto';
import { UrgentItemDTO } from '@/model/urgent.dto';
import { formatTime } from '@/lib/utils';

export type UrgentCardStatus = 'urgent' | 'in-progress' | 'resolved';

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
  pendingLabel?: string;
  variant: 'primary' | 'secondary' | 'success';
  onClick?: () => void;
  isPending?: boolean;
}

// Status configuration
export const urgentStatusConfig = {
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

export const urgentResponderColors = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  muted: 'bg-surface-container text-text-secondary',
};

