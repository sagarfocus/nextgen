import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { verifyPassword } from '@server/password';
import {
  isAdminEmail,
  normalizeRole,
  signAuthToken,
  setAuthCookie,
} from '@server/auth';

export async function POST(req: NextRequest) {
  const { email: rawEmail, password } = (await req.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };

  if (!rawEmail || typeof rawEmail !== 'string' || !password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }
  if (password.length > 128) {
    return NextResponse.json({ error: 'Password too long' }, { status: 400 });
  }

  const email = rawEmail.trim().toLowerCase().slice(0, 254);

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const ok = await verifyPassword(password, user.password || '');
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const role = isAdminEmail(user.email) ? 'admin' : normalizeRole(user.role);
    const token = signAuthToken({ id: user.id, role });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role,
        avatar: user.avatar || null,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
