import type {Metadata} from "next";
import "./globals.scss";
import React from "react";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import MyThemeProvider from "@/components/common/provider/MyThemeProvider";
import {headers} from "next/headers";
import ResponsiveLayout from "@/components/common/ResponsiveLayout";
import {ChatProvider} from "@/components/provider/ChatProvider";
import AuthProvider from "@/components/provider/AuthProvider";

export const metadata: Metadata = {
    title: "urbancare",
    description: "urbancare",
};

export interface Children {
    children: React.ReactNode;
}

export interface Basic {
    className?: string;
    children?: React.ReactNode;
}

export default async function RootLayout({children}: Children) {
    const headersList = await headers();
    const agent = headersList.get("user-agent") || "";
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(agent);

    return (
        <html
            lang="en"
            style={{colorScheme: ""}}
            suppressHydrationWarning
        >
        <body className="h-dvh w-dvw antialiased bg-background text-sky-950" suppressHydrationWarning>
        <ReactQueryProvider>
            <MyThemeProvider>
                <AuthProvider>
                    <ResponsiveLayout initialIsMobile={isMobile}>
                        <ChatProvider>
                            {children}
                        </ChatProvider>
                    </ResponsiveLayout>
                </AuthProvider>
            </MyThemeProvider>
        </ReactQueryProvider>
        </body>
        </html>
    )
}
