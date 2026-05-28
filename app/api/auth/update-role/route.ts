import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { normalizeRole, requireAdmin } from '@server/auth';

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { id, role } = (await req.json().catch(() => ({}))) as { id?: string; role?: string };
  if (!id || !role) return NextResponse.json({ error: 'id and role required' }, { status: 400 });

  const normalized = normalizeRole(role);
  try {
    const updated = await prisma.user.update({ where: { id }, data: { role: normalized } });
    return NextResponse.json({ id: updated.id, role: normalizeRole(updated.role) });
  } catch (err) {
    console.error('Update role error:', err);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}
