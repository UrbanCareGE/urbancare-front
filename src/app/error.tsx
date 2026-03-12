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
    console.error('[UrbanCare Error]', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-container rounded-urbancare-full blur-[80px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-tertiary-container rounded-urbancare-full blur-[80px] opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mx-auto w-20 h-20 rounded-urbancare-3xl bg-error-container border border-error/20 flex items-center justify-center mb-6 shadow-sm">
          <svg
            className="w-10 h-10 text-error"
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
          <div className="w-8 h-8 rounded-urbancare-lg bg-gradient-primary flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
              <path d="M12 2L3 9V20C3 20.55 3.45 21 4 21H9V14H15V21H20C20.55 21 21 20.55 21 20V9L12 2Z" />
            </svg>
          </div>
          <span className="text-urbancare-2xl font-bold bg-gradient-primary-text">
            UrbanCare
          </span>
        </div>

        <h1 className="text-urbancare-5xl font-bold text-text-primary mb-2">
          Something went wrong
        </h1>
        <p className="text-text-secondary text-urbancare-base leading-relaxed mb-8 max-w-sm mx-auto">
          We hit an unexpected issue. This could be a temporary glitch — try
          again, and if the problem continues, our team is on it.
        </p>

        {/* Error digest - only in dev */}
        {error.digest && process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-3 bg-surface-container rounded-urbancare-panel border border-border text-left">
            <p className="text-urbancare-sm text-text-secondary font-mono break-all">
              Error ID: {error.digest}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full py-3 px-6 bg-gradient-primary text-white text-urbancare-base font-semibold rounded-urbancare-xl shadow-primary/30 shadow-md lg:hover:shadow-primary/40 lg:hover:shadow-lg lg:active:scale-[0.98] transition-all duration-200"
          >
            Try again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full py-3 px-6 bg-surface text-primary text-urbancare-base font-semibold rounded-urbancare-xl border border-border lg:hover:bg-surface-hover lg:active:scale-[0.98] transition-all duration-200"
          >
            Back to home
          </button>
        </div>

        <p className="mt-8 text-urbancare-sm text-text-tertiary">
          Need help?{' '}
          <a
            href="/support"
            className="text-primary hover:underline font-medium"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
