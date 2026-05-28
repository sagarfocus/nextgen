import { NextResponse } from 'next/server';

const SERVICE =
  'Stripe is not configured in this environment. Set STRIPE_SECRET_KEY and the *_PRICE_ID env vars and replace this stub.';

// Webhook is public (Stripe signs it) — no auth guard, just a stub response.
export async function POST() {
  return NextResponse.json({ error: SERVICE }, { status: 503 });
}
