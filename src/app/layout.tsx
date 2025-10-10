import type {Metadata} from "next";
import "./globals.scss";
import React from "react";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import MyThemeProvider from "@/components/common/provider/MyThemeProvider";
import {headers} from "next/headers";
import ResponsiveLayout from "@/components/common/ResponsiveLayout";

export const metadata: Metadata = {
    title: "urbancare",
    description: "urbancare",
};

export interface Children {
    children: React.ReactNode;
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
            <body className="h-screen w-full flex flex-col antialiased" suppressHydrationWarning>
                <ReactQueryProvider>
                    <MyThemeProvider>
                        <ResponsiveLayout initialIsMobile={isMobile}>
                            {children}
                        </ResponsiveLayout>
                    </MyThemeProvider>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
