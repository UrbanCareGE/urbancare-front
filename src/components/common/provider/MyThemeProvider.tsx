"use client";

import { ThemeProvider } from "next-themes";

export default function MyThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" enableSystem={false}>
            {children}
        </ThemeProvider>
    );
}
