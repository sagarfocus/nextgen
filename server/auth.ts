import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const ADMIN_EMAILS = ['shree@focusyourfinance.com'];
const COOKIE_NAME = 'auth_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days, in seconds

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return secret;
}

export function normalizeRole(role?: string | null): 'admin' | 'client' {
  return String(role || '').toLowerCase() === 'admin' ? 'admin' : 'client';
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function signAuthToken(payload: { id: string; role: string }, expiresIn: string = '7d') {
  return jwt.sign(payload, getJwtSecret(), { expiresIn } as jwt.SignOptions);
}

export function verifyAuthToken(token: string): { id: string; role: string } | null {
  try {
    return jwt.verify(token, getJwtSecret()) as { id: string; role: string };
  } catch {
    return null;
  }
}

export type AuthedUser = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  avatar: string | null;
};

export async function setAuthCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAuthCookie() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

// Reads + verifies the cookie and hydrates the user from the DB. Returns null
// when the request is unauthenticated, the token is invalid, or the user no
// longer exists.
export async function getAuthedUser(): Promise<AuthedUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const decoded = verifyAuthToken(token);
  if (!decoded?.id) return null;

  const dbUser = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!dbUser) return null;

  return {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    role: isAdminEmail(dbUser.email) ? 'admin' : normalizeRole(dbUser.role),
    avatar: dbUser.avatar || null,
  };
}

// Route-handler guard. Use as:
//   const guard = await requireUser();
//   if (guard instanceof NextResponse) return guard;
//   const { user } = guard;
export async function requireUser(): Promise<{ user: AuthedUser } | NextResponse> {
  const user = await getAuthedUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  return { user };
}

export async function requireAdmin(): Promise<{ user: AuthedUser } | NextResponse> {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;
  if (guard.user.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }
  return guard;
}
