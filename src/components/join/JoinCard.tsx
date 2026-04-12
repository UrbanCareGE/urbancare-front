'use client';

import Image from 'next/image';
import { Building2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getClientFileUrl } from '@/lib/api-client';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

interface JoinCardProps {
  apartmentName?: string;
  apartmentImageId?: string;
  membersCount?: number;
  isLoading?: boolean;
  isJoining?: boolean;
  onJoin?: () => void;
  code: string;
}

export function JoinCard({
  apartmentName,
  apartmentImageId,
  membersCount,
  isLoading,
  isJoining,
  onJoin,
  code,
}: JoinCardProps) {
  const t = useTranslation();

  if (isLoading) {
    return <JoinCardSkeleton />;
  }

  return (
    <Card className="w-full max-w-[420px] border-border rounded-urbancare-4xl bg-surface shadow-2xl shadow-black/20 animate-slide-up">
      <CardContent className="p-6 sm:p-8 flex flex-col items-center">
        {/* Apartment Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-urbancare-3xl overflow-hidden ring-4 ring-primary/20 shadow-lg mb-5">
          {apartmentImageId ? (
            <Image
              src={getClientFileUrl(apartmentImageId)}
              alt={apartmentName || ''}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-container flex items-center justify-center">
              <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
          )}
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-urbancare-full bg-primary/10 text-primary text-urbancare-sm font-medium mb-4">
          <Building2 className="w-3.5 h-3.5" />
          {t.join.residentialBuilding}
        </span>

        {/* Apartment Name */}
        <h1 className="text-urbancare-5xl sm:text-urbancare-6xl font-bold text-text-primary text-center mb-1.5">
          {apartmentName}
        </h1>

        {/* Members count */}
        {membersCount !== undefined && (
          <div className="flex items-center gap-1.5 text-text-secondary text-urbancare-base mb-5">
            <Users className="w-4 h-4" />
            <span>
              {t.joinPage.membersCount.replace('{count}', String(membersCount))}
            </span>
          </div>
        )}

        {/* Invitation text */}
        <div className="w-full bg-surface-secondary rounded-urbancare-2xl p-4 mb-6">
          <p className="text-urbancare-xl font-semibold text-primary text-center mb-1">
            {t.joinPage.youAreInvited}
          </p>
          <p className="text-urbancare-sm text-text-secondary text-center leading-relaxed">
            {t.joinPage.joinDescription}
          </p>
        </div>

        {/* Join Button */}
        <Button
          onClick={onJoin}
          disabled={isJoining}
          className={cn(
            'w-full h-14 rounded-urbancare-3xl text-urbancare-2xl font-semibold',
            'bg-gradient-primary',
            'shadow-[0_4px_20px_rgba(var(--color-primary)/0.35)]',
            'active:scale-[0.98]',
            'transition-all duration-300',
            'disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0'
          )}
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
          <span className="relative z-10">
            {isJoining ? t.joinPage.joining : t.joinPage.joinNow}
          </span>
        </Button>

        {/* Invite code display */}
        <p className="text-urbancare-xs text-text-tertiary mt-4 font-mono tracking-wider">
          {code}
        </p>
      </CardContent>
    </Card>
  );
}

function JoinCardSkeleton() {
  return (
    <Card className="w-full max-w-[420px] border-border rounded-urbancare-4xl bg-surface shadow-2xl shadow-black/20 animate-slide-up">
      <CardContent className="p-6 sm:p-8 flex flex-col items-center">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-urbancare-3xl bg-surface-container animate-pulse mb-5" />
        <div className="h-5 w-32 rounded-urbancare-full bg-surface-container animate-pulse mb-4" />
        <div className="h-7 w-48 rounded-urbancare-lg bg-surface-container animate-pulse mb-1.5" />
        <div className="h-4 w-24 rounded-urbancare-md bg-surface-container animate-pulse mb-5" />
        <div className="w-full h-24 rounded-urbancare-2xl bg-surface-container animate-pulse mb-6" />
        <div className="w-full h-14 rounded-urbancare-3xl bg-surface-container animate-pulse" />
      </CardContent>
    </Card>
  );
}
