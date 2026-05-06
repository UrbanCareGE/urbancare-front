import type { Metadata } from 'next';
import './globals.scss';
import React from 'react';
import ReactQueryProvider from '@/components/provider/ReactQueryProvider';
import MyThemeProvider from '@/components/provider/MyThemeProvider';
import ResponsiveLayoutServer from '@/components/common/layouts/ResponsiveLayoutServer';
import AuthProvider from '@/components/provider/AuthProvider';
import { LanguageProvider } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'urbancare',
  description: 'urbancare',
  icons: {
    icon: '/logo.svg',
  },
};

export interface Children {
  children: React.ReactNode;
}

export interface Basic {
  className?: string;
  children?: React.ReactNode;
}

export default async function RootLayout({ children }: Children) {
  const initialLocale = await getServerLocale();
  return (
    <html
      lang={initialLocale}
      className="h-dvh overflow-hidden dark"
      suppressHydrationWarning
    >
      <body
        className="h-dvh flex flex-col antialiased bg-background text-foreground overflow-hidden"
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <MyThemeProvider>
            <LanguageProvider initialLocale={initialLocale}>
              <AuthProvider>
                <ResponsiveLayoutServer>{children}</ResponsiveLayoutServer>
                <Toaster position="bottom-right" richColors />
              </AuthProvider>
            </LanguageProvider>
          </MyThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
