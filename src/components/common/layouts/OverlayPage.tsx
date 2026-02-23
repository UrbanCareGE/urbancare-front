// components/common/layouts/OverlayPage.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';
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
          'fixed inset-0 z-[100] bg-background flex flex-col h-dvh w-dvw',
          className
        )}
      >
        {children}
      </div>
    </OverlayContext.Provider>
  );
};

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
        'h-16 flex items-center justify-between px-2 py-3 border-b border-border bg-surface shrink-0',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <ArrowLeft className="w-7 h-7 text-icon" onClick={onClose} />
        )}
        {title && <h1 className="font-semibold text-lg">{title}</h1>}
        {children}
      </div>

      {showClose && (
        <button
          onClick={onClose}
          className="hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="h-5 w-1" />
        </button>
      )}
    </header>
  );
};

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

type FooterProps = {
  children: React.ReactNode;
  className?: string;
};

const OverlayPageFooter = ({ children, className }: FooterProps) => {
  return (
    <footer
      className={cn('shrink-0 bg-surface border-t border-border', className)}
    >
      {children}
    </footer>
  );
};

export const OverlayPage = Object.assign(OverlayPageRoot, {
  Header: OverlayPageHeader,
  Content: OverlayPageContent,
  Footer: OverlayPageFooter,
});
