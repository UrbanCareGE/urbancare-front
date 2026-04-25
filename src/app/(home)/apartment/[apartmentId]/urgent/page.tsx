'use client';

import React from 'react';
import { UrgentFeedContainer } from '@/components/urgent/UrgentFeed';
import CreateUrgentButtonMobile from '@/components/urgent/CreateUrgentButton.mobile';
import { useResponsive } from '@/components/common/layouts/ResponsiveLayout';
import { CreateUrgentButtonDesktop } from '@/components/urgent/CreateUrgentButton.desktop';

const Page = () => {
  const responsive = useResponsive();
  return (
    <div className={'flex flex-col w-full'}>
      {responsive.isDesktop && <CreateUrgentButtonDesktop/>}
      <UrgentFeedContainer />
      {responsive.isMobile && <CreateUrgentButtonMobile />}
    </div>
  );
};

export default Page;
