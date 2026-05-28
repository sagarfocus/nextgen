import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function AuthGate({ children }: { children: ReactNode }) {
  // Wait for the initial /api/auth/me probe to finish before deciding.
  // Returning null avoids a flash of the protected page or a false bounce to /login.
  const { loading } = useAuth();
  if (loading) return null;
  return <>{children}</>;
}

export function RequireAuth({
  children,
  role,
}: {
  children: ReactNode;
  role?: 'admin' | 'client';
}) {
  return (
    <AuthGate>
      <RequireAuthInner role={role}>{children}</RequireAuthInner>
    </AuthGate>
  );
}

function RequireAuthInner({ children, role }: { children: ReactNode; role?: 'admin' | 'client' }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client'} replace />;
  }
  return <>{children}</>;
}

export function RedirectIfAuthed({ children }: { children: ReactNode }) {
  return (
    <AuthGate>
      <RedirectIfAuthedInner>{children}</RedirectIfAuthedInner>
    </AuthGate>
  );
}

function RedirectIfAuthedInner({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client'} replace />;
  }
  return <>{children}</>;
}
