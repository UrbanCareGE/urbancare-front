'use client';

import React from 'react';
import UrgentList from '@/components/urgent/UrgentList';
import CreateUrgentButtonMobile from '@/components/urgent/CreateUrgentButton.mobile';

const Page = () => {
  return (
    <div className={'flex flex-col'}>
      <UrgentList />
      <CreateUrgentButtonMobile />
    </div>
  );
};

export default Page;
