'use client';

import React from 'react';
import { RegisterHeader } from '@/components/auth/register/RegisterHeader';
import { RegisterFormCard } from '@/components/auth/register/RegisterFormCard';
import DynamicPanel from '@/components/home/dynamic-panel/DynamicPanel';
import { RegisterFooter } from '@/components/auth/register/RegisterFooter';

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-scroll">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-light rounded-full blur-[80px] opacity-40 animate-blob" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-gradient-secondary-purple rounded-full blur-[80px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-12 right-[10%] w-52 h-52 bg-primary-hover rounded-full blur-[80px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      <DynamicPanel
        className={
          'relative z-10 min-h-screen px-6 py-6 max-w-md lg:max-w-lg mx-auto'
        }
      >
        <DynamicPanel.Header>
          <RegisterHeader />
        </DynamicPanel.Header>
        <DynamicPanel.Body>
          <RegisterFormCard />
        </DynamicPanel.Body>
        <DynamicPanel.Footer>
          <RegisterFooter />
        </DynamicPanel.Footer>
      </DynamicPanel>
    </div>
  );
}
