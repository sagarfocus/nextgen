import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { hashPassword, verifyPassword } from '@server/password';
import { normalizeRole, requireUser } from '@server/auth';

export async function GET() {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const user = await prisma.user.findUnique({ where: { id: guard.user.id } });
  return NextResponse.json({
    hasPassword: !!user?.password,
    role: normalizeRole(user?.role),
  });
}

export async function PATCH(req: NextRequest) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const { currentPassword, newPassword, confirmPassword } = (await req.json().catch(() => ({}))) as {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ error: 'All password fields are required' }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
  }
  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: 'New password and confirmation do not match' }, { status: 400 });
  }
  if (newPassword.length > 128) {
    return NextResponse.json({ error: 'Password too long' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: guard.user.id } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  const ok = await verifyPassword(currentPassword, user.password || '');
  if (!ok) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });

  const newHash = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { password: newHash } });

  return NextResponse.json({ message: 'Password updated successfully' });
}
