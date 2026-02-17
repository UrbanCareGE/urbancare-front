// components/common/layouts/OverlayPage.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type OverlayContextType = {
  onClose: () => void;
};

const OverlayContext = createContext<OverlayContextType | null>(null);

const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) throw new Error('Must be used within OverlayPage');
  return context;
};

type OverlayPageProps = {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

const OverlayPageRoot = ({
  children,
  className,
  onClose,
}: OverlayPageProps) => {
  const router = useRouter();

  const handleClose = onClose ?? (() => router.back());

  return (
    <OverlayContext.Provider value={{ onClose: handleClose }}>
      <div
        className={cn(
          'fixed inset-0 z-[300] bg-background flex flex-col h-dvh w-dvw',
          className
        )}
      >
        {children}
      </div>
    </OverlayContext.Provider>
  );
};

// Header
type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
  showBack?: boolean;
  showClose?: boolean;
  title?: string;
};

const OverlayPageHeader = ({
  children,
  className,
  showBack = true,
  showClose = false,
  title,
}: HeaderProps) => {
  const { onClose } = useOverlay();

  return (
    <header
      className={cn(
        'h-20  flex items-center justify-between px-2 py-3 border-b bg-white shrink-0',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {showBack && <ArrowLeft className="w-7 h-7" onClick={onClose} />}
        {title && <h1 className="font-semibold text-lg">{title}</h1>}
        {children}
      </div>

      {showClose && (
        <button
          onClick={onClose}
          className="hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 w-1" />
        </button>
      )}
    </header>
  );
};

// Content (scrollable)
type ContentProps = {
  children: React.ReactNode;
  className?: string;
};

const OverlayPageContent = ({ children, className }: ContentProps) => {
  return (
    <main className={cn('flex-1 overflow-y-auto p-3 space-y-3', className)}>
      {children}
    </main>
  );
};

// Footer (fixed bottom)
type FooterProps = {
  children: React.ReactNode;
  className?: string;
};

const OverlayPageFooter = ({ children, className }: FooterProps) => {
  return (
    <footer className={cn('shrink-0 bg-white border-t', className)}>
      {children}
    </footer>
  );
};

export const OverlayPage = Object.assign(OverlayPageRoot, {
  Header: OverlayPageHeader,
  Content: OverlayPageContent,
  Footer: OverlayPageFooter,
});
