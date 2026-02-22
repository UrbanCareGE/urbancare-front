'use client';

import React from 'react';
import UrgentFeed from '@/components/urgent/UrgentFeed';
import CreateUrgentButtonMobile from '@/components/urgent/CreateUrgentButton.mobile';

const Page = () => {
  return (
    <div className={'flex flex-col'}>
      <UrgentFeed />
      <CreateUrgentButtonMobile />
    </div>
  );
};

export default Page;
