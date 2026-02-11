import React from 'react';

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-gray-50">
      <div className="w-[640px] flex flex-col h-auto justify-center items-center p-8 bg-white z-50 rounded-3xl">
        {children}
      </div>
    </div>
  );
}
