import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';
import { normalizeServiceCategories } from '@server/admin-helpers';

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { name, type, location, assignedUsers, serviceCategories } = (await req
      .json()
      .catch(() => ({}))) as Record<string, any>;
    const normalized = normalizeServiceCategories(serviceCategories);

    if (!name || !type || !location) {
      return NextResponse.json(
        { error: 'Name, type, and location are required' },
        { status: 400 },
      );
    }

    const clinic = await prisma.clinic.create({
      data: { name, type, location, leads: 0, appointments: 0 },
    });

    if (Array.isArray(assignedUsers) && assignedUsers.length > 0) {
      await Promise.all(
        assignedUsers.map((userId: string) =>
          prisma.clientClinic.upsert({
            where: { userId_clinicId: { userId, clinicId: clinic.id } },
            update: {},
            create: { userId, clinicId: clinic.id, serviceCategories: normalized },
          }),
        ),
      );
    }

    const full = await prisma.clinic.findUnique({
      where: { id: clinic.id },
      include: { clientAssignments: true },
    });
    return NextResponse.json(full, { status: 201 });
  } catch (err) {
    console.error('Error creating clinic:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create clinic' },
      { status: 500 },
    );
  }
}
