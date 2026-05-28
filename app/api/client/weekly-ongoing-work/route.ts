import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireUser } from '@server/auth';

export async function GET(req: NextRequest) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const q = req.nextUrl.searchParams;
  const clinicId = q.get('clinicId')?.trim();
  const year = q.get('year') ? Number(q.get('year')) : undefined;
  const weekNumber = q.get('weekNumber') ? Number(q.get('weekNumber')) : undefined;

  const where: { userId: string; clinicId?: string; weekYear?: number; weekNumber?: number } = {
    userId: guard.user.id,
  };
  if (clinicId) where.clinicId = clinicId;
  if (year !== undefined && !Number.isNaN(year)) where.weekYear = year;
  if (weekNumber !== undefined && !Number.isNaN(weekNumber)) where.weekNumber = weekNumber;

  try {
    const tasks = await prisma.weeklyOngoingTask.findMany({
      where,
      orderBy: [{ weekYear: 'desc' }, { weekNumber: 'desc' }],
    });
    return NextResponse.json({ tasks });
  } catch (err) {
    console.error('Weekly-ongoing-work fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch weekly ongoing work' }, { status: 500 });
  }
}
