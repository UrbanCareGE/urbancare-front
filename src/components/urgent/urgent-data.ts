export type UrgentCardStatus = 'urgent' | 'resolved';

export const urgentStatusConfig = {
  urgent: {
    bandBg: 'bg-error/[0.08]',
    bandText: 'text-error',
    bandBorder: 'border-error/15',
    accent: 'border-error/30',
    label: 'SOS',
  },
  resolved: {
    bandBg: 'bg-success/[0.08]',
    bandText: 'text-success',
    bandBorder: 'border-success/15',
    accent: 'border-success/25',
    label: 'Resolved',
  },
};
