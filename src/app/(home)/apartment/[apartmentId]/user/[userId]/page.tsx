'use client';

import React, { use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CalendarDays, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useApartmentMembers } from '@/hooks/query/apartment/use-apartment-members';
import { getClientFileUrl } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

interface UserPageProps {
  params: Promise<{ apartmentId: string; userId: string }>;
}

const formatDateLong = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function UserPage({ params }: UserPageProps) {
  const { apartmentId, userId } = use(params);
  const t = useTranslation();
  const router = useRouter();
  const { data: members, isLoading, error } = useApartmentMembers(apartmentId);
  const member = members?.find((m) => m.userId === userId);

  return (
    <div className="flex-1 w-full p-3 lg:p-0 space-y-3">
      <button
        type="button"
        onClick={() => router.back()}
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-1 urbancare-rounded-md',
          'urbancare-text-sm font-medium text-text-secondary',
          'lg:hover:text-text-primary transition-colors'
        )}
      >
        <ArrowLeft className="w-4 h-4" />
        {t.common.goBack}
      </button>

      <section
        className={cn(
          'urbancare-rounded-3xl overflow-hidden border border-border',
          'bg-surface shadow-sm shadow-shadow/5'
        )}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 px-6 py-10">
            <div className="w-24 h-24 urbancare-rounded-full bg-surface-container animate-pulse" />
            <div className="h-5 bg-surface-container urbancare-rounded-full w-40 animate-pulse" />
            <div className="h-4 bg-surface-container urbancare-rounded-full w-28 animate-pulse" />
          </div>
        ) : error || !member ? (
          <div className="px-4 py-10 text-center urbancare-text-sm text-text-tertiary">
            {t.common.error}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 px-6 py-8">
            <Avatar className="w-24 h-24 urbancare-rounded-full ring-2 ring-border shrink-0">
              {member.userInfo?.profileImageId && (
                <Image
                  src={getClientFileUrl(member.userInfo.profileImageId)}
                  alt={`${member.userInfo?.name ?? ''} ${member.userInfo?.surname ?? ''}`}
                  fill
                  className="object-cover"
                />
              )}
              <AvatarFallback className="urbancare-text-2xl font-semibold bg-primary-container text-primary">
                {member.userInfo?.name?.[0] ?? ''}
                {member.userInfo?.surname?.[0] ?? ''}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="urbancare-text-2xl font-bold text-text-primary leading-tight-georgian">
                {member.userInfo?.name} {member.userInfo?.surname}
              </h1>
              {member.isManager && (
                <span
                  className={cn(
                    'mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 urbancare-rounded-lg',
                    'bg-primary/10 text-primary urbancare-text-xs font-bold uppercase tracking-wide'
                  )}
                >
                  <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.75} />
                  {t.role.manager}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 urbancare-text-sm text-text-tertiary">
              <CalendarDays className="w-4 h-4" />
              <span>
                {t.user.memberSince} {formatDateLong(member.createdAt)}
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
