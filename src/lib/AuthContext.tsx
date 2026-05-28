import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiFetch } from './api';

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  avatar: string | null;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<User>('/api/auth/me')
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiFetch<{ user: User }>('/api/auth/login', {
      method: 'POST',
      json: { email, password },
    });
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
