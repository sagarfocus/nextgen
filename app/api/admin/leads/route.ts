import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const leads = await prisma.contactLead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
    return NextResponse.json({ leads });
  } catch (err) {
    console.error('Leads error:', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
