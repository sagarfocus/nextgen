import { NextResponse } from 'next/server';
import { requireUser } from '@server/auth';

const SERVICE =
  'Stripe is not configured in this environment. Set STRIPE_SECRET_KEY and the *_PRICE_ID env vars and replace this stub.';

export async function POST() {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;
  return NextResponse.json({ error: SERVICE }, { status: 503 });
}
