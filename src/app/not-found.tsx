import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-6">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#BBDEFB] rounded-full blur-[80px] opacity-30 animate-pulse" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-gradient-to-br from-[#7C4DFF]/20 to-[#00BCD4]/20 rounded-full blur-[80px] opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* 404 Badge */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1976D2]/10 to-[#1565C0]/10 border border-[#1976D2]/20 flex items-center justify-center mb-6 shadow-sm">
          <span className="text-2xl font-bold text-[#1976D2] font-[family-name:var(--font-space-grotesk)]">
            404
          </span>
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
          Page not found
        </h1>
        <p className="text-[#616161] text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 px-6 bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white text-sm font-semibold rounded-xl shadow-[0_4px_16px_rgba(25,118,210,0.3)] lg:hover:shadow-[0_6px_24px_rgba(25,118,210,0.4)] lg:active:scale-[0.98] transition-all duration-200 text-center"
          >
            Back to home
          </Link>

          <Link
            href="/dashboard"
            className="w-full py-3 px-6 bg-white text-[#1976D2] text-sm font-semibold rounded-xl border border-[#1976D2]/20 lg:hover:bg-blue-50/50 lg:active:scale-[0.98] transition-all duration-200 text-center"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
