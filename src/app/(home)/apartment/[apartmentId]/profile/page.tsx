'use client';

import React from 'react';
import DynamicPanel from '@/components/home/dynamic-panel/DynamicPanel';
import { ProfileImageUpload } from '@/components/profile/ProfileImageUpload';
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm';
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm';
import { Separator } from '@/components/ui/separator';
import PersonalCarsForm from '@/components/profile/PersonalCarsForm';

function Page() {
  return (
    <DynamicPanel className="bg-background">
      <DynamicPanel.Separator />
      <DynamicPanel.Body className="space-y-6 py-6">
        <ProfileImageUpload />
        <DynamicPanel.Separator />
        <PersonalInfoForm />
        <DynamicPanel.Separator />
        <PersonalCarsForm />
        <DynamicPanel.Separator />
        <ChangePasswordForm />
      </DynamicPanel.Body>
    </DynamicPanel>
  );
}

export default Page;
