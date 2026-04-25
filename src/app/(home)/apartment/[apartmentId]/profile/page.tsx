'use client';

import React from 'react';
import DynamicPanel from '@/components/home/dynamic-panel/DynamicPanel';
import { ProfileImageUpload } from '@/components/profile/ProfileImageUpload';
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm';
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm';
import PersonalCarsForm from '@/components/profile/PersonalCarsForm';

function Page() {
  return (
    <DynamicPanel>
      <DynamicPanel.Body className={'lg:px-0'}>
        <div className="w-full space-y-5 flex flex-col justify-center pt-4 lg:pt-0">
          <ProfileImageUpload />
          <PersonalInfoForm />
          <ChangePasswordForm />
          <PersonalCarsForm />
        </div>
      </DynamicPanel.Body>
    </DynamicPanel>
  );
}

export default Page;
