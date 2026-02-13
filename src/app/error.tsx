'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporting service (Sentry, etc.)
    console.error('[UrbanCare Error]', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#BBDEFB] rounded-full blur-[80px] opacity-30 animate-pulse" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-gradient-to-br from-[#7C4DFF]/20 to-[#00BCD4]/20 rounded-full blur-[80px] opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-200/50 flex items-center justify-center mb-6 shadow-sm">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        {/* Logo */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1976D2] to-[#1565C0] flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
              <path d="M12 2L3 9V20C3 20.55 3.45 21 4 21H9V14H15V21H20C20.55 21 21 20.55 21 20V9L12 2Z" />
            </svg>
          </div>
          <span className="text-lg font-bold bg-gradient-to-br from-[#212121] to-[#1565C0] bg-clip-text text-transparent font-[family-name:var(--font-space-grotesk)]">
            UrbanCare
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#212121] mb-2 font-[family-name:var(--font-space-grotesk)]">
          Something went wrong
        </h1>
        <p className="text-[#616161] text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          We hit an unexpected issue. This could be a temporary glitch — try
          again, and if the problem continues, our team is on it.
        </p>

        {/* Error digest - only in dev */}
        {error.digest && process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-3 bg-slate-100 rounded-xl border border-slate-200 text-left">
            <p className="text-xs text-slate-500 font-mono break-all">
              Error ID: {error.digest}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full py-3 px-6 bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white text-sm font-semibold rounded-xl shadow-[0_4px_16px_rgba(25,118,210,0.3)] hover:shadow-[0_6px_24px_rgba(25,118,210,0.4)] active:scale-[0.98] transition-all duration-200"
          >
            Try again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full py-3 px-6 bg-white text-[#1976D2] text-sm font-semibold rounded-xl border border-[#1976D2]/20 hover:bg-blue-50/50 active:scale-[0.98] transition-all duration-200"
          >
            Back to home
          </button>
        </div>

        <p className="mt-8 text-xs text-[#9E9E9E]">
          Need help? href="/support" className="text-[#1976D2] hover:underline
          font-medium"
          <a>Contact support</a>
        </p>
      </div>
    </div>
  );
}
