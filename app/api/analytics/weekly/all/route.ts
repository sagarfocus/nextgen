import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireUser } from '@server/auth';

export async function GET() {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  try {
    const analytics = await prisma.weeklyAnalytics.findMany({
      orderBy: [{ year: 'desc' }, { weekNumber: 'desc' }],
      take: 1000,
    });
    return NextResponse.json({ analytics });
  } catch (err) {
    console.error('[Analytics API] weekly/all error:', err);
    return NextResponse.json({ error: 'Failed to fetch all analytics' }, { status: 500 });
  }
}
