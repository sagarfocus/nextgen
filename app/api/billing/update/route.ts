import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@server/auth';

export async function POST(req: NextRequest) {
  const guard = await requireUser();
  if (guard instanceof NextResponse) return guard;

  const { email, address, city, state, zipCode, country } = (await req
    .json()
    .catch(() => ({}))) as Record<string, string | undefined>;

  if (!email && !address && !city && !state && !zipCode && !country) {
    return NextResponse.json({ error: 'No billing fields provided' }, { status: 400 });
  }
  return NextResponse.json({
    success: true,
    billing: { email, address, city, state, zipCode, country },
  });
}
