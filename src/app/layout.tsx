import type {Metadata} from "next";
import "./globals.scss";
import React from "react";
import ReactQueryProvider from "@/components/provider/provider/ReactQueryProvider";
import MyThemeProvider from "@/components/common/provider/MyThemeProvider";
import SessionProvider from "@/components/provider/provider/SessionProvider";

export const metadata: Metadata = {
    title: "urbancare",
    description: "urbancare",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            style={{colorScheme: ""}}
            suppressHydrationWarning
        >
        <ReactQueryProvider>
            <body className="h-screen w-full flex flex-col antialiased" suppressHydrationWarning>
            <MyThemeProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </MyThemeProvider>
            </body>
        </ReactQueryProvider>
        </html>
    )
}
