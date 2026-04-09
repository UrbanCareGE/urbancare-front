'use client';

import { use } from 'react';
import Link from 'next/link';
import { UrbanCareIcon } from '@/components/common/logo/AppLogo';
import { JoinBackground } from '@/components/join/JoinBackground';
import { JoinCard } from '@/components/join/JoinCard';
import { useTranslation } from '@/i18n';

interface JoinPageProps {
  params: Promise<{ code: string }>;
}

export default function JoinPage({ params }: JoinPageProps) {
  const { code } = use(params);
  console.log(code);
  const t = useTranslation();

  // TODO: Fetch apartment data by invite code
  // const { data: apartment, isLoading } = useApartmentByCode(code);

  // TODO: Handle join mutation
  // const { mutate: joinApartment, isPending } = useJoinApartment();
  // const handleJoin = () => joinApartment({ code });

  return (
    <>
      {/* Primary gradient background with cityscape */}
      <JoinBackground />

      {/* Top branding */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center pt-6 sm:pt-8">
        <Link href="/landing" className="flex items-center gap-2.5 group">
          <UrbanCareIcon className="w-9 h-9 sm:w-10 sm:h-10 bg-white/15 shadow-none" />
          <span className="text-urbancare-2xl sm:text-urbancare-3xl font-bold text-white tracking-tight">
            UrbanCare
          </span>
        </Link>
      </div>

      {/* Centered join card */}
      <main className="relative z-10 flex items-center justify-center px-4 py-20">
        <JoinCard
          code={code}
          apartmentName={undefined}
          apartmentImageId={undefined}
          membersCount={undefined}
          isLoading={false}
          isJoining={false}
          onJoin={() => {
            // TODO: call join mutation
          }}
        />
      </main>

      {/* Bottom branding */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center pb-5">
        <span className="text-urbancare-xs text-white/40 font-medium">
          {/*{t.joinPage.poweredBy}*/}
        </span>
      </div>
    </>
  );
}
