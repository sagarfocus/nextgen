import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';
import { isoWeek } from '@server/admin-helpers';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentWeek = isoWeek(now);
    const lastWeek = currentWeek - 1;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const [
      thisWeekData,
      lastWeekData,
      thisMonthData,
      lastMonthData,
      allClinics,
      recentUsers,
      recentClinics,
    ] = await Promise.all([
      prisma.weeklyAnalytics.findMany({
        where: { year: currentYear, month: currentMonth, weekNumber: currentWeek },
        include: { clinic: true },
      }),
      prisma.weeklyAnalytics.findMany({
        where: {
          OR: [
            { year: currentYear, month: currentMonth, weekNumber: lastWeek },
            { year: currentYear, month: lastMonth, weekNumber: lastWeek },
          ],
        },
      }),
      prisma.weeklyAnalytics.findMany({
        where: { year: currentYear, month: currentMonth },
        include: { clinic: true },
      }),
      prisma.weeklyAnalytics.findMany({ where: { year: lastMonthYear, month: lastMonth } }),
      prisma.clinic.findMany({ select: { id: true, name: true } }),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { name: true, email: true, createdAt: true, role: true },
      }),
      prisma.clinic.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: { name: true, location: true, updatedAt: true, createdAt: true },
      }),
    ]);

    const sum = <T extends Record<string, unknown>>(rows: T[], key: keyof T) =>
      rows.reduce((s, d) => s + ((d[key] as number) || 0), 0);

    const weeklyPatients = sum(thisWeekData, 'patientCount');
    const lastWeekPatients = sum(lastWeekData, 'patientCount');
    const weeklyPatientsTrend =
      lastWeekPatients > 0
        ? Math.round(((weeklyPatients - lastWeekPatients) / lastWeekPatients) * 100)
        : 0;

    const weeklyMetaSpend = sum(thisWeekData, 'metaAdSpend');
    const weeklyGoogleSpend = sum(thisWeekData, 'googleTotalCost');

    const monthlyPatients = sum(thisMonthData, 'patientCount');
    const lastMonthPatients = sum(lastMonthData, 'patientCount');
    const monthlyPatientsTrend =
      lastMonthPatients > 0
        ? Math.round(((monthlyPatients - lastMonthPatients) / lastMonthPatients) * 100)
        : 0;

    const monthlyMetaSpend = sum(thisMonthData, 'metaAdSpend');
    const monthlyGoogleSpend = sum(thisMonthData, 'googleTotalCost');

    const totalTraffic = sum(thisMonthData, 'totalTraffic');
    const callsRequested = sum(thisMonthData, 'callsRequested');
    const websiteVisits = sum(thisMonthData, 'websiteVisits');
    const directionClicks = sum(thisMonthData, 'directionClicks');

    const clinicMap = new Map<
      string,
      { name: string; location: string; patients: number; trend: number }
    >();
    for (const d of thisMonthData) {
      if (!d.clinic) continue;
      const existing = clinicMap.get(d.clinicId) || {
        name: d.clinic.name,
        location: d.clinic.location,
        patients: 0,
        trend: 0,
      };
      existing.patients += d.patientCount || 0;
      clinicMap.set(d.clinicId, existing);
    }
    for (const d of lastMonthData) {
      if (clinicMap.has(d.clinicId)) {
        const c = clinicMap.get(d.clinicId)!;
        const lastTotal = lastMonthData
          .filter((ld) => ld.clinicId === d.clinicId)
          .reduce((s, ld) => s + (ld.patientCount || 0), 0);
        if (lastTotal > 0) {
          c.trend = Math.round(((c.patients - lastTotal) / lastTotal) * 100);
        }
      }
    }
    const topClinics = Array.from(clinicMap.entries())
      .map(([id, data]) => ({ clinicId: id, ...data }))
      .sort((a, b) => b.patients - a.patients)
      .slice(0, 5);

    const alerts: { type: string; message: string; details: string }[] = [];
    const clinicsWithData = new Set(thisWeekData.map((d) => d.clinicId));
    const clinicsWithoutData = allClinics.filter((c) => !clinicsWithData.has(c.id));
    if (clinicsWithoutData.length > 0) {
      alerts.push({
        type: 'warning',
        message: `${clinicsWithoutData.length} clinic(s) missing data this week`,
        details: clinicsWithoutData.map((c) => c.name).join(', '),
      });
    }

    const clinicNames = allClinics.map((c) => c.name.toLowerCase());
    const duplicates = clinicNames.filter((n, i) => clinicNames.indexOf(n) !== i);
    if (duplicates.length > 0) {
      alerts.push({
        type: 'warning',
        message: `${duplicates.length} duplicate clinic name(s) detected`,
        details: [...new Set(duplicates)].join(', '),
      });
    }

    const recentActivity = [
      ...recentUsers.map((u) => ({
        type: 'user',
        action: 'User created',
        name: u.name,
        details: u.email,
        timestamp: u.createdAt,
      })),
      ...recentClinics.map((c) => ({
        type: 'clinic',
        action:
          c.createdAt.getTime() === c.updatedAt.getTime() ? 'Clinic created' : 'Clinic updated',
        name: c.name,
        details: c.location,
        timestamp: c.updatedAt,
      })),
    ]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);

    return NextResponse.json({
      weeklyPatients,
      weeklyPatientsTrend,
      monthlyPatients,
      monthlyPatientsTrend,
      weeklyAdSpend: {
        meta: Math.round(weeklyMetaSpend * 100) / 100,
        google: Math.round(weeklyGoogleSpend * 100) / 100,
        total: Math.round((weeklyMetaSpend + weeklyGoogleSpend) * 100) / 100,
      },
      monthlyAdSpend: {
        meta: Math.round(monthlyMetaSpend * 100) / 100,
        google: Math.round(monthlyGoogleSpend * 100) / 100,
        total: Math.round((monthlyMetaSpend + monthlyGoogleSpend) * 100) / 100,
      },
      topClinics,
      traffic: { total: totalTraffic, calls: callsRequested, websiteVisits, directionClicks },
      alerts,
      recentActivity,
    });
  } catch (err) {
    console.error('Error fetching command center data:', err);
    return NextResponse.json({ error: 'Failed to fetch command center data' }, { status: 500 });
  }
}
