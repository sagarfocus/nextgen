import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
      take: 500,
    });
    return NextResponse.json({ subscribers });
  } catch (err) {
    console.error('Newsletter list error:', err);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
