import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Surface ?oauthError=... from the same-tab fallback (popup blocked path).
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauthError = params.get('oauthError');
    if (oauthError) setError(decodeURIComponent(oauthError));
  }, [location.search]);

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await login(email, password);
      const dest = from ?? (user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client');
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleAuth() {
    setError(null);
    setGoogleLoading(true);
    try {
      const res = await fetch('/api/auth/url');
      if (!res.ok) {
        const data = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(data.error || 'Failed to start Google sign-in');
      }
      const { url } = (await res.json()) as { url: string };

      const w = 500;
      const h = 600;
      const left = window.screenX + (window.outerWidth - w) / 2;
      const top = window.screenY + (window.outerHeight - h) / 2;
      const popup = window.open(
        url,
        'googleOAuth',
        `width=${w},height=${h},left=${left},top=${top}`,
      );

      // Popup blocked → fall back to a same-tab redirect; callback HTML handles it.
      if (!popup) {
        window.location.href = url;
        return;
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        const data = event.data as
          | { type: 'OAUTH_AUTH_SUCCESS'; user: { role: 'admin' | 'client' } }
          | { type: 'OAUTH_AUTH_ERROR'; error?: string }
          | undefined;
        if (!data || typeof data !== 'object') return;

        if (data.type === 'OAUTH_AUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          clearInterval(closedTimer);
          // The callback set the auth_token cookie; nudge the SPA to refetch
          // its session by doing a full navigation to the dashboard.
          const dest =
            from ?? (data.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client');
          window.location.assign(dest);
        } else if (data.type === 'OAUTH_AUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          clearInterval(closedTimer);
          setError(data.error || 'Google sign-in failed. Please try again.');
          setGoogleLoading(false);
        }
      };
      window.addEventListener('message', handleMessage);

      // If the user closes the popup without finishing, stop the spinner.
      const closedTimer = window.setInterval(() => {
        if (popup.closed) {
          clearInterval(closedTimer);
          window.removeEventListener('message', handleMessage);
          setGoogleLoading((v) => (v ? false : v));
        }
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open Google sign-in.');
      setGoogleLoading(false);
    }
  }

  const busy = submitting || googleLoading;

  return (
    <section className="container-shell" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div
        style={{
          maxWidth: 440,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 16,
          padding: 'clamp(28px, 4vw, 40px)',
          boxShadow: '0 20px 50px rgba(20,20,40,0.06)',
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 8 }}>Sign in</h1>
        <p style={{ margin: 0, marginBottom: 28, opacity: 0.7, fontSize: 14 }}>
          Welcome back. Enter your credentials to continue.
        </p>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={busy}
          style={{
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(0,0,0,0.14)',
            background: 'white',
            color: '#1f2937',
            fontSize: 14.5,
            fontWeight: 600,
            cursor: busy ? 'not-allowed' : 'pointer',
            opacity: busy ? 0.7 : 1,
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        >
          {googleLoading ? (
            <span
              aria-hidden="true"
              style={{
                width: 18,
                height: 18,
                border: '2px solid rgba(0,0,0,0.18)',
                borderTopColor: 'rgba(0,0,0,0.55)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          ) : (
            <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          {googleLoading ? 'Opening Google…' : 'Continue with Google'}
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            margin: '22px 0 18px',
            color: 'rgba(0,0,0,0.45)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
          <span>Or</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
        </div>

        <form onSubmit={onSubmit} noValidate>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={inputStyle}
            disabled={busy}
          />

          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 6,
              marginTop: 16,
            }}
          >
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              style={{ ...inputStyle, paddingRight: 44 }}
              disabled={busy}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              tabIndex={-1}
              style={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                padding: 0,
                border: 'none',
                background: 'transparent',
                color: 'rgba(0,0,0,0.5)',
                cursor: 'pointer',
                borderRadius: 6,
              }}
            >
              {showPassword ? (
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <div
              role="alert"
              style={{
                marginTop: 16,
                padding: '10px 12px',
                borderRadius: 8,
                background: 'rgba(220,53,69,0.08)',
                color: '#a32431',
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-primary"
            style={{
              marginTop: 24,
              width: '100%',
              justifyContent: 'center',
              opacity: busy ? 0.7 : 1,
            }}
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid rgba(0,0,0,0.12)',
  background: 'white',
  fontSize: 15,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};
