'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc, #eff6ff, #f8fafc)',
            padding: '24px',
          }}
        >
          <div
            style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}
          >
            {/* Inline SVG warning icon */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                background:
                  'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(249,115,22,0.1))',
                border: '1px solid rgba(239,68,68,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <svg
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ef4444"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>

            {/* Logo */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #1976D2, #1565C0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M12 2L3 9V20C3 20.55 3.45 21 4 21H9V14H15V21H20C20.55 21 21 20.55 21 20V9L12 2Z" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1565C0',
                }}
              >
                UrbanCare
              </span>
            </div>

            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#212121',
                marginBottom: '8px',
              }}
            >
              Critical Error
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: '#616161',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              Something seriously broke. We&apos;re sorry about that — please
              try refreshing, and if it persists, reach out to support.
            </p>

            <button
              onClick={reset}
              style={{
                width: '100%',
                padding: '12px 24px',
                background: 'linear-gradient(to right, #1976D2, #1565C0)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(25,118,210,0.3)',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
