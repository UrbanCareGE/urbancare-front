"use client"

import React from 'react';
import DynamicPanel from '@/components/home/dynamic-panel/DynamicPanel';
import {ProfileImageUpload} from '@/components/profile/ProfileImageUpload';
import {PersonalInfoForm} from '@/components/profile/PersonalInfoForm';
import {ChangePasswordForm} from '@/components/profile/ChangePasswordForm';
import {Separator} from '@/components/ui/separator';
import PersonalCarsForm from "@/components/profile/PersonalCarsForm";

function Page() {
    return (
        <DynamicPanel className="bg-background">
            <DynamicPanel.Header className="flex items-center justify-center">
                <h1 className="text-2xl font-bold">პროფილი</h1>
            </DynamicPanel.Header>

            <DynamicPanel.Separator/>

            <DynamicPanel.Body className="space-y-6 py-6">
                <ProfileImageUpload/>

                <Separator className="bg-gray-200"/>

                <PersonalInfoForm/>

                <Separator className="bg-gray-200"/>

                <PersonalCarsForm/>

                <Separator className="bg-gray-200"/>

                <ChangePasswordForm/>
            </DynamicPanel.Body>
        </DynamicPanel>
    );
}

export default Page;