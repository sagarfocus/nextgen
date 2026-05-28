import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireUser } from '@server/auth';

export async function GET(req: NextRequest) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const clinicId = req.nextUrl.searchParams.get('clinicId')?.trim();
  const where: { userId: string; clinicId?: string } = { userId: guard.user.id };
  if (clinicId) where.clinicId = clinicId;

  try {
    const analytics = await prisma.analyticsData.findMany({
      where,
      orderBy: { date: 'desc' },
      take: 90,
    });
    return NextResponse.json(analytics);
  } catch (err) {
    console.error('Analytics-data fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}
