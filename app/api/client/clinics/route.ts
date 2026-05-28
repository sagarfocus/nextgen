import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireUser } from '@server/auth';

export async function GET(req: NextRequest) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const userId = req.nextUrl.searchParams.get('userId')?.trim();
  if (!userId) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

  if (userId !== guard.user.id && guard.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const assignments = await prisma.clientClinic.findMany({
      where: { userId },
      include: { clinic: true },
    });

    const clinics = assignments.map((a) => ({
      ...a.clinic,
      serviceCategories: a.serviceCategories,
    }));

    return NextResponse.json({ clinics });
  } catch (err) {
    console.error('Error fetching client clinics:', err);
    return NextResponse.json({ error: 'Failed to fetch clinics' }, { status: 500 });
  }
}
