import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const clinics = await prisma.clinic.findMany({
      orderBy: { name: 'asc' },
      include: {
        clientAssignments: {
          select: {
            id: true,
            userId: true,
            clinicId: true,
            serviceCategories: true,
            assignedAt: true,
          },
        },
      },
    });
    return NextResponse.json({ clinics });
  } catch (err) {
    console.error('Error fetching clinics:', err);
    return NextResponse.json({ error: 'Failed to fetch clinics' }, { status: 500 });
  }
}
