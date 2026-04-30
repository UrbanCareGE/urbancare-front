'use client';

import React from 'react';
import { ShieldCheck, Users } from 'lucide-react';
import { useApartmentMembers } from '@/hooks/query/apartment/use-apartment-members';
import { useAuth } from '@/components/provider/AuthProvider';
import { UserAvatarView } from '@/components/common/avatar/UserAvatar';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

export default function UsersPage() {
  const t = useTranslation();
  const { user } = useAuth();
  const apartmentId = user.selectedApartmentId!;
  const { data, isLoading } = useApartmentMembers(apartmentId);

  return (
    <div className="flex-1 w-full p-3 lg:p-0 space-y-3">
      <section
        className={cn(
          'urbancare-rounded-3xl overflow-hidden border border-border',
          'bg-surface shadow-sm shadow-shadow/5'
        )}
      >
        <div className="px-4 py-3 bg-surface-variant border-b border-border flex items-center gap-2">
          <div className="w-10 h-10 urbancare-rounded-xl bg-primary-container text-primary flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="flex-1 font-semibold urbancare-text-base text-text-primary leading-tight-georgian">
            {t.sidebar.members}
          </h3>
          <span className="urbancare-text-sm font-medium text-text-tertiary tabular-nums">
            {data?.length ?? 0}
          </span>
        </div>

        {isLoading ? (
          <ul className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 urbancare-rounded-full bg-surface-container animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-surface-container urbancare-rounded-full w-1/3 animate-pulse" />
                  <div className="h-3 bg-surface-container urbancare-rounded-full w-1/5 animate-pulse" />
                </div>
              </li>
            ))}
          </ul>
        ) : !data?.length ? (
          <div className="px-4 py-8 text-center urbancare-text-sm text-text-tertiary">
            {t.common.error}
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {data.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-3 px-4 py-3 transition-colors lg:hover:bg-surface-hover"
              >
                <UserAvatarView
                  firstName={member.userInfo?.name}
                  surname={member.userInfo?.surname}
                  profileImageId={member.userInfo?.profileImageId}
                />
                <div className="flex-1 min-w-0">
                  <p className="urbancare-text-base font-semibold text-text-primary truncate leading-tight-georgian">
                    {member.userInfo?.name} {member.userInfo?.surname}
                  </p>
                </div>
                {member.isManager && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 urbancare-rounded-lg shrink-0',
                      'bg-primary/10 text-primary urbancare-text-xs font-bold uppercase tracking-wide'
                    )}
                  >
                    <ShieldCheck className="w-3 h-3" strokeWidth={2.75} />
                    {t.role.manager}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
