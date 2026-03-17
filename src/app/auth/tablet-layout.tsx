import React from 'react';

export default function TabletLayout({
                                       children,
                                     }: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden lg:hidden -z-10">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-light rounded-full blur-[80px] opacity-40 animate-blob" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-gradient-secondary-purple rounded-full blur-[80px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-12 right-[10%] w-52 h-52 bg-primary-hover rounded-full blur-[80px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <main className="flex-1 flex justify-center items-center px-4 py-6">
        {children}
      </main>
    </div>
  );
}
