import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireUser, requireAdmin } from '@server/auth';
import { getCanonicalWeekData } from '@server/analytics-week';

const ALLOWED_WEEKLY_FIELDS = [
  'blogsPublished', 'avgRanking', 'totalTraffic', 'callsRequested',
  'websiteVisits', 'directionClicks', 'metaImpressions', 'metaClicks',
  'metaCTR', 'metaCPC', 'metaConversions', 'metaCostPerConversion',
  'metaAdSpend', 'googleImpressions', 'googleClicks', 'googleCTR',
  'googleCPC', 'googleConversions', 'googleCVR', 'googleCostPerConversion',
  'googleTotalCost', 'socialPosts', 'socialViews', 'patientCount',
  'digitalConversion', 'conversionRate', 'dailyPatientAvg',
] as const;

export async function GET(req: NextRequest) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const q = req.nextUrl.searchParams;
  const clinicId = q.get('clinicId')?.trim();
  if (!clinicId) return NextResponse.json({ error: 'Clinic ID required' }, { status: 400 });

  const year = q.get('year') ?? undefined;
  const month = q.get('month') ?? undefined;
  const weekNumber = q.get('weekNumber') ?? undefined;
  const weekLabel = q.get('weekLabel')?.trim();

  const where: {
    clinicId: string;
    year?: number;
    month?: number;
    weekNumber?: number;
    weekLabel?: { contains: string };
  } = { clinicId };
  if (year && year !== 'all') where.year = Number(year);
  if (month && month !== 'all') where.month = Number(month);
  if (weekNumber && weekNumber !== 'all') where.weekNumber = Number(weekNumber);
  if (weekLabel && weekLabel.length > 0) where.weekLabel = { contains: weekLabel };

  try {
    const analytics = await prisma.weeklyAnalytics.findMany({
      where,
      orderBy: [{ year: 'asc' }, { weekNumber: 'asc' }],
    });
    return NextResponse.json({ analytics });
  } catch (err) {
    console.error('[Analytics API] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { clinicId, year, weekNumber } = body as {
    clinicId?: string;
    year?: number | string;
    weekNumber?: number | string;
  };

  if (!clinicId || !year || !weekNumber) {
    return NextResponse.json(
      { error: 'Missing required fields: clinicId, year, weekNumber' },
      { status: 400 },
    );
  }

  const numericYear = Number(year);
  const numericWeekNumber = Number(weekNumber);
  if (Number.isNaN(numericYear) || Number.isNaN(numericWeekNumber)) {
    return NextResponse.json(
      { error: 'Year and weekNumber must be valid numbers' },
      { status: 400 },
    );
  }

  const safeData: Record<string, number> = {};
  for (const field of ALLOWED_WEEKLY_FIELDS) {
    if (body[field] !== undefined) {
      safeData[field] = Number(body[field]) || 0;
    }
  }

  const canonical = getCanonicalWeekData(numericYear, numericWeekNumber);

  try {
    const existing = await prisma.weeklyAnalytics.findFirst({
      where: { clinicId, year: numericYear, weekNumber: numericWeekNumber },
      orderBy: { updatedAt: 'desc' },
    });

    const analytics = existing
      ? await prisma.weeklyAnalytics.update({
          where: { id: existing.id },
          data: {
            weekLabel: canonical.weekLabel,
            month: canonical.month,
            ...safeData,
            updatedAt: new Date(),
          },
        })
      : await prisma.weeklyAnalytics.create({
          data: {
            clinicId,
            year: numericYear,
            month: canonical.month,
            weekNumber: numericWeekNumber,
            weekLabel: canonical.weekLabel,
            ...safeData,
          },
        });

    return NextResponse.json({ success: true, analytics });
  } catch (err) {
    console.error('[Analytics API POST] error:', err);
    return NextResponse.json({ error: 'Failed to save analytics' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const id = req.nextUrl.searchParams.get('id')?.trim();
  if (!id) return NextResponse.json({ error: 'Analytics ID required' }, { status: 400 });

  try {
    await prisma.weeklyAnalytics.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Analytics API DELETE] error:', err);
    return NextResponse.json({ error: 'Failed to delete analytics' }, { status: 500 });
  }
}
