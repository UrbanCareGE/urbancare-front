'use client';

import React from 'react';
import { UrgentFeedContainer } from '@/components/urgent/UrgentFeed';
import CreateUrgentButtonMobile from '@/components/urgent/CreateUrgentButton.mobile';

const Page = () => {
  return (
    <div className={'flex flex-col w-full'}>
      <UrgentFeedContainer />
      <CreateUrgentButtonMobile />
    </div>
  );
};

export default Page;
