import React from "react";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center h-screen w-full overflow-hidden bg-gray-50">
            <div className="flex w-[1080px] h-[600px] rounded-3xl overflow-hidden bg-white">
                <div className="flex-1 flex h-full justify-center items-center p-8">
                    {children}
                </div>

                <div className="flex-1 flex h-full bg-primary p-8">
                    {/* Optional content */}
                </div>
            </div>
        </div>
    );
}
