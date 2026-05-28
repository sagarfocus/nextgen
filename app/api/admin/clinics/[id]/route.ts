import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';
import { normalizeServiceCategories } from '@server/admin-helpers';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { id: clinicId } = await ctx.params;
    const body = (await req.json().catch(() => ({}))) as Record<string, any>;
    const { name, type, location, assignedUsers } = body;
    const hasServiceCategories = Object.prototype.hasOwnProperty.call(body, 'serviceCategories');
    const normalized = hasServiceCategories
      ? normalizeServiceCategories(body.serviceCategories)
      : null;

    const clinic = await prisma.clinic.findUnique({
      where: { id: clinicId },
      include: { clientAssignments: true },
    });
    if (!clinic) return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });

    const inherited = normalizeServiceCategories(
      clinic.clientAssignments[0]?.serviceCategories ?? [],
    );

    await prisma.clinic.update({
      where: { id: clinicId },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(location && { location }),
      },
    });

    if (assignedUsers !== undefined && Array.isArray(assignedUsers)) {
      const current = clinic.clientAssignments.map((ca) => ca.userId);
      for (const userId of current) {
        if (!assignedUsers.includes(userId)) {
          await prisma.clientClinic.deleteMany({ where: { userId, clinicId } });
        }
      }
      for (const userId of assignedUsers) {
        if (!current.includes(userId)) {
          await prisma.clientClinic.upsert({
            where: { userId_clinicId: { userId, clinicId } },
            update: hasServiceCategories ? { serviceCategories: normalized ?? [] } : {},
            create: { userId, clinicId, serviceCategories: normalized ?? inherited },
          });
        }
      }
    }

    if (hasServiceCategories) {
      await prisma.clientClinic.updateMany({
        where: { clinicId },
        data: { serviceCategories: normalized ?? [] },
      });
    }

    const full = await prisma.clinic.findUnique({
      where: { id: clinicId },
      include: { clientAssignments: true },
    });
    return NextResponse.json(full);
  } catch (err) {
    console.error('Error updating clinic:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update clinic' },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { id: clinicId } = await ctx.params;
    const clinic = await prisma.clinic.findUnique({ where: { id: clinicId } });
    if (!clinic) return NextResponse.json({ error: 'Clinic not found' }, { status: 404 });

    const result = await prisma.$transaction(async (tx) => {
      const gmb = await tx.gMBConnection.findUnique({ where: { clinicId } });
      if (gmb) {
        await tx.gMBData.deleteMany({ where: { gmbConnectionId: gmb.id } });
        await tx.gMBConnection.delete({ where: { id: gmb.id } });
      }
      await tx.clientClinic.deleteMany({ where: { clinicId } });
      await tx.weeklyAnalytics.deleteMany({ where: { clinicId } });
      return await tx.clinic.delete({ where: { id: clinicId } });
    });

    return NextResponse.json({ message: 'Clinic deleted successfully', clinic: result });
  } catch (err) {
    console.error('Error deleting clinic:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to delete clinic' },
      { status: 500 },
    );
  }
}
