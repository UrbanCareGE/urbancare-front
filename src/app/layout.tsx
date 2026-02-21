import type { Metadata } from 'next';
import './globals.scss';
import React, { Suspense } from 'react';
import ReactQueryProvider from '@/components/provider/ReactQueryProvider';
import MyThemeProvider from '@/components/provider/MyThemeProvider';
import ResponsiveLayoutServer from '@/components/common/layouts/ResponsiveLayoutServer';
import AuthProvider from '@/components/provider/AuthProvider';
import { PulsingLoader } from '@/components/common/loader/GlobalLoader';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'urbancare',
  description: 'urbancare',
};

export interface Children {
  children: React.ReactNode;
}

export interface Basic {
  className?: string;
  children?: React.ReactNode;
}

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" style={{ colorScheme: '' }} suppressHydrationWarning>
      <body
        className="h-dvh w-dvw antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <MyThemeProvider>
            <AuthProvider>
              <Suspense fallback={<PulsingLoader />}>
                <ResponsiveLayoutServer>{children}</ResponsiveLayoutServer>
              </Suspense>
              <Toaster position="bottom-right" richColors />
            </AuthProvider>
          </MyThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
