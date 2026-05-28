import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireUser } from '@server/auth';

export async function GET() {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const user = await prisma.user.findUnique({ where: { id: guard.user.id } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  return NextResponse.json({
    plan: user.plan || null,
    planId: user.planId || null,
    subscriptionStatus: user.subscriptionStatus || null,
    stripeSubscriptionId: user.stripeSubscriptionId || null,
    stripeCustomerId: user.stripeCustomerId || null,
  });
}
