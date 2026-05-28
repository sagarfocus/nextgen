import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';
import { normalizeServiceCategories } from '@server/admin-helpers';

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { userId, clinicId, serviceCategories } = (await req.json().catch(() => ({}))) as Record<
      string,
      any
    >;
    if (!userId || !clinicId)
      return NextResponse.json(
        { error: 'userId and clinicId are required' },
        { status: 400 },
      );

    const [user, clinic] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.clinic.findUnique({ where: { id: clinicId } }),
    ]);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    if (!clinic) return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });

    const inherited = await prisma.clientClinic.findFirst({
      where: { clinicId },
      select: { serviceCategories: true },
      orderBy: { assignedAt: 'asc' },
    });
    const normalized = normalizeServiceCategories(
      serviceCategories ?? inherited?.serviceCategories ?? [],
    );

    const assignment = await prisma.clientClinic.upsert({
      where: { userId_clinicId: { userId, clinicId } },
      update: { serviceCategories: normalized },
      create: { userId, clinicId, serviceCategories: normalized },
    });

    return NextResponse.json(
      { message: 'Clinic assigned successfully', assignment },
      { status: 201 },
    );
  } catch (err) {
    console.error('Error assigning clinic:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to assign clinic' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { userId, clinicId } = (await req.json().catch(() => ({}))) as Record<string, string>;
    if (!userId || !clinicId)
      return NextResponse.json(
        { error: 'userId and clinicId are required' },
        { status: 400 },
      );

    const existing = await prisma.clientClinic.findUnique({
      where: { userId_clinicId: { userId, clinicId } },
    });
    if (!existing) return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });

    await prisma.clientClinic.delete({ where: { userId_clinicId: { userId, clinicId } } });
    return NextResponse.json({ message: 'Clinic unassigned successfully' });
  } catch (err) {
    console.error('Error removing assignment:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to remove assignment' },
      { status: 500 },
    );
  }
}
