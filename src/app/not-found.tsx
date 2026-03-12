import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-container rounded-urbancare-full blur-[80px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[20%] -left-20 w-64 h-64 bg-tertiary-container rounded-urbancare-full blur-[80px] opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center">
        {/* 404 Badge */}
        <div className="mx-auto w-20 h-20 rounded-urbancare-3xl bg-primary-container border border-primary/20 flex items-center justify-center mb-6 shadow-sm">
          <span className="text-urbancare-5xl font-bold text-primary">404</span>
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
          Page not found
        </h1>
        <p className="text-text-secondary text-urbancare-base leading-relaxed mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 px-6 bg-gradient-primary text-white text-urbancare-base font-semibold rounded-urbancare-xl shadow-primary/30 shadow-md lg:hover:shadow-primary/40 lg:hover:shadow-lg lg:active:scale-[0.98] transition-all duration-200 text-center"
          >
            Back to home
          </Link>

          <Link
            href="/dashboard"
            className="w-full py-3 px-6 bg-surface text-primary text-urbancare-base font-semibold rounded-urbancare-xl border border-border lg:hover:bg-surface-hover lg:active:scale-[0.98] transition-all duration-200 text-center"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
