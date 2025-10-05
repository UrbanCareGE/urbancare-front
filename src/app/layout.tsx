import type {Metadata} from "next";
import "./globals.scss";
import React from "react";
import ReactQueryProvider from "@/components/provider/provider/ReactQueryProvider";
import MyThemeProvider from "@/components/common/provider/MyThemeProvider";
import {Inter} from "@next/font/google";

export const metadata: Metadata = {
    title: "urbancare",
    description: "urbancare",
};

const inter = Inter({subsets: ["latin"], variable: "--font-inter"});

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            style={{colorScheme: ""}}
            suppressHydrationWarning
            className={inter.variable}
        >
        <ReactQueryProvider>
            <body className="h-screen w-full flex flex-col font-sans antialiased" suppressHydrationWarning>
            <MyThemeProvider>
                {children}
            </MyThemeProvider>
            </body>
        </ReactQueryProvider>
        </html>
    )
}
