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

// Root
type OverlayPageProps = {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

const OverlayPage = ({ children, className, onClose }: OverlayPageProps) => {
  const router = useRouter();

  const handleClose = onClose ?? (() => router.back());

  return (
    <OverlayContext.Provider value={{ onClose: handleClose }}>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-white flex flex-col h-dvh w-dvw',
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

const Header = ({
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
        'flex items-center justify-between px-4 py-3 border-b bg-white shrink-0',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onClose}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {title && <h1 className="font-semibold text-lg">{title}</h1>}
        {children}
      </div>

      {showClose && (
        <button
          onClick={onClose}
          className="p-2 -mr-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
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

const Content = ({ children, className }: ContentProps) => {
  return (
    <main className={cn('flex-1 overflow-y-auto', className)}>{children}</main>
  );
};

// Footer (fixed bottom)
type FooterProps = {
  children: React.ReactNode;
  className?: string;
};

const Footer = ({ children, className }: FooterProps) => {
  return (
    <footer className={cn('shrink-0 bg-white border-t', className)}>
      {children}
    </footer>
  );
};

OverlayPage.Header = Header;
OverlayPage.Content = Content;
OverlayPage.Footer = Footer;

export { OverlayPage };
