'use client';

import React from 'react';
import { LoginFormCard } from '@/components/auth/login/LoginFormCard';
import { LoginHeader } from '@/components/auth/login/LoginHeader';
import { LoginFooter } from '@/components/auth/login/LoginFooter';
import DynamicPanel from '@/components/home/dynamic-panel/DynamicPanel';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-scroll">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgb(var(--color-border-light)) 1px, transparent 1px),
              linear-gradient(90deg, rgb(var(--color-border-light)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Animated Blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-light rounded-full blur-[80px] opacity-40 animate-blob" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-gradient-secondary-purple rounded-full blur-[80px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-12 right-[10%] w-52 h-52 bg-primary-hover rounded-full blur-[80px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      <DynamicPanel
        className={'relative z-10 min-h-screen px-6 py-6 max-w-md mx-auto'}
      >
        <DynamicPanel.Header>
          <LoginHeader />
        </DynamicPanel.Header>
        <DynamicPanel.Body>
          <LoginFormCard />
        </DynamicPanel.Body>
        <DynamicPanel.Footer>
          <LoginFooter />
        </DynamicPanel.Footer>
      </DynamicPanel>
    </div>
  );
}
