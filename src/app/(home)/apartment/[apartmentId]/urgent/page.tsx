'use client';

import React from 'react';
import UrgentList from '@/components/urgent/mobile/UrgentList';
import AddUrgent from '@/components/urgent/mobile/AddUrgent';

const Page = () => {
  return (
    <div className={'flex flex-col bg-background w-full h-full'}>
      <AddUrgent />
      <UrgentList />
    </div>
  );
};

export default Page;
