'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export default function MyThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}
