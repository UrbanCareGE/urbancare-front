import type {Metadata} from "next";
import "./globals.scss";


export const metadata: Metadata = {
    title: "urbancare",
    description: "urbancare",
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`dark`}
            style={{colorScheme: ""}}
            suppressHydrationWarning={true}
        >
        <body className="min-h-screen w-full flex flex-col antialiased">
        {children}
        </body>
        </html>
    )
}
