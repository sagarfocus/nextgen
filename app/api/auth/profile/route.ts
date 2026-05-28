import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { normalizeRole, requireUser } from '@server/auth';

export async function PATCH(req: NextRequest) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const { name, avatar } = (await req.json().catch(() => ({}))) as {
    name?: string;
    avatar?: string | null;
  };
  const data: { name?: string; avatar?: string | null } = {};
  if (typeof name === 'string' && name.trim().length > 0) data.name = name.trim().slice(0, 120);
  if (avatar === null || typeof avatar === 'string') data.avatar = avatar || null;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: guard.user.id },
      data,
    });
    return NextResponse.json({
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: normalizeRole(updated.role),
      avatar: updated.avatar || null,
    });
  } catch (err) {
    console.error('Profile update error:', err);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
